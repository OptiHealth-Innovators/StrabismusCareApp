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

      <Text className="text-4xl font-bold text-[#FF6F00] mb-2.5">
        Detected
      </Text>

      <Text className="text-xl text-black mb-5">
        Test Successfully Completed
      </Text>

      <Text className="text-sm text-[#555] text-center mb-7.5">
        Your eyes are priceless—taking care of them today ensures a lifetime of
        clear sight and better quality of life tomorrow.
      </Text>

      <TouchableOpacity
        className="bg-[#FF6F00] py-3 px-7.5 rounded-lg mb-5 w-full"
        onPress={() => navigation.navigate("TestStart")}
      >
        <Text className="text-white text-base font-bold text-center">
          Consult a Doctor
        </Text>
      </TouchableOpacity>

      {/* Footer Buttons */}
      <View className="flex-row w-full">
        <TouchableOpacity
          className="flex-1 items-center"
          onPress={() => navigation.navigate("TestAgain")}
        >
          <Text className="text-xs text-[#555]">Test Again</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 items-center"
          onPress={() => navigation.navigate("SaveTest")}
        >
          <Text className="text-xs text-[#555]">Save Test</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 items-center"
          onPress={() => navigation.navigate("Share")}
        >
          <Text className="text-xs text-[#555]">Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
