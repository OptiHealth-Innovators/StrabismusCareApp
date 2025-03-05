import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function FeedbackConfirmation() {
  return (
    <ScrollView className="bg-purple-800 flex-1">
      {/* Status Bar Placeholder */}
      <View className="pt-10" />

      {/* Confetti (Placeholder - Consider a library for animation) */}
      <View className="absolute top-0 left-0 right-0">
          {/*You can use a library like 'react-native-confetti-cannon' for a real confetti effect*/}
          <Image
            source={require('./assets/images/confetti.png')} //static confetti image
            className='w-full h-48'
            resizeMode='cover'
          />
      </View>

      {/* Content Container */}
      <View className="flex-1 justify-center items-center px-4 pt-48">
        <View className="bg-orange-100 rounded-2xl p-6">
          <Image
            source={require('./assets/images/check_mark.png')} // Placeholder
            className="w-16 h-16"
            resizeMode="contain"
          />
        </View>
        <Text className="text-white text-2xl font-bold mt-8 text-center">
          Thank you for the feedback!
        </Text>
        <Text className="text-gray-300 mt-4 text-center">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.
        </Text>

        <TouchableOpacity className="bg-orange-500 rounded-full py-3 px-8 mt-16 w-full">
          <Text className="text-white font-bold text-center">Go to Dashboard</Text>
        </TouchableOpacity>
      </View>

       {/* Bottom Border (Optional, if needed to match exactly) */}
       <View className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500" />

    </ScrollView>
  );
}
