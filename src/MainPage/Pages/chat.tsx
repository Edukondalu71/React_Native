import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../AuthContext';
import axios from 'axios';
import { BASE_URL } from '../../Utils/ApiService\'/BaseUrl';
import { recive } from '../Components/AudioFiles/Audio';
import { useSocketContext } from '../../../SocketContext';
import { sortByTimeStamp, timeAgo } from '../../Utils/HelperFunctions';
import { getLastActive } from '../../Utils/ApiService\'/getLogin';

const Chat = ({ item }: any) => {
  const navigation: any = useNavigation();
  const { userId } = useContext(AuthContext);
  const [online, setOnline] = useState(false);
  const [updateMsg, setUpdateMsg] = useState<any>({
    message: "",
    timeStamp: ""
  });
  const { socket } = useSocketContext();
  const [lastOnlineTime, setLastOnlineTime] = useState<any>(null);


  //console.log("messages", messages)
  const fetchMessages = async () => {
    try {
      const senderId = userId;
      const receiverId = item?._id;
      const response = await axios.get(`${BASE_URL}/messages`, {
        params: { senderId, receiverId },
      });
      let filterList = response?.data.filter((el) => el?.senderId._id === item?._id);
      let sortList = sortByTimeStamp(filterList);
      const n = sortList.length;
      if (n > 0) setUpdateMsg(sortList[n - 1]);
    } catch (error) {
      console.log(error?.message);
    }
  };
  const [time, setTime] = useState<any>();
  const getLastTimeStamp = async () => {
    let response = await getLastActive(item?._id);
    if (response?.timestamp) {
      let time = response?.timestamp;
      setTime(time);
      if (time === "Online") {
        setOnline(false);
        setLastOnlineTime("Online");
      } else {
        let stamp = timeAgo(time);
        setLastOnlineTime(stamp === "just now" ? "Active few seconds ago" : `Active ${stamp}`);
        setOnline(true);
      }
    }
  }
  useEffect(() => {
    getLastTimeStamp();
    fetchMessages();
  }, [])

  const [count, setCount] = useState(0);





  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage: any) => {
      if (newMessage?.senderId === item?._id) {
        setUpdateMsg({ message: newMessage?.message, timeStamp: new Date() });
        setCount((prev) => (prev += 1));
        recive.play();
      } else if (newMessage?.senderId === userId) {
        setUpdateMsg((prev) => ({ ...prev, message: newMessage?.message }));
      }
    };

    socket.on('receiveMessage', handleNewMessage);
    socket.on('online', (data: any) => {
      if (data?.active === item?._id) {
        setOnline(false);
        setLastOnlineTime("Online");
      }
    });
    socket.on('offline', (data: any) => {
      if (data?.active === item?._id) {
        let time = new Date();
        setTime(time);
        let stamp = timeAgo(time);
        setLastOnlineTime(stamp === "just now" ? "Active few seconds ago" : `Active ${stamp}`);
        setOnline(true);
      }
    });


    return () => {
      socket.off('receiveMessage');
    };
  }, [socket]); // Only depend on socket

  //var timer;
  const [timeStamp, setTimeStamp] = useState({ stamp: '' });
  var timer: any;
  useEffect(() => {
    timer = setInterval(() => {
      if (updateMsg?.timeStamp) {
        setTimeStamp({ stamp: timeAgo(updateMsg?.timeStamp) });
      }
      if (online) {
        let stamp = timeAgo(time);
        setLastOnlineTime(stamp === "just now" ? "Active few seconds ago" : `Active ${stamp}`);
      }
    }, 1 * 1000);
    // Clean up function to clear setInterval when component unmounts or timer changes
    return () => {
      clearInterval(timer);
    };
  }, [updateMsg, online]); //

  return (
    <Pressable
      onPress={() => {
        setCount(0);
        //socket.off('receiveMessage');
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
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Text style={{ fontSize: 15, fontWeight: '500', color: '#000000' }}>{item?.username.length > 15 ? atob(item?.username).slice(0, 15) + "...." : atob(item?.username)}</Text>
              <Text style={{ color: lastOnlineTime === "Online" ? '#13bd54' : "#eb501c", margin: 0, padding: 0, fontSize: 12, marginLeft: 8 }}>{lastOnlineTime}</Text>
            </View>


            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Text style={{ marginTop: 4, color: 'gray' }}>
                {updateMsg ? (updateMsg?.message.length > 20 ? atob(updateMsg?.message).slice(0, 20) + "...." : atob(updateMsg?.message)) : `Start chat with ${item?.username}`}
              </Text>
              {count > 0 ?
                <View style={{ backgroundColor: "#13bd54", marginLeft: 8, height: 20, width: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 60 }}>
                  <Text style={{ color: '#FFFFFF', margin: 0, padding: 0, fontSize: 13 }}>{count}</Text>
                </View> : <></>
              }
              <Text style={{ fontSize: 12, fontWeight: '500', color: '#13d146', marginLeft: 15 }}>{timeStamp && timeStamp?.stamp}</Text>
            </View>

          </View>
        </View>

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
