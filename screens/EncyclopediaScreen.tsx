import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, ScrollView} from 'react-native'
import {colours} from '../const/colours'
import {fonts} from '../const/fonts'
import {plants} from '../const/plants'

export default function EncyclopediaScreen() {
    const unlockedPlants = plants.filter(plant => plant.unlocked === true).length
    const totalPlants = plants.length
    const plantCategories = ['All', '🍄Fungi', '🫐Berries', '🌸Flowers', '🌿Leaves', '🏝️Seaside', '🌳Woodland'];

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.headingRow}>
                    <Text style={styles.heading}>My Plants 🌸</Text>
                    <View style={styles.foundBadge}>
                        <Text style={styles.foundText}>{unlockedPlants}/{totalPlants} found</Text>
                    </View>
                </View>
                <View style={styles.searchBar}>
                    <TextInput placeholder = "Search plants..."/>
                </View>
                <Text style={styles.subheading}>{unlockedPlants}/{totalPlants} found</Text>
                <View style={styles.bar1}>
                    <View style={[styles.bar2, { width: `${(unlockedPlants / totalPlants) * 100}%` }]}>
                    </View>
                </View>
            </View>
            <ScrollView 
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
                style={styles.filterList}>

                {plantCategories.map(category => (
                    <TouchableOpacity key={category} style={styles.filterPill}>
                    <Text style={styles.filterText}>{category}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <FlatList
                data={plants}
                numColumns={2}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <PlantCard plant={item} />}
            />
        </View>
    )
}

function PlantCard({ plant }: { plant: typeof plants[0] }) {
  return (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{ uri: plant.image }}
        style={styles.cardImage}
      />
      <View style={styles.cardInfo}>
        <Text style={styles.cardCategory}>{plant.category}</Text>
        <Text style={styles.cardName}>{plant.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: colours.background,
        padding: 15
    },

    headerContainer: {
        padding: 10
    },
    
    heading: {
        fontFamily: fonts.heading,
        fontSize: 28,
        color: colours.greenText,
        marginBottom: 5
    },

    headingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    
    foundBadge: {
        backgroundColor: colours.darkGreenFill,
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 2,
    },

    foundText: {
        color: colours.white,
        fontFamily: fonts.body,
        fontSize: 10,
    },

    subheading: {
        fontFamily: fonts.bodyBold,
        fontWeight: 'bold',
        fontSize: 11,
        color: colours.black,
        marginTop: 10
    },

    searchBar: {
        backgroundColor: colours.searchBarBackground,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5
    },

    bar1: {
        height: 6,
        backgroundColor: colours.searchBarBackground,
        borderRadius: 3,
        marginTop: 4,
    },

    bar2: {
        height: 6,
        backgroundColor: colours.greenText,
        borderRadius: 3,
    },

    filterList: {
        marginTop: 8,
        marginBottom: 8,
        marginHorizontal: 4,
        flexGrow: 0,
    },

    filterPill: {
        backgroundColor: colours.searchBarBackground,
        margin: 3,
        paddingHorizontal: 12,
        paddingVertical: 3,
        borderRadius:20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    filterText: {
        color: colours.greenText,
        fontSize: 12,
        fontFamily: fonts.body
    },
    
    card: {
        flex: 1,
        margin: 6,
        borderRadius: 15,
        backgroundColor: colours.white,
        overflow: 'hidden',
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    
    cardImage: {
        width: '100%',
        height: 75,
    },
    
    cardInfo: {
        padding: 8,
    },
    
    cardCategory: {
        fontFamily: fonts.body,
        fontSize: 11,
        color: colours.greenText,
        marginBottom: 4,
    },
   
    cardName: {
        fontFamily: fonts.bodyBold,
        fontWeight: 'bold',
        fontSize: 11,
        color: colours.black,
    },
})
