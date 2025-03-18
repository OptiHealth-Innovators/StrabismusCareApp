import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { Stack } from "expo-router";
import * as ImagePicker from 'expo-image-picker';

const account = () => {
  const [name, setName] = useState("Rayna Carder");
  const [email, setEmail] = useState("adam.costa@email.com");
  const [contact, setContact] = useState("(86) 186157-43612");
  const [address, setAddress] = useState("2-9-7 Shuangliu, Chengdu 2100");
  const [image, setImage] = useState(require("@/assets/images/doc.png"));
  const [hasGalleryPermission, setHasGalleryPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  const handleSaveChanges = () => {
    Alert.alert("Success", "Your changes have been saved!");
  };

  const handleChangeProfilePicture = async () => {
    if (hasGalleryPermission === false) {
      Alert.alert("Permission Required", "Please grant permission to access your photos");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      // For Expo SDK 47+
      setImage({ uri: result.assets[0].uri });
    }
  };

  return (
    <ScrollView className="flex-1 bg-white pt-20">
      <Stack.Screen options={{
        headerTitle: "Account Settings",
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: 'white', 
        },
        headerTintColor: '#4338ca',
        headerBackTitle: "Back",
      }} />
      
      <View className="flex-1 px-5 py-6">
        {/* Profile Picture Section */}
        <View className="items-center mb-8 mt-2">
          <TouchableOpacity
            className="relative mb-2"
            onPress={handleChangeProfilePicture}
          >
            <Image
              source={image}
              className="w-32 h-32 rounded-full border-3 border-gray-100"
            />
            <View className="absolute bottom-0 right-0 bg-indigo-600 w-9 h-9 rounded-full justify-center items-center border-2 border-white">
              <Text className="text-lg text-white">📷</Text>
            </View>
          </TouchableOpacity>
          <Text className="text-indigo-700 font-semibold mt-2">Change Profile Picture</Text>
        </View>

        {/* Form Fields */}
        <View className="mb-6">
          <Text className="text-base text-gray-700 mb-2 font-medium">Name</Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3.5 text-base text-gray-800 mb-5 bg-white"
            value={name}
            onChangeText={setName}
          />

          <Text className="text-base text-gray-700 mb-2 font-medium">Email</Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3.5 text-base text-gray-500 mb-5 bg-gray-50"
            value={email}
            editable={false}
          />

          <Text className="text-base text-gray-700 mb-2 font-medium">Contact</Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3.5 text-base text-gray-800 mb-5 bg-white"
            value={contact}
            onChangeText={setContact}
            keyboardType="phone-pad"
          />

          <Text className="text-base text-gray-700 mb-2 font-medium">Address</Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3.5 text-base text-gray-800 h-20 bg-white"
            value={address}
            onChangeText={setAddress}
            multiline={true}
            numberOfLines={2}
            textAlignVertical="top"
          />
        </View>

        {/* Save Changes Button */}
        <TouchableOpacity
          className="bg-orange-500 py-4 rounded-xl items-center mt-3 shadow-sm"
          onPress={handleSaveChanges}
        >
          <Text className="text-white text-base font-bold">Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default account;
