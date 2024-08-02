import { Dimensions, StyleSheet } from "react-native";
import { screenHeight, screenWidth } from "../Utils/ScreenDimentions";

 export const LoginStyles = StyleSheet.create({
    loginContainer: {
        display: 'flex',
        height: screenHeight,
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errormsg: {
        //marginLeft: 20,
        color: 'red',
        fontSize: 10,
        fontStyle: 'normal',
        marginVertical: 2,
        marginLeft: 10
    },
    smallIcon: {
        marginRight: 10,
        fontSize: 18,
        width:18
      },     
    centeredView: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#33b857',
        height: 80,
        width: 275,
        borderRadius: 5,
        shadowColor: '#b6a9a9',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10,
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      },
    
    loginBox: {
        width: 350,
        // height: 360,
        //backgroundColor: '#fff', //'#d6d6d6',
        borderRadius: 10,
        shadowColor: '#b6a9a9',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10,
        alignItems: 'center',
        backfaceVisibility: 'hidden',
    },
    alert: {
        position: 'absolute',
        top: 0,
        backgroundColor: 'green',
        width: '100%',
        overflow: 'hidden'
    },
    msg: {
        margin: 10,
        marginHorizontal: 20,
        color: '#fff'
    },
    profileImage: {
        width: 80,
        height: 80,
    },
    title: {
        fontSize: 18,
        marginBottom: 15,
        //color: '#8f8888',
    },
    form: {
        //marginLeft: 40,
    },
    input: {
        width: 280,
        marginBottom: 15,
        height: 40,
        padding: 0,
        paddingLeft: 10,
        margin: 0,
        color: '#000',
        backgroundColor: '#fff',
        fontSize: 16,
        borderRadius: 4,
        borderBottomWidth: 1.5,
        borderColor: '#d6d6d6',
        shadowColor: '#babecc',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 15,
    },
    pswinput: {
        width: 280,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'center',
        marginBottom: 2,
        height: 40,
        padding: 0,
        paddingLeft: 10,
        margin: 0,
        backgroundColor: '#fff',
        borderBottomWidth: 1.5,
        borderRadius: 4,
        borderColor: '#d6d6d6',
        shadowColor: '#babecc',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 15,
    },
    passwordinput: {
        //width: 235,
        height: 40,
        fontSize: 16,
        padding: 0,
        margin:0,
        color:'#000000'
    },
    pswicon: {
        width: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        backfaceVisibility: 'hidden',
      },
      cardBack: {
        position: 'absolute',
      },
    pswicontext: {
        fontSize: 10,
        color: '#000',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    button: {
        width: 280,
        height: 35,
        borderRadius: 4,
        backgroundColor: '#0331ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#babecc',
        shadowOffset: {
            width: -5,
            height: -5,
        },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    forgotPassword: {
        //marginLeft: '41%',
        color: '#8f8888',
        fontSize: 16,
        fontWeight: '500',
        textDecorationLine: 'underline',
    },
    errorMsgContainer: {
        marginVertical: 15,
        maxWidth: screenWidth * 0.8, 

    },
    errorMsg: {
        fontSize: 14,
        fontStyle: 'normal',
        color: '#ff0303'
    },
    rowcontainer: {
        display: 'flex',
        width: 280,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});