import { Link } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";

interface TestCardProps {
  title: string;
  icon: React.ReactNode;
  testId: string;
}

const TestCard: React.FC<TestCardProps> = ({ title, icon, testId }) => {
  const handlePress = () => {
    if (testId !== "strabismus") {
      Alert.alert("Coming Soon", "This test will be added in the future update");
    }
  };

  // Only Strabismus test should use Link component
  if (testId === "strabismus") {
    return (
      <Link href={`/test/${testId}`} asChild>
        <TouchableOpacity
          className="flex flex-row items-center bg-[#FFE4C7] rounded-xl py-2.5 px-2.5 mb-2 w-[48%]"
        >
          <View className="mr-2">{icon}</View>
          <Text className="text-[#FF7900] font-bold text-sm">{title}</Text>
        </TouchableOpacity>
      </Link>
    );
  }

  // Other tests should just show an alert
  return (
    <TouchableOpacity
      className="flex flex-row items-center bg-[#FFE4C7] rounded-xl py-2.5 px-2.5 mb-2 w-[48%]"
      onPress={handlePress}
    >
      <View className="mr-2">{icon}</View>
      <Text className="text-[#FF7900] font-bold text-sm">{title}</Text>
    </TouchableOpacity>
  );
};

const Tests = () => {
  return (
    <View className="p-4">
      <View className="flex flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-[#222]">Tests</Text>
        <Link href="/test/" asChild> 
          {/* <TouchableOpacity>
            <Text className="text-sm text-[#FF7900]">See All</Text>
          </TouchableOpacity> */}
        </Link>
      </View>

      <View className="flex flex-row flex-wrap justify-between">
        <TestCard
          title="Strabismus"
          icon={
            <Image
              source={require("@/assets/images/strabismus-icon.png")}
              className="w-5 h-5 mr-2"
            />
          }
          testId="strabismus"
        />
        <TestCard
          title="Color Blindness"
          icon={
            <Image
              source={require("@/assets/images/color-blind-icon.png")}
              className="w-5 h-5 mr-2"
            />
          }
          testId="color-blindness"
        />
        <TestCard
          title="Vision"
          icon={
            <Image
              source={require("@/assets/images/vision-icon.png")}
              className="w-5 h-5 mr-2"
            />
          }
          testId="vision"
        />
        <TestCard
          title="Amblyopia"
          icon={
            <Image
              source={require("@/assets/images/amblyopia-icon.png")}
              className="w-5 h-5 mr-2"
            />
          }
          testId="amblyopia"
        />
      </View>
    </View>
  );
};

export default Tests;
