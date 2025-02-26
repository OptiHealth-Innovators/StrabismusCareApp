import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { router } from "expo-router";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation(); // Access navigation prop

  // Handle Login Button Click
  const handleLogin = () => {
    // For now, you can add validation checks here
    if (email && password) {
      // Navigate to the desired screen after login
      router.push('/(tabs)')
    } else {
      // Add error handling or alert if necessary
      alert('Please enter valid credentials');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 pt-10 px-6 pb-6">
        {/* Logo */}
        <Image
          source={require("../assets/images/icon-hz.png")}
          className="mt-12 h-8 w-56 self-center"
        />

        {/* Title */}
        <View className="mb-8">
          <Text className="text-3xl text-[#240046] pt-4 font-semibold text-center">
            Welcome
          </Text>
        </View>

        {/* Input Fields */}
        <View className="w-full mb-8">
          <View className="mb-6">
            <Text className="text-sm text-[#525a66] mb-2 font-normal">Email</Text>
            <TextInput
              className="border border-[#e9e9e9] rounded-md px-4 py-3 text-base text-black"
              placeholder="adam.costa@email.com"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View className="mb-6 relative">
            <Text className="text-sm text-[#525a66] mb-2 font-normal">Password</Text>
            <TextInput
              className="border border-[#e9e9e9] rounded-md px-4 py-3 text-base text-black"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute right-3 top-10"
            >
              <Image
                className="w-6 h-6"
                source={
                  isPasswordVisible
                    ? require("@/assets/images/eye.png")
                    : require("@/assets/images/eye.png")
                }
              />
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between items-center mb-6">
            <TouchableOpacity>
              <Text className="text-[#6750A4] text-sm font-medium">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Button */}
          <TouchableOpacity
            className="bg-[#ff7900] py-3 items-center rounded-md mb-6"
            onPress={handleLogin} // Call handleLogin when clicked
          >
            <Text className="text-sm text-white font-medium">Sign In</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-sm text-[#525a66] text-center font-normal mb-6">
          Don&apos;t have an account?{" "}
          <Text className="text-[#ff7900] font-medium">Create Account</Text>
        </Text>

        {/* Divider */}
        <View className="flex-row items-center my-7">
          <View className="flex-1 h-[0.8px] bg-[#e9e9e9]" />
          <Text className="mx-2 text-sm text-[#525a66] font-semibold">
            Or Sign up with
          </Text>
          <View className="flex-1 h-[0.8px] bg-[#e9e9e9]" />
        </View>

        {/* Social Media Buttons */}
        <View className="flex-row justify-between w-full mt-1">
          <TouchableOpacity className="flex-1 items-center justify-center mx-1">
            <Image
              source={require("../assets/images/google.png")}
              className="w-8 h-8"
            />
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 items-center justify-center mx-1">
            <Image
              source={require("../assets/images/facebook.png")}
              className="w-8 h-8"
            />
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 items-center justify-center mx-1">
            <Image
              source={require("../assets/images/apple.png")}
              className="w-8 h-8"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
