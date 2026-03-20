import GlobalProvider from "@/context/GlobalContext";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "./globals.css";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Outfit-Bold": require("@/assets/fonts/Outfit-Bold.ttf"),
    "Outfit-Medium": require("@/assets/fonts/Outfit-Medium.ttf"),
    "Outfit-Regular": require("@/assets/fonts/Outfit-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded) return null;
  if (!fontsLoaded && !error) return null;

  return (
    <GlobalProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(create)" />
        <StatusBar style="dark"/>
      </Stack>
    </GlobalProvider>
  );
}
