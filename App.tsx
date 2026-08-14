import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Platypi_400Regular, Platypi_700Bold } from '@expo-google-fonts/platypi';
import { DMSans_400Regular, DMSans_500Medium, DMSans_700Bold, DMSans_400Regular_Italic } from '@expo-google-fonts/dm-sans';
import EncyclopediaScreen from './screens/EncyclopediaScreen';
import MapScreen from './screens/MapScreen';
import ScanScreen from './screens/ScanScreen';
import PlantScreen from './screens/PlantScreen'
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './screens/RegisterScreen';
import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Plants" component={EncyclopediaScreen} />
    </Tab.Navigator>
  );
}

export default function App() {

  const [fontsLoaded] = useFonts({
  Platypi_400Regular,
  Platypi_700Bold,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
  DMSans_400Regular_Italic
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkToken() {
      const token = await SecureStore.getItemAsync('token');
      setIsLoggedIn(!!token);
    }
    checkToken();
  }, []);


  if (!fontsLoaded || isLoggedIn === null) return null;
  
    return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="PlantScreen" component={PlantScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen 
                name="Login" 
                children={(props) => <LoginScreen {...props} onLogin={() => setIsLoggedIn(true)} />}
            />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
);
}