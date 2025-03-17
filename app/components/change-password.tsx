import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";

const ChangePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSavePassword = () => {
      Alert.alert("Success", "Your changes have been saved!");
    };

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-start">
      <View className="w-4/5 pt-12">
      <Stack.Screen options={{
                headerTitle: "",
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: 'white', // optional, set background color
      
                },
                headerTintColor: '#4338ca',
                headerBackTitle: "Back",
              }} />
        {/* Logo */}
        <Image
          source={require("@/assets/images/icon-hz.png")}
          className="h-10 w-[230px] self-center mb-8"
        />
       {/* Header */}
        <View className="mb-9 items-center w-full">
          <Text className="text-2xl font-semibold text-[#240046] text-center">
            Change Password
          </Text>
          <Text className="text-sm font-semibold text-[#525a66] mt-1 text-center">
            Create a new, strong password that you don&apos;t use before
          </Text>
        </View>

        {/* Input Fields */}
        <View className="mb-6 w-full">
          <View className="flex-row items-center border border-[#79747e] rounded-lg mb-3 px-4">
            <TextInput
              placeholder="Email"
              className="flex-1 h-12 text-base text-[#1c1b1f]"
              placeholderTextColor="#aaa"
            />
          </View>
          {/* Current Password */}
          <View className="flex-row items-center border border-[#79747e] rounded-lg mb-3 px-4">
            <TextInput
              placeholder="Current password"
              secureTextEntry={!showCurrentPassword}
              className="flex-1 h-12 text-base text-[#1c1b1f]"
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity
              className="p-3"
              onPress={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              <Image
                source={
                  showCurrentPassword
                    ? require("@/assets/images/eye.png") // You might need an eye-off image
                    : require("@/assets/images/eye.png")
                }
                className="w-6 h-6"
              />
            </TouchableOpacity>
          </View>

          {/* Create Password */}
          <View className="flex-row items-center border border-[#79747e] rounded-lg mb-3 px-4">
            <TextInput
              placeholder="Create password"
              secureTextEntry={!showCreatePassword}
              className="flex-1 h-12 text-base text-[#1c1b1f]"
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity
              className="p-3"
              onPress={() => setShowCreatePassword(!showCreatePassword)}
            >
              <Image
                source={
                  showCreatePassword
                    ? require("@/assets/images/eye.png")  // You might need an eye-off image
                    : require("@/assets/images/eye.png")
                }
                className="w-6 h-6"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <View className="flex-row items-center border border-[#79747e] rounded-lg mb-3 px-4">
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry={!showConfirmPassword}
              className="flex-1 h-12 text-base text-[#1c1b1f]"
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity
              className="p-3"
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Image
                source={
                  showConfirmPassword
                    ? require("@/assets/images/eye.png") // You might need an eye-off image
                    : require("@/assets/images/eye.png")
                }
                className="w-6 h-6"
              />
            </TouchableOpacity>
          </View>
          <Text className="text-sm text-[#1c1b1f] mt-1">
            At least 8 characters
          </Text>
        </View>

        {/* Save Password Button */}
        <TouchableOpacity
          className="bg-[#ff6d00] rounded-lg items-center justify-center h-12 py-3.75 mt-5 w-full"
          onPress={handleSavePassword}
        >
          <Text className="text-white text-sm font-medium">
            Save Password
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default ChangePassword;

