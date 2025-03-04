import React, { useState } from "react";
import Toast from "react-native-toast-message";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
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
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        if (user) {
          router.push("/(tabs)");
        }
      } catch (error) {
        const r = error as Error;
        const m = r.message;
        const errorMessage = m
          .replace(/^Firebase: /, "")
          .replace(/ \(.+\)\.$/, "")
          .trim();
        console.log(errorMessage);
        Toast.show({
          type: "error",
          text1: errorMessage,
        });
      }
    } else {
      // Add error handling or alert if necessary
      alert("Please enter valid credentials");
    }

    // need to remove this line when the above code is implemented
    router.push("/(tabs)");
  };

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <View className=" w-4/5">
        {/* Logo */}
        <Image
          source={require("../assets/images/icon-hz.png")}
          className="mt-4 mb-4 h-8 w-[230px] self-center"
        />

        {/* Title */}
        <View className="mb-8">
          <Text className="text-2xl text-[#240046] pt-4 font-manrope-semibold text-center">
            Welcome!
          </Text>
        </View>
        {/* Input Fields */}
        <View className="w-full mb-8">
          <View className="mb-6">
            <Text className="text-sm text-[#525a66] mb-2 font-normal">
              Email
            </Text>
            <TextInput
              className="border border-[#e9e9e9] rounded-md px-4 py-3 text-base text-black"
              placeholder="Enter your email"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View className="mb-6 relative">
            <Text className="text-sm text-[#525a66] mb-2 font-normal">
              Password
            </Text>
            <TextInput
              className="border border-[#e9e9e9] rounded-md px-4 py-3 text-base text-black"
              placeholder="Enter your password"
               placeholderTextColor="#aaa"
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
          <TouchableOpacity
            className="bg-[#ff7900] py-3 items-center rounded mb-4"
            onPress={handleLogin} // Call handleLogin when clicked
          >
            <Text className="text-lg text-white font-manrope-medium font-[500]">Sign in</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mb-4">
          <Text className="text-lg text-[#525a66] text-center font-manrope-regular font-[800]">
            Don&apos;t have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
              <Text className="text-lg text-[#ff7900] font-manrope-regular font-[800]">
                Sign up
              </Text>
            </TouchableOpacity>
          
        </View>

        {/* Divider */}
        <View className="flex-row items-center mb-4">
          <View className="flex-1 h-[0.8px] bg-[#e9e9e9]" />
          <Text className="mx-2 text-sm text-[#525a66] font-semibold">
            Or Sign in with
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


// import React from 'react'
// import { Text, View } from 'react-native'

// const index = () => {
//   return (
//     <View>
//       <Text>Home</Text>
//     </View>
//   )
// }

// export default index


