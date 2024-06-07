import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Keyboard, useColorScheme, Animated, Alert, BackHandler } from 'react-native';
import ProfileIcon from '../Images/profile.png';
import { getLogin } from '../Utils/ApiService\'/getLogin';
import { LoginStyles as styles } from '../Styles/LoginStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }: any) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loader, setLoader] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [pswIconState, setPswIconState] = useState(true);
    const colorScheme = useColorScheme();
    const [bgColor, setBgColor] = useState('#FFFFFF');
    const [color, setColor] = useState('#FFFFFF');
    const [translateValue] = useState(new Animated.Value(0));

    useEffect(() => {
        const backAction = () => {
          Alert.alert('Hold on!', 'Are you sure you want to go Exit ?', [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {text: 'YES', onPress: () => BackHandler.exitApp()},
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
        let fetchData = await getLogin({ username, password })

        if (fetchData.status === 200) {
            setErrorMsg(null);
            await AsyncStorage.setItem('user', username);
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
    };;


    useEffect(() => {
        setBgColor(colorScheme === 'dark' ? '#000000' : '#FFFFFF');
        setColor(colorScheme === 'dark' ? '#FFFFFF' : '#000000');
    }, [colorScheme])

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


    return (
        <View style={[styles.loginContainer, { backgroundColor: bgColor }]}>
            <Animated.View style={[styles.loginBox, { height: 360 }, { transform: [{ translateY: translateValue }] }]}>
                <Image source={ProfileIcon} style={styles.profileImage} />
                <Text style={[styles.title, { color: color }]}> Login </Text>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="username"
                        value={username}
                        readOnly={loader}
                        placeholderTextColor="gray"
                        onChangeText={(text) => setUsername(text)}
                    />
                    <View style={styles.pswinput}>
                        <TextInput
                            style={styles.passwordinput}
                            placeholder="password"
                            placeholderTextColor="gray"
                            value={password}
                            readOnly={loader}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={pswIconState}
                        />
                        <TouchableOpacity disabled={loader} onPress={() => setPswIconState(!pswIconState)} style={styles.pswicon}>
                            <Text style={styles.pswicontext}>{pswIconState ? 'Hide' : 'Show'}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity disabled={loader} style={[styles.button, { opacity: loader ? 0.5 : 1 }]} onPress={handleLogin}>
                        <Text style={styles.buttonText}>{loader ? 'Please wait...' : 'Submit'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowcontainer}>
                 
                    <TouchableOpacity disabled={loader} onPress={() => navigation.navigate('Register')}>
                        <Text style={[styles.forgotPassword, { color: '#314ed4', fontWeight: '500' }]}>Register</Text>
                    </TouchableOpacity>
                  
                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} disabled={loader} >
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

