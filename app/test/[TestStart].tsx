import { Stack, router } from 'expo-router';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const TestStart = () => {
  // Function to handle navigation to TestChoose
  const handleReadyPress = () => {
    // router.push('/test/TestChoose')
    alert("Ready to start the test!");
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{
                headerTitle: "",
                headerStyle: {
                  backgroundColor: 'white',
                },
                headerTintColor: '#4338ca',
                headerBackTitle: "Back",
              }} />
      {/* Content Container */}
      <View className="flex items-center justify-center flex-1 px-8">
        {/* Image Container */}
        <View className="bg-[#FF7900] rounded-full p-8">
          <Image
            source={require('@/assets/images/eye.png')}
            className="w-32 h-32"
            resizeMode="contain"
          />
        </View>

        {/* Text */}
        <Text className="text-[#222] text-2xl font-bold mt-8 text-center">
          Prepare for Eye Test Photo
        </Text>
        <Text className="text-[#B1A5A5] mt-4 text-center">
          Keep eyes open & avoid blinking for better result!
        </Text>

        {/* Button with navigation */}
        <TouchableOpacity 
          className="bg-[#FF7900] rounded-full py-3 px-8 mt-12 w-full"
          onPress={handleReadyPress}
        >
          <Text className="text-white font-bold text-center">Ready</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TestStart;