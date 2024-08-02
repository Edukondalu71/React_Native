import React, { useState, useEffect, useContext } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { ThemeContext } from '../../ThemeProvider';

const random = () => (parseInt(Math.random() * 255));
const randomColor = () => 'rgb(' + random() + ',' + random() + ',' + random() + ')'
const size = 30;
const dim = 90;

const Loader1 = () => {
    const animation = useState(new Animated.Value(0))[0];
    const { bgColor } = useContext(ThemeContext);

    useEffect(() => {
        const animationLoop = Animated.loop(
            Animated.timing(animation, {
                toValue: 1,
                duration: 2500,
                easing: Easing.linear,
                useNativeDriver: true
            })
        ).start();
    }, []);

    const inputRange = [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1];
    const left1 = animation.interpolate({
        inputRange, outputRange: [0, dim - size, dim - size, 0, 0, 0, dim - size, dim - size, 0]
    })
    const top1 = animation.interpolate({
        inputRange, outputRange: [0, 0, dim - size, dim - size, 0, dim - size, dim - size, 0, 0]
    })
    const left2 = animation.interpolate({
        inputRange, outputRange: [dim - size, 0, 0, dim - size, dim - size, dim - size, 0, 0, dim - size]
    })
    const top2 = animation.interpolate({
        inputRange, outputRange: [dim - size, dim - size, 0, 0, dim - size, 0, 0, dim - size, dim - size]
    })
    const left3 = animation.interpolate({
        inputRange, outputRange: [0, 0, dim - size, dim - size, 0, dim - size, dim - size, 0, 0]
    })
    const top3 = animation.interpolate({
        inputRange, outputRange: [dim - size, 0, 0, dim - size, dim - size, dim - size, 0, 0, dim - size]
    })
    const left4 = animation.interpolate({
        inputRange, outputRange: [dim - size, dim - size, 0, 0, dim - size, 0, 0, dim - size, dim - size]
    })
    const top4 = animation.interpolate({
        inputRange, outputRange: [0, dim - size, dim - size, 0, 0, 0, dim - size, dim - size, 0]
    })
    const angleValue = animation.interpolate({
        inputRange: [0, 1], outputRange: ['0deg', '720deg']
    })
    const backgroundColor = randomColor();

    return (
        <View style={[styles.container, {  }]}>
            <View style={{ width: dim, height: dim }}>
                <Animated.View style={{ ...styles.item, backgroundColor, transform: [{ translateX: left1 }, { translateY: top1 }, { rotate: angleValue }] }} />
                <Animated.View style={{ ...styles.item, backgroundColor, transform: [{ translateX: left2 }, { translateY: top2 }, { rotate: angleValue }] }} />
                <Animated.View style={{ ...styles.item, backgroundColor, transform: [{ translateX: left3 }, { translateY: top3 }, { rotate: angleValue }] }} />
                <Animated.View style={{ ...styles.item, backgroundColor, transform: [{ translateX: left4 }, { translateY: top4 }, { rotate: angleValue }] }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#000000" },
    item: { width: size, height: size, position: 'absolute', shadowColor: '#FFFFFF',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 15,
        elevation: 3, }
});

export default Loader1;