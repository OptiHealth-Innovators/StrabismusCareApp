// app/menu.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";
import Constants from "expo-constants";

const ENV_BACKEND_URL = Constants.expoConfig?.extra?.ENV_BACKEND_URL;

interface MenuItemProps {
  title: string;
  href?:
    | `/${string}`
    | `../${string}`
    | `(${string})`
    | `/(${string})`
    | string;
  externalUrl?: string;
  icon: React.ReactNode;
  onPress?: () => void;
}

interface UserInfo {
  name: string;
  profileImage?: string; // Add profileImage property
  // Add other user properties as needed
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
      onPress();
    }

    if (href) {
      router.push(href as any);
    } else if (externalUrl) {
      Linking.openURL(externalUrl);
    }
  };

  return (
    <TouchableOpacity
      className="flex-row items-center justify-between mx-8 py-4 border-b border-gray-200"
      onPress={handlePress}
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
      <Text className="text-gray-400 text-lg">{externalUrl ? "↗" : "›"}</Text>
    </TouchableOpacity>
  );
};

const MenuScreen: React.FC = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = await AsyncStorage.getItem("user");
        if (!userId) {
          throw new Error("User ID not found in AsyncStorage");
        }

        const response = await fetch(`${ENV_BACKEND_URL}/user/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }
        const data = await response.json();
        setUserInfo(data.user);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await AsyncStorage.removeItem("user");

      const checkData = await AsyncStorage.getItem("user");
      if (checkData === null) {
        console.log("User data successfully removed from AsyncStorage");

        Alert.alert("Logged Out", "You have been successfully logged out.", [
          {
            text: "OK",
            onPress: async () => {
              try {
                await Updates.reloadAsync();
              } catch (error) {
                console.error("Error restarting app:", error);
              }
            },
          },
        ]);
      } else {
        throw new Error("Failed to remove user data");
      }
    } catch (error) {
      console.error("Error during logout:", error);
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
          source={{
            uri:
              userInfo?.profileImage ||
              "https://api.dicebear.com/9.x/adventurer/png?seed=Maria",
          }}
          className="w-24 h-24 rounded-full"
        />
        <Text className="text-2xl font-semibold mt-4">
          {userInfo?.name || "Loading..."}
        </Text>
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
        className={`bg-[#FF7900] mx-8 mt-10 mb-4 py-3 rounded-lg items-center ${
          isLoggingOut ? "opacity-50" : ""
        }`}
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
