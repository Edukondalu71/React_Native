import React, { useLayoutEffect, useState } from 'react';
import LoginScreen from './src/LoginPage/LoginPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/MainPage/MainStackScreen';
import RegisterUser from './src/LoginPage/RegisterUser';
import ForgotPassword from './src/LoginPage/ForgotPassword';
import FlashScreen from './src/LoginPage/FlashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';


function App() {
  const Stack = createNativeStackNavigator();
  const [checklogData, setCheckLogData] = useState<any>(null);
  const [loader, setLoader] = useState(true);

  const userData = async () => {
    let user = await AsyncStorage.getItem('user');
    setCheckLogData(user);
    setTimeout(() => {
      setLoader(false);
    }, 1000)

  }

  useLayoutEffect(() => {
    userData()
  }, [])


  return (
    <>
      {
        loader ? <FlashScreen /> :
          <NavigationContainer>
            <Stack.Navigator initialRouteName={checklogData ? 'Home' : "login"}>
              <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Register" component={RegisterUser} options={{ headerShown: false }} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
              <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
      }
    </>

  );
}

export default App
