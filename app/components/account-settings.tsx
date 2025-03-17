// app/account-settings.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Stack } from "expo-router"; // Import Stack

const account = () => {
  const [name, setName] = useState("Rayna Carder");
  const [email, setEmail] = useState("adam.costa@email.com");
  const [contact, setContact] = useState("(86) 186157-43612");
  const [address, setAddress] = useState("2-9-7 Shuangliu, Chengdu 2100");

  const handleSaveChanges = () => {
    Alert.alert("Success", "Your changes have been saved!");
  };

    const handleChangeProfilePicture = () => {
    Alert.alert("Profile Picture", "Feature to change profile picture coming soon!");
  };

  return (
    <View className="flex-1 bg-white p-4">
      
       <Stack.Screen options={{
          headerTitle: "Account Settings",
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'white', 
          },
          headerTintColor: '#4338ca',
          headerBackTitle: "Back",
        }} />
      
      <TouchableOpacity
        className="items-center mb-6"
        onPress={handleChangeProfilePicture}
      >
        <Image
          source={require("@/assets/images/doc.png")}
          className="w-24 h-24 rounded-full mb-2"
        />
        <Text className="text-indigo-700 font-semibold">Change Profile Picture</Text>
      </TouchableOpacity>

      
      <View className="mb-6">
        <Text className="text-sm text-gray-800 mb-1">Name</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 text-sm text-gray-800 mb-4"
          value={name}
          onChangeText={setName}
        />

        <Text className="text-sm text-gray-800 mb-1">Email</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 text-sm text-gray-400 bg-gray-100 mb-4"
          value={email}
          editable={false}
        />

        <Text className="text-sm text-gray-800 mb-1">Contact</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 text-sm text-gray-800 mb-4"
          value={contact}
          onChangeText={setContact}
        />

        <Text className="text-sm text-gray-800 mb-1">Address</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 text-sm text-gray-800"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      {/* Save Changes Button */}
      <TouchableOpacity
        className="bg-orange-500 py-3 rounded-lg items-center"
        onPress={handleSaveChanges}
      >
        <Text className="text-white text-base font-bold">Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default account;

