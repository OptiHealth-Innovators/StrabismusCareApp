import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";
import { router } from "expo-router";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) router.replace("/(tabs)");
    } catch (error: any) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 pt-10 px-4 pb-4">
        {/* Icon */}
        <Image
          source={require("../../assets/images/icon-hz.png")}
          className="mt-12 h-8 w-[230px]"
        />

        {/* Title */}
        <View className="mb-6">
          <Text className="text-2xl text-[#240046] pt-4 font-manrope-semibold">
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
              placeholder="Adam Costa"
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
              placeholder="adam.costa@email.com"
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
          className="bg-[#ff7900] py-3 items-center rounded mb-4"
          onPress={signIn}
        >
          <Text className="text-sm text-white font-manrope-medium font-[500]">
            Create Account
          </Text>
        </TouchableOpacity>

       {/* Already have an account */}
       <Text className="text-sm text-[#525a66] text-center font-manrope-regular font-[400]">
          Already have an account?{' '}
          <Text className="text-[#ff7900] font-[500]">Sign in</Text>
        </Text>

        {/* Divider */}
        <View className="flex-row items-center my-9 mt-9">
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
    </SafeAreaView>
  );
};

export default SignUp;
