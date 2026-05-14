import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { fonts } from './const/fonts';
import { colours } from './const/colours';

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

function EncyclopediaScreen() {
  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor: colours.background}}>
      <Text style={{fontFamily: fonts.heading, fontSize:28}}>My Plants</Text>
      <Text style={{fontFamily: fonts.body, fontSize:16}}>Your collection</Text>
    </View>
  );
}

export default function App() {

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