import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native'
import {colours} from '../const/colours'
import {fonts} from '../const/fonts'
import {plants} from '../const/plants'

export default function EncyclopediaScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>My Plants</Text>
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
    
    heading: {
        fontFamily: fonts.heading,
        fontSize: 28,
        color: colours.greenText,
        marginLeft: 6,
        marginBottom: 10
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