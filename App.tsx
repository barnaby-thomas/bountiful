import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

const Tab = createBottomTabNavigator();

function MapScreen() {
  return <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text>Map</Text></View>;
}

function ScanScreen() {
  return <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text>Scan</Text></View>;
}

function EncyclopaediaScreen() {
  return <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text>My Plants</Text></View>;
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator>
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Scan" component={ScanScreen} />
        <Tab.Screen name="Plants" component={EncyclopaediaScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}