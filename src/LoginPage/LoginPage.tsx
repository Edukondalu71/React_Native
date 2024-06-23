import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Keyboard, Animated, Alert, BackHandler } from 'react-native';
import ProfileIcon from '../Images/profile.png';
import { getLogin } from '../Utils/ApiService\'/getLogin';
import { LoginStyles as styles } from '../Styles/LoginStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { ThemeContext } from '../../ThemeProvider';
import { AuthContext } from '../../AuthContext';
import { getFCMToken } from '../Utils/notificationService';

const LoginScreen = ({ navigation }: any) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loader, setLoader] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [pswIconState, setPswIconState] = useState(true);
    const {color, bgColor} = useContext(ThemeContext);
    const [translateValue] = useState(new Animated.Value(0));
    const {setAuthUser} = useContext(AuthContext)

    useEffect(() => {
        const backAction = () => {
            Alert.alert('Hold on!', 'Are you sure you want to go Exit ?', [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'YES', onPress: () => {
                    ClearInputs();
                    BackHandler.exitApp()
                }
                },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    const handleLogin = async () => {
        setLoader(true);
        setErrorMsg(null);
        Keyboard.dismiss();
        let fcmToken = await getFCMToken();
        let fetchData = await getLogin({ username, password, fcmToken })

        if (fetchData.status === 200) {
            let response = await fetchData.json();
            setErrorMsg(null);
            await AsyncStorage.setItem('authToken', response?.token);
            await AsyncStorage.setItem('username', username);
            setAuthUser(response?.token);
            ClearInputs();
            navigation.navigate('Home');
        } else {
            if (typeof fetchData.status === 'number') {
                let errorResponse = await fetchData.json();
                setErrorMsg(errorResponse?.message);
            } else {
                setErrorMsg(fetchData);
            }
        }
        setLoader(false);
    };

    const _keyboardDidShow = () => {
        Animated.timing(translateValue, {
            toValue: -80, // Adjust this value according to your need
            duration: 260,
            useNativeDriver: true,
        }).start();
    };

    const _keyboardDidHide = () => {
        Animated.timing(translateValue, {
            toValue: 0,
            duration: 260,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            _keyboardDidShow
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            _keyboardDidHide
        );
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const ClearInputs = () => {
        setUsername('');
        setPassword('');
        setErrorMsg(null);
        setPswIconState(true);
        setLoader(false);
    }

    return (
        <View style={[styles.loginContainer, { backgroundColor: bgColor }]}>
            <Animated.View style={[styles.loginBox, { height: 360 }, { transform: [{ translateY: translateValue }] }]}>
                <Image source={ProfileIcon} style={styles.profileImage} />
                <Text style={[styles.title, { color: color }]}> Login </Text>
                <View style={styles.form}>
                    <View style={[styles.pswinput, {marginBottom:10}]}>
                        <FontAwesome
                            name="user-o"
                            color="#420475"
                            style={styles.smallIcon}
                        />
                        <TextInput
                            style={[styles.passwordinput, { width: 235 }]}
                            placeholder="username"
                            value={username}
                            readOnly={loader}
                            placeholderTextColor="gray"
                            onChangeText={(text) => setUsername(text)}
                        />
                    </View>
                    <View style={[styles.pswinput, {marginBottom:10}]}>
                        <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
                        <TextInput
                            style={[styles.passwordinput, { width: 210 }]}
                            placeholder="password"
                            placeholderTextColor="gray"
                            value={password}
                            readOnly={loader}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={pswIconState}
                        />
                        <TouchableOpacity onPress={() => setPswIconState(!pswIconState)} style={styles.pswicon}>
                            <Feather
                                name={pswIconState ? "eye-off" : "eye"}
                                color={pswIconState ? 'green' : 'red'}
                                size={16}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity disabled={loader || !username || !password} style={[styles.button, { opacity: loader || !username || !password ? 0.5 : 1 }]} onPress={handleLogin}>
                        <Text style={styles.buttonText}>{loader ? 'Please wait...' : 'Submit'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowcontainer}>

                    <TouchableOpacity disabled={loader} onPress={() => {
                        ClearInputs();
                        navigation.navigate('Register');
                    }}>
                        <Text style={[styles.forgotPassword, { color: '#314ed4', fontWeight: '500' }]}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        ClearInputs();
                        navigation.navigate('ForgotPassword');
                    }} disabled={loader} >
                        <Text style={styles.forgotPassword}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                {errorMsg &&
                    <View style={styles.errorMsgContainer}>
                        <Text style={styles.errorMsg}>{errorMsg}</Text>
                    </View>
                }
            </Animated.View>
        </View>
    );
};

export default LoginScreen;

