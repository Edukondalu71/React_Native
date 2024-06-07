import { StyleSheet, View, SafeAreaView, Dimensions } from "react-native";
import { screenHeight, screenWidth } from "../../Utils/ScreenDimentions";

const DrawerHeader = () => {
    return (
        <SafeAreaView style={styles.Navheader}>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    Navheader : {
        position:'absolute',
        top:0,
        height: screenHeight * 0.06,
        backgroundColor:'#000',
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
        paddingHorizontal: screenWidth * 0.05
    }
});

export default DrawerHeader;
