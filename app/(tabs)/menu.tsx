// app/menu.tsx
import React from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { router } from "expo-router"; // Import  router

interface MenuItemProps {
  title: string;
  href?: string; // Internal route (optional)
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
      router.push(href); // Navigate internally using router.push
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
  const handleLogout = () => {
    // Implement your logout logic here (e.g., clear user session, navigate to login)
    // Example:
    // authService.logout(); // Hypothetical logout function
    router.replace("/"); // Redirect to login screen after logout
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
        {/* <MenuItem
          title="Wallet"
          href="/wallet" //  <--  Navigate to app/wallet.tsx
          icon={<Feather name="credit-card" size={24} color="#FF7900" />}
        /> */}
        <MenuItem
          title="Account Settings"
          href="../components/account-settings" // <--  Correct route!
          icon={<Feather name="settings" size={24} color="#FF7900" />}
        />
        <MenuItem
          title="Change Password"
          href="../components/change-password" // <-- Navigate to app/change-password.tsx
          icon={<Feather name="lock" size={24} color="#FF7900" />}
        />
        <MenuItem
          title="Terms & Conditions"
          externalUrl="https://example.com/terms" // Replace with your actual URL
          icon={<Feather name="file-text" size={24} color="#FF7900" />}
        />
        <MenuItem
          title="News & Blogs"
          externalUrl="https://example.com/news" // Replace with your actual URL
          icon={<MaterialIcons name="article" size={24} color="#FF7900" />}
        />
        <MenuItem
          title="Support"
          externalUrl="https://example.com/support" // Replace with your actual URL
          icon={<Feather name="headphones" size={24} color="#FF7900" />}
        />
      </View>

      <TouchableOpacity
        className="bg-[#FF7900] mx-8 mt-auto mb-4 py-3 rounded-lg items-center"
        onPress={handleLogout} // Add onPress handler for logout
      >
        <Text className="text-white text-lg font-semibold">Logout</Text>
      </TouchableOpacity>

      <Text className="text-center text-gray-500 text-sm mb-4">
        © 2025 StrabismusCare - v1.0.0. All rights reserved.
      </Text>
    </View>
  );
};

export default MenuScreen;

