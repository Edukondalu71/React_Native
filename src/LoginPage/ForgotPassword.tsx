import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Keyboard, useColorScheme, Animated } from 'react-native';
import ProfileIcon from '../Images/profile.png';
import { LoginStyles as styles } from '../Styles/LoginStyles';
import { getPassword } from '../Utils/ApiService\'/getLogin';

const ForgotPassword = ({ navigation }: any) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<any>(null);
    const [email, setEmail] = useState<string>('');
    const [loader, setLoader] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const colorScheme = useColorScheme();
    const [bgColor, setBgColor] = useState('#FFFFFF');
    const [color, setColor] = useState('#FFFFFF');
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
            <Animated.View style={[styles.loginBox, { height: password ? 400 : 360 }, { transform: [{ translateY: translateValue }] }]}>
                <Image source={ProfileIcon} style={styles.profileImage} />
                <Text style={[styles.title, { color: color }]}>Forgot Password</Text>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your username"
                        value={username}
                        readOnly={loader}
                        placeholderTextColor="gray"
                        onChangeText={(text) => setUsername(text)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Enter your gmail id"
                        placeholderTextColor="gray"
                        value={email}
                        readOnly={loader}
                        onChangeText={(text) => setEmail(text)}
                    />

                    {password &&
                        <TextInput
                            style={styles.input}
                            placeholder="password"
                            value={password}
                            readOnly={true}
                            placeholderTextColor="gray"
                            onChangeText={(text) => setUsername(text)}
                        />
                    }


                    <TouchableOpacity disabled={loader || Boolean(password)} style={[styles.button, { opacity: loader || Boolean(password) ? 0.5 : 1 }]} onPress={handleForgotUser}>
                        <Text style={styles.buttonText}>{loader ? 'Please wait...' : 'Find Password'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowcontainer}>
                    <TouchableOpacity disabled={loader} onPress={() => navigation.navigate('login')}>
                        <Text style={[styles.forgotPassword, { color: '#314ed4', fontWeight: '500' }]}>Login</Text>
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

