import {View, Text, StyleSheet} from 'react-native'
import {colours} from '../const/colours'
import {fonts} from '../const/fonts'

export default function EncyclopediaScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>My Plants</Text>
        </View>
    )
}

const styles = ({
    container: {
        flex: 1,
        backgroundColour: colours.background,
        padding: 20
    },
    heading: {
        flex: 1,
        fontFamily: fonts.heading,
        fontSize: 28,
        colour: colours.greenText
    },
})