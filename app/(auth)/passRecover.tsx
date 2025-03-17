import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";

const PassRecover: React.FC = ({ navigation }: any) => {
    const { colorScheme } = useColorScheme();
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Email validation function
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Generate random password
    const generatePassword = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        let password = "";
        for (let i = 0; i < 10; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    };

    // Handle password recovery
    const handlePasswordRecovery = async () => {
        // Clear previous errors
        setEmailError("");
        
        // Validate email
        if (!email.trim()) {
            setEmailError("Email is required");
            return;
        }
        
        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address");
            return;
        }
        
        try {
            setIsLoading(true);
            
            // In a real app, you would make an API call to your backend
            // This is a simulation of that process
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Generate a new password
            const newPassword = generatePassword();
            
            // In production, you would send this password to the user's email
            // Here we're just simulating that with an alert
            
            setIsLoading(false);
            
            Alert.alert(
                "Password Recovery",
                `A new password has been generated and sent to ${email}. Please check your inbox.`,
                [
                    {
                        text: "OK",
                        onPress: () => router.push("/")
                    }
                ]
            );
            
            // Log for demonstration purposes (remove in production)
            console.log(`New password for ${email}: ${newPassword}`);
            
        } catch (error) {
            setIsLoading(false);
            Alert.alert("Error", "Failed to process your request. Please try again later.");
            console.error(error);
        }
    };

    return (
        <View className="flex-1 bg-white relative pt-20">
            {/* Back Button */}
            {/* <TouchableOpacity 
                className="flex-row items-center px-4 mt-8" 
                onPress={() => router.push("/")}
            >
                <Image
                    className="w-8 h-8"
                    source={require("@/assets/images/back-button.png")}
                />
            </TouchableOpacity> */}
            
            <Image
                source={require("@/assets/images/logo-hz.png")}
                className="w-[230px] h-[33px] ml-2"
                resizeMode="contain"
            />

            <View className="flex-1 mt-8 px-4 items-center">
                <Text className="text-[#240046] text-2xl font-semibold mb-6">
                    Password Recovery
                </Text>

                <View className={`w-full max-w-[358px] mb-2 relative ${emailError ? 'border-red-500' : ''}`}>
                    <TextInput
                        className={`w-full py-3 px-3 border ${emailError ? 'border-red-500' : 'border-gray-400'} rounded-md text-base text-gray-800 `}
                        placeholder="Enter your email"
                        placeholderTextColor={"#79747e"}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Text className="absolute -top-2.5 left-3 bg-white  px-1 text-xs text-gray-800 ">
                        Email
                    </Text>
                </View>
                
                {emailError ? (
                    <Text className="text-red-600 text-xs self-start ml-4 mb-4">
                        {emailError}
                    </Text>
                ) : null}
                
                <Text className="text-sm text-gray-500  text-center mb-6 px-4">
                    Enter your email address and we'll send you a new password to log in with.
                </Text>

                {/* Recover Button */}
                <TouchableOpacity
                    className="w-full max-w-[358px] py-3 bg-[#ff6d00] rounded-lg items-center justify-center absolute bottom-5 left-4 right-4"
                    onPress={handlePasswordRecovery}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#ffffff" />
                    ) : (
                        <Text className="text-white text-sm font-medium">
                            Recover
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PassRecover;
