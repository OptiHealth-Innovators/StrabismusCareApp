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
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";
import Constants from "expo-constants";

const ENV_BACKEND_URL = Constants.expoConfig?.extra?.ENV_BACKEND_URL_LOCAL;

interface UserInfo {
  name: string;
  email: string;
  profileImage?: string;
  contact?: string;
  address?: string;
  role?: string;
  // Add other user properties as needed
}

const Account = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [contact, setContact] = useState("(86) 186157-43612");
  const [address, setAddress] = useState(userData?.address);
  const [image, setImage] = useState<any>(require("@/assets/images/doc.png"));
  const [hasGalleryPermission, setHasGalleryPermission] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = await AsyncStorage.getItem("user");
        if (!userId) {
          throw new Error("User ID not found in AsyncStorage");
        }

        const response = await fetch(`${ENV_BACKEND_URL}/user/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }
        const data = await response.json();
        console.log("User data fetched:", data);

        // Update state with user data
        if (data.user) {
          setName(data.user.name || "");
          setEmail(data.user.email || "");
          setRole(data.user.role || "");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  console.log("Role:", role);

  useEffect(() => {
    const fetchMoreInfo = async () => {
      try {
        const userId = await AsyncStorage.getItem("user");
        console.log("User ID:", userId);
        if (!userId) {
          throw new Error("User ID not found in AsyncStorage");
        }

        let response = null;

        if (role === "doctor") {
          // Fetch more info for doctor
          response = await fetch(
            `${ENV_BACKEND_URL}/doctors/doctor/${userId}/`
          );
        } else if (role === "patient") {
          // Fetch more info for patient
          response = await fetch(
            `${ENV_BACKEND_URL}/patients/patient/${userId}/`
          );
        }

        const data = await response?.json();

        setUserData(data);
      } catch (error) {
        console.error("Error fetching more user info:", error);
      }
    };

    // Call the function to execute it
    fetchMoreInfo();
  }, [role]);

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const handleSaveChanges = async () => {
    try {
      const userId = await AsyncStorage.getItem("user");
      if (!userId) {
        throw new Error("User ID not found in AsyncStorage");
      }

      // Prepare updated user data
      const updatedUserData = {
        name,
        contact,
        address,
        profileImage: image.uri ? image.uri : undefined,
      };

      // Send update request to backend
      const response = await fetch(`${ENV_BACKEND_URL}/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user info");
      }

      Alert.alert("Success", "Your changes have been saved!");
    } catch (error) {
      console.error("Error saving changes:", error);
      Alert.alert("Error", "Failed to save changes. Please try again.");
    }
  };

  const handleChangeProfilePicture = async () => {
    if (hasGalleryPermission === false) {
      Alert.alert(
        "Permission Required",
        "Please grant permission to access your photos"
      );
      return;
    }
    address;

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
      <Stack.Screen
        options={{
          headerTitle: "Account Settings",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "white",
          },
          headerTintColor: "#4338ca",
          headerBackTitle: "Back",
        }}
      />

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
            <View className="absolute bottom-0 right-0 w-9 h-9 rounded-full justify-center items-center border-2 border-white">
              <Text className="text-lg text-white">📷</Text>
            </View>
          </TouchableOpacity>
          <Text className="text-indigo-700 font-semibold mt-2">
            Change Profile Picture
          </Text>
        </View>

        {/* Form Fields */}
        <View className="mb-6">
          <Text className="text-base text-gray-700 mb-2 font-medium">Name</Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3.5 text-base text-gray-800 mb-5 bg-white"
            value={name}
            onChangeText={setName}
          />

          <Text className="text-base text-gray-700 mb-2 font-medium">
            Email
          </Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3.5 text-base text-gray-500 mb-5 bg-gray-50"
            value={email}
            editable={false}
          />

          <Text className="text-base text-gray-700 mb-2 font-medium">
            Contact
          </Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3.5 text-base text-gray-800 mb-5 bg-white"
            value={contact}
            onChangeText={setContact}
            keyboardType="phone-pad"
          />

          <Text className="text-base text-gray-700 mb-2 font-medium">
            Address
          </Text>
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

export default Account;
