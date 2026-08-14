import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { BlurView } from 'expo-blur';
import { colours } from '../const/colours';
import { fonts } from '../const/fonts';
import { saveSpot, fetchSpots } from '../const/api';

export default function MapScreen() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [spots, setSpots] = useState<any[]>([]);
    const [mapMode, setMapMode] = useState<'my' | 'community'>('my'); // community map feature to be added
    const [showModal, setShowModal] = useState(false);
    const [spotNotes, setSpotNotes] = useState('');

    const userId = 1; // to be replaced with real user id after auth

    useEffect(() => {
        async function getLocation() {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                setPermissionGranted(true);
                const currentLocation = await Location.getCurrentPositionAsync({});
                setLocation(currentLocation);
            }
        }
        getLocation();
        loadSpots();
    }, []);

    async function loadSpots() {
        const data = await fetchSpots(userId);
        setSpots(data);
    }

    function addSpot() {
        setShowModal(true);
    }

    async function confirmSpot() {
        if (!location) return;
        await saveSpot(
            userId,
            location.coords.latitude,
            location.coords.longitude,
            spotNotes
        );
        setSpotNotes('');
        setShowModal(false);
        loadSpots();
    }

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {permissionGranted && location ? (
                <MapView
                    style={styles.map}
                    showsUserLocation={true}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    {spots.map(spot => (
                        <Marker
                            key={spot.id}
                            coordinate={{
                                latitude: parseFloat(spot.latitude),
                                longitude: parseFloat(spot.longitude),
                            }}
                            title={spot.notes}
                            pinColor={colours.darkGreenFill}
                        />
                    ))}
                </MapView>
            ) : (
                <View style={styles.mapPlaceholder}>
                    <Text>Waiting for location permission...</Text>
                </View>
            )}
            <BlurView intensity={60} tint="light" style={styles.headerContainer}>
                <View style={styles.headingRow}>
                    <Text style={styles.heading}>My Foraging Map</Text> 
                    <Text style={styles.heading}>🌳</Text>
                </View>
                <Text style={styles.spotCountText}>{spots.length} spots logged</Text>     
            </BlurView>
            <TouchableOpacity style={styles.addButton} onPress={addSpot}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
            <Modal
                visible={showModal}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Log Foraging Spot</Text>
                        <Text style={styles.modalSubtitle}>📍 Your current location will be saved</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Add a note... (e.g. Wild garlic patch)"
                            value={spotNotes}
                            onChangeText={setSpotNotes}
                            multiline
                        />
                        <TouchableOpacity style={styles.modalConfirm} onPress={confirmSpot}>
                            <Text style={styles.modalConfirmText}>Log Spot</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalCancel} onPress={() => setShowModal(false)}>
                            <Text style={styles.modalCancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create ({
   
    container: {
        flex: 1,
        backgroundColor: colours.background,
    },

    headerContainer: {
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 30,
        paddingHorizontal: 15,
        paddingVertical: 10,
        overflow: 'hidden',
        borderRadius: 20,
    },
    
    heading: {
        fontFamily: fonts.heading,
        fontSize: 28,
        color: colours.greenText,
    },
    
    headingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },

    spotCountText: {
        fontFamily: fonts.bodyBold,
        color: colours.black,
    },

    map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    },

    mapPlaceholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    mapKeyContainer: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        backgroundColor: colours.white,
        borderRadius: 15,
        paddingHorizontal: 7,
        paddingVertical: 3,
        
    },
    
    mapKeyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 3,
    },

    mapKeyDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 8,
    },

    mapKeyText: {
        fontFamily: fonts.body,
        fontSize: 13,
        color: colours.black,
    },

    mapToggle: {
        position: 'absolute',
        bottom: 100,
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 30,
        padding: 4,
        width: 216,
    },

    toggleOption: {
        width: 100,
        paddingVertical: 10,
        alignItems: 'center',
        zIndex: 1,
    },

    toggleOptionSelected: {
        backgroundColor: colours.searchBarBackground,
    },

    toggleText: {
        fontFamily: fonts.body,
        fontSize: 14,
        color: colours.darkGreenFill,
    },

    toggleTextSelected: {
        color: colours.white,
    },

    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: colours.searchBarBackground,
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },

    addButtonText: {
        color: colours.darkGreenFill,
        fontSize: 30,
        fontWeight: 'bold',
        lineHeight: 34,
    },

    modalOverlay: {
        flex: 1,
        //backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },

    modalBox: {
        backgroundColor: colours.background,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 24,
        paddingBottom: 40,
    },

    modalTitle: {
        fontFamily: fonts.heading,
        fontSize: 22,
        color: colours.darkGreenFill,
        marginBottom: 6,
    },

    modalSubtitle: {
        fontFamily: fonts.body,
        fontSize: 13,
        color: colours.greyText,
        marginBottom: 16,
    },

    modalInput: {
        backgroundColor: colours.searchBarBackground,
        borderRadius: 10,
        padding: 12,
        fontFamily: fonts.body,
        fontSize: 14,
        minHeight: 80,
        marginBottom: 16,
    },

    modalConfirm: {
        backgroundColor: colours.darkGreenFill,
        borderRadius: 12,
        padding: 14,
        alignItems: 'center',
        marginBottom: 10,
    },

    modalConfirmText: {
        fontFamily: fonts.bodyBold,
        color: colours.white,
        fontSize: 16,
    },

    modalCancel: {
        alignItems: 'center',
        padding: 10,
    },

    modalCancelText: {
        fontFamily: fonts.body,
        color: colours.greyText,
        fontSize: 14,
    },
})