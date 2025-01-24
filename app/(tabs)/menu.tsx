import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ProfileSettings from "@/components/profileSettings";

const MenuScreen: React.FC = ({navigation }: any) => {
  return (
    <View className="flex-1 bg-white">
      {/* Header Section */}
      <View className="items-center mt-8">
        <Image
          source={require("@/assets/images/doc.png")}
          className="w-24 h-24 rounded-full"
        />
        <Text className="text-2xl font-semibold mt-4">Dr. Muhammad Tauhid</Text>
      </View>

      <View className="mt-8">
        <MenuItem
          title="Wallet"
          icon={<Feather name="credit-card" size={24} color="#FF7900" />}
        />
        <MenuItem
          title="Account Settings"
          icon={<Feather name="settings" size={24} color="#FF7900" />}
          onPress={() => navigation.navigate(ProfileSettings)}
        />
        <MenuItem
          title="Change Password"
          icon={<Feather name="lock" size={24} color="#FF7900" />}
        />
        <MenuItem
          title="Terms & Conditions"
          external
          icon={<Feather name="file-text" size={24} color="#FF7900" />}
        />
        <MenuItem
          title="News & Blogs"
          external
          icon={<MaterialIcons name="article" size={24} color="#FF7900" />}
        />
        <MenuItem
          title="Support"
          external
          icon={<Feather name="headphones" size={24} color="#FF7900" />}
        />
      </View>

      <TouchableOpacity className="bg-[#FF7900] mx-8 mt-auto mb-4 py-3 rounded-lg items-center">
        <Text className="text-white text-lg font-semibold">Logout</Text>
      </TouchableOpacity>

      <Text className="text-center text-gray-500 text-sm mb-4">
        © 2025 StrabismusCare - v1.0.0. All rights reserved.
      </Text>
    </View>
  );
};
interface MenuItemProps {
  title: string;
  external?: boolean;
  icon: React.ReactNode;
  onPress?: () => void;
}


const MenuItem: React.FC<MenuItemProps> = ({ title, external, icon }) => {
  return (
    <TouchableOpacity className="flex-row items-center justify-between mx-8 py-4 border-b border-gray-200">
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
      <Text className="text-gray-400 text-lg">{external ? "↗" : "›"}</Text>
    </TouchableOpacity>
  );
};

export default MenuScreen;
