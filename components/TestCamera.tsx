import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function TestCamera() {
  return (
    <View className="flex-1 bg-purple-800">
      {/* Status Bar Placeholder -  Consider using SafeAreaView */}
      <View className="pt-10" />

      {/* Top Text and Time */}
      <View className="flex-row justify-between items-center px-4 mt-4">
        <Text className="text-gray-300">test-camera</Text>
        <Text className="text-gray-300">4:20</Text>
      </View>

        {/*  Simulated Phone Battery/Wifi Status Bar */}
        <View className="px-4">
             <Text className="text-gray-300 text-right">
                 {/* Use unicode characters.  These might need adjustment depending on the font. */}
                <Text>&#x27e1; </Text> {/* Wifi Signal */}
                <Text>&#x1F873; </Text>  {/* Cellular Signal */}
                <Text>&#x1F50B;</Text>  {/* Battery Icon */}
             </Text>
        </View>

      {/* Main Content (Camera Feed Placeholder) */}
      <View className="flex-1 justify-center items-center px-4">
        {/*  Camera Feed Placeholder (Circular Image) */}
        <View className="rounded-full overflow-hidden w-64 h-64">
          {/*  Replace with actual camera feed in a real implementation */}
          <Image
            source={require('./assets/images/face_placeholder.jpg')} // Placeholder -  Use a face image!
            className="w-full h-full"
            resizeMode="cover" // Important for proper display
          />
        </View>

        {/* Capture Button */}
        <TouchableOpacity className="bg-orange-500 rounded-full py-3 px-8 mt-12 w-1/2">
          <Text className="text-white font-bold text-center">Capture</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

