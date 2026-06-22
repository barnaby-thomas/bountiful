import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import {colours} from '../const/colours'
import {fonts} from '../const/fonts'

export default function PlantScreen(){
    return(
        <SafeAreaView style={styles.container} edges={['top']}>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: colours.background,
    },
})