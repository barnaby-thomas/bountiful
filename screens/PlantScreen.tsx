import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import {colours} from '../const/colours'
import {fonts} from '../const/fonts'
import CategoryPill from '../components/CategoryPill';

export default function PlantScreen(){
    return(
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.imageHeader}>
                <Text>Plant Image</Text>
            </View>
            <View style={styles.header}>
                <Text style={styles.latinNameText}>Beta vulgaris maritima</Text>
                <Text style={styles.plantName}>Sea Beet</Text>
                <View style={styles.categoryRow}>
                    <Text>Filter Pill Categories</Text>
                </View>
                <View style={styles.divider}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 0,
        backgroundColor: colours.background,
    },

    divider: {
        height: 1,
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: colours.searchBarBackground,
    },

    imageHeader: {
        height: 200,
        backgroundColor: colours.searchBarBackground,
        alignItems: 'center',
        justifyContent: 'center',
    },

    header: {
        paddingHorizontal: 30,
        paddingTop: 10,
    },

    latinNameText: {
        fontFamily: fonts.latinName,
        fontSize: 15,
        color: colours.greyText
    },

    plantName: {
        fontFamily: fonts.headingRegular,
        fontSize: 30
    },

    categoryRow: {
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingVertical: 10,
    },
})