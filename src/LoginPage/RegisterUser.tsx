import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Dimensions, Keyboard, useColorScheme, Animated, Modal } from 'react-native';
import ProfileIcon from '../Images/profile.png';
import { LoginStyles as styles } from '../Styles/LoginStyles';
import { regUser } from '../Utils/ApiService\'/getLogin';
import { BlurView } from '@react-native-community/blur';

const RegisterUser = ({ navigation }: any) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [age, setAge] = useState('');
    const [loader, setLoader] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [pswIconState, setPswIconState] = useState(true);
    const colorScheme: any = useColorScheme();
    const [bgColor, setBgColor] = useState('#FFFFFF');
    const [color, setColor] = useState('#FFFFFF');
    const [translateValue] = useState(new Animated.Value(0));
    const [show, setShow] = useState(false);

    const handleRegister = async () => {
        setLoader(true);
        setErrorMsg(null);
        Keyboard.dismiss();
        let fetchData = await regUser({ username: username, password: password, age: age, email: email });
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
                        <Text style={{ color: color, fontSize:12, fontWeight:'700', fontStyle:'normal' }}>redirecting to login page</Text>
                    </View>
                </View>

            </Modal>
            <View style={[styles.loginContainer, { backgroundColor: bgColor }]}>
                <Animated.View style={[styles.loginBox, { height: 460 }, { transform: [{ translateY: translateValue }] }]}>
                    <Image source={ProfileIcon} style={styles.profileImage} />
                    <Text style={[styles.title, { color: color }]}>User Register</Text>
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
                            <TouchableOpacity disabled={show} onPress={() => setPswIconState(!pswIconState)} style={styles.pswicon}>
                                <Text style={styles.pswicontext}>{pswIconState ? 'Hide' : 'Show'}</Text>
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            style={styles.input}
                            placeholder="@gmail.com"
                            placeholderTextColor="gray"
                            value={email}
                            readOnly={loader}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="age(optional)"
                            keyboardType='numeric'
                            placeholderTextColor="gray"
                            value={age}
                            readOnly={loader}
                            onChangeText={(text) => setAge(text)}
                        />

                        <TouchableOpacity disabled={loader} style={[styles.button, { opacity: loader ? 0.5 : 1 }]} onPress={handleRegister}>
                            <Text style={styles.buttonText}>{loader ? 'Please wait...' : 'Register'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowcontainer}>
                        <TouchableOpacity disabled={loader} onPress={() => navigation.navigate('login')}>
                            <Text style={[styles.forgotPassword, { color: '#314ed4', fontWeight: '500' }]}>Login</Text>
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

