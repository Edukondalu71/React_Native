import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import NetInfo from "@react-native-community/netinfo";

const NetInfoConnection = () => {
    const [connectionStatus, setConnectionStatus] = useState(false);
    const [connectionType, setConnectionType] = useState(null);
    const [connectionNetReachable, setConnectionNetReachable] = useState(false);
    const [connectionWifiEnabled, setConnectionWifiEnabled] = useState(false);
    const [connectionDetails, setConnectionDetails] = useState(null);

    const handleConnectivityChange = (state: any) => {
        setConnectionStatus(state.isConnected);
        setConnectionType(state.type);
        setConnectionNetReachable(state.isInternetReachable);
        setConnectionWifiEnabled(state.isWifiEnabled);
        setConnectionDetails(state.details);
    };

    useEffect(() => {
        NetInfo.addEventListener(handleConnectivityChange);
        // Clean up listener when component unmounts
        return () => {
            //NetInfo.removeEventListener(handleConnectivityChange);
        };
    }, []); // Empty dependency array ensures this effect runs only once on component mount

    return (
        <View>
            <Text>Connection Status: {connectionStatus ? 'Connected' : 'Disconnected'}</Text>
            <Text>Connection Type: {connectionType}</Text>
            <Text>Internet Reachable: {connectionNetReachable ? 'Yes' : 'No'}</Text>
            <Text>WiFi Enabled: {connectionWifiEnabled ? 'Yes' : 'No'}</Text>
            <Text>Connection Details: {JSON.stringify(connectionDetails)}</Text>
        </View>
    );
}

export default NetInfoConnection