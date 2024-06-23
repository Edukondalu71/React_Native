import { NavigationContainer } from "@react-navigation/native"
import FlashScreen from "../LoginPage/FlashScreen"
import ForgotPassword from "../LoginPage/ForgotPassword"
import LoginScreen from "../LoginPage/LoginPage"
import RegisterUser from "../LoginPage/RegisterUser"
import Home from "../MainPage/MainStackScreen"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React, { useState, useLayoutEffect, useContext } from "react"
import { Linking } from "react-native"
import LibraryScreen from "../MainPage/Pages/Library"
import messaging from '@react-native-firebase/messaging';
import { AuthContext } from "../../AuthContext"
import NoDataCard from "../components/NoData"

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage?.data);
});

const StackNavigation = () => {
    const Stack = createNativeStackNavigator();
    const { userId } = useContext(AuthContext)
    const [checklogData, setCheckLogData] = useState<any>(null);
    const [loader, setLoader] = useState(true);

    const userData = async () => {
        let user = await AsyncStorage.getItem('authToken');
        setCheckLogData(user);
        setTimeout(() => {
            setLoader(false);
        }, 1000)
    }

    function buildDeepLinkFromNotificationData(data: any) {
        // name: item?.username,
        // receiverId: item?._id,
        return `myapp://ChatRoom/${data?.recieverId}`
    }


    const linking: any = {
        prefixes: ["myapp://"],
        config: {
            initialRouteName: "Home",
            screens: {
                login: 'login',
                chat: 'ChatRoom'
            },
        },
        async getInitialURL() {
            const url = await Linking.getInitialURL();
            if (typeof url === 'string') {
                return url;
            }
            //getInitialNotification: When the application is opened from a quit state.
            const message = await messaging().getInitialNotification();
            const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
            if (typeof deeplinkURL === 'string') {
                return deeplinkURL;
            }
        },
        subscribe(listener) {
            const onReceiveURL = ({ url }) => listener(url);

            // Listen to incoming links from deep linking
            const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

            //onNotificationOpenedApp: When the application is running, but in the background.
            const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
                const url = buildDeepLinkFromNotificationData(remoteMessage.data)
                if (typeof url === 'string') {
                    listener(url)
                }
            });

            return () => {
                linkingSubscription.remove();
                unsubscribe();
            };
        },
    };





    useLayoutEffect(() => {
        setLoader(true);
        userData();
    }, [userId]);

    return (
        <>
            {loader ? <FlashScreen /> :
                <NavigationContainer linking={linking} fallback={<NoDataCard msg={"Loading..."} />}>
                    <Stack.Navigator initialRouteName={checklogData ? 'Home' : "login"}>
                        <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Register" component={RegisterUser} options={{ headerShown: false }} />
                        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
                        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                        <Stack.Screen name="ChatRoom" component={LibraryScreen} options={{ headerShown: true }} />
                    </Stack.Navigator>
                </NavigationContainer>
            }
        </>
    )
}

export default StackNavigation