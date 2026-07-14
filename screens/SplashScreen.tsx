import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from "react-native";
import { colours } from "../const/colours";
import { fonts } from "../const/fonts";

export default function SplashScreen() {
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.logoHeading}>
                <Text style={styles.welcome}>WELCOME TO</Text>
                <View style={styles.logoCircle}>
                    <Text style={styles.bountifulText}>bountiful</Text>
                    <Text style={styles.tagline}>gather your garden</Text>
                </View>
                <View style={styles.infoBox}>
                    <Text style={styles.heading}>Discover what grows around you</Text>
                    <Text style={styles.info}>
                        Learn the skill of foraging through real-world exploration. 
                        Build your personal encyclopedia and share your finds with a like-minded community.
                    </Text>
                    <Text>🍄</Text>
                </View>
                <TouchableOpacity style={styles.exploreButton}>
                    <Text style={styles.exploreText}>Start Exploring</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
            flex: 1,
            backgroundColor: colours.background,
        },

    welcome: {
        alignSelf: 'center',
        fontFamily: fonts.bodyMedium,
        color: colours.greyText,
        top: 40,
    },
    
    logoHeading: {
        flex: 1,
        justifyContent: 'space-between'
    },

    logoCircle: {
        backgroundColor: colours.searchBarBackground,
        justifyContent: 'center',
        alignSelf: 'center',
        height: 200,
        width: 200,
        borderRadius: 100,
    },

    bountifulText: {
        fontFamily: fonts.bodyBold,
        fontSize: 28,
        textAlign: 'center',
        color: colours.darkGreenFill,
    },

    tagline: {
        textAlign: 'center',
        fontFamily: fonts.body,
        fontSize: 11,
        color: colours.greyText,
    },

    infoBox: {
        
        alignItems: 'center',
        marginHorizontal: 10,
        paddingHorizontal: 20,

    },

    heading: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colours.darkGreenText,
        margin: 5,
        textAlign: 'center'
        
    },

    info: {
        fontFamily: fonts.body,
        color: colours.greenText,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal: 35,
        lineHeight: 22,
    },

    exploreButton: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colours.darkGreenFill,
        height: 50,
        width: 300,
        borderRadius: 12,
    },

    exploreText: {
        fontFamily: fonts.bodyBold,
        color: colours.white,
        fontSize: 17
    },
})