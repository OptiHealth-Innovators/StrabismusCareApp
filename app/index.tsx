import React, { useState } from "react";
import Toast from "react-native-toast-message";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ImageSourcePropType,
  Platform,
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// Dynamic API URL based on platform and environment
const getApiUrl = () => {
  if (__DEV__) {
    // Development - use environment variables for different platforms
    if (Platform.OS === 'android') {
      return Constants.expoConfig?.extra?.ENV_BACKEND_URL_ANDROID;
    }
    return Constants.expoConfig?.extra?.ENV_BACKEND_URL_IOS;
  }
  // Production
  return Constants.expoConfig?.extra?.BACKEND_URL;
};

const ENV_BACKEND_URL = getApiUrl();

interface LoginResponse {
  success?: boolean;
  message?: string;
  userId?: string;
  token?: string;
}

interface SaveUserData {
  (userId: string): Promise<void>;
}

const Index: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");

  const saveUserData: SaveUserData = async (userId) => {
    try {
      await AsyncStorage.setItem('user', userId);
      const userData = await AsyncStorage.getItem('user');
      console.log('User data saved to AsyncStorage:', { userData });
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }

    setEmailError("");
    return true;
  };

  const handleEmailChange = (text: string): void => {
    setEmail(text);
    validateEmail(text);
  };

  const handleLogin = async (): Promise<void> => {
    if (!validateEmail(email) || !password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in all fields correctly"
      });
      return;
    }

    setLoading(true);

    try {
      console.log(`Attempting to connect to: ${ENV_BACKEND_URL}/login`);
      
      const response = await fetch(`${ENV_BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password
        }),
      });

      const data: LoginResponse = await response.json();

      if (data.success) {
        if (data.userId) {
          await saveUserData(data.userId);
        }

        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Login successful!"
        });

        setTimeout(() => {
          router.push("/(tabs)");
        }, 1000);
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: data.message || "Login failed"
        });
      }
    } catch (error) {
      // Enhanced error logging
      const typedError = error as Error;
      console.error("Login error details:", {
        message: typedError.message,
        stack: typedError.stack,
        name: typedError.name
      });
      
      Toast.show({
        type: "error",
        text1: "Connection Error",
        text2: `Network error: ${typedError.message}`
      });
    } finally {
      setLoading(false);
    }
  };

  const logoIcon: ImageSourcePropType = require("../assets/images/icon-hz.png");
  const eyeIcon: ImageSourcePropType = require("@/assets/images/eye.png");

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <View className="w-4/5">
        <Image
          source={logoIcon}
          className="mt-4 mb-4 h-8 w-[230px] self-center"
        />

        <View className="mb-8">
          <Text className="text-2xl text-[#240046] pt-4 font-manrope-semibold text-center">
            Welcome!
          </Text>
        </View>

        <View className="w-full mb-8">
          <View className="mb-6">
            <Text className="text-sm text-[#525a66] mb-2 font-normal">Email</Text>
            <TextInput
              className={`border rounded-md px-4 py-3 text-base text-black ${emailError ? "border-red-500" : "border-[#e9e9e9]"
                }`}
              placeholder="Enter your email"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={handleEmailChange}
              editable={!loading}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />
            {emailError ? (
              <Text className="text-red-500 text-sm mt-1">{emailError}</Text>
            ) : null}
          </View>

          <View className="mb-6 relative">
            <Text className="text-sm text-[#525a66] mb-2 font-normal">Password</Text>
            <TextInput
              className="border border-[#e9e9e9] rounded-md px-4 py-3 text-base text-black"
              placeholder="Enter your password"
              placeholderTextColor="#aaa"
              value={password}
              onChangeText={setPassword}
              editable={!loading}
              secureTextEntry={!isPasswordVisible}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute right-3 top-10"
              disabled={loading}
            >
              <Image
                className="w-6 h-6"
                source={eyeIcon}
                style={{ opacity: loading ? 0.5 : 1 }}
              />
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between items-center mb-6">
            <TouchableOpacity
              onPress={() => router.push("/(auth)/passRecover")}
              disabled={loading}
            >
              <Text
                className={`text-[#ff7900] text-sm font-medium ${loading ? "opacity-50" : ""
                  }`}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className={`bg-[#ff7900] py-3 items-center rounded mb-4 ${loading ? "opacity-50" : ""
              }`}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <View className="flex-row items-center">
                <ActivityIndicator color="white" style={{ marginRight: 8 }} />
                <Text className="text-lg text-white font-manrope-medium">
                  Signing in...
                </Text>
              </View>
            ) : (
              <Text className="text-lg text-white font-manrope-medium font-[500]">
                Sign in
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mb-4">
          <Text className="text-lg text-[#525a66] text-center font-manrope-regular font-[800]">
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/(auth)/signup")}
            disabled={loading}
          >
            <Text
              className={`text-lg text-[#ff7900] font-manrope-regular font-[800] ${loading ? "opacity-50" : ""
                }`}
            >
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </SafeAreaView>
  );
};

export default Index;
