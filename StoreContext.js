import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { getUsers, getUsersRequests, getFriendsList } from './src/Utils/ApiService\'/getLogin';

const StoreContext = createContext({});

const StoreContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [usersRequests, setUsersRequests] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const { userId } = useContext(AuthContext)

  const getUserList = async () => {
    getUserRequestList();
    getFriends();
    try {
      let response = await getUsers(userId);
      console.log('users', response?.data);
      setUsers(response?.data);
    } catch (error) {
      console.log('error', error?.message)
    }
  }

  const getUserRequestList = async () => {
    try {
      let response = await getUsersRequests(userId);
      console.log('usersRequests', response);
      setUsersRequests(response);
    } catch (error) {
      console.log('error', error?.message)
    }
  }

  const getFriends = async () => {
    try {
      let response = await getFriendsList(userId);
      setFriendsList(response);
      console.log('getFriendsList', response);
    } catch (error) {
      console.log('error', error?.message)
    }
  }

  useEffect(() => {
    if (userId) {
      getUserList();
      getUserRequestList();
      getFriends();
    }
  }, [userId]);

  return (
    <StoreContext.Provider value={{ users, usersRequests,friendsList, getUserRequestList, getFriends, getUserList }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreContextProvider }
