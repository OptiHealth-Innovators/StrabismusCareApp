import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';

export default function VideoSessionFeedback() {
  const [rating, setRating] = useState(5); // Initial rating
  const [feedback, setFeedback] = useState('');

  return (
    <ScrollView className="bg-purple-800 flex-1">
      {/* Status Bar Placeholder (for consistent spacing) */}
      <View className="pt-10" />

      {/* Combined Profile Image */}
      <View className="items-center mt-4">
        <Image
          source={require('./assets/images/combined_profile.png')} // Placeholder: Combined image
          className="w-32 h-32 rounded-full" // Adjust size as needed
          resizeMode="cover"
        />
        <Text className="text-white text-xl font-bold mt-4">
          Your session with Dr. John Doe is complete! 🎉
        </Text>
      </View>

      {/* Doctor Details Card */}
      <View className="bg-white rounded-lg m-4 p-4">
        <Text className="text-lg font-bold">Dr. John Doe</Text>
        <Text className="text-gray-600">General Physician • Online visit</Text>
        <Text className="text-gray-600">08:00 am - 08:30 am</Text>
        <View className="bg-green-100 rounded-full px-4 py-1 mt-2 w-24">
          <Text className="text-green-600 text-center">Completed</Text>
        </View>
        <TouchableOpacity className="bg-orange-500 rounded-full py-2 px-4 mt-4 items-center">
          <Text className="text-white font-bold">View Details</Text>
        </TouchableOpacity>
      </View>

      {/* Feedback Section */}
      <View className="m-4">
        <Text className="text-white text-lg font-bold">We would love to hear from you</Text>
        <View className="flex-row justify-center my-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <Image
                source={
                  star <= rating
                    ? require('./assets/images/filled_heart.png') // Placeholder: Filled heart
                    : require('./assets/images/empty_heart.png')   // Placeholder: Empty heart
                }
                className="w-8 h-8 mx-1"
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          className="bg-white rounded-lg p-3 text-gray-700 h-24"
          multiline={true}
          numberOfLines={4}
          onChangeText={setFeedback}
          value={feedback}
          placeholder="Write your feekback here"
          placeholderTextColor="#A0AEC0"
        />
        <TouchableOpacity className="bg-orange-500 rounded-full py-3 px-4 mt-4 items-center">
          <Text className="text-white font-bold">Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity className="mt-4 items-center">
          <Text className="text-orange-500 font-bold">Skip & Go to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

