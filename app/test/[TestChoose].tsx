import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TestChoose() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Function to store image in AsyncStorage
  const storeImageInAsyncStorage = async (
    base64Data: string
  ): Promise<string> => {
    const storageKey = `temp_image_${Date.now()}`;
    try {
      await AsyncStorage.setItem(storageKey, base64Data);
      return storageKey;
    } catch (error) {
      console.error("Error storing image in AsyncStorage:", error);
      throw new Error("Failed to store image data");
    }
  };

  // Function to open camera with proper TypeScript typing
  const handleTakePhoto = async (): Promise<void> => {
    try {
      // Request permissions with proper error handling
      const { status: cameraStatus } =
        await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaLibraryStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (cameraStatus !== "granted") {
        Alert.alert(
          "Camera Permission Required",
          "Please grant camera permission to take photos."
        );
        return;
      }

      if (mediaLibraryStatus !== "granted") {
        Alert.alert(
          "Media Library Permission Required",
          "Please grant media library permission to save photos."
        );
        return;
      }

      setIsProcessing(true);

      // Create the base options object
      const options: ImagePicker.ImagePickerOptions = {
        allowsEditing: false,
        quality: 0.8,
        exif: false,
      };

      // Handle the mediaTypes property with explicit type checking
      // Use the original deprecated MediaTypeOptions that's causing the warning
      // but is still functional
      options.mediaTypes = ImagePicker.MediaTypeOptions.Images;

      const result = await ImagePicker.launchCameraAsync(options);

      // Handle the result with type checking
      if (!result.canceled) {
        if (result.assets && result.assets.length > 0) {
          const asset = result.assets[0];
          console.log("Image captured:", asset.uri);

          try {
            // Process and store the image
            const imageKey = await processImage(asset.uri);

            // Navigate to the next screen with the storage key
            router.push({
              pathname: "/test/AddTestImages",
              params: { imageKey },
            });
          } catch (processError) {
            console.error("Error processing image:", processError);
            Alert.alert(
              "Processing Error",
              "Failed to process the captured image."
            );
          }
        } else {
          console.log("Camera capture returned no assets");
          Alert.alert("Error", "Camera returned no image");
        }
      } else {
        console.log("Camera capture canceled");
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert(
        "Camera Error",
        `Failed to access the camera: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsProcessing(false);
      setModalVisible(false);
    }
  };

  // Function to handle gallery selection with proper TypeScript typing
  const handleChooseFromGallery = async (): Promise<void> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need media library permissions to make this work!"
      );
      return;
    }

    setIsProcessing(true);
    try {
      // Create options object with proper typing
      const options: ImagePicker.ImagePickerOptions = {
        allowsEditing: false,
        quality: 1,
        // Use the original deprecated MediaTypeOptions that's causing the warning
        // but is still functional
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      };

      const result = await ImagePicker.launchImageLibraryAsync(options);

      // Handle the result with type checking
      if (!result.canceled) {
        if (result.assets && result.assets.length > 0) {
          const asset = result.assets[0];
          console.log("Image selected:", asset.uri);

          // Process and store the image
          const imageKey = await processImage(asset.uri);

          // Navigate to the next screen with the storage key
          router.push({
            pathname: "/test/AddTestImages",
            params: { imageKey },
          });
        } else {
          console.log("Gallery selection returned no assets");
          Alert.alert("Error", "No image was selected");
        }
      } else {
        console.log("Gallery selection canceled");
      }
    } catch (error) {
      console.error("Error selecting image:", error);
      Alert.alert("Error", "Failed to select and process image");
    } finally {
      setIsProcessing(false);
      setModalVisible(false);
    }
  };

  // Process image function with TypeScript type safety
  const processImage = async (uri: string): Promise<string> => {
    try {
      // Validate URI
      if (!uri) {
        throw new Error("Invalid image URI");
      }

      // Format URI for iOS
      let formattedUri = uri;
      if (
        Platform.OS === "ios" &&
        !uri.startsWith("file://") &&
        !uri.startsWith("http")
      ) {
        formattedUri = `file://${uri}`;
      }

      // Check if file exists before reading
      const fileInfo = await FileSystem.getInfoAsync(formattedUri);
      if (!fileInfo.exists) {
        throw new Error("Image file not found");
      }

      // Read file as base64
      const base64Data = await FileSystem.readAsStringAsync(formattedUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Validate base64 data
      if (!base64Data) {
        throw new Error("Failed to read image data");
      }

      // Store in AsyncStorage and return the key
      return await storeImageInAsyncStorage(base64Data);
    } catch (error) {
      console.error("Error processing image:", error);
      throw error; // Re-throw to be handled by the caller
    }
  };

  return (
    <View className="bg-white h-full w-full">
      {/* Main Content */}
      <View className="bg-white flex-1 justify-center items-center px-4">
        {/* Image Container */}
        <View className="bg-orange-400 rounded-full p-10">
          <Image
            source={require("../../assets/images/pesc.png")}
            style={{ width: 160, height: 160 }}
            contentFit="contain"
          />
        </View>

        {/* Text */}
        <Text className="text-[#222222] text-2xl font-bold mt-8 text-center">
          Prepare for Eye Test Photo
        </Text>
        <Text className="text-[#677294] mt-4 text-center">
          Keep eyes open & avoid blinking for better result!
        </Text>

        {/* Button */}
        <TouchableOpacity
          className="bg-orange-500 rounded-full py-3 px-8 mt-12 w-full"
          onPress={() => setModalVisible(true)}
          disabled={isProcessing}
        >
          <Text className="text-white font-bold text-center">Ready</Text>
        </TouchableOpacity>
      </View>

      {/* Dark Overlay - Only shown when modalVisible is true */}
      {modalVisible && (
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/50" />
        </TouchableWithoutFeedback>
      )}

      {/* Processing indicator */}
      {isProcessing && (
        <View className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-20 z-20">
          <View className="bg-white p-4 rounded-lg">
            <ActivityIndicator size="large" color="#F97316" />
            <Text className="mt-2">Processing image...</Text>
          </View>
        </View>
      )}

      {/* Modal/Popup - Only shown when modalVisible is true */}
      {modalVisible && (
        <View className="absolute bottom-0 left-0 right-0">
          <View className="bg-white rounded-t-3xl px-6 py-6">
            <Text className="text-lg font-bold mb-4">Add a record</Text>

            {/* Option 1: Take a photo */}
            <TouchableOpacity
              className="flex-row items-center py-3"
              onPress={handleTakePhoto}
              disabled={isProcessing}
            >
              <Image
                source={require("../../assets/images/camera.png")}
                style={{ width: 24, height: 24, marginRight: 12 }}
                contentFit="contain"
              />
              <Text className="text-base">Take a photo</Text>
            </TouchableOpacity>

            {/* Option 2: Upload from gallery */}
            <TouchableOpacity
              className="flex-row items-center py-3"
              onPress={handleChooseFromGallery}
              disabled={isProcessing}
            >
              <Image
                source={require("../../assets/images/gallery.png")}
                style={{ width: 24, height: 24, marginRight: 12 }}
                contentFit="contain"
              />
              <Text className="text-base">Upload from gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
