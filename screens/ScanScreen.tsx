import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native'
import {colours} from '../const/colours'
import {fonts} from '../const/fonts'
import {plants} from '../const/plants'

export default function ScanScreen() {
    return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.heading}>Scan</Text>  
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
        marginLeft: 6,
        marginBottom: 10
    },
    
})