import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';

export default function AddTestImages() {
  return (
    <View className="flex-1 bg-purple-800">
      {/* Status Bar Placeholder */}
      <View className="pt-10" />

      {/* Top Bar */}
      <View className="flex-row justify-between items-center px-4 mt-4">
        <View className="flex-row items-center">
          <TouchableOpacity>
            {/* Back Arrow - Placeholder */}
            <Text className="text-white text-xl mr-2">{'<'}</Text>
          </TouchableOpacity>
          <Text className="text-white text-xl">Add Images</Text>
        </View>
        <Text className="text-gray-300">4:20</Text>
         {/*  Simulated Phone Battery/Wifi Status Bar */}
         <View>
             <Text className="text-gray-300 text-right">
                <Text>&#x27e1; </Text>
                <Text>&#x1F873; </Text>
                <Text>&#x1F50B;</Text>
             </Text>
        </View>
      </View>



      {/* Image Grid */}
      <View className="flex-row justify-between px-4 mt-4">
        <View className="w-1/2 pr-2">
          <Image
            source={require('./assets/images/face_placeholder.jpg')} // Placeholder
            className="w-full aspect-square rounded-lg" // Square aspect ratio
            resizeMode="cover"
          />
        </View>
        <View className="w-1/2 pl-2">
          <TouchableOpacity className="w-full aspect-square rounded-lg bg-orange-200 justify-center items-center">
            <Text className="text-orange-500 text-4xl">+</Text>
            <Text className="text-orange-500 text-sm">Add more</Text>
            <Text className="text-orange-500 text-sm">images</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ScrollView for the rest of the content */}
      <ScrollView className="px-4 mt-8">
        {/* Record For */}
        <View className="mb-4">
          <Text className="text-gray-300 mb-1">Record for</Text>
          <View className="flex-row items-center justify-between bg-white rounded-lg p-2">
            <TextInput
              className="text-gray-700"
              placeholder="Shu Li"
              placeholderTextColor="#6b7280"
              value="Shu Li" //  Controlled input
              editable={false} // Not editable
            />
            <TouchableOpacity>
              {/* Edit Icon Placeholder */}
              <Text className="text-gray-500">&#x270E;</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Record Created On */}
        <View className="mb-8">
          <Text className="text-gray-300 mb-1">Record created on</Text>
            <View className="flex-row items-center justify-between bg-white rounded-lg p-2">
            <TextInput
              className="text-gray-700"
              placeholder="27 Feb, 2021"
              placeholderTextColor="#6b7280"
              value="27 Feb, 2021"
              editable={false}
            />
            <TouchableOpacity>
              {/* Edit Icon Placeholder */}
              <Text className="text-gray-500">&#x270E;</Text> {/* Pencil icon */}
            </TouchableOpacity>
          </View>
        </View>

        {/* Upload Button */}
        <TouchableOpacity className="bg-orange-500 rounded-full py-3 px-8 w-full">
          <Text className="text-white font-bold text-center">Upload</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
