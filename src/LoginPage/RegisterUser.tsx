import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Dimensions, Keyboard, useColorScheme, Animated, Modal, ActivityIndicator } from 'react-native';
import ProfileIcon from '../Images/profile.png';
import { LoginStyles as styles } from '../Styles/LoginStyles';
import { isValidUserName, regUser } from '../Utils/ApiService\'/getLogin';
import { BlurView } from '@react-native-community/blur';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Error from 'react-native-vector-icons/MaterialIcons';
import { debounce, handleEmail, handleMobile, handleName, handlePassword } from './Utils';
import { ThemeContext } from '../../ThemeProvider';
import { getFCMToken } from '../Utils/notificationService';

const RegisterUser = ({ navigation }: any) => {
    const [username, setUsername] = useState<any>(null);
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<any>(null);
    const [mobileNumber, setMobileNumber] = useState('');
    const [loader, setLoader] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [pswIconState, setPswIconState] = useState(true);
    const { color, bgColor } = useContext(ThemeContext);
    const colorScheme = useColorScheme();
    const [translateValue] = useState(new Animated.Value(0));
    const [show, setShow] = useState(false);
    const [nameApires, setNameApiRes] = useState('');

    const handleRegister = async () => {
        setLoader(true);
        setErrorMsg(null);
        Keyboard.dismiss();
        const fcmToken = await getFCMToken();
        //console.log('fcmToken', fcmToken);
        let fetchData = await regUser({ username, password, mobileNumber, email, fcmToken });
        if (fetchData.status === 200) {
            setErrorMsg(null);
            setShow(true);
            setTimeout(() => {
                setShow(false);
                navigation.navigate('login');
            }, 3000)
        } else {
            if (typeof fetchData.status === 'number') {
                let errorResponse = await fetchData.json();
                setErrorMsg(errorResponse?.message);
            } else {
                setErrorMsg(fetchData);
            }
            setLoader(false);
        }
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

    const [userNameState, setUserNameState] = useState<any>('initial');
    const [userPasswordState, setUserPasswordState] = useState<any>('initial');
    const [userEmaiState, setUserEmailState] = useState<any>('initial');
    const [userMobileState, setUserMobileState] = useState<any>('initial');

    const [nameLoader, setNameLoader] = useState(false);
    const checkUserNameValid = async (user: string) => {
        if (user.length >= 3 && !nameLoader) {
            setNameApiRes('');
            setNameLoader(true);
            //console.log(user, username);
            let response = await isValidUserName(user);
            let msg = response;
            //console.log('res', msg);
            if (response?.data == "OK") {
                setUserNameState(true);
                setNameApiRes('')
            }
            else {
                setNameApiRes(response?.data);
                setUserNameState(false);
            }
        } else {
            setNameApiRes('name should be minimum of 3 characters');
            setUserNameState(false);
        }
        setNameLoader(false);
    }

    const DebounceFunction = (user: string) => {
        let timeoutId: NodeJS.Timeout;
        clearTimeout(timeoutId);
        if (user.length >= 3) {
            timeoutId = setTimeout(() => {
                checkUserNameValid(user);
            }, 500);
        } else {
            clearInterval(timeoutId);
            setUserNameState(false);
            setNameApiRes('name should be minimum of 3 characters')
        }
    }

    //const debouncedHandleTextInput = debounce(checkUserNameValid, 1000);

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={show}
                onRequestClose={() => null} >
                <BlurView
                    style={styles.absolute}
                    blurType={colorScheme} // 'light' or 'dark'
                    blurAmount={6} // Adjust blur amount as needed
                    reducedTransparencyFallbackColor="white" // Fallback color for devices that don't support blur
                />
                <View style={styles.loginContainer}>
                    <View style={styles.centeredView}>
                        <Text style={[styles.title, { color: color }]}>User Register Successfully !</Text>
                        <Text style={{ color: color, fontSize: 12, fontWeight: '700', fontStyle: 'normal' }}>redirecting to login page</Text>
                    </View>
                </View>

            </Modal>
            <View style={[styles.loginContainer, { backgroundColor: bgColor }]}>
                <Animated.View style={[styles.loginBox, { height: 460 }, { transform: [{ translateY: translateValue }] }]}>
                    <Image source={ProfileIcon} style={styles.profileImage} />
                    <Text style={[styles.title, { color: color }]}>Register</Text>
                    <View style={styles.form}>
                        <View style={styles.pswinput}>
                            <FontAwesome
                                name="user-o"
                                color="#420475"
                                style={styles.smallIcon}
                            />
                            <TextInput
                                style={[styles.passwordinput, { width: 215 }]}
                                placeholder="username"
                                value={username}
                                //onBlur={() => setUserNameState(handleName(username))}
                                readOnly={loader}
                                // onBlur={() => DebounceFunction(username)}
                                placeholderTextColor="gray"
                                onChangeText={(text) => {
                                    setUsername(text);
                                    DebounceFunction(text);
                                }}
                            />
                            {username !== null ?
                                nameLoader ?
                                    <ActivityIndicator size={'small'} color={'#0378ff'} /> :
                                    userNameState && userNameState !== 'initial' ?
                                        <Feather name="check-circle" color="green" size={18} /> :
                                        <Error name="error" color="red" size={18} /> :
                                null}
                        </View>
                        <Text style={[styles.errormsg, { opacity: userNameState === 'initial' && !userPasswordState ? 0 : 1 }]}>{nameApires}</Text>

                        <View style={styles.pswinput}>
                            <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
                            <TextInput
                                style={[styles.passwordinput, { width: 210 }]}
                                placeholder="password"
                                placeholderTextColor="gray"
                                value={password}
                                onBlur={() => setUserPasswordState(handlePassword(password))}
                                readOnly={loader}
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry={pswIconState}
                            />
                            <TouchableOpacity onPress={() => setPswIconState(!pswIconState)} style={styles.pswicon}>
                                <Feather
                                    name={pswIconState ? "eye-off" : "eye"}
                                    color={userPasswordState ? 'green' : 'red'}
                                    size={16}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.errormsg, { opacity: userPasswordState !== 'initial' && !userPasswordState ? 1 : 0 }]}>
                            Uppercase, Lowercase, Number and 6 or more characters.
                        </Text>

                        <View style={styles.pswinput}>
                            <Fontisto
                                name="email"
                                color="#420475"
                                size={23}
                                style={styles.smallIcon}
                            />
                            <TextInput
                                style={[styles.passwordinput, { width: 215 }]}
                                placeholder="@gmail.com"
                                value={email}
                                readOnly={loader}
                                placeholderTextColor="gray"
                                onBlur={() => setUserEmailState(handleEmail(email))}
                                onChangeText={(text) => setEmail(text)}
                            />
                            {userEmaiState !== 'initial' && !userEmaiState ? <Error name="error" color="red" size={18} /> : <Feather name="check-circle" color="green" size={18} />}
                        </View>

                        <Text style={[styles.errormsg, { opacity: userEmaiState !== 'initial' && !userEmaiState ? 1 : 0 }]}>Enter Proper Email Address</Text>

                        <View style={styles.pswinput}>
                            <FontAwesome
                                name="mobile"
                                color="#420475"
                                style={[styles.smallIcon, { fontSize: 26 }]}
                            />
                            <TextInput
                                style={[styles.passwordinput, { width: 215 }]}
                                placeholder="mobile number"
                                keyboardType='numeric'
                                value={mobileNumber}
                                readOnly={loader}
                                placeholderTextColor="gray"
                                onBlur={() => setUserMobileState(handleMobile(mobileNumber))}
                                onChangeText={(text) => setMobileNumber(text)}
                            />
                            {userMobileState !== 'initial' && !userMobileState ? <Error name="error" color="red" size={18} /> : <Feather name="check-circle" color="green" size={18} />}
                        </View>

                        <Text style={[styles.errormsg, { opacity: userMobileState !== 'initial' && !userMobileState ? 1 : 0 }]}>
                            Please enter valid 10 digits mobile number
                        </Text>

                        <TouchableOpacity disabled={loader} style={[styles.button, { opacity: loader ? 0.5 : 1 }]} onPress={handleRegister}>
                            <Text style={styles.buttonText}>{loader ? 'Please wait...' : 'Register'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.rowcontainer, { justifyContent: 'center' }]}>
                        <TouchableOpacity disabled={loader} onPress={() => navigation.navigate('login')}>
                            <Text style={[styles.forgotPassword, { color: '#0378ff', fontWeight: '500' }]}>Login</Text>
                        </TouchableOpacity>
                        <View></View>
                    </View>

                    {errorMsg &&
                        <View style={styles.errorMsgContainer}>
                            <Text style={styles.errorMsg}>{errorMsg}</Text>
                        </View>
                    }
                </Animated.View>
            </View>
        </>
    );
};

export default RegisterUser;

