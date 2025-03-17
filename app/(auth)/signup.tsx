import React, { useState } from "react";
import Toast from 'react-native-toast-message';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ImageSourcePropType,
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PasswordRequirement {
  test: RegExp;
  text: string;
}

const SignUp: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [emailError, setEmailError] = useState<string>("");

  interface SaveUserData {
    (userId: string): Promise<void>;
  }

  const saveUserData: SaveUserData = async (userId) => {
    try {
      await AsyncStorage.setItem('user', userId);
      const userData = await AsyncStorage.getItem('user');
      console.log('User data saved to AsyncStorage:', userData);
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

  const validatePassword = (password: string): boolean => {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Password must contain at least one special character");
    }

    setPasswordErrors(errors);
    return errors.length === 0;
  };

  const handlePasswordChange = (text: string): void => {
    setPassword(text);
    validatePassword(text);
  };

  const handleEmailChange = (text: string): void => {
    setEmail(text);
    validateEmail(text);
  };

  interface RegisterResponse {
    message?: string;
    userId?: string;
    success?: boolean;
  }

  const createAccount = async (): Promise<void> => {
    if (!name.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter your name'
      });
      return;
    }

    if (!validateEmail(email.trim())) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: emailError
      });
      return;
    }

    if (!validatePassword(password)) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fix password requirements'
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data: RegisterResponse = await response.json();

      if (data.success) {
        const user = data.userId;
        if (user) {
          saveUserData(user);
        }
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Account created successfully!',
        });

        setName("");
        setEmail("");
        setPassword("");
        setPasswordErrors([]);
        setEmailError("");

        setTimeout(() => {
          router.push("/(tabs)");
        }, 1000);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: data.message || 'Registration failed'
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Network error. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const passwordRequirements: PasswordRequirement[] = [
    { test: /.{8,}/, text: "At least 8 characters" },
    { test: /[A-Z]/, text: "One uppercase letter" },
    { test: /[a-z]/, text: "One lowercase letter" },
    { test: /[0-9]/, text: "One number" },
    { test: /[!@#$%^&*(),.?":{}|<>]/, text: "One special character" }
  ];

  const eyeIcon: ImageSourcePropType = require("@/assets/images/eye.png");
  const logoIcon: ImageSourcePropType = require("../../assets/images/icon-hz.png");

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <View className="w-4/5">
        <Image
          source={logoIcon}
          className="mt-4 mb-4 h-8 w-[230px] self-center"
        />

        <View className="mb-8">
          <Text className="text-2xl text-[#240046] pt-4 font-manrope-semibold text-center">
            Create a new account
          </Text>
        </View>

        <View className="w-full mb-8">
          <View className="mb-6">
            <Text className="text-sm text-[#525a66] mb-2 font-normal">Name</Text>
            <TextInput
              className="border border-[#e9e9e9] rounded-md px-4 py-3 text-base text-black"
              placeholder="Enter your name"
              placeholderTextColor="#aaa"
              value={name}
              onChangeText={setName}
              editable={!loading}
              autoCapitalize="words"
            />
          </View>

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
              className={`border rounded-md px-4 py-3 text-base text-black ${passwordErrors.length > 0 ? "border-red-500" : "border-[#e9e9e9]"
                }`}
              placeholder="Enter your password"
              placeholderTextColor="#aaa"
              value={password}
              onChangeText={handlePasswordChange}
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

            {/* Password requirements */}
            {password.length > 0 && (
              <View className="mt-2">
                <Text className="text-sm text-[#525a66] mb-1">Password must contain:</Text>
                {passwordRequirements.map((requirement, index) => (
                  <View key={index} className="flex-row items-center">
                    <Text
                      className={`text-sm ${requirement.test.test(password) ? "text-green-500" : "text-red-500"
                        }`}
                    >
                      {requirement.test.test(password) ? "✓" : "×"} {requirement.text}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <TouchableOpacity
            className={`bg-[#ff7900] py-3 items-center rounded mb-4 ${loading ? "opacity-50" : ""
              }`}
            onPress={createAccount}
            disabled={loading || passwordErrors.length > 0 || !!emailError}
          >
            {loading ? (
              <View className="flex-row items-center">
                <ActivityIndicator color="white" style={{ marginRight: 8 }} />
                <Text className="text-lg text-white font-manrope-medium">
                  Creating account...
                </Text>
              </View>
            ) : (
              <Text className="text-lg text-white font-manrope-medium">
                Sign up
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mb-4">
          <Text className="text-lg text-[#525a66] text-center font-manrope-regular font-[800]">
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/")} disabled={loading}>
            <Text
              className={`text-lg text-[#ff7900] font-manrope-regular font-[800] ${loading ? "opacity-50" : ""
                }`}
            >
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </SafeAreaView>
  );
};

export default SignUp;




// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase.config";

// {/* Divider */}
// <View className="flex-row items-center mb-4">
// <View className="flex-1 h-[0.8px] bg-[#e9e9e9]" />
// <Text className="mx-2 text-sm text-[#525a66] font-manrope-semibold font-[600]">
//   Or Sign up with
// </Text>
// <View className="flex-1 h-[0.8px] bg-[#e9e9e9]" />
// </View>

// {/* Social Media Buttons */}
// <View className="flex-row justify-between w-full mt-1">
// <TouchableOpacity className="flex-1 items-center justify-center mx-1">
//   <Image
//     source={require('../../assets/images/google.png')}
//     className="w-9 h-9"
//   />
// </TouchableOpacity>
// <TouchableOpacity className="flex-1 items-center justify-center mx-1">
//   <Image
//     source={require('../../assets/images/facebook.png')}
//     className="w-9 h-9"
//   />
// </TouchableOpacity>
// <TouchableOpacity className="flex-1 items-center justify-center mx-1">
//   <Image
//     source={require('../../assets/images/apple.png')}
//     className="w-9 h-9"
//   />
// </TouchableOpacity>
// </View>

// if (email && password) {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;
//     if (user) {
//       router.push('/(tabs)')
//     }
//   } catch (error) {
//     const r = (error as Error)
//     const m = r.message;
//     const errorMessage = m.replace(/^Firebase: /, '').replace(/ \(.+\)\.$/, '').trim();
//     console.log(errorMessage);
//     Toast.show({
//       type: 'error',
//       text1: errorMessage,
//     });
//   }
// }
