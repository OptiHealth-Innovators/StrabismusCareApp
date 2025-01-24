import React from "react";
import { Platform } from "react-native";
import { Tabs } from "expo-router";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {
            backgroundColor: "#2E004F",
            height: 55,
          },
        }),
        tabBarLabelStyle: {
          color: "#FFFFFF", // Default label color
        },
        tabBarActiveTintColor: "#FF7900", // Color for the selected tab icon and label
        tabBarInactiveTintColor: "#FFFFFF", // Color for unselected tab icons and labels
      }}
    >
      {/* Dashboard Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="dashboard"
              size={size || 20}
              color={color || "#FFFFFF"}
            />
          ),
        }}
      />

      {/* Appointment Tab */}
      <Tabs.Screen
        name="appointment"
        options={{
          title: "Appointment",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="calendar-today"
              size={size || 20}
              color={color || "#FFFFFF"}
            />
          ),
        }}
      />

      {/* Search Tab */}
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" size={size || 20} color={color || "#FFFFFF"} />
          ),
        }}
      />

      {/* Menu Tab */}
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          tabBarIcon: ({ color, size }) => (
            <Feather name="menu" size={size || 20} color={color || "#FFFFFF"} />
          ),
        }}
      />
    </Tabs>
  );
}



// import { Stack, useRouter, useSegments } from 'expo-router';
// import { useEffect, useState } from 'react';
// import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
// import { View, ActivityIndicator } from 'react-native';

// export default function RootLayout() {
// 	const [initializing, setInitializing] = useState(true);
// 	const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
// 	const router = useRouter();
// 	const segments = useSegments();

// 	const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
// 		console.log('onAuthStateChanged', user);
// 		setUser(user);
// 		if (initializing) setInitializing(false);
// 	};

// 	useEffect(() => {
// 		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
// 		return subscriber;
// 	}, []);

// 	useEffect(() => {
// 		if (initializing) return;

// 		const inAuthGroup = segments[0] === '(auth)';

// 		if (user && !inAuthGroup) {
// 			router.replace('/(auth)/home');
// 		} else if (!user && inAuthGroup) {
// 			router.replace('/');
// 		}
// 	}, [user, initializing]);

// 	if (initializing)
// 		return (
// 			<View
// 				style={{
// 					alignItems: 'center',
// 					justifyContent: 'center',
// 					flex: 1
// 				}}
// 			>
// 				<ActivityIndicator size="large" />
// 			</View>
// 		);

// 	return (
// 		<Stack>
// 			<Stack.Screen name="index" options={{ title: 'Login' }} />
// 			<Stack.Screen name="(auth)" options={{ headerShown: false }} />
// 		</Stack>
// 	);
// }
