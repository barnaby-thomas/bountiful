import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, ScrollView} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { fetchPlants } from '../const/api';
import {colours} from '../const/colours'
import {fonts} from '../const/fonts'
import { BlurView } from 'expo-blur';
import CategoryPill from '../components/CategoryPill';

export default function EncyclopediaScreen({ navigation }: any) {

    const [plants, setPlantsData] = useState<any[]>([]);

    useEffect(() => {
        async function loadPlants() {
            const data = await fetchPlants();
            setPlantsData(data);
        }
        loadPlants();
    }, []);

    const unlockedPlants = plants.filter(plant => plant.unlocked === true).length
    const totalPlants = plants.length
    const plantCategories = ['All', 'Fungi', 'Fruit', 'Flowers', 'Leaves', 'Roots', 'Nuts'];
    
    //filter pill logic
    const [selectedCategory, setSelectedCategory] = useState('All');
    let filteredPlants;
    if (selectedCategory === 'All') {
      filteredPlants = plants;
    } else {
      filteredPlants = plants.filter(plant => plant.category === selectedCategory);
    }
    
    //search bar logic - filtering based on character entry
    const [searchText, setSearchText] = useState('');
    const searchedPlants = searchText === '' 
        ? filteredPlants 
        : filteredPlants.filter(plant => plant.name.toLowerCase().includes(searchText.toLowerCase()));

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <FlatList
                data={searchedPlants}
                numColumns={2}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <PlantCard plant={item} navigation={navigation} />}
                columnWrapperStyle={{paddingHorizontal: 8 }}
                contentContainerStyle={{ paddingBottom: 20}}
                ListHeaderComponent={
                    <View>
                        <BlurView intensity={100} tint="light" style={styles.headerContainer}>
                            <View style={styles.headingRow}>
                                <Text style={styles.heading}>My Plants 🌸</Text>
                                <View style={styles.foundBadge}>
                                    <Text style={styles.foundText}>{unlockedPlants}/{totalPlants} found</Text>
                                </View>
                            </View>
                            <View style={styles.searchBar}>
                                <TextInput 
                                    placeholder="Search plants..."
                                    onChangeText={(text) => setSearchText(text)}
                                />
                            </View>
                        </BlurView>
                        <ScrollView 
                            horizontal={true} 
                            showsHorizontalScrollIndicator={false}
                            style={styles.filterList}>
                            {plantCategories.map(category => (
                                <TouchableOpacity 
                                    key={category} 
                                    style={[styles.filterPill, selectedCategory === category && styles.filterPillSelected]}
                                    onPress={() => setSelectedCategory(category)}
                                >
                                    <Text style={[styles.filterText, selectedCategory === category && styles.filterTextSelected]}>
                                        {category}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                }
            />
        </SafeAreaView>
)
}

function PlantCard({ plant, navigation }: { plant: any, navigation: any }) {
  return (
    <TouchableOpacity style={styles.card}
    onPress={() => navigation.navigate('PlantScreen', { plantId: plant.id })}>
      <Image
        source={{ uri: plant.image }}
        style={styles.cardImage}
      />
      <View style={styles.cardInfo}>
        <Text style={styles.cardName}>{plant.name}</Text>
        <View style={styles.cardCategoryPill}>
          <Text style={styles.cardCategory}>{plant.category}</Text>
        </View>
      </View>
      {/* Will replace with real date/location from database */}
      <Text style={styles.cardDescription}>Date Logged/Location</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    
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
        borderRadius: 20,
        //backgroundColor: colours.white,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 3,
        overflow: 'hidden',
        
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
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 5,
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
        marginTop: 0,
        marginBottom: 8,
        flexGrow: 0,
        paddingHorizontal: 15
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

    filterPillSelected: {
        color: colours.white,
        backgroundColor: colours.darkGreenFill,
        margin: 3,
        paddingHorizontal: 12,
        paddingVertical: 3,
        borderRadius:20,
        alignItems: 'center',
        justifyContent: 'center', 
    },

    filterText: {
        color: colours.greenText,
        fontSize: 13,
        fontFamily: fonts.bodyBold
    },

    filterTextSelected: {
        color: colours.white,
        fontSize: 13,
        fontFamily: fonts.bodyBold
    },
    
    card: {
        width: '47%',
        margin: 7,
        borderRadius: 15,
        backgroundColor: colours.white,
        overflow: 'hidden',
    },
    
    cardImage: {
        width: '100%',
        height: 75,
    },
    
    cardInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 8,
        paddingHorizontal: 8,
        paddingBottom: 2,
    },

    cardDescription: {
        paddingLeft: 8,
        paddingBottom: 8,
        fontFamily: fonts.body,
        fontSize: 10,
    },

    cardCategoryPill: {
        backgroundColor: colours.searchBarBackground,
        borderRadius: 15,
        paddingHorizontal: 12,
        alignSelf: 'flex-start',
        paddingVertical: 3,
    },
    
    cardCategory: {
        fontFamily: fonts.bodyBold,
        fontSize: 9,
        color: colours.greenText,
        
    },
   
    cardName: {
        fontFamily: fonts.bodyBold,
        fontWeight: 'bold',
        fontSize: 13,
        color: colours.black,
    },
})
