import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Alert,
    BackHandler,
    Animated
} from 'react-native';
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { AuthContext } from '../../../AuthContext';
import { useSocketContext } from '../../../SocketContext';
import { BASE_URL } from '../../Utils/ApiService\'/BaseUrl';
import { recive, sent } from '../Components/AudioFiles/Audio';
import AnimatedTypewriterText from '../../components/TextTyping';


const LibraryScreen = () => {
    const navigation:any = useNavigation();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { userId } = useContext(AuthContext);
    const { socket } = useSocketContext();
    const route = useRoute();
    const scrollViewRef = useRef<ScrollView>(null); // Specify the type of ref
    let recieverId = route?.params?.receiverId;
    let recieverName = route?.params?.name;
    const [typing, setTyping] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;


    const scrollToBottom = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    };

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (newMessage) => {
            newMessage.shouldShake = true;
            setMessages(prevMessages => [...prevMessages, newMessage]);
            scrollToBottom();
            recive.play();
        };

        socket.on('newMessage', handleNewMessage);
        socket.on('typing', ({ state }: any) => setTyping(state));
        socket.on('stop_typing', ({ state }: any) => setTyping(state));

        return () => {
            socket.off('newMessage', handleNewMessage);
            socket.off('typing');
            socket.off('stop_typing', ({ state }: any) => setTyping(state));
        };
    }, [socket]); // Only depend on socket

    const sendMessage = async (senderId: any, receiverId: any, message: string) => {
        setMessage('');
        socket.emit('updateLastMessage', { senderId, receiverId, message: btoa(message) });
        try {
            await axios.post(`${BASE_URL}/sendMessage`, {
                senderId,
                receiverId,
                message: btoa(message)
            });
            socket.emit('sendMessage', { senderId, receiverId, message: btoa(message) });
            // Play the sound with an onEnd callback
            sent.play();
            setTimeout(() => {
                fetchMessages();
            }, 100);
        } catch (error) {
            console.log('Error', error?.message);
        }
    };
    const fetchMessages = async () => {
        try {
            const senderId = userId;
            const receiverId = route?.params?.receiverId;

            const response = await axios.get(`${BASE_URL}/messages`, {
                params: { senderId, receiverId },
            });

            setMessages(response.data);
            setTimeout(() => {
                scrollToBottom();
            }, 300)

        } catch (error) {
            console.log('Error', error);
        }
    };

    function handleBackButtonClick() {
        socket.emit('stop_typing', { recieverId });
        socket.off('stop_typing');
        socket.off('newMessage');
        socket.off('typing');
        navigation.goBack();
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, []);


    useEffect(() => {
        fetchMessages();
        scrollToBottom();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,  // Fade in duration
                    useNativeDriver: true
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,  // Fade out duration
                    useNativeDriver: true
                })
            ]).start();
        }, 1000);  // Total duration for each blink cycle (in this case, 1000ms)

        return () => clearInterval(interval);
    }, [fadeAnim]);

    const formatTime = time => {
        const options = { hour: 'numeric', minute: 'numeric' };
        return new Date(time).toLocaleString('en-US', options);
    };

    const navigateToMapView = () => {
        navigation.navigate('MapView', {
            name: atob(recieverName),
            receiverId: recieverId,
            image: null,
          })
    }


    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#ddd' }}>
            <SafeAreaView style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 10 }}>
                <TouchableOpacity onPress={handleBackButtonClick} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                    <Image source={{ uri: 'https://p7.hiclipart.com/preview/1000/241/314/nandamuri-balakrishna-simha-youtube-tollywood-film-tdp.jpg' }} style={{ width: 40, height: 40, borderRadius: 60, marginHorizontal: 6 }} />
                    <View>
                        <Text style={{ color: '#000000', fontSize: 20, fontWeight: '500' }}>{atob(recieverName)}</Text>
                        {typing && <AnimatedTypewriterText sentences={typing} />}

                    </View>
                </TouchableOpacity>
                <View style={{ marginHorizontal: 20 }}>
                    <Animated.View style={{ opacity: fadeAnim }}>
                        <Icon onPress={navigateToMapView} name="map-marker-radius" color={'#03fc13'} size={30} />
                    </Animated.View>

                </View>
            </SafeAreaView>
            <ScrollView ref={scrollViewRef} automaticallyAdjustsScrollIndicatorInsets>
                {messages?.map((item) => {
                    return (
                        <Pressable key={item["timeStamp"]}
                            style={[
                                item?.senderId?._id === userId
                                    ? {
                                        alignSelf: 'flex-end',
                                        backgroundColor: '#DCF8C6',
                                        padding: 8,
                                        maxWidth: '60%',
                                        borderRadius: 7,
                                        marginRight: 20,
                                        marginVertical: 5,

                                    }
                                    : {
                                        alignSelf: 'flex-start',
                                        backgroundColor: 'white',
                                        padding: 8,
                                        marginVertical: 5,
                                        borderRadius: 7,
                                        marginLeft: 20,
                                        maxWidth: '60%',
                                    },

                            ]}>
                            <Text style={{ fontSize: 13, color: '#000000', textAlign: "left" }}>{atob(item?.message)}</Text>
                            <Text style={{ textAlign: "right", fontSize: 9, color: "gray", marginTop: 4 }}>{formatTime(item?.timeStamp)}</Text>
                        </Pressable>
                    );
                })}
            </ScrollView>

            <View
                style={{
                    height: 50,
                    backgroundColor: '#FFFFFF',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                }}>
                {/* <Entypo name="emoji-happy" size={24} color="gray" /> */}

                <TextInput
                    placeholder="Type your message..."
                    placeholderTextColor="gray"
                    value={message}
                    onChange={() => socket.emit('is_typing', { recieverId })}
                    onBlur={() => socket.emit('stop_typing', { recieverId })}
                    onLayout={() => socket.emit('stop_typing', { recieverId })}
                    onFocus={scrollToBottom}
                    onChangeText={setMessage}
                    style={{
                        flex: 1,
                        //height: screenHeight * 0.05,
                        borderBottomWidth: 2,
                        borderColor: '#3ab5fc',
                        borderTopLeftRadius: 3,
                        borderTopRightRadius: 3,
                        paddingHorizontal: 15,
                        marginLeft: 10,
                        color: '#000000',
                        backgroundColor: '#f2f2f2'
                    }}
                />

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 8,
                        marginHorizontal: 8,
                    }}>
                    {/* <Entypo name="camera" size={24} color="gray" /> */}

                    {/* <Feather name="mic" size={24} color="gray" /> */}
                </View>

                <Pressable
                    onPress={() => sendMessage(userId, route?.params?.receiverId, message)}
                    style={{
                        //backgroundColor: '#0066b2',
                        paddingHorizontal: 12,
                        //paddingVertical: 8,
                        //borderRadius: 20,
                    }}>
                    <Ionicons name="send" size={25} color="#3ab5fc" />
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
};

export default LibraryScreen;

const styles = StyleSheet.create({});