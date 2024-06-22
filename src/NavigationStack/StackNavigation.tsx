import { NavigationContainer } from "@react-navigation/native"
import FlashScreen from "../LoginPage/FlashScreen"
import ForgotPassword from "../LoginPage/ForgotPassword"
import LoginScreen from "../LoginPage/LoginPage"
import RegisterUser from "../LoginPage/RegisterUser"
import Home from "../MainPage/MainStackScreen"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React, { useState, useLayoutEffect, useContext, useEffect } from "react"
import { StyleSheet } from "react-native"
import LibraryScreen from "../MainPage/Pages/Library"
import ProfileScreen from "../MainPage/ProfileScreen"
import { screenWidth } from "../Utils/ScreenDimentions"
import { AuthContext } from "../../AuthContext"

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

    useLayoutEffect(() => {
        setLoader(true);
        userData();
    }, [userId]);

    return (
        <>
            {loader ? <FlashScreen /> :
                <NavigationContainer>
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
    }
});
export default StackNavigation