import React, { useState } from "react";
import Toast from 'react-native-toast-message';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../firebase.config";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Handle Login Button Click
  const handleLogin = async () => {
    // For now, you can add validation checks here
    if (email && password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (user) {
          router.push('/(tabs)')
        }
      } catch (error) {
        const r = (error as Error)
        const m = r.message;
        const errorMessage = m.replace(/^Firebase: /, '').replace(/ \(.+\)\.$/, '').trim();
        console.log(errorMessage);
        Toast.show({
          type: 'error',
          text1: errorMessage,
        });
      }

    } else {
      // Add error handling or alert if necessary
      alert('Please enter valid credentials');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 pt-10 px-4 pb-4">
        {/* Logo */}
        <Image
          source={require("../assets/images/icon-hz.png")}
          className="mt-12 h-8 w-56"
        />

        {/* Title */}
        <View className="mb-6">
          <Text className="text-2xl text-[#240046] pt-4 font-manrope-semibold">
            Welcome
          </Text>
        </View>
        {/* Input Fields */}
        <View className="w-full mb-6">
          <View className="mb-4">
            <Text className="text-sm text-[#525a66] mb-2 font-manrope-regular">Email</Text>
            <TextInput
              className="border border-[#e9e9e9] rounded-md px-3 py-2 text-base text-black"
              placeholder="adam.costa@email.com"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View className="mb-4">
            <Text className="text-sm text-[#525a66] mb-2 font-manrope-regular">Password</Text>
            <TextInput
              className="border border-[#e9e9e9] rounded px-3 py-2 text-base text-black font-manrope-regular relative"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Image
                className="w-6 h-6 ml-2 absolute bottom-3 right-3"
                source={
                  isPasswordVisible
                    ? require("@/assets/images/eye.png")
                    : require("@/assets/images/eye.png")
                }
              />
            </TouchableOpacity>
          </View>

          <View
            className="flex-row justify-between items-center mb-4"
          >
            <TouchableOpacity>
              <Text className="color:6750A4 font-size:14px font-family:Ma">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="bg-[#ff7900] py-3 items-center rounded-md mb-4"
            onPress={handleLogin}
          >
            <Text className="text-sm text-white font-medium">Sign In</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-sm text-[#525a66] text-center font-normal">
          Don&apos;t have an account?{" "}
          <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
            <Text className="text-[#ff7900] font-medium">Create Account</Text>
          </TouchableOpacity>
        </Text>

        {/* Divider */}
        <View className="flex-row items-center my-7 mt-9">
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
      <Toast />
    </SafeAreaView>
  );
};

export default Index;
