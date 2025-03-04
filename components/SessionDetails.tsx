import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function SessionDetails() {
  return (
    <ScrollView className="bg-gray-100 flex-1">
      {/* Top Bar */}
      <View className="flex-row items-center p-4 bg-gray-50">
        <Image
          source={require('./assets/images/back_arrow.png')} // Replace with your back arrow
          className="w-6 h-6 mr-4"
          resizeMode="contain"
        />
        <Text className="text-xl font-bold">Session Details</Text>
      </View>

      {/* Doctor Information Card */}
      <View className="bg-white rounded-lg m-4 p-4 shadow-md">
        <View className="flex-row">
          <Image
            source={require('./assets/images/doctor_profile.png')} // Replace with doctor image
            className="w-16 h-16 rounded-full mr-4"
            resizeMode="cover"
          />
          <View className="flex-1">
            <Text className="text-lg font-bold">Dr. Zain Calzoni</Text>
            <Text className="text-gray-600">General Physician • Online visit</Text>
             <View className="bg-green-100 rounded-full w-1/4 items-center justify-center">
                <Text className="text-green-600 text-xs">Completed</Text>
            </View>
          </View>
        </View>
      </View>

        {/* Appointment Time Card */}
        <View className="bg-blue-100 rounded-lg m-4 p-4 shadow-md flex-row items-center">
            <Image source={require('./assets/images/calendar.png')} className="w-6 h-6 mr-4" resizeMode='contain'/>
            <Text className="text-gray-700 mr-2">Monday Oct 27, 2022</Text>
            <Text className="text-gray-700 font-semibold">9:00 - 9:30 am</Text>
        </View>

      {/* Prescription Download Card */}
      <View className="bg-orange-custom rounded-lg m-4 p-4 shadow-md">
        <Text className="text-white text-xl font-bold">Download Prescription</Text>
        <Text className="text-white text-sm mt-2">
          Sent you by Dr. Emma Mia, your last check up session prescription
        </Text>
        <TouchableOpacity className="bg-white rounded-full py-2 px-4 mt-4 items-center">
          <Text className="text-orange-custom font-bold">Download Prescription</Text>
        </TouchableOpacity>
      </View>

      {/* Patient Information Card */}
      <View className="bg-white rounded-lg m-4 p-4 shadow-md">
        <Text className="text-lg font-bold mb-2">Patient</Text>
        <View className="flex-row mb-4">
          <Image
            source={require('./assets/images/patient_profile.png')} // Replace with patient image
            className="w-12 h-12 rounded-full mr-3"
            resizeMode="cover"
          />
          <View>
            <Text className="text-base font-semibold">Alicent Hightower</Text>
            <Text className="text-gray-600">Migranes</Text>
          </View>
        </View>
        <View>
          <Text className="text-base font-bold">Details</Text>
          <Text className="text-gray-600 mt-1">
            Sent you by Dr. Emma Mia, your last check up session prescription. Please download
          </Text>
          <TouchableOpacity className="items-end">
           <Image source={require('./assets/images/up_arrow.png')} className="w-6 h-6" resizeMode='contain'/>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

