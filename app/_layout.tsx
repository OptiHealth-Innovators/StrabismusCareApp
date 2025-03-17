import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import "../global.css";
import { StatusBar } from "expo-status-bar";
import { CustomSplashScreen } from "@/components/CustomSplashScreen";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Prevent the splash screen from auto-hiding
    SplashScreen.preventAutoHideAsync();

    const loadResources = async () => {
      try {
        // Load custom fonts
        await Font.loadAsync({
          "Manrope-SemiBold": require("../assets/fonts/Manrope-SemiBold.ttf"),
          "Manrope-Regular": require("../assets/fonts/Manrope-Regular.ttf"),
          "Manrope-Medium": require("../assets/fonts/Manrope-Medium.ttf"),
        });

        // Simulate some additional loading time (e.g., fetching data)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mark as loaded
        setLoaded(true);
      } catch (error) {
        console.error("Error loading resources:", error);
      }
    };

    loadResources();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <CustomSplashScreen />;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/passRecover" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      <Toast />
    </>
  );
}
