import React, { useContext, useRef } from 'react';
import { Animated, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StoreContext } from '../../../StoreContext';
import { useNavigation } from '@react-navigation/native';
import Chat from './chat';

const headerHeight = 120;
export default function ChatScreen() {
    const scrollY = useRef(new Animated.Value(0)).current;
    const { friendsList } = useContext<any>(StoreContext);
    const navigation:any = useNavigation();
    return (
        <ScrollView
            contentContainerStyle={{padding:20}}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false },
            )}>
            {friendsList?.map((data: any) => <Chat key={data["_id"]} item={data} />)}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: headerHeight,
        width: '100%',
        backgroundColor: '#075E54',
        position: 'absolute',
    },
    item: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        height: 45,
        width: 45,
        borderRadius: 30,
        backgroundColor: '#ccc',
    },
    detail: {
        marginLeft: 10,
    },
    name: {
        fontSize: 15,
        color: '#000000'
    },
    description: {
        opacity: 0.7,
        color: '#000000'
    },
});