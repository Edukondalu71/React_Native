import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState('');
  const [authUser, setAuthUser] = useState(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const username = await AsyncStorage.getItem('username');
      const decodedToken = jwtDecode(token);
      setToken(token);
      setUser(username);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ token,user, userId, setToken, setUserId, authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
