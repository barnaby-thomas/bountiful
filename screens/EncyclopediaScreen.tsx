import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput} from 'react-native'
import {colours} from '../const/colours'
import {fonts} from '../const/fonts'
import {plants} from '../const/plants'

const unlockedCount = plants.filter(plant => plant.unlocked === true).length
const totalCount = plants.length

export default function EncyclopediaScreen() {
    const unlockedCount = plants.filter(plant => plant.unlocked === true).length
    const totalCount = plants.length
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.heading}>My Plants</Text>
                <TextInput placeholder = "Search plants..."/>
                <Text style={styles.subheading}>{unlockedCount}/{totalCount} found</Text>
                <View style={styles.bar1}>
                    <View style={styles.bar2}>

                    </View>
                </View>
            </View>
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
        marginBottom: 10
    },

    subheading: {
        fontFamily: fonts.bodyBold,
        fontWeight: 'bold',
        fontSize: 11,
        color: colours.black,
        marginTop: 10
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
        width: `${(unlockedCount / totalCount) * 100}%`,
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