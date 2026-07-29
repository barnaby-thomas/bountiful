import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";
import { colours } from "../const/colours";
import { fonts } from "../const/fonts";
import { userLogin } from "../const/api";
import * as SecureStore from 'expo-secure-store';
export default function LoginScreen({ navigation }: any) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function processLogin(){
        const result = await userLogin(email, password);
        if (result?.token) {
            await SecureStore.setItemAsync('token', result.token);
            navigation.navigate('Main');
        } else {
            setError('Incorrect email or password')
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.credentialsBox}>
                <View style={styles.emailBox}>
                    <TextInput 
                        placeholder="Email..."
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.passwordBox}>
                    <TextInput 
                        placeholder="Password..."
                        value={password}
                        onChangeText={setPassword}
                        autoCapitalize="none"
                    />
                </View>
                {error !== '' && (
                    <Text style={styles.errorText}>{error}</Text>
                )}
                <TouchableOpacity style={styles.loginButton} onPress={processLogin}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
                <Text style={styles.or}>Or</Text>
                <TouchableOpacity style={styles.createAccButton}>
                    <Text style={styles.createAccText}> Create an account</Text>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
            flex: 1,
            backgroundColor: colours.background,
            justifyContent: 'center'
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

    errorText: {
        color: 'red',
        fontFamily: fonts.body,
        fontSize: 12,
        textAlign: 'center',
        margin: 5,
    },

    loginButton: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colours.darkGreenFill,
        height: 30,
        width: 100,
        borderRadius: 12,
        margin: 5,
    },

    loginText: {
        fontFamily: fonts.bodyBold,
        color: colours.white,
        fontSize: 13
    },

    or: {
        fontFamily: fonts.bodyMedium,
        fontSize: 14,
        alignSelf: 'center',
        margin: 5,
    },

    createAccButton: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colours.darkGreenFill,
        height: 30,
        width: 150,
        borderRadius: 12,
        margin: 5,
    },

    createAccText: {
        fontFamily: fonts.bodyBold,
        color: colours.white,
        fontSize: 13
    },
})