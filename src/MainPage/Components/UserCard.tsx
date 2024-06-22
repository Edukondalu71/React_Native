import React, { useContext, useRef, useState } from "react";
import { ActivityIndicator, Animated, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { screenHeight } from "../../Utils/ScreenDimentions";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { sendRequest } from "../../Utils/ApiService'/getLogin";
import { AuthContext } from "../../../AuthContext";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import { StoreContext } from "../../../StoreContext";

const UserCard = ({ item, index }: any) => {
    const { userId, user } = useContext(AuthContext);
    const { getUserRequestList, getFriends, getUserList } = useContext<any>(StoreContext);
    const navigation = useNavigation();
    const scrollY = useRef(new Animated.Value(0)).current;
    const cardHeight = screenHeight * 0.08;
    const padding = 10;
    const offset = cardHeight + padding;
    const inputRange = [offset * index, offset * index + offset];
    const outputRange1 = [1, 0];
    const outputRange2 = [0, offset / 2];
    const scale = scrollY.interpolate({
        inputRange,
        outputRange: outputRange1,
        extrapolate: 'clamp',
    });
    const translateY = scrollY.interpolate({
        inputRange,
        outputRange: outputRange2,
        extrapolate: 'clamp',
    });
    const opacity = scale;
    const [loader, setLoader] = useState(false);
    const [msg, setMsg] = useState(null);
    const OnRequest = async () => {
        try {
            let response = await sendRequest({ senderId: userId, receiverId: item["_id"], message: `${user} sent friend request` });
            let data = await response.json();
            setMsg(data?.message);
            console.log('repo##', data?.message);
            setLoader(false);
            getUserRequestList();
            getFriends();
            getUserList();
            // if(response?.status === 200){
            //     setLoader(false);
            //     setMsg(data?.message);
            // }else {

            // }
        } catch (error) {
            setMsg(error?.message);
            setLoader(false);
        }
    }

    if(user === item?.username) {
        return null
    }


    return (
        <Animated.View style={[styles.card, { opacity, transform: [{ translateY }, { scale }] }]}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome name="user-o" color="#420475" style={{ fontSize: screenHeight * 0.03, marginRight: 10 }} />
                <Text style={{ color: '#000000', fontSize: 16, fontWeight: '600' }}>{item?.username}</Text>
            </View>

            {
                loader ? <ActivityIndicator size={'small'} /> : msg ? <Text style={{ color: '#20e83b', fontSize: 12, fontWeight: '500' }}>{msg}</Text> :
                    <TouchableOpacity onPress={OnRequest}>
                        <FontAwesome name="user-plus" color="#420475" style={{ fontSize: screenHeight * 0.03 }} />
                    </TouchableOpacity>
                    // <Icon onPress={() => navigation.navigate('chat')} name={"chat"} color={"#2d1bf5"} size={screenHeight * 0.04} />
            }

        </Animated.View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 5,
        height: screenHeight * 0.08,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#b6a9a9',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 25,
        flexDirection: 'row',
        paddingHorizontal: 25,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default UserCard;