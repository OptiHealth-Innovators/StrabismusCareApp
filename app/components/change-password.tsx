import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Stack, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import Toast from "react-native-toast-message";

// Define types for API responses
interface UserResponse {
  success: boolean;
  user: {
    email: string;
    [key: string]: any;
  };
  message?: string;
}

interface UpdatePasswordResponse {
  success: boolean;
  message?: string;
}

const ENV_BACKEND_URL = Constants.expoConfig?.extra?.ENV_BACKEND_URL;

const ChangePassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  // Get userId from AsyncStorage when component mounts
  useEffect(() => {
    const getUserId = async (): Promise<void> => {
      try {
        const id = await AsyncStorage.getItem("user");
        if (id) {
          setUserId(id);
          // Fetch user email
          fetchUserEmail(id);
        } else {
          Alert.alert("Error", "User not logged in");
          router.push("/");
        }
      } catch (error) {
        console.error("Error retrieving user ID:", error);
        Alert.alert("Error", "Failed to retrieve user information");
      }
    };

    getUserId();
  }, []);

  // Fetch user email
  const fetchUserEmail = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${ENV_BACKEND_URL}/user/${id}`);
      if (response.ok) {
        const data: UserResponse = await response.json();
        if (data.user && data.user.email) {
          setEmail(data.user.email);
        }
      } else {
        console.error("Failed to fetch user email");
      }
    } catch (error) {
      console.error("Error fetching user email:", error);
    }
  };

  // Password validation checks
  const hasEightChars: boolean = newPassword.length >= 8;
  const hasUpperCase: boolean = /[A-Z]/.test(newPassword);
  const hasLowerCase: boolean = /[a-z]/.test(newPassword);
  const hasNumber: boolean = /[0-9]/.test(newPassword);
  const hasSpecialChar: boolean = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const isPasswordValid: boolean = hasEightChars && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

  const handleNewPasswordChange = (text: string): void => {
    setNewPassword(text);
    
    // Check if confirm password matches whenever new password changes
    if (confirmPassword) {
      if (text !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match");
      } else {
        setConfirmPasswordError("");
      }
    }
  };

  const handleConfirmPasswordChange = (text: string): void => {
    setConfirmPassword(text);
    
    if (text !== newPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSavePassword = async (): Promise<void> => {
    // Validate inputs
    if (!currentPassword) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Current password is required",
      });
      return;
    }
    
    if (!isPasswordValid) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please ensure your new password meets all requirements",
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch(`${ENV_BACKEND_URL}/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: newPassword,
        }),
      });
      
      const data: UpdatePasswordResponse = await response.json();
      
      if (response.ok && data.success) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Password updated successfully",
        });
        
        // Clear form
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        
        // Navigate back after a short delay
        setTimeout(() => {
          router.back();
        }, 2000);
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: data.message || "Failed to update password",
        });
      }
    } catch (error) {
      console.error("Error updating password:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Network error. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "white",
          },
          headerTintColor: "#4338ca",
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity className="pl-4" onPress={() => router.back()}>
              <View className="flex-row gap-1">
                <Ionicons name="chevron-back" size={16} color="#4338ca" />
                <Text>Back</Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <SafeAreaView className="flex-1 bg-white pt-20">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="flex-grow"
        >
          <View className="flex-1 px-6 pt-10 pb-10 items-center">
            {/* Logo */}
            <Image
              source={require("@/assets/images/icon-hz.png")}
              className="h-10 w-[260px] self-center mb-8"
            />

            {/* Header */}
            <View className="mb-8 items-center w-full px-4">
              <Text className="text-2xl font-semibold text-[#240046] text-center mb-2">
                Change Password
              </Text>
              <Text className="text-sm font-semibold text-[#525a66] text-center px-2">
                Create a new, strong password that you didn&apos;t use before
              </Text>
            </View>

            {/* Input Fields */}
            <View className="w-full space-y-6 mb-16">
              {/* Email Field */}
              <View className="flex-row items-center border border-[#79747e] rounded-lg px-4 mb-8">
                <TextInput
                  placeholder="Email"
                  className="flex-1 h-14 text-base text-gray-500"
                  placeholderTextColor="#aaa"
                  value={email}
                  editable={false}
                />
              </View>

              {/* Current Password */}
              <View className="flex-row items-center border border-[#79747e] rounded-lg px-4 mb-8">
                <TextInput
                  placeholder="Current password"
                  secureTextEntry={!showCurrentPassword}
                  className="flex-1 h-14 text-base text-[#1c1b1f]"
                  placeholderTextColor="#aaa"
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  editable={!loading}
                />
                <TouchableOpacity
                  className="p-3"
                  onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                  disabled={loading}
                >
                  <Image
                    source={require("@/assets/images/eye.png")}
                    className="w-6 h-6"
                  />
                </TouchableOpacity>
              </View>

              {/* New Password */}
              <View>
                <View className="flex-row items-center border border-[#79747e] rounded-lg px-4 mb-8">
                  <TextInput
                    placeholder="Create New Password"
                    secureTextEntry={!showNewPassword}
                    className="flex-1 h-14 text-base text-[#1c1b1f]"
                    placeholderTextColor="#aaa"
                    value={newPassword}
                    onChangeText={handleNewPasswordChange}
                    editable={!loading}
                  />
                  <TouchableOpacity
                    className="p-3"
                    onPress={() => setShowNewPassword(!showNewPassword)}
                    disabled={loading}
                  >
                    <Image
                      source={require("@/assets/images/eye.png")}
                      className="w-6 h-6"
                    />
                  </TouchableOpacity>
                </View>
                
                {/* Password Requirements */}
                {newPassword.length > 0 && (
                  <View className="px-1 mt-2 mb-2 bg-gray-50 p-3 rounded-md">
                    <Text className="text-sm font-medium text-[#525a66] mb-1">
                      Password must contain:
                    </Text>
                    <View className="space-y-1 mt-1">
                      <Text className={`text-sm ${hasEightChars ? "text-green-500" : "text-red-500"}`}>
                        {hasEightChars ? "✓" : "✗"} At least 8 characters
                      </Text>
                      <Text className={`text-sm ${hasUpperCase ? "text-green-500" : "text-red-500"}`}>
                        {hasUpperCase ? "✓" : "✗"} One uppercase letter
                      </Text>
                      <Text className={`text-sm ${hasLowerCase ? "text-green-500" : "text-red-500"}`}>
                        {hasLowerCase ? "✓" : "✗"} One lowercase letter
                      </Text>
                      <Text className={`text-sm ${hasNumber ? "text-green-500" : "text-red-500"}`}>
                        {hasNumber ? "✓" : "✗"} One number
                      </Text>
                      <Text className={`text-sm ${hasSpecialChar ? "text-green-500" : "text-red-500"}`}>
                        {hasSpecialChar ? "✓" : "✗"} One special character
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              {/* Confirm Password */}
              <View>
                <View className="flex-row items-center border border-[#79747e] rounded-lg px-4">
                  <TextInput
                    placeholder="Confirm Password"
                    secureTextEntry={!showConfirmPassword}
                    className="flex-1 h-14 text-base text-[#1c1b1f]"
                    placeholderTextColor="#aaa"
                    value={confirmPassword}
                    onChangeText={handleConfirmPasswordChange}
                    editable={!loading}
                  />
                  <TouchableOpacity
                    className="p-3"
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                  >
                    <Image
                      source={require("@/assets/images/eye.png")}
                      className="w-6 h-6"
                    />
                  </TouchableOpacity>
                </View>
                {confirmPasswordError ? (
                  <Text className="text-red-500 text-sm mt-2 px-1">
                    {confirmPasswordError}
                  </Text>
                ) : null}
              </View>
            </View>

            {/* Save Password Button */}
            <TouchableOpacity
              className={`bg-[#ff6d00] rounded-lg items-center justify-center h-14 w-full mt-4 shadow-sm ${
                loading || !isPasswordValid || confirmPasswordError ? "opacity-50" : ""
              }`}
              onPress={handleSavePassword}
              disabled={loading || !isPasswordValid || !!confirmPasswordError}
            >
              {loading ? (
                <View className="flex-row items-center">
                  <ActivityIndicator color="white" style={{ marginRight: 8 }} />
                  <Text className="text-white text-base font-semibold">
                    Updating...
                  </Text>
                </View>
              ) : (
                <Text className="text-white text-base font-semibold">
                  Save Password
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Toast />
      </SafeAreaView>
    </>
  );
};

export default ChangePassword;
