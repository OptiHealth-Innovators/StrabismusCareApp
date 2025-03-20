import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function TestResultScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center p-5 mx-10 my-48 bg-white rounded-lg shadow-lg">
      {/* X Icon */}
      <View className="w-24 h-24 rounded-full bg-[#FF5252] mb-5 justify-center items-center">
        {/* Creating X using two rotated rectangles */}
        <View className="w-10 h-1 bg-white absolute rotate-45" />
        <View className="w-10 h-1 bg-white absolute rotate-[-45deg]" />
      </View>

      <Text className="text-3xl font-bold text-[#FF6F00] mb-2">Detected</Text>

      <Text className="text-xl text-black mb-5">
        Test Successfully Completed
      </Text>

      <Text className="text-sm text-[#555] text-center mb-7.5">
        Your eyes are priceless—taking care of them today ensures a lifetime of
        clear sight and better quality of life tomorrow.
      </Text>

      <TouchableOpacity
        className="bg-[#FF6F00] py-3 px-7.5 rounded-lg mt-5 w-full"
        onPress={() => router.push("/(tabs)/search")}
      >
        <Text className="text-white text-base font-bold text-center">
          Consult a Doctor
        </Text>
      </TouchableOpacity>

      {/* Footer Buttons */}
      {/* <View className="flex-row w-full">
        <TouchableOpacity
          className="flex-1 items-center"
          onPress={() => router.push("/(tabs)")}
        >
          <Text className="text-xs text-[#555]">Test Again</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 items-center"
          onPress={() => router.push("/(tabs)")}
        >
          <Text className="text-xs text-[#555]">Save Test</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 items-center"
          onPress={() => router.push("/(tabs)/share")}
        >
          <Text className="text-xs text-[#555]">Share</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}
