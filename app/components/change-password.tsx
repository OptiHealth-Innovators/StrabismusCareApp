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
  ScrollView,
} from "react-native";

const ChangePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSavePassword = () => {
    Alert.alert("Success", "Your changes have been saved!");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="flex-grow">
        <Stack.Screen options={{
          headerTitle: "",
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: '#4338ca',
          headerBackTitle: "Back",
        }} />
        
        <View className="flex-1 px-6 pt-10 pb-10 items-center">
          {/* Logo */}
          <Image
            source={require("@/assets/images/icon-hz.png")}
            className="h-12 w-[320px] self-center mb-10"
          />
          
          {/* Header */}
          <View className="mb-10 items-center w-full px-4">
            <Text className="text-2xl font-semibold text-[#240046] text-center mb-2">
              Change Password
            </Text>
            <Text className="text-sm font-semibold text-[#525a66] text-center px-2">
              Create a new, strong password that you didn&apos;t use before
            </Text>
          </View>

          {/* Input Fields */}
          <View className="w-full space-y-5 mb-8">
            <View className="flex-row items-center border border-[#79747e] rounded-lg px-4 mb-4">
              <TextInput
                placeholder="Email"
                className="flex-1 h-14 text-base text-[#1c1b1f]"
                placeholderTextColor="#aaa"
              />
            </View>
            
            {/* Current Password */}
            <View className="flex-row items-center border border-[#79747e] rounded-lg px-4 mb-4">
              <TextInput
                placeholder="Current password"
                secureTextEntry={!showCurrentPassword}
                className="flex-1 h-14 text-base text-[#1c1b1f]"
                placeholderTextColor="#aaa"
              />
              <TouchableOpacity
                className="p-3"
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                <Image
                  source={
                    showCurrentPassword
                      ? require("@/assets/images/eye.png")
                      : require("@/assets/images/eye.png")
                  }
                  className="w-6 h-6"
                />
              </TouchableOpacity>
            </View>

            {/* Create Password */}
            <View className="flex-row items-center border border-[#79747e] rounded-lg px-4 mb-4">
              <TextInput
                placeholder="Create password"
                secureTextEntry={!showCreatePassword}
                className="flex-1 h-14 text-base text-[#1c1b1f]"
                placeholderTextColor="#aaa"
              />
              <TouchableOpacity
                className="p-3"
                onPress={() => setShowCreatePassword(!showCreatePassword)}
              >
                <Image
                  source={
                    showCreatePassword
                      ? require("@/assets/images/eye.png")
                      : require("@/assets/images/eye.png")
                  }
                  className="w-6 h-6"
                />
              </TouchableOpacity>
            </View>

            {/* Confirm Password */}
            <View className="flex-row items-center border border-[#79747e] rounded-lg px-4 mb-4">
              <TextInput
                placeholder="Confirm Password"
                secureTextEntry={!showConfirmPassword}
                className="flex-1 h-14 text-base text-[#1c1b1f]"
                placeholderTextColor="#aaa"
              />
              <TouchableOpacity
                className="p-3"
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Image
                  source={
                    showConfirmPassword
                      ? require("@/assets/images/eye.png")
                      : require("@/assets/images/eye.png")
                  }
                  className="w-6 h-6"
                />
              </TouchableOpacity>
            </View>
            
            <Text className="text-sm pl-1 pt-1 text-red-600">
              *At least 8 characters
            </Text>
          </View>

          {/* Save Password Button */}
          <TouchableOpacity
            className="bg-[#ff6d00] rounded-lg items-center justify-center h-14 w-full mt-4 shadow-sm"
            onPress={handleSavePassword}
          >
            <Text className="text-white text-base font-semibold">
              Save Password
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;
