import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { fonts } from './const/fonts';
import { colours } from './const/colours';
import { useFonts } from 'expo-font';
import { Platypi_400Regular, Platypi_700Bold } from '@expo-google-fonts/platypi';
import { DMSans_400Regular, DMSans_500Medium } from '@expo-google-fonts/dm-sans';
import EncyclopediaScreen from './screens/EncyclopediaScreen';

const Tab = createBottomTabNavigator();

function MapScreen() {
  return <View style={{flex:1,alignItems:'center',justifyContent:'center', backgroundColor: colours.background}}>
            <Text>Map</Text>
          </View>;
}

function ScanScreen() {
  return <View style={{flex:1,alignItems:'center',justifyContent:'center', backgroundColor: colours.background}}>
            <Text>Scan</Text>
         </View>;
}

export default function App() {

  const [fontsLoaded] = useFonts({
  Platypi_400Regular,
  Platypi_700Bold,
  DMSans_400Regular,
  DMSans_500Medium,
  });

  if (!fontsLoaded) return null;
  
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator>
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Scan" component={ScanScreen} />
        <Tab.Screen name="Plants" component={EncyclopediaScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}