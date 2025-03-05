import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';

export default function DoctorAppointmentDetails() {
    const [selectedTime, setSelectedTime] = useState('9:30 am'); // State for selected time
    const [concern, setConcern] = useState('Migraines');     // State for selected concern
    const [description, setDescription] = useState('');

    const timeSlots = ['9:00 am', '9:30 am', '10:00 am']; // Example time slots
    const days = [
      { day: '9', label: 'Mon' },
      { day: '10', label: 'Tue' },
      { day: '11', label: 'Wed' },
      { day: '12', label: 'Thu' },
    ];

  return (
    <ScrollView className="bg-purple-800 flex-1">
      {/* Top Bar */}
      <View className="flex-row items-center p-4 pt-10 justify-between">
        <View className='flex-row items-center'>
            <Image
            source={require('./assets/images/back_arrow.png')} // Placeholder
            className="w-6 h-6 mr-4"
            resizeMode="contain"
            />
            <Text className="text-white text-xl font-bold">Back</Text>
        </View>

        <TouchableOpacity>
          <Image
            source={require('./assets/images/three_dots.png')} // Placeholder for three dots icon
            className="w-6 h-6"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Doctor Card */}
      <View className="flex-row m-4 p-4 bg-white rounded-xl items-center">
        <Image
          source={require('./assets/images/doctor_profile.png')} // Placeholder
          className="w-20 h-20 rounded-xl mr-4"
          resizeMode="cover"
        />
        <View className="flex-1">
          <Text className="text-lg font-bold">Dr. Emma Mia</Text>
          <Text className="text-gray-600">General Physician</Text>
          <View className="flex-row items-center mt-1">
            <Image
              source={require('./assets/images/location_icon.png')} // Placeholder
              className="w-4 h-4 mr-1"
              resizeMode="contain"
            />
            <Text className="text-gray-600">New York, NY, US</Text>
          </View>
          <View className="flex-row items-center mt-1">
            <Image
              source={require('./assets/images/heart_icon.png')} // Placeholder
              className="w-4 h-4 mr-1"
              resizeMode="contain"
            />
            <Text className="text-gray-600">4.9</Text>
          </View>
        </View>
      </View>

        {/* Stats Row */}
        <View className="flex-row justify-around m-4">
            <View className="items-center">
                <Text className="text-white text-lg font-bold">105</Text>
                <Text className="text-gray-300 text-sm">Reviews</Text>
            </View>
            <View className="items-center">
                <Text className="text-white text-lg font-bold">12</Text>
                <Text className="text-gray-300 text-sm">Years exp.</Text>
            </View>
            <View className="items-center">
                <Text className="text-white text-lg font-bold">1246</Text>
                <Text className="text-gray-300 text-sm">Patients</Text>
            </View>
        </View>

      {/* Demography */}
      <View className="m-4">
        <Text className="text-white text-lg font-bold">Demography</Text>
        <Text className="text-gray-300 mt-1">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
          laudantium, totam rem aperiam, ...{' '}
          <Text className="text-orange-400">more</Text>
        </Text>
      </View>

      {/* Choose Date */}
      <View className="m-4">
        <Text className="text-white text-lg font-bold mb-2">Choose Date</Text>
        <View className="flex-row justify-between">
          {days.map((dayInfo, index) => (
            <View
              key={index}
              className="bg-gray-200 rounded-lg p-3 items-center w-16" // Adjusted width
            >
              <Text className="text-gray-700 font-bold">{dayInfo.day}</Text>
              <Text className="text-gray-600">{dayInfo.label}</Text>
              <Text className='text-xs'>...</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Choose Time Slot */}
      <View className="m-4">
        <Text className="text-white text-lg font-bold mb-2">Choose Time Slot</Text>
        <View className="flex-row">
          {timeSlots.map((time) => (
            <TouchableOpacity
              key={time}
              onPress={() => setSelectedTime(time)}
              className={`px-4 py-2 rounded-full mr-2 ${
                selectedTime === time ? 'bg-purple-500' : 'bg-white'
              }`}
            >
              <Text className={selectedTime === time ? 'text-white' : 'text-gray-700'}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Select Concern */}
      <View className="m-4">
        <Text className="text-white text-lg font-bold mb-2">Select Concern</Text>
        <View className="bg-white rounded-full p-0 h-10 flex-row items-center justify-between px-4">
          <TextInput
            className="flex-1 text-gray-700"
            value={concern}
            onChangeText={setConcern}
            placeholder="Select Concern"
            placeholderTextColor="#A0AEC0"
          />
           <Image source={require('./assets/images/down_arrow.png')} className="w-4 h-4" resizeMode='contain'/>
        </View>
      </View>

      {/* Description */}
      <View className="m-4">
        <Text className="text-white text-lg font-bold mb-2">Description</Text>
        <TextInput
          className="bg-white rounded-lg p-3 text-gray-700 h-24" // Increased height
          multiline={true}
          numberOfLines={4}
          onChangeText={setDescription}
          value={description}
          placeholder="Write your description here"
          placeholderTextColor="#A0AEC0"
        />
      </View>

      {/* Book Appointment Button */}
      <TouchableOpacity className="bg-orange-500 rounded-full py-3 px-8 m-4 items-center self-center">
        <Text className="text-white font-bold">Book Appointment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
