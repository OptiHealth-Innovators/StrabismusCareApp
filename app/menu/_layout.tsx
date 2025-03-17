// app/menu.jsx or app/menu.tsx
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useRouter } from "expo-router"; // Import useRouter from expo-router

export default function MenuScreen() {
    const router = useRouter(); // Initialize the router

    // MenuItem component defined inline
    const MenuItem = ({ title, external, icon, onPress }) => {
        return (
            <TouchableOpacity
                className="flex-row items-center justify-between mx-8 py-4 border-b border-gray-200"
                onPress={onPress}
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
                <Text className="text-gray-400 text-lg">{external ? "↗" : "›"}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View className="flex-1 bg-white pt-8">
            {/* Header Section */}
            <View className="items-center mt-8">
                {/* <Image
          source={require("../assets/images/doc.png")}
          className="w-24 h-24 rounded-full"
        /> */}
                <Text className="text-2xl font-semibold mt-4">Dr. Muhammad Tauhid</Text>
            </View>

            <View className="mt-8">
                <MenuItem
                    title="Wallet"
                    icon={<Feather name="credit-card" size={24} color="#FF7900" />}
                    onPress={() => router.push("/wallet")}
                />
                <MenuItem
                    title="Account Settings"
                    icon={<Feather name="settings" size={24} color="#FF7900" />}
                    onPress={() => router.push("/account-settings")}
                />
                <MenuItem
                    title="Change Password"
                    icon={<Feather name="lock" size={24} color="#FF7900" />}
                    onPress={() => router.push("/change-password")}
                />
                <MenuItem
                    title="Help Center"
                    icon={<MaterialIcons name="help-outline" size={24} color="#FF7900" />}
                    onPress={() => router.push("/help-center")}
                />
                <MenuItem
                    title="Terms & Conditions"
                    icon={<Feather name="file-text" size={24} color="#FF7900" />}
                    external={true}
                    onPress={() => {/* Handle external link */ }}
                />
                <MenuItem
                    title="Privacy Policy"
                    icon={<Feather name="shield" size={24} color="#FF7900" />}
                    external={true}
                    onPress={() => {/* Handle external link */ }}
                />
            </View>

            {/* Logout Button */}
            <View className="mt-auto mb-8 mx-8">
                <TouchableOpacity
                    className="flex-row items-center py-4"
                    onPress={() => {/* Handle logout */ }}
                >
                    <View
                        style={{
                            backgroundColor: "#FFE9E9",
                            padding: 8,
                            borderRadius: 12,
                            marginRight: 12,
                        }}
                    >
                        <Feather name="log-out" size={24} color="#FF0000" />
                    </View>
                    <Text className="text-lg text-red-600">Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
