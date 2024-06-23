import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { AuthContext } from './AuthContext';
import { BASE_URL } from './src/Utils/ApiService\'/BaseUrl';

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { userId } = useContext(AuthContext);
  useEffect(() => {
    if (userId) {
      const socket = io(BASE_URL, {
        query: {
          userId: userId,
        },
      });
      setSocket(socket);
    } 
    // else {
    //   if (socket) {
    //     socket.close();
    //     setSocket(null);
    //   }
    // }
  }, [userId]);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
