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
import MapScreen from './screens/MapScreen';
import ScanScreen from './screens/ScanScreen';

const Tab = createBottomTabNavigator();

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