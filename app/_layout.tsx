import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

export default function Layout() {
  
  const [fontsLoaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
    InterLight: require('../assets/fonts/Inter-Regular.ttf'),

  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) return null;
  return <Stack onLayout={onLayoutRootView} />;
}
