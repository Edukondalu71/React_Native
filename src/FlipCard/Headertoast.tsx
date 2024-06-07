import React, { useState } from 'react';
import { Button, LayoutAnimation, Platform, StyleSheet, Text, TextInput, UIManager, View } from 'react-native';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

let timeout:any = null;
let message = '';
export default function AlertPopupTop() {
    const [msg, setMsg] = useState('')
    const [alertVisible, setAlertVisible] = useState(false)
    const showAlert = () => {
        message = msg;
        LayoutAnimation.easeInEaseOut()
        setAlertVisible(true)
        setMsg('')
        if (timeout) { clearTimeout(timeout) }
        timeout = setTimeout(() => {
            LayoutAnimation.easeInEaseOut()
            setAlertVisible(false)
        }, 3000);
    }
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} numberOfLines={3} multiline value={msg} onChangeText={setMsg} />
            <Button title='show alert' onPress={showAlert} />
            <View style={[styles.alert, !alertVisible && { height: 1, marginTop: -1 }]}>
                <Text style={styles.msg} numberOfLines={5}>{message || 'Type something...'}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        width: '80%',
        fontSize: 18,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10
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
    }
})
