import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';


export async function requestUserPermission() {
    //console.log("PermissionsAndroid.RESULTS.granted", PermissionsAndroid.RESULTS.GRANTED)
    if (Platform.OS == 'android' && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        //console.log("grantedgranted", granted)
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //getFCMToken()
        } else {
            //console.log("permission denied");
            requestUserPermission();
        }
    } else {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            //console.log('Authorization status:', authStatus);
            //getFCMToken()
        } else {
            requestUserPermission();
        }
    }
}

export const getFCMToken = async () => {
    try {
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        return token;
    } catch (error) {
        //console.log("error during generating token", error?.message);
        return null
    }
}

