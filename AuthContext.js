import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { createContext, useState, useLayoutEffect, useEffect } from 'react';
import { isLogin } from './src/Utils/ApiService\'/getLogin';
import { Alert, BackHandler } from 'react-native';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [loader, setLoader] = useState(true);

  const backAction = (msg) => {
    Alert.alert(`${msg}`, 'Try Again ?', [
      {
        text: 'Cancel',
        onPress: () => {
          BackHandler.exitApp();
        },
        style: 'cancel',
      },
      {
        text: 'YES', onPress: () => {
          fetchUser();
        }
      }
    ]);
    return true;
  }

  const fetchUser = async () => {
    setLoader(true);
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      const username = await AsyncStorage.getItem('username');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      let response = await isLogin(userId);
      console.log("response", response);
      if (response === 200) {
        setUserId(userId);
        setToken(token);
        setUser(username);
        setLoader(false);
      } else if (response === 203) {
        await AsyncStorage.clear();
        setLoader(false);
      } else {
        backAction(response?.data);
      }
    } else {
      setLoader(false);
      setUser(null);
      setUserId(null);
    }
  };

  useEffect(() => {
     fetchUser();
  }, [authUser])

  // useLayoutEffect(() => {
  //   fetchUser();
  // }, []);

  return (
    <AuthContext.Provider value={{ token, user, loader, userId, setToken, setUserId, authUser, setAuthUser, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
