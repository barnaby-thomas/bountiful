import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native'
import {colours} from '../const/colours'
import {fonts} from '../const/fonts'
import {plants} from '../const/plants'

export default function MapScreen (){
    return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.headingRow}>
                        <Text style={styles.heading}>My Foraging Map</Text> 
                        <Text style={styles.heading}>🌳</Text>
                    </View>
                    <Text style={styles.spotCountText}>5 spots logged</Text>     
                </View>          
            </View>
    )
}

const styles = StyleSheet.create ({
   
    container: {
        flex: 1,
        backgroundColor: colours.background,
    },

    headerContainer: {
        paddingHorizontal: 40,
        paddingVertical: 15
    },
    
    heading: {
        fontFamily: fonts.heading,
        fontSize: 28,
        color: colours.greenText,
        marginBottom: 5
    },
    
    headingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },

    spotCountText: {
        fontFamily: fonts.bodyBold,
        color: colours.black,
    }
})