import { Text, View } from "react-native"

const NoDataCard = ({msg}:any) => {
    return (
        <View style={{height:60, justifyContent:'center', alignItems:'center'}}>
            <Text style={{color:'#000000', fontSize: 16}}>{msg}</Text>
        </View>
    )
}
export default NoDataCard;