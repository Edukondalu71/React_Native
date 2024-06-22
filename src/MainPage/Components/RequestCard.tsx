import React, { useContext, useState } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { screenHeight } from "../../Utils/ScreenDimentions";
import { AceptRequest } from "../../Utils/ApiService'/getLogin";
import { AuthContext } from "../../../AuthContext";
import { useNavigation } from "@react-navigation/native";

const RequestCard = ({ userData, close }: any) => {
    console.log('RequestCard', userData);
    const username = userData?.message.split("sent friend request")[0]
    const { userId } = useContext(AuthContext);
    const [requestState, setRequestState] = useState(false);
    const [loader, setLoader] = useState(false);
    const navigation:any = useNavigation();
    const getAceptRequest = async () => {
        setLoader(true);
        let response = await AceptRequest({ userId: userId, requestId: userData?.from?.["_id"] });
        if (response?.status === 200) {
            setRequestState(true);
        }
        setLoader(false);
    }
    return (
        <View style={[requestCardStyle.container, { justifyContent: 'space-between' }]}>
            <View style={requestCardStyle.container}>
                <FontAwesome name="user-o" color="#420475" style={{ fontSize: screenHeight * 0.03, marginRight: 10 }} />
                <Text style={requestCardStyle.name}>{username}</Text>
            </View>
            <View style={requestCardStyle.container}>
                {requestState ?
                    <TouchableOpacity onPress={() => {
                        close();
                        navigation.navigate('ChatRoom', {
                            name: username,
                            receiverId: userData?.from?.["_id"],
                            //image: userData?.image,
                        })
                    }

                    } style={requestCardStyle.acept}>
                        <Text style={requestCardStyle.text}>send message</Text>
                    </TouchableOpacity> :
                    <>
                        <TouchableOpacity style={requestCardStyle.button} onPress={getAceptRequest}>
                            {loader ? <ActivityIndicator color={"#FFFFFF"} size={'small'} /> : <Text style={requestCardStyle.buttonText}>Acept</Text>}
                        </TouchableOpacity>
                        <FontAwesome onPress={() => null} name="trash-o" color="#420475" style={{ fontSize: screenHeight * 0.03, marginRight: 10 }} />
                    </>
                }
            </View>
        </View>
    )
}

const requestCardStyle = StyleSheet.create({
    container: {
        display: 'flex',
        height: 45,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0
    },
    name: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10
    },
    button: {
        height: 28,
        width: 70,
        backgroundColor: '#059efc',
        textAlign: 'center',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20
    },
    buttonText: {
        fontSize: 12,
        color: '#FFFFFF',
        fontWeight: '500'
    },
    acept: {
        backgroundColor: '#059efc',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 4

    },
    text: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 12
    }

})

export default RequestCard;