import { NavigationContainer } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React, { useState, useLayoutEffect, useContext, useRef } from "react"
import messaging from '@react-native-firebase/messaging';
import { AuthContext } from "../../../AuthContext";
import FlashScreen from "../../LoginPage/FlashScreen";
import ForgotPassword from "../../LoginPage/ForgotPassword";
import LoginScreen from "../../LoginPage/LoginPage";
import RegisterUser from "../../LoginPage/RegisterUser";
import Home from "../../MainPage/MainStackScreen";
import LibraryScreen from "../../MainPage/Pages/Library";

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage?.data);
});

const StackNavigation = () => {
    const Stack = createNativeStackNavigator();
    const { userId, loader } = useContext(AuthContext)

    return (
        <>
            {loader ? <FlashScreen /> :
                <NavigationContainer fallback={<FlashScreen />}>
                    <Stack.Navigator initialRouteName={userId ? 'Home' : "login"}>
                        <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Register" component={RegisterUser} options={{ headerShown: false }} />
                        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
                        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                        <Stack.Screen name="ChatRoom" component={LibraryScreen} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </NavigationContainer>
            }
        </>
    )
}

export default StackNavigation