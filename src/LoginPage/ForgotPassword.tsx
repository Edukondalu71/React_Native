import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Keyboard, Animated } from 'react-native';
import ProfileIcon from '../Images/profile.png';
import { LoginStyles as styles } from '../Styles/LoginStyles';
import { getPassword } from '../Utils/ApiService\'/getLogin';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { ThemeContext } from '../../ThemeProvider';

const ForgotPassword = ({ navigation }: any) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<any>(null);
    const [email, setEmail] = useState<string>('');
    const [loader, setLoader] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const {color, bgColor} = useContext(ThemeContext);
    const [translateValue] = useState(new Animated.Value(0));

    const handleForgotUser = async () => {
        setLoader(true);
        setErrorMsg(null);
        Keyboard.dismiss();
        let fetchData: any = await getPassword({ username, email });
        if (fetchData.status === 200) {
            setErrorMsg(null);
            let data = await fetchData.json();
            setPassword(data?.password);
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


    return (
        <View style={[styles.loginContainer, { backgroundColor: bgColor }]}>
            <Animated.View style={[styles.loginBox, { height: 400 }, { transform: [{ translateY: translateValue }] }]}>
                <Image source={ProfileIcon} style={styles.profileImage} />
                <Text style={[styles.title, { color: color }]}>Forgot Password</Text>
                <View style={styles.form}>
                    <View style={[styles.pswinput, { marginBottom: 10 }]}>
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
                    {/* 
                    <View style={styles.pswinput}>
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
                    </View> */}

                    <View style={[styles.pswinput, { marginBottom: 10 }]}>
                        <Fontisto
                            name="email"
                            color="#420475"
                            size={23}
                            style={styles.smallIcon}
                        />
                        <TextInput
                            style={[styles.passwordinput, { width: 235 }]}
                            placeholder="@gmail.com"
                            value={email}
                            readOnly={loader}
                            placeholderTextColor="gray"
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                    <View style={[styles.pswinput, { marginBottom: 10 }]}>
                        <FontAwesome
                            name="lock"
                            color="#420475"
                            style={[styles.smallIcon, { fontSize: 18 }]}
                        />
                        <TextInput
                            style={[styles.passwordinput, { width: 235 }]}
                            placeholder="otp"
                            keyboardType='numeric'
                            value={username}
                            readOnly={loader}
                            placeholderTextColor="gray"
                            onChangeText={(text) => setUsername(text)}
                        />
                    </View>

                    <TouchableOpacity disabled={loader || Boolean(password)} style={[styles.button, { opacity: loader || Boolean(password) ? 0.5 : 1 }]} onPress={handleForgotUser}>
                        <Text style={styles.buttonText}>{loader ? 'Please wait...' : 'Find Password'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.rowcontainer, { justifyContent: 'center' }]}>
                    <TouchableOpacity disabled={loader} onPress={() => navigation.navigate('login')}>
                        <Text style={[styles.forgotPassword, { color: '#0378ff', fontWeight: '500' }]}>Login</Text>
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

export default ForgotPassword;

