import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import { AuthContext } from '../../../AuthContext';
import axios from 'axios';
import { BASE_URL } from '../../Utils/ApiService\'/BaseUrl';

const Chat = ({item}:any) => {
  const navigation:any = useNavigation();
  const {userId} = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const fetchMessages = async () => {
    try {
      const senderId = userId;
      const receiverId = item?._id;

      console.log(senderId);
      console.log(receiverId);

      const response = await axios.get(`${BASE_URL}/messages`, {
        params: {senderId, receiverId},
      });

      setMessages(response.data);
    } catch (error) {
      console.log(error?.message);
    }
  };
  console.log("messages",messages)
  useEffect(() => {
    fetchMessages();
  }, []);
  const getLastMessage = () => {
    const n = messages.length;
    return messages[n - 1];
  };
  const lastMessage = getLastMessage();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('ChatRoom', {
          name: item?.username,
          receiverId: item?._id,
          image: item?.image,
        })
      }
      style={{marginBottom:6}}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <Pressable>
          <Image source={{ uri: 'https://i.ibb.co/YySxPQC/pro.jpeg' }} style={{width: 50, height: 50, borderRadius: 60, marginHorizontal:6 }} />
        </Pressable>

        <View>
          <Text style={{fontSize: 15, fontWeight: '500', color:'#000000'}}>{item?.username}</Text>
          <Text style={{marginTop: 4, color: 'gray'}}>
            {lastMessage ? lastMessage?.message : `Start chat with ${item?.username}`}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Chat;

const styles = StyleSheet.create({});
