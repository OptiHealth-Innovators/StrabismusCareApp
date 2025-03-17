import React from "react";
import { Platform } from "react-native";
import { Tabs } from "expo-router";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#2E004F",
          height: 55,
          position: "absolute",
          borderTopWidth: 0,
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
        },
        tabBarLabelStyle: {
          color: "#FFFFFF",
        },
        tabBarActiveTintColor: "#FF7900",
        tabBarInactiveTintColor: "#FFFFFF",
        tabBarItemStyle: Platform.select({
          ios: {},
          default: {}
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
      
      {/* The problematic tab is removed */}
    </Tabs>
  );
}
