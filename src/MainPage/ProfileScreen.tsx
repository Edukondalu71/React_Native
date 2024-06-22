import { useContext, useEffect, useState } from 'react';
import { ScrollView, View, Image, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, ActivityIndicator } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Error from 'react-native-vector-icons/MaterialIcons';
import { screenHeight } from '../Utils/ScreenDimentions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteUser, getUserdata, updateUser } from '../Utils/ApiService\'/getLogin';
import { useNavigation } from '@react-navigation/native';
import { ProfileStyles as styles } from '../Styles/MainPageStyles';
import { ThemeContext } from '../../ThemeProvider';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [nameVerify, setNameVerify] = useState(true);
    const [email, setEmail] = useState('');
    const [emailVerify, setEmailVerify] = useState(true);
    const [mobile, setMobile] = useState('');
    const [mobileVerify, setMobileVerify] = useState(true);
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState(true);
    const [showPassword, setShowPassword] = useState(true);
    const { color, bgColor } = useContext(ThemeContext);

    const handleName = (e) => {
        const nameVar = e.nativeEvent.text;
        setName(nameVar);
        setNameVerify(false);

        if (nameVar.length > 1) {
            setNameVerify(true);
        }
    }
    const handleEmail = (e) => {
        const emailVar = e.nativeEvent.text;
        setEmail(emailVar);
        setEmailVerify(false);
        if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar)) {
            setEmail(emailVar);
            setEmailVerify(true);
        }
    }
    const handleMobile = (e) => {
        const mobileVar = e.nativeEvent.text;
        setMobile(mobileVar);
        setMobileVerify(false);
        if (/[6-9]{1}[0-9]{9}/.test(mobileVar)) {
            setMobile(mobileVar);
            setMobileVerify(true);
        }
    }
    const handlePassword = (e) => {
        const passwordVar = e.nativeEvent.text;
        setPassword(passwordVar);
        setPasswordVerify(false);
        if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passwordVar)) {
            setPassword(passwordVar);
            setPasswordVerify(true);
        }
    }

    const [userData, setUserData] = useState<any>(null)
    const navigation = useNavigation();
    const [msg, setMsg] = useState('');
    const [delLoader, setDelLoader] = useState(false);
    const [updateLoader, setUpdateLoader] = useState(false);

    const getUserData = async () => {
        let name: any = await AsyncStorage.getItem('user');
        let response = await getUserdata(name);
        console.log('@7', response)
        setMobile(userData ? userData?.age : '');
        setEmail(userData ? userData?.email : '');
        setName(userData ? userData?.name : '');
        setPassword(userData ? userData?.password : '');
        setUserData(response?.data);
    }

    const Logout = async () => {
        setDelLoader(true);
        setMsg('');
        let name: any = await AsyncStorage.getItem('user');
        let response = await deleteUser({ name });
        let resJson = await response.json();
        if (response?.status === 200) {
            setMsg(resJson?.message);
            setDelLoader(false);
            await AsyncStorage.clear();
            setTimeout(() => {
                navigation.navigate('login');
            }, 1000)
        } else {
            setMsg(resJson?.message);
            setDelLoader(false);
        }

    }

    const updateDetails = async () => {
        setUpdateLoader(true);
        setMsg('');
        let response = await updateUser({ name, email, age: mobile, password });
        let responseJson = await response.json();
        console.log(responseJson);
        setMsg(responseJson?.message);
        setUpdateLoader(false);
    }


    // useEffect(() => {
    //      getUserData();
    // }, [])


    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: '#ddd' }}
        >
            <View style={{ marginTop: screenHeight * 0.05 }}>
                {/* <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../Images/profile.png')} />
                </View> */}
                <View style={styles.loginContainer}>
                    {/* <Text style={styles.text_header}>Register!!!</Text> */}
                    <View style={[styles.action, { borderColor: color }]}>
                        <FontAwesome name="user-o" color="#420475" style={styles.smallIcon} />
                        <TextInput
                            placeholder="Name"
                            style={[styles.textInput, { opacity: 0.5 }]}
                            placeholderTextColor="gray"
                            onChange={e => handleName(e)}
                            value={name}
                            readOnly
                        />
                    </View>
                    <Text style={[styles.errormsg, { opacity: 0 }]}>Enter Proper Email Address</Text>
                    <View style={[styles.action, { borderColor: color }]}>
                        <Fontisto name="email" color="#420475" size={24} style={{ marginLeft: 0, paddingRight: 5 }} />
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="gray"
                            style={[styles.textInput]}
                            value={email}
                            onChange={e => handleEmail(e)}
                        />
                        {emailVerify ? (
                            <Feather name="check-circle" color="green" size={20} />
                        ) : (
                            <Error name="error" color="red" size={20} />
                        )}
                    </View>

                    <Text style={[styles.errormsg, { opacity: !emailVerify ? 1 : 0 }]}>Enter Proper Email Address</Text>

                    <View style={[styles.action, { borderColor: color }]}>
                        <FontAwesome name="mobile" color="#420475" size={35} style={{ paddingRight: 10, marginTop: -7, marginLeft: 5 }} />
                        <TextInput
                            placeholder="Mobile"
                            placeholderTextColor="gray"
                            style={[styles.textInput]}
                            keyboardType='numeric'
                            value={mobile}
                            onChange={e => handleMobile(e)}
                            maxLength={10}
                        />
                        {mobileVerify ? (
                            <Feather name="check-circle" color="green" size={20} />
                        ) : (
                            <Error name="error" color="red" size={20} />
                        )}
                    </View>

                    <Text style={[styles.errormsg, { opacity: !mobileVerify ? 1 : 0 }]}>
                        Phone number with 6-9 and remaing 9 digit with 0-9
                    </Text>

                    <View style={[styles.action, { borderColor: color }]}>
                        <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="gray"
                            style={[styles.textInput]}
                            onChange={e => handlePassword(e)}
                            value={password}
                            secureTextEntry={showPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Feather
                                name={showPassword ? "eye-off" : "eye"}
                                color={passwordVerify ? 'green' : 'red'}
                                size={20}
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.errormsg, { opacity: !passwordVerify ? 1 : 0 }]}>
                        Uppercase, Lowercase, Number and 6 or more characters.
                    </Text>

                </View>
                <View style={styles.button}>
                    <TouchableOpacity style={[styles.inBut]} onPress={updateDetails}>
                        {updateLoader ? <ActivityIndicator size={'small'} /> : <Text style={styles.textSign}>Update</Text>}
                    </TouchableOpacity>
                </View>

                <View style={[styles.button]}>
                    <TouchableOpacity onPress={Logout} style={[styles.inBut, { backgroundColor: 'red' }]}>
                        {delLoader ? <ActivityIndicator size={'small'} /> : <Text style={styles.textSign}>Delete Account</Text>}
                    </TouchableOpacity>
                </View>
                {msg && <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'red' }}>{msg}</Text>
                </View>
                }
            </View>
        </ScrollView>
    );
}

export default ProfileScreen;