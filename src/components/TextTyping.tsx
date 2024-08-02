import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

const AnimatedTypewriterText = ({ sentences }: any) => {
    const [animatedText, setAnimatedText] = useState('');

    useEffect(() => {
         startTypingAnimation();
    }, []);

    const startTypingAnimation = () => {
        const currentSentence = sentences;
        let index = 0;

        const typingInterval = setInterval(() => {
            setAnimatedText(prevState => prevState + currentSentence[index]);
            index++;

            if (index === currentSentence.length) {
                clearInterval(typingInterval);
                setTimeout(() => {
                    setAnimatedText('')
                    startTypingAnimation();
                }, 300);
            }
        }, 150);
    };
    return <Text style={styles.text}>{animatedText}</Text>
};

const styles = StyleSheet.create({
    text: {
        fontSize: 12,
        color: "#13d146"
    },
});

export default AnimatedTypewriterText;