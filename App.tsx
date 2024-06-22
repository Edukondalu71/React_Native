import React from 'react';
import { AuthProvider } from './AuthContext';
import { SocketContextProvider } from './SocketContext';
import StackNavigation from './src/NavigationStack/StackNavigation';
import { ThemeProvider } from './ThemeProvider';
import { StoreContextProvider } from './StoreContext';


function App() {
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
