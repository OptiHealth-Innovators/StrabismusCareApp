// app/menu.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Linking, Alert } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { router } from "expo-router"; // Import router
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import * as Updates from 'expo-updates'; 

interface MenuItemProps {
  title: string;
  href?: `/${string}` | `../${string}` | `(${string})` | `/(${string})` | string; // Internal route (optional)
  externalUrl?: string; // External URL (optional)
  icon: React.ReactNode;
  onPress?: () => void; // Optional onPress handler
}

const MenuItem: React.FC<MenuItemProps> = ({
  title,
  href,
  externalUrl,
  icon,
  onPress,
}) => {
  const handlePress = () => {
    if (onPress) {
      onPress(); // Execute custom onPress first
    }

    if (href) {
      router.push(href as any);
    } else if (externalUrl) {
      Linking.openURL(externalUrl); // Open external URL
    }
  };

  return (
    <TouchableOpacity
      className="flex-row items-center justify-between mx-8 py-4 border-b border-gray-200"
      onPress={handlePress} // Use the combined handler
    >
      <View className="flex-row items-center">
        <View
          style={{
            backgroundColor: "#FFF7E6",
            padding: 8,
            borderRadius: 12,
            marginRight: 12,
          }}
        >
          {icon}
        </View>
        <Text className="text-lg text-gray-700">{title}</Text>
      </View>
      {/* Arrow or External Link Indicator */}
      <Text className="text-gray-400 text-lg">{externalUrl ? "↗" : "›"}</Text>
    </TouchableOpacity>
  );
};

const MenuScreen: React.FC = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevent multiple taps
    
    setIsLoggingOut(true);
    
    try {
      await AsyncStorage.removeItem('user');
      
      // Verify the data was removed
      const checkData = await AsyncStorage.getItem('user');
      if (checkData === null) {
        console.log('User data successfully removed from AsyncStorage');
        
        Alert.alert(
          "Logged Out",
          "You have been successfully logged out.",
          [{ 
            text: "OK", 
            onPress: async () => {
              try {
                // Restart the app
                await Updates.reloadAsync();
              } catch (error) {
                console.error('Error restarting app:', error);
                
              }
            } 
          }]
        );
      } else {
        throw new Error('Failed to remove user data');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert(
        "Logout Failed",
        "There was an error logging out. Please try again.",
        [{ text: "OK" }]
      );
      setIsLoggingOut(false);
    }
  };

 

  return (
    <View className="flex-1 bg-white pt-8">
      {/* Header Section */}
      <View className="items-center mt-8">
        <Image
          source={require("@/assets/images/doc.png")} // Make sure this path is correct
          className="w-24 h-24 rounded-full"
        />
        <Text className="text-2xl font-semibold mt-4">Dr. Muhammad Tauhid</Text>
      </View>

      <View className="mt-8">
        <MenuItem
          title="Account Settings"
          href="../components/account-settings"
          icon={<Feather name="settings" size={24} color="#FF7900" />}
        />
        <MenuItem
          title="Change Password"
          href="../components/change-password"
          icon={<Feather name="lock" size={24} color="#FF7900" />}
        />
        <MenuItem
          title="Help Center"
          icon={<MaterialIcons name="help-outline" size={24} color="#FF7900" />}
          externalUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        />
        <MenuItem
          title="Terms & Conditions"
          externalUrl="https://example.com/terms"
          icon={<Feather name="file-text" size={24} color="#FF7900" />}
        />
        <MenuItem
          title="News & Blogs"
          externalUrl="https://example.com/news"
          icon={<MaterialIcons name="article" size={24} color="#FF7900" />}
        />
        <MenuItem
          title="Support"
          externalUrl="https://example.com/support"
          icon={<Feather name="headphones" size={24} color="#FF7900" />}
        />
      </View>

      <TouchableOpacity
        className={`bg-[#FF7900] mx-8 mt-36 mb-4 py-3 rounded-lg items-center ${isLoggingOut ? 'opacity-50' : ''}`}
        onPress={handleLogout}
        disabled={isLoggingOut}
      >
        <Text className="text-white text-lg font-semibold">
          {isLoggingOut ? "Logging out..." : "Logout"}
        </Text>
      </TouchableOpacity>

      <Text className="text-center text-gray-500 text-sm mb-4">
        © 2025 StrabismusCare - v1.0.0. All rights reserved.
      </Text>
    </View>
  );
};

export default MenuScreen;
