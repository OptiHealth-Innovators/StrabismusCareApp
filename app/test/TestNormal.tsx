import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function TestResultScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 justify-center items-center p-5 mx-10 my-48 bg-white rounded-lg shadow-lg">
      {/* Success Icon */}
      <View className="w-24 h-24 rounded-full bg-[#6CB96C] mb-5 justify-center items-center">
        <View className="w-10 h-6 border-white border-l-4 border-b-4 rotate-[-45deg] translate-y-[-2px]" />
      </View>

      {/* Title */}
      <Text className="text-3xl font-bold text-[#FF6F00] mb-2">Normal</Text>

      {/* Subtitle */}
      <Text className="text-xl text-black mb-5">
        Test Successfully Completed
      </Text>

      {/* Quote */}
      <Text className="text-sm text-[#555] text-center mb-7 px-4">
        "Eyes are the windows to the soul, and proper eye care is the key to
        preserving the clarity of that vision. Investing in your eye health
        today ensures a clearer tomorrow."
      </Text>

      {/* Articles Button */}
      <TouchableOpacity
        className="bg-[#FF6F00] py-3 px-7.5 rounded-lg mb-2 w-full"
        onPress={() => router.push("/(tabs)")}
      >
        <Text className="text-white text-base font-bold text-center">
          Back to Home
        </Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text className="text-xs text-[#888] text-center">
        Share the articles and spread awareness*
      </Text>
    </View>
  );
}
