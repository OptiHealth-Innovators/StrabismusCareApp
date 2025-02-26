import React from "react";
import { Platform, View } from "react-native"; // Import View
import { Tabs } from "expo-router";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({ // Add route parameter
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#2E004F", // Default background color (for Android and fallback)
          height: 55,
          position: "absolute", // Important for iOS to allow for dynamic background
          borderTopWidth: 0, // Remove top border for cleaner look
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,  // Remove shadow on Android
        },
        tabBarLabelStyle: {
          color: "#FFFFFF", // Default label color
        },
        tabBarActiveTintColor: "#FF7900", // Color for the selected tab icon and label
        tabBarInactiveTintColor: "#FFFFFF", // Color for unselected tab icons and labels

        // iOS-specific styling for light/dark mode
        tabBarItemStyle: Platform.select({
          ios: {
            // No specific styles needed here, as we're handling the background dynamically
          },
          default: {
            //  styles for android
          }
        }),
      })}
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
