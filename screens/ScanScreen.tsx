import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colours } from '../const/colours';
import { fonts } from '../const/fonts';
import { useRef, useState } from 'react';

export default function ScanScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);
    const [identified, setIdentified] = useState<string | null>(null);

    async function takePicture() {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync({
                base64: true,
                quality: 0.5,
            });
            
            if (photo?.base64) {
                try {
                    const response = await fetch('https://api.plant.id/v3/identification', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Api-Key': 'vqFIOzSdv2kZzF9vbRrfaNbczV1zw5EUqRMQMlgivh1Hme3px0',
                        },
                        body: JSON.stringify({
                            images: [photo.base64],
                            classification_level: 'species',
                        }),
                    });
                    const result = await response.json();
                    const topResult = result.result.classification.suggestions[0];
                    setIdentified(`${topResult.name} (${Math.round(topResult.probability * 100)}% confident)`);
                } catch (error) {
                    console.error('API error:', error);
                }
            }
        }
    }

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
            <CameraView style={styles.camera} facing="back" ref={cameraRef}>
                <View style={styles.overlay}>
                    <Text style={styles.instructionText}>Position the plant in the frame</Text>
                    <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                        <View style={styles.captureButtonInner} />
                    </TouchableOpacity>
                    {identified && (
                        <View style={styles.resultCard}>
                            <Text style={styles.resultText}>{identified}</Text>
                        </View>
                    )}
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

    resultCard: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 15,
        padding: 15,
        marginTop: 20,

    },

    resultText: {
        fontFamily: fonts.bodyBold,
        fontSize: 16,
        color: colours.darkGreenFill,
        textAlign: 'center',
    },
});