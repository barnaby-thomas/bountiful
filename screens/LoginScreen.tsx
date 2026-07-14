import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";
import { colours } from "../const/colours";
import { fonts } from "../const/fonts";

export default function LoginScreen() {
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.credentialsBox}>
                <View style={styles.emailBox}>
                    <TextInput 
                        placeholder="Email..."
                    />
                </View>
                <View style={styles.passwordBox}>
                    <TextInput 
                        placeholder="Password..."
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
            flex: 1,
            backgroundColor: colours.background,
        },

    credentialsBox: {
        
        width: 300,
        height: 200,
        alignSelf: 'center',
        borderRadius: 20,
    },

    emailBox: {
        backgroundColor: colours.searchBarBackground,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 5
    },

    passwordBox: {
        backgroundColor: colours.searchBarBackground,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 5
    },
})