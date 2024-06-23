import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../AuthContext';
import axios from 'axios';
import { BASE_URL } from '../../Utils/ApiService\'/BaseUrl';
import { recive } from '../Components/AudioFiles/Audio';
import { useSocketContext } from '../../../SocketContext';

const Chat = ({ item }: any) => {
  const navigation: any = useNavigation();
  const { userId } = useContext(AuthContext);
  const [messages, setMessages] = useState();
  const { socket } = useSocketContext();


  //console.log("messages", messages)
  const fetchMessages = async () => {
    try {
      const senderId = userId;
      const receiverId = item?._id;

      //console.log(senderId);
      //console.log(receiverId);

      const response = await axios.get(`${BASE_URL}/messages`, {
        params: { senderId, receiverId },
      });
      const n = response?.data.length;
      setMessages(response?.data[n - 1]);
    } catch (error) {
      console.log(error?.message);
    }
  };

  const [count, setCount] = useState(0);



  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      //fetchMessages();
      newMessage.shouldShake = true;
      if (newMessage.senderId === item?._id) {
        setMessages(newMessage);
        setCount((prev) => (prev += 1));
        recive.play((success) => {
          if (success) {
            //console.log('successfully finished playing');
          } else {
            //console.log('playback failed due to audio decoding errors');
          }
        });
      }
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage');
    };
  }, [socket]); // Only depend on socket


  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <Pressable
      onPress={() => {
        setCount(0);
        navigation.navigate('ChatRoom', {
          name: item?.username,
          receiverId: item?._id,
          image: item?.image,
        })
      }
      }
      style={styles.friendCard}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Pressable>
            <Image source={{ uri: 'https://p7.hiclipart.com/preview/1000/241/314/nandamuri-balakrishna-simha-youtube-tollywood-film-tdp.jpg' }} style={{ width: 50, height: 50, borderRadius: 60, marginHorizontal: 6 }} />
          </Pressable>

          <View>
            <Text style={{ fontSize: 15, fontWeight: '500', color: '#000000' }}>{item?.username}</Text>
            <Text style={{ marginTop: 4, color: 'gray' }}>
              {messages ? messages?.message.length > 20 ?  messages?.message.slice(0, 20)+"...." : messages?.message : `Start chat with ${item?.username}`}
            </Text>
          </View>

        </View>


        {count > 0 ?
          <View style={{ backgroundColor: "#13bd54", height: 23, width: 23, marginRight: 15, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 60 }}>
            <Text style={{ color: '#FFFFFF', margin: 0, padding: 0, fontSize: 13 }}>{count}</Text>
          </View> : <></>}
      </View>
    </Pressable>
  );
};

export default Chat;

const styles = StyleSheet.create({
  friendCard: {
    shadowColor: '#b6a9a9',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
    marginBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    borderRadius: 8
  }
});
