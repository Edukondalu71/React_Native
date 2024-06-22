import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native';
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { AuthContext } from '../../../AuthContext';
import { useSocketContext } from '../../../SocketContext';
import { BASE_URL } from '../../Utils/ApiService\'/BaseUrl';
import { screenHeight } from '../../Utils/ScreenDimentions';
import { recive, sent } from '../Components/AudioFiles/Audio';


const LibraryScreen = () => {
    const navigation = useNavigation();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { userId } = useContext(AuthContext);
    const { socket } = useSocketContext();
    const route = useRoute();
    const scrollViewRef = useRef<ScrollView>(null); // Specify the type of ref



    const scrollToBottom = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    };

    useLayoutEffect(() => {
        return navigation.setOptions({
            headerTitle: '',
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                    <View>
                        <Text style={{ color: '#000000', fontSize: 20, fontWeight: '500' }}>{route?.params?.name}</Text>
                    </View>
                </TouchableOpacity>
            )
        });
    }, []);

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (newMessage) => {
            newMessage.shouldShake = true;
            setMessages(prevMessages => [...prevMessages, newMessage]);
            scrollToBottom();
            recive.play((success) => {
                if (success) {
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
            });
        };

        socket.on('newMessage', handleNewMessage);

        return () => {
            socket.off('newMessage', handleNewMessage);
        };
    }, [socket]); // Only depend on socket

    const sendMessage = async (senderId, receiverId) => {
        try {
            await axios.post(`${BASE_URL}/sendMessage`, {
                senderId,
                receiverId,
                message,
            });

            socket.emit('sendMessage', { senderId, receiverId, message });

            // Play the sound with an onEnd callback
            sent.play((success) => {
                if (success) {
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
            });
            setMessage('');

            setTimeout(() => {
                fetchMessages();
            }, 100);
        } catch (error) {
            console.log('Error', error);
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
            scrollToBottom();
        } catch (error) {
            console.log('Error', error);
        }
    };
    useEffect(() => {
        fetchMessages();
        scrollToBottom();
    }, []);
    console.log('messages', messages);

    const formatTime = time => {
        const options = { hour: 'numeric', minute: 'numeric' };
        return new Date(time).toLocaleString('en-US', options);
    };
    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#000000' }}>
            <ScrollView ref={scrollViewRef} style={{}}>
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
                                        margin: 10,

                                    }
                                    : {
                                        alignSelf: 'flex-start',
                                        backgroundColor: 'white',
                                        padding: 8,
                                        margin: 10,
                                        borderRadius: 7,
                                        maxWidth: '60%',
                                    },

                            ]}>
                            <Text style={{ fontSize: 13, color: '#000000', textAlign: "left" }}>{item?.message}</Text>
                            <Text style={{ textAlign: "right", fontSize: 9, color: "gray", marginTop: 4 }}>{formatTime(item?.timeStamp)}</Text>
                        </Pressable>
                    );
                })}
            </ScrollView>

            <View
                style={{
                    height: screenHeight * 0.08,
                    backgroundColor: '#FFFFFF',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                }}>
                {/* <Entypo name="emoji-happy" size={24} color="gray" /> */}

                <TextInput
                    placeholder="type your message..."
                    placeholderTextColor="gray"
                    value={message}
                    onFocus={() => scrollToBottom()}
                    onChangeText={setMessage}
                    style={{
                        flex: 1,
                        height: screenHeight * 0.05,
                        borderWidth: 1,
                        borderColor: '#ddddd',
                        borderRadius: 20,
                        paddingHorizontal: 15,
                        marginLeft: 10,
                        color: '#000000'
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
                    onPress={() => sendMessage(userId, route?.params?.receiverId)}
                    style={{
                        backgroundColor: '#0066b2',
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 20,
                    }}>
                    <Text style={{ textAlign: 'center', color: 'white' }}>Send</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
};

export default LibraryScreen;

const styles = StyleSheet.create({});