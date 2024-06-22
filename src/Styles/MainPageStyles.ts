import { StyleSheet } from "react-native";
import { screenHeight, screenWidth } from "../Utils/ScreenDimentions";

export const ProfileStyles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
    },
    errormsg: {
        //marginLeft: 20,
        color: 'red',
        fontSize: 10,
        fontStyle: 'normal',
        marginVertical: 2,
        marginLeft: 10
    },
    textSign: {
        fontSize: 15,
        color: 'white',
    },
    smallIcon: {
        marginRight: 10,
        fontSize: 24,
    },
    logoContainer: {
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: 120,
        width: 120,
        //marginTop: 10,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
    },
    action: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        //marginBottom: 5,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor:'#FFFFFF'
    },
    textInput: {
        flex: 1,
        margin: 0,
        padding: 0,
        paddingLeft: 4,
        color:'#000000'
    },
    loginContainer: {
        //backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    header: {
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    },
    text_header: {
        color: '#420475',
        fontWeight: 'bold',
        fontSize: 30,
    },
    button: {
        alignItems: 'center',
        width: screenWidth,
        //marginTop: -20,
        textAlign: 'center',
        //margin: 20,
    },
    inBut: {
        width: screenWidth * 0.9,
        backgroundColor: '#420475',
        alignItems: 'center',
        padding: 8,
        marginTop: 10,
        borderRadius: 5,
        marginVertical: 10
    },
    inBut2: {
        backgroundColor: '#420475',
        height: 65,
        width: 65,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomButton: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    smallIcon2: {
        fontSize: 40,
    },
    bottomText: {
        color: 'black',
        fontSize: 12,
        fontWeight: '600',
        marginTop: 5,
    },
})