import React, { useEffect } from 'react';
import { AuthProvider } from './AuthContext';
import { SocketContextProvider } from './SocketContext';
import StackNavigation from './src/NavigationStack/StackNavigation';
import { ThemeProvider } from './ThemeProvider';
import { StoreContextProvider } from './StoreContext';
import { requestUserPermission } from './src/Utils/notificationService';


function App() {
  useEffect(() => {
    requestUserPermission();
  }, [])
  return (
    <AuthProvider>
      <SocketContextProvider>
        <ThemeProvider>
          <StoreContextProvider>
            <StackNavigation />
          </StoreContextProvider>
        </ThemeProvider>
      </SocketContextProvider>
    </AuthProvider>
  );
}

export default App
