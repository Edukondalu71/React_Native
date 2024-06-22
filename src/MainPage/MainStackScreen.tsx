import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./Components/DrawerContent";
import { screenHeight, screenWidth } from "../Utils/ScreenDimentions";
import { Alert, BackHandler, Button, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import UserScreen from "./Pages/UserScreen";
import ProfileScreen from "./ProfileScreen";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StoreContext } from "../../StoreContext";
import RequestCard from "./Components/RequestCard";
import ChatScreen from "./Pages/ChatScreen";
import NoDataCard from "../components/NoData";
const Drawer = createDrawerNavigator();

const Home = () => {
  const [popup, setPopup] = useState(false);
  const { usersRequests, getUserList } = useContext<any>(StoreContext);
  useEffect(() => {
    function backAction() {
      Alert.alert('Hold on!', 'Are you sure you want to go Exit ?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const [list, setList] = useState([]);

  useEffect(() => {
    setList(usersRequests);
  }, [usersRequests])

  return (
    <>
      <Modal animationType="fade" // You can change this to control how the modal animates
        transparent={true} // This makes the modal background transparent
        visible={popup}
        onRequestClose={() => setPopup(false)}>
        <View style={styles.popup}>
          <SafeAreaView style={styles.card}>
            <View style={styles.close}>
              <Text style={styles.popuptext}>Friend requests</Text>
            <Icon onPress={() => setPopup(false)} name="close" color={'#000000'} size={25} />
            </View>
            <ScrollView>
              {list && list.length > 0 ? list?.map((el: any) => <RequestCard close={() => setPopup(false)} userData={el} Key={el?.from["_id"]} />) : <NoDataCard msg={"No friend requests !"} />}
            </ScrollView>
          </SafeAreaView>
        </View>
      </Modal>
      <Drawer.Navigator initialRouteName="Users" drawerContent={props => <DrawerContent {...props} />} >
        <Drawer.Screen name="Users" component={UserScreen} options={{
          headerRight: () => (
            <Pressable onPress={() => {
              getUserList();
              setPopup(true)
            }
            } style={styles.rowContainer}>
              <Icon name="account-group" color={'#000000'} size={25} />
              {list.length > 0 && <Text style={styles.count}>{list.length}</Text>}
            </Pressable>
          ),
        }} />
        <Drawer.Screen name="chat" component={ChatScreen} options={{ headerShown: true }} />
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true }} />
      </Drawer.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: screenWidth * 0.1
  },
  count: {
    backgroundColor: '#48f531',
    height: 15,
    width: 15,
    borderRadius: 90,
    textAlign: 'center',
    marginLeft: -12,
    zIndex: 99,
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 10
  },
  popup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    //backfaceVisibility:'visible',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  card: {
    backgroundColor: '#FFFFFF',
    //minHeight: screenHeight * 0.3,
    minWidth: screenWidth * 0.9,
    maxHeight: screenHeight * 0.6,
    maxWidth: screenWidth * 0.9,
    borderRadius: 9,
    padding: 15,
    overflow: 'scroll'
  },
  close: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom: 10
  },
  popuptext: {
    fontSize : 16,
    color:'#000000',
    fontWeight:'500'
  }
});

export default Home;