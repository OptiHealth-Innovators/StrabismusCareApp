import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

export default function TestResultScreen({ navigation }: any) {
  return (
    <View className="flex-1 justify-center items-center p-5 mx-10 my-35 bg-white rounded-lg shadow-lg">
      {/* Icon */}
      <View className="mb-5">
        <Image
          source={require("@/assets/images/doc-f.png")}
          className="w-[156px] h-[156px] rounded-full bg-[#DFF6DD]"
        />
      </View>

      {/* Title */}
      <Text className="text-4xl font-bold text-[#FF6F00] mb-2.5">
        Not Detected
      </Text>

      {/* Subtitle */}
      <Text className="text-xl text-black mb-5">
        Test Successfully Completed
      </Text>

      <Text className="text-sm text-[#555] text-center mb-7.5">
        Eyes are the windows to the soul, and proper eye care is the key to
        preserving the clarity of that vision. Investing in your eye health
        today ensures a clearer tomorrow.
      </Text>

      {/* Button */}
      <TouchableOpacity 
        className="bg-[#FF6F00] py-3 px-7.5 rounded-lg mb-5 w-full"
        onPress={() => navigation.navigate("TestMinor")}
      >
        <Text className="text-white text-base font-bold text-center">
          Articles
        </Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text className="text-xs text-[#888] text-center">
        Share the articles and spread awareness
      </Text>
    </View>
  );
}
