import { useContext, useRef } from "react"
import { StoreContext } from "../../../StoreContext"
import { Animated, FlatList, RefreshControl, StyleSheet } from "react-native";
import UserCard from "../Components/UserCard";
import { screenHeight, screenWidth } from "../../Utils/ScreenDimentions";
import NoDataCard from "../../components/NoData";

const UserScreen = () => {
    const { users, getUserList } = useContext<any>(StoreContext);
    const scrollY = useRef(new Animated.Value(0)).current;
    return (
        <>
            {
                users.length <= 1 ? <NoDataCard msg={"New accounts not found..!"} /> :
                    <FlatList
                        style={styles.container}
                        data={[...users]}
                        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                            useNativeDriver: false,
                        })}
                        keyExtractor={item => item["_id"]}
                        renderItem={({ item, index }) => <UserCard item={item} index={index} />}
                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onRefresh={getUserList}
                            />
                        }
                    />
            }
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddd',
        paddingVertical: 5,
        height: '100%',
        width: screenWidth,
    }
});

export default UserScreen