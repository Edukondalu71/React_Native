import React, { useEffect } from 'react';
import { AuthProvider } from './AuthContext';
import { SocketContextProvider } from './SocketContext';
import { ThemeProvider } from './ThemeProvider';
import { StoreContextProvider } from './StoreContext';
import { requestUserPermission } from './src/Utils/notificationService';
import StackNavigation from './src/Audio/NavigationStack/StackNavigation';


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
