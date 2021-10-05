import { StyleSheet } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
    container: {padding: 10},
    messageBox: {
        borderRadius: 5,
        padding: 10
    },
    name: {color: Colors.light.tint, fontWeight: "bold", marginBottom: 5},
    message: {},
    time: {alignSelf: "flex-end", color: "grey"}
});

export default styles;