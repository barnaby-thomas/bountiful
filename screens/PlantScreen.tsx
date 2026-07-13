import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import {colours} from '../const/colours'
import {fonts} from '../const/fonts'
import CategoryPill from '../components/CategoryPill';
import { fetchPlant } from '../const/api';
import { useState, useEffect } from 'react';

export default function PlantScreen({ route, navigation }: any){
    const { plantId } = route.params;
    const [plant, setPlant] = useState<any>(null);

    useEffect(() => {
        async function loadPlant() {
            const data = await fetchPlant(String(plantId));
            setPlant(data);
        }
        loadPlant();
    }, [plantId]);

    return(
    <SafeAreaView style={styles.container} edges={[]}>
    
        <ScrollView>
            
            <View style={styles.imageContainer}>
                <Image 
                    source={{ uri: plant?.image_url }}
                    style={styles.imageHeader}
                />
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text>←</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.header}>
                <Text style={styles.latinNameText}>{plant?.latin_name}</Text>
                <View style={styles.plantNameRow}>
                    <Text style={styles.plantName}>{plant?.name}</Text>
                    {plant?.unlocked && (
                        <View style={styles.unlockedBadge}>
                            <Text style={styles.unlockedTick}>✓</Text>
                        </View>
                    )}
                </View>
                <View style={styles.categoryRow}>
                    <CategoryPill label={plant?.category} />
            
                </View>                
            </View>
            <View style={styles.divider}/>
            <View style={styles.infoCardGrid}>
                <View style={styles.infoCard}>
                    <Text style={styles.infoCardLabel}>Seasonality 📅</Text>
                    <Text style={styles.infoCardValue}>Month {plant?.season_start} — Month {plant?.season_end}</Text>
                </View>
                <View style={styles.infoCard}>
                    <Text style={styles.infoCardLabel}>Current Maturity 🌿</Text>
                    <Text style={styles.infoCardValue}>Optimal ready to harvest</Text>
                </View>
                <View style={styles.infoCard}>
                    <Text style={styles.infoCardLabel}>Soil Type 🌍</Text>
                    <Text style={styles.infoCardValue}>{plant?.soil_type}</Text>
                </View>
                <View style={styles.infoCard}>
                    <Text style={styles.infoCardLabel}>Flavour 👅</Text>
                    <Text style={styles.infoCardValue}>{plant?.flavour}</Text>
                </View>
            </View>
            <Text style={styles.sectionHeading}>About</Text>
            <View style={styles.about}>    
                <Text style={styles.sectionBody}>{plant?.about}</Text>
            </View>
            <Text style={styles.sectionHeading}>Harvesting Guide</Text>
            <View style={styles.harvestingGuideBox}>
                <View style={styles.harvestingItem}>
                    <Text style={styles.harvestingIcon}>✂️</Text>
                    <View style={styles.harvestingTextContainer}>
                        <Text style={styles.harvestingTitle}>How much to take</Text>
                        <Text style={styles.sectionBody}>{plant?.harvesting_how_much}</Text>
                    </View>
                </View>
                <View style={styles.harvestingItem}>
                    <Text style={styles.harvestingIcon}>🌱</Text>
                    <View style={styles.harvestingTextContainer}>
                        <Text style={styles.harvestingTitle}>What to pick</Text>
                        <Text style={styles.sectionBody}>{plant?.harvesting_what_to_pick}</Text>
                    </View>
                </View>
                <View style={styles.harvestingItem}>
                    <Text style={styles.harvestingIcon}>📍</Text>
                    <View style={styles.harvestingTextContainer}>
                        <Text style={styles.harvestingTitle}>Location note</Text>
                        <Text style={styles.sectionBody}>{plant?.harvesting_location_note}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.safetyInfoBox}>
                <Text style={styles.safetyInfoHeading}>⚠️ Stay safe</Text>
                <Text style={styles.sectionBody}>{plant?.safety_info}</Text>
            </View>
            <View style={styles.cookingSuggestions}/>
        </ScrollView>
    </SafeAreaView>
)
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: colours.background,
    },

    divider: {
        height: 1,
        marginVertical: 5,
        marginHorizontal: 20,
        backgroundColor: colours.searchBarBackground,
    },

    imageContainer: {
    position: 'relative',
    },
    
    imageHeader: {
        height: 250,
        backgroundColor: colours.searchBarBackground,
        alignItems: 'center',
        justifyContent: 'center',
    },

    backButton: {
        position: 'absolute',
        top: 55,
        left: 20,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 30,
        padding: 8,
        zIndex: 10,
    },

    header: {
        marginHorizontal: 25,
        marginTop: 10,
    },

    latinNameText: {
        fontFamily: fonts.latinName,
        fontSize: 15,
        color: colours.greyText
    },

    plantName: {
        fontFamily: fonts.headingRegular,
        fontSize: 30
    },

    plantNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    unlockedBadge: {
        backgroundColor: colours.privatePin,
        borderRadius: 12,
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },

    unlockedTick: {
        color: colours.white,
        fontSize: 12,
        fontWeight: 'bold',
    },

    categoryRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 10,
    },

    infoCardGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        marginHorizontal: 15
    },

    infoCard: {
        width: '48%',
        backgroundColor: colours.white,
        borderRadius: 12,
        padding: 12,
        margin: '1%',
    },

    infoCardLabel: {
        fontFamily: fonts.bodyBold,
        fontSize: 14,
        color: colours.black,
        marginBottom: 4,
    },

    infoCardValue: {
        fontFamily: fonts.body,
        fontSize: 13,
        color: colours.greyText,
    },

    about: {
        marginHorizontal: 25,
        marginBottom: 5,
    },

    sectionHeading: {
        fontFamily: fonts.headingRegular,
        fontSize: 20,
        paddingVertical: 8,
        marginHorizontal: 25
    },

    sectionBody: {
        fontFamily: fonts.body,
    },

    
    
    harvestingGuideBox: {
        backgroundColor: colours.white,
        borderRadius: 12,
        padding: 12,
        marginHorizontal: 25,
        marginBottom: 10,
        
    },

    safetyInfoBox: {
        backgroundColor: colours.safetyInfoBox,
        marginHorizontal: 25,
        marginVertical: 10,
        borderLeftWidth: 10,
        borderLeftColor: colours.publicPin,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },

    
    safetyInfoHeading: {
        fontFamily: fonts.bodyBold,
        fontSize: 18,
        marginBottom: 10,
    },

    cookingSuggestions: {

    },

    harvestingItem: {
    flexDirection: 'row',
    marginVertical: 10,
    gap: 12,
    },

    harvestingTextContainer: {
        flex: 1,
    },

    harvestingIcon: {
        fontSize: 20,
        marginTop: 2,
    },

    harvestingTitle: {
        fontFamily: fonts.bodyBold,
        fontSize: 14,
        color: colours.black,
        marginBottom: 4,
    },
})