import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";
import { colours } from "../const/colours";
import { fonts } from "../const/fonts";
import { userRegistration } from "../const/api";
import * as SecureStore from 'expo-secure-store';

export default function RegisterScreen({ navigation } : any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    async function processRegistration() {
        const result = await userRegistration(email, password, username);
        if (!email || !password || !username) {
            setError('Please fill in all fields');
            return;
        }
        if (result?.id) {
            navigation.navigate('Login');
        } else {
            setError('Registration failed. Please try again.');
        }
    }

        return(
        <SafeAreaView style={styles.container}>
            <View style={styles.credentialsBox}>
                <TextInput 
                    placeholder="Username..."
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <TextInput 
                    placeholder="Email..."
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput 
                    placeholder="Password..."
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                {error !== '' && (
                    <Text style={styles.errorText}>{error}</Text>
                )}
                <TouchableOpacity style={styles.registerButton} onPress={processRegistration}>
                    <Text style={styles.registerText}>Create Account</Text>
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
        alignSelf: 'center',
        gap: 10,
    },
    errorText: {
        color: 'red',
        fontFamily: fonts.body,
        fontSize: 12,
        textAlign: 'center',
    },
    registerButton: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colours.darkGreenFill,
        height: 40,
        width: 200,
        borderRadius: 12,
        marginTop: 10,
    },
    registerText: {
        fontFamily: fonts.bodyBold,
        color: colours.white,
        fontSize: 14,
    },
})