import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FONTS } from "../constants/fonts";
import AppNavigation from "../navigations/AppNavigation";
import { COLORS } from "../constants";
import { Hub } from 'aws-amplify';
import { AuthProvider } from '../context/AuthContext';


// App.js

import { Amplify } from 'aws-amplify';
import amplifyconfig from '../src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded] = useFonts(FONTS);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView} >
          <AuthProvider>

        <AppNavigation /> 
        </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App;