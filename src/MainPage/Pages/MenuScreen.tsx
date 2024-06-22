import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    View
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwipableItem from '../Components/RowCard';
import { ThemeContext } from '../../../ThemeProvider';

const { width } = Dimensions.get('screen');
const headerHeight = 300;
const headerFinalHeight = 70;
const imageSize = (headerHeight / 3) * 2;

const DATA = [
    { id: 'header' },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 16 },
    { id: 17 },
    { id: 18 },
    { id: 19 },
    { id: 20 },
];

const MenuScreen = () => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const {bgColor} = useContext(ThemeContext);
    const [textWidth, setTextWidth] = useState(0);
    const offset = headerHeight - headerFinalHeight;
    const translateHeader = scrollY.interpolate({
        inputRange: [0, offset],
        outputRange: [0, -offset],
        extrapolate: 'clamp',
    });
    const translateImageY = scrollY.interpolate({
        inputRange: [0, offset],
        outputRange: [0, -(headerFinalHeight - headerHeight) / 2],
        extrapolate: 'clamp',
    });
    const translateImageX = scrollY.interpolate({
        inputRange: [0, offset],
        outputRange: [
            0,
            -(width / 2) + (imageSize * headerFinalHeight) / headerHeight,
        ],
        extrapolate: 'clamp',
    });
    const scaleImage = scrollY.interpolate({
        inputRange: [0, offset],
        outputRange: [1, headerFinalHeight / headerHeight],
        extrapolate: 'clamp',
    });
    const translateName = scrollY.interpolate({
        inputRange: [0, offset / 2, offset],
        outputRange: [0, 10, -width / 2 + textWidth / 2 + headerFinalHeight],
        extrapolate: 'clamp',
    });
    const scaleName = scrollY.interpolate({
        inputRange: [0, offset],
        outputRange: [1, 0.8],
        extrapolate: 'clamp',
    });
    const renderItem = ({ index }: any) => {
        if (index == 0)
            return (
                <Animated.View
                    style={[styles.header,{backgroundColor: bgColor},{ transform: [{ translateY: translateHeader }] }]}>
                    <Animated.View
                        style={[
                            styles.image,
                            {
                                transform: [
                                    { translateY: translateImageY },
                                    // { translateX: translateImageX },
                                    { scale: scaleImage },
                                ],
                            },
                        ]}>
                        <Image source={{ uri: 'https://i.ibb.co/YySxPQC/pro.jpeg' }} style={styles.img} resizeMode="cover" />
                    </Animated.View>
                    {/* <Animated.Text
                        onTextLayout={e => setTextWidth(e.nativeEvent.lines[0].width)}
                        style={[
                            styles.name,
                            { transform: [{ translateX: translateName }, { scale: scaleName }] },
                        ]}>{user}
                    </Animated.Text> */}
                </Animated.View>
            );
        return <SwipableItem />;
    };

    const [user, setUser] = useState<any>(null);
    const getData = async () => {
        let userData = await AsyncStorage.getItem('user');
        setUser(userData)
    }
    useEffect(() => {
        getData()
    })


    return (
        <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item?.id}
            style={{backgroundColor: bgColor}}
            stickyHeaderIndices={[0]}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                useNativeDriver: false,
            })}
        />
    );
}

const styles = StyleSheet.create({
    item: {
        height: 100,
        marginBottom: 5,
        backgroundColor: 'grey',
        marginHorizontal: 10,
    },
    header: {
        height: headerHeight,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: imageSize,
        width: imageSize,
        borderRadius: headerHeight,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    img: {
        height: '100%',
        width: '100%',
    },
    name: {
        fontSize: 30,
        color: '#000',
        position: 'absolute',
        bottom: 0,
        height: headerFinalHeight,
        textAlignVertical: 'center',
        letterSpacing: 2,
    },
});

export default MenuScreen