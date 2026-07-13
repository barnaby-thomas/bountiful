import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import {colours} from '../const/colours'
import {fonts} from '../const/fonts'
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { BlurView } from 'expo-blur';

export default function MapScreen() {

    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [mapMode, setMapMode] = useState<'my' | 'community'>('my');

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
    }, []);
    return (
        <SafeAreaView style={styles.container}>
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
                />
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
                <Text style={styles.spotCountText}>5 spots logged</Text>     
            </BlurView>
            <View style={styles.mapKeyContainer}>
                <View style={styles.mapKeyRow}>
                    <View style={[styles.mapKeyDot, { backgroundColor: colours.publicPin }]} />
                    <Text style={styles.mapKeyText}>Public</Text>
                </View>
                <View style={styles.mapKeyRow}>
                    <View style={[styles.mapKeyDot, { backgroundColor: colours.privatePin }]} />
                    <Text style={styles.mapKeyText}>Private</Text>
                </View>
            </View>
            <View style={styles.mapToggle}>
                <TouchableOpacity 
                    style={[styles.toggleOption, mapMode === 'my' && styles.toggleOptionSelected]}
                    onPress={() => setMapMode('my')}
                >
                    <Text style={[styles.toggleText, mapMode === 'my' && styles.toggleTextSelected]}>
                        My map
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.toggleOption, mapMode === 'community' && styles.toggleOptionSelected]}
                    onPress={() => setMapMode('community')}
                >
                    <Text style={[styles.toggleText, mapMode === 'community' && styles.toggleTextSelected]}>
                        Community map
                    </Text>
                </TouchableOpacity>
            </View>
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
})