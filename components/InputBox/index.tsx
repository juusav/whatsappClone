import { Entypo, FontAwesome5, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

import styles from './styles'

const InputBox = () => {

    const [message, setMessage] = useState('');

    const onMicrophonePress = () => {
        console.warn('Microphone pressed')
    }
    const onSendPress = () => {
        console.warn(`Sending: ${message}`)
    }
    const onPress = () => {
        if (!message){
            onMicrophonePress();
        }else{
            onSendPress();
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <FontAwesome5 name="laugh-beam" size={20} color='grey' style={styles.icons} />
                <TextInput 
                    style={styles.textInput} 
                    placeholder={"Type a message"}
                    multiline
                    value={message}
                    onChangeText={setMessage}
                />
                <Entypo name="attachment" size={20} color='grey' style={styles.icons} />
                {!message && <Fontisto name="camera" size={20} color='grey' style={styles.icons} />}
            </View>
            <TouchableOpacity onPress={onPress} >
                <View style={styles.bottonContainer}>
                    {!message
                        ? <MaterialCommunityIcons name="microphone" size={20} color='white' style={styles.icons} />
                        : <MaterialIcons name="send" size={20} color='white' style={styles.icons} />
                    }
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default InputBox