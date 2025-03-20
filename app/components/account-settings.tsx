import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Stack, router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

const ENV_BACKEND_URL = Constants.expoConfig?.extra?.ENV_BACKEND_URL_LOCAL;

interface UserInfo {
  name: string;
  email: string;
  profileImage?: string;
  contact?: string;
  address?: string;
  role?: string;
}

const Account = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState<any>(require("@/assets/images/doc.png"));
  const [hasGalleryPermission, setHasGalleryPermission] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [roleSpecificId, setRoleSpecificId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch basic user info
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setIsLoading(true);
        const id = await AsyncStorage.getItem("user");
        if (!id) {
          throw new Error("User ID not found in AsyncStorage");
        }
        
        setUserId(id);
        
        // Fetch user data from your user endpoint
        // Note: You'll need to create this endpoint if it doesn't exist
        const response = await fetch(`${ENV_BACKEND_URL}/user/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }
        
        const data = await response.json();
        console.log("User data fetched:", data);

        if (data.user) {
          setName(data.user.name || "");
          setEmail(data.user.email || "");
          setRole(data.user.role || "");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        Alert.alert("Error", "Failed to load user information");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  // Fetch role-specific info
  useEffect(() => {
    const fetchRoleSpecificInfo = async () => {
      if (!userId || !role) return;
      
      try {
        let endpoint = "";
        
        if (role === "doctor") {
          endpoint = `${ENV_BACKEND_URL}/doctors/doctor/${userId}`;
        } else if (role === "patient") {
          endpoint = `${ENV_BACKEND_URL}/patients/patient/${userId}`;
        } else {
          return; // Exit if role is not recognized
        }
        
        console.log("Fetching from endpoint:", endpoint);
        
        const response = await fetch(endpoint);
        
        if (response.ok) {
          const data = await response.json();
          console.log(`${role} data fetched:`, data);
          
          if (data.success && data.data) {
            // Store the role-specific document ID for later use in updates
            setRoleSpecificId(data.data._id);
            
            // Update state with role-specific data
            setContact(data.data.contact || "");
            setAddress(data.data.address || "");
            
            if (data.data.profileImage) {
              setImage({ uri: data.data.profileImage });
            }
          }
        } else {
          console.log(`No ${role} data found, will need to create one`);
          // If no role-specific record exists, we'll need to create one
          await createRoleSpecificRecord();
        }
      } catch (error) {
        console.error(`Error fetching ${role} info:`, error);
      }
    };

    fetchRoleSpecificInfo();
  }, [userId, role]);

  // Create role-specific record if it doesn't exist
  const createRoleSpecificRecord = async () => {
    if (!userId || !role) return;
    
    try {
      let endpoint = "";
      
      if (role === "doctor") {
        endpoint = `${ENV_BACKEND_URL}/doctors`;
      } else if (role === "patient") {
        endpoint = `${ENV_BACKEND_URL}/patients`;
      } else {
        return; // Exit if role is not recognized
      }
      
      const newRecord = {
        userId: userId,
        name: name, // Use the name from user info
        contact: "",
        address: "",
      };
      
      console.log(`Creating new ${role} record:`, newRecord);
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecord),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(`New ${role} record created:`, data);
        
        // Store the new role-specific document ID
        if (data.success && (data.doctorId || data.patientId)) {
          setRoleSpecificId(data.doctorId || data.patientId);
        }
      } else {
        console.error(`Failed to create ${role} record:`, await response.text());
      }
    } catch (error) {
      console.error(`Error creating ${role} record:`, error);
    }
  };

  // Request gallery permissions
  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const handleSaveChanges = async () => {
    if (!userId) {
      Alert.alert("Error", "User ID not found");
      return;
    }
    
    try {
      setIsSaving(true);
      
      // 1. Update basic user info (name)
      const userResponse = await fetch(`${ENV_BACKEND_URL}/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      
      if (!userResponse.ok) {
        const errorText = await userResponse.text();
        console.error("User update error:", errorText);
        throw new Error(`Failed to update user info: ${userResponse.status}`);
      }
      
      // 2. Update role-specific info if role is set
      if ((role === "doctor" || role === "patient") && roleSpecificId) {
        const roleSpecificData = {
          name, // Keep name in sync with user record
          contact,
          address,
          // Only include profileImage if it's not the default image
          ...(image.uri !== require("@/assets/images/doc.png").uri && { profileImage: image.uri }),
        };
        
        const endpoint = role === "doctor" 
          ? `${ENV_BACKEND_URL}/doctors/${roleSpecificId}`
          : `${ENV_BACKEND_URL}/patients/${roleSpecificId}`;
        
        console.log("Updating at endpoint:", endpoint);
        console.log("With data:", roleSpecificData);
        
        const roleResponse = await fetch(endpoint, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(roleSpecificData),
        });
        
        if (!roleResponse.ok) {
          const errorText = await roleResponse.text();
          console.error(`${role} update error:`, errorText);
          throw new Error(`Failed to update ${role} info: ${roleResponse.status}`);
        }
        
        const responseData = await roleResponse.json();
        console.log(`${role} update response:`, responseData);
      } else if ((role === "doctor" || role === "patient") && !roleSpecificId) {
        // If we don't have a role-specific ID yet, create a new record
        await createRoleSpecificRecord();
      }
      
      Alert.alert("Success", "Your profile has been updated successfully!");
    } catch (error: any) {
      console.error("Error saving changes:", error);
      Alert.alert("Error", error.message || "Failed to save changes");
    } finally {
      setIsSaving(false);
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

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage({ uri: result.assets[0].uri });
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#4338ca" />
        <Text className="mt-4 text-gray-600">Loading profile information...</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Account Settings",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "white",
          },
          headerTintColor: "#4338ca",
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity className="pl-4" onPress={() => router.back()}>
              <View className="flex-row gap-1">
                <Ionicons name="chevron-back" size={16} color="#4338ca" />
                <Text>Back</Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView className="flex-1 bg-white">
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
            <Text className="text-base text-gray-700 mb-2 font-medium">
              Name
            </Text>
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
            className={`bg-orange-500 py-4 rounded-xl items-center mt-3 shadow-sm ${isSaving ? 'opacity-70' : ''}`}
            onPress={handleSaveChanges}
            disabled={isSaving}
          >
            {isSaving ? (
              <View className="flex-row items-center">
                <ActivityIndicator size="small" color="white" />
                <Text className="text-white text-base font-bold ml-2">Saving...</Text>
              </View>
            ) : (
              <Text className="text-white text-base font-bold">Save Changes</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default Account;
