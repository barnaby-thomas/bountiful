import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colours } from '../const/colours';
import { fonts } from '../const/fonts';

export default function ScanScreen() {
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        return <View style={styles.container} />;
    }

    if (!permission.granted) {
        return (
            <SafeAreaView style={styles.permissionContainer}>
                <Text style={styles.permissionText}>Bountiful needs camera access to identify plants</Text>
                <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
                    <Text style={styles.permissionButtonText}>Allow Camera</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing="back">
                <View style={styles.overlay}>
                    <Text style={styles.instructionText}>Position the plant in the frame</Text>
                    <TouchableOpacity style={styles.captureButton}>
                        <View style={styles.captureButtonInner} />
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colours.background,
    },

    permissionContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
        backgroundColor: colours.background,
    },

    permissionText: {
        fontFamily: fonts.body,
        fontSize: 16,
        textAlign: 'center',
        color: colours.greenText,
        marginBottom: 20,
    },

    permissionButton: {
        backgroundColor: colours.darkGreenFill,
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 25,
    },

    permissionButtonText: {
        fontFamily: fonts.bodyBold,
        color: colours.white,
        fontSize: 16,
    },

    camera: {
        flex: 1,
    },

    overlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 60,
    },

    instructionText: {
        fontFamily: fonts.body,
        color: colours.white,
        fontSize: 16,
    },

    captureButton: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: colours.searchBarBackground,
        alignItems: 'center',
        justifyContent: 'center',
    },

    captureButtonInner: {
        width: 75,
        height: 75,
        borderRadius: 37,
        backgroundColor: colours.white,
    },
});