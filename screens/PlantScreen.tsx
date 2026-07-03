import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import {colours} from '../const/colours'
import {fonts} from '../const/fonts'
import CategoryPill from '../components/CategoryPill';
import { plants } from '../const/plants';

export default function PlantScreen({ route }: any){
    const { plantId } = route.params;
    const plant = plants.find(p => p.id === plantId);
return(
    <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.imageHeader}>
            <Text>Plant Image</Text>
        </View>
        <ScrollView>
            <View style={styles.header}>
                <Text style={styles.latinNameText}>Beta vulgaris maritima</Text>
                <Text style={styles.plantName}>{plant?.name}</Text>
                <View style={styles.categoryRow}>
                    <CategoryPill label="Leaves" />
                    <CategoryPill label="Coastal" />
                    <CategoryPill label="Common" />
                </View>                
            </View>
            <View style={styles.divider}/>
            <View style={styles.infoCardGrid}>
                <View style={styles.infoCard}>
                    <Text style={styles.infoCardLabel}>Seasonality 📅</Text>
                    <Text style={styles.infoCardValue}>Spring & autumn</Text>
                </View>
                <View style={styles.infoCard}>
                    <Text style={styles.infoCardLabel}>Current Maturity 🌿</Text>
                    <Text style={styles.infoCardValue}>Optimal ready to harvest</Text>
                </View>
                <View style={styles.infoCard}>
                    <Text style={styles.infoCardLabel}>Soil Type 🌍</Text>
                    <Text style={styles.infoCardValue}>Sandy, salty</Text>
                </View>
                <View style={styles.infoCard}>
                    <Text style={styles.infoCardLabel}>Flavour 👅</Text>
                    <Text style={styles.infoCardValue}>Rich, earthy, salty</Text>
                </View>
            </View>
            <Text style={styles.sectionHeading}>About</Text>
            <View style={styles.about}>    
                <Text style={styles.sectionBody}>Sea beet is a hardy perennial coastal plant and the wild ancestor of 
                    common cultivated root vegetables like beetroot, sugar beet, and Swiss chard. It is widely foraged 
                    for its thick, glossy, and succulent leaves, which taste and cook similarly to spinach.</Text>
            </View>
            <Text style={styles.sectionHeading}>Harvesting Guide</Text>
            <View style={styles.harvestingGuideBox}/>
            <View style={styles.safetyInfoBox}>
                <Text style={styles.safetyInfoHeading}>⚠️ Stay safe</Text>
                <Text style={styles.sectionBody}>Never take leaves near sewage outlets, dog-walking trails or industrial 
                    pollution. Always wash leaves thoroughly before consuming </Text>
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

    imageHeader: {
        height: 200,
        backgroundColor: colours.searchBarBackground,
        alignItems: 'center',
        justifyContent: 'center',
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
        marginHorizontal: 25
        
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
})