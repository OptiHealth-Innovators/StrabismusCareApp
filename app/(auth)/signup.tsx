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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";
import { router } from "expo-router";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createAccount = async () => {
    if (email && password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <View className="w-4/5">
        {/* Icon */}
        <Image
          source={require("../../assets/images/icon-hz.png")}
          className="mt-4 mb-4 h-8 w-[230px] self-center"
        />

        {/* Title */}
        <View className="mb-8">
          <Text className="text-2xl text-[#240046] pt-4 font-manrope-semibold text-center">
            Create a new account
          </Text>
        </View>

        {/* Input Fields */}
        <View className="w-full mb-6">
          {/* Name Input */}
          <View className="mb-4">
            <Text className="text-sm text-[#525a66] mb-2 font-manrope-regular">
              Name
            </Text>
            <TextInput
              className="border border-[#e9e9e9] rounded px-3 py-2 text-base text-black font-manrope-regular"
              placeholder="Enter your name "
              placeholderTextColor="#aaa"
            />
          </View>

          {/* Email Input */}
          <View className="mb-4">
            <Text className="text-sm text-[#525a66] mb-2 font-manrope-regular">
              Email
            </Text>
            <TextInput
              className="border border-[#e9e9e9] rounded px-3 py-2 text-base text-black font-manrope-regular"
              placeholder="Enter your email"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password Input */}
          <View className="mb-4">
            <Text className="text-sm text-[#525a66] mb-2 font-manrope-regular">
              Password
            </Text>
            <TextInput
              className="border border-[#e9e9e9] rounded px-3 py-2 text-base text-black font-manrope-regular"
              placeholder="Enter your password"
              secureTextEntry={true}
              placeholderTextColor="#aaa"
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        {/* Button */}
        <TouchableOpacity
          className="bg-[#ff7900] py-3 items-center rounded mb-10"
          onPress={createAccount}
        >
          <Text className="text-lg text-white font-manrope-medium font-[500]">
            Sign up
          </Text>
        </TouchableOpacity>

        {/* Already have an account */}
        <View className="flex-row justify-center mb-4">
          <Text className="text-lg text-[#525a66] text-center font-manrope-regular font-[800]">
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push("/")}>
            <Text className="text-lg text-[#ff7900] font-manrope-regular font-[800]">Sign in</Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="flex-row items-center mb-4">
          <View className="flex-1 h-[0.8px] bg-[#e9e9e9]" />
          <Text className="mx-2 text-sm text-[#525a66] font-manrope-semibold font-[600]">
            Or Sign up with
          </Text>
          <View className="flex-1 h-[0.8px] bg-[#e9e9e9]" />
        </View>

        {/* Social Media Buttons */}
        <View className="flex-row justify-between w-full mt-1">
          <TouchableOpacity className="flex-1 items-center justify-center mx-1">
            <Image
              source={require('../../assets/images/google.png')}
              className="w-9 h-9"
            />
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 items-center justify-center mx-1">
            <Image
              source={require('../../assets/images/facebook.png')}
              className="w-9 h-9"
            />
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 items-center justify-center mx-1">
            <Image
              source={require('../../assets/images/apple.png')}
              className="w-9 h-9"
            />
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </SafeAreaView>
  );
};

export default SignUp;
