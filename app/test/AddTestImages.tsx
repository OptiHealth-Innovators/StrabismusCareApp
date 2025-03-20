import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import Constants from "expo-constants";

// Define types
interface ImageItem {
  id: string;
  uri: string;
  originalUri?: string;
  isBase64?: boolean;
}

interface Params {
  capturedImageUri?: string;
  capturedImageUris?: string;
  imageKey?: string;
}

const ENV_MODEL_URL = Constants.expoConfig?.extra?.ENV_MODEL_URL;

export default function AddImages(): React.ReactElement {
  const router = useRouter();
  const params = useLocalSearchParams() as unknown as Params;

  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [recordName, setRecordName] = useState<string>("Medical Test Results");
  const [recordDate, setRecordDate] = useState<string>(
    new Date().toLocaleDateString()
  );

  // Convert URI to base64
  const convertToBase64 = async (uri: string): Promise<string | null> => {
    try {
      // Skip conversion for remote URLs or data URLs
      if (uri.startsWith("http") || uri.startsWith("data:")) {
        return uri;
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

      // Check if file exists
      const fileInfo = await FileSystem.getInfoAsync(formattedUri);
      if (!fileInfo.exists) {
        console.warn(`File does not exist: ${formattedUri}`);
        return null;
      }

      // Read file as base64
      const base64 = await FileSystem.readAsStringAsync(formattedUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Determine mime type based on file extension
      let mimeType = "image/jpeg"; // Default
      if (uri.toLowerCase().endsWith(".png")) {
        mimeType = "image/png";
      } else if (uri.toLowerCase().endsWith(".gif")) {
        mimeType = "image/gif";
      } else if (uri.toLowerCase().endsWith(".webp")) {
        mimeType = "image/webp";
      }

      return `data:${mimeType};base64,${base64}`;
    } catch (error) {
      console.error("Error converting to base64:", error);
      return null;
    }
  };

  // Get image from AsyncStorage
  const getImageFromStorage = async (key: string): Promise<string | null> => {
    try {
      const storedImage = await AsyncStorage.getItem(key);
      if (storedImage) {
        return `data:image/jpeg;base64,${storedImage}`;
      }
      return null;
    } catch (error) {
      console.error("Error retrieving image from AsyncStorage:", error);
      return null;
    }
  };

  // Process incoming images
  useEffect(() => {
    const processImages = async (): Promise<void> => {
      console.log("Processing images from params");
      const newImages: ImageItem[] = [];

      try {
        // Handle AsyncStorage key case
        if (params.imageKey) {
          const base64Uri = await getImageFromStorage(params.imageKey);
          if (base64Uri) {
            newImages.push({
              id: Date.now().toString(),
              uri: base64Uri,
              isBase64: true,
            });

            // Clean up the temporary storage
            await AsyncStorage.removeItem(params.imageKey);
          }
        }
        // Handle single image case
        else if (params.capturedImageUri) {
          if (typeof params.capturedImageUri === "string") {
            const base64Uri = await convertToBase64(params.capturedImageUri);
            if (base64Uri) {
              newImages.push({
                id: Date.now().toString(),
                uri: base64Uri,
                originalUri: params.capturedImageUri,
                isBase64: base64Uri.startsWith("data:"),
              });
            }
          }
        }
        // Handle multiple images case
        else if (params.capturedImageUris) {
          const imageUris: string[] =
            typeof params.capturedImageUris === "string"
              ? JSON.parse(params.capturedImageUris)
              : [];

          for (const uri of imageUris) {
            if (typeof uri === "string") {
              const base64Uri = await convertToBase64(uri);
              if (base64Uri) {
                newImages.push({
                  id:
                    Date.now().toString() +
                    Math.random().toString(36).substring(2, 9),
                  uri: base64Uri,
                  originalUri: uri,
                  isBase64: base64Uri.startsWith("data:"),
                });
              }
            }
          }
        }
      } catch (error) {
        const err = error as Error;
        console.error("Error processing images:", err);
        Alert.alert("Error", "Failed to process images. Please try again.");
      } finally {
        setImages(newImages);
        setLoading(false);
      }
    };

    processImages();
  }, [params.capturedImageUri, params.capturedImageUris, params.imageKey]);

  const handleGoBack = (): void => {
    router.back();
  };

  const handleAddMoreImages = async (): Promise<void> => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "Please grant access to your photo library."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
        quality: 0.7, // Lower quality for better performance
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!result.canceled && result.assets.length > 0) {
        setLoading(true);
        const newImages: ImageItem[] = [];

        for (const asset of result.assets) {
          const base64Uri = await convertToBase64(asset.uri);
          if (base64Uri) {
            newImages.push({
              id:
                Date.now().toString() +
                Math.random().toString(36).substring(2, 9),
              uri: base64Uri,
              originalUri: asset.uri,
              isBase64: base64Uri.startsWith("data:"),
            });
          }
        }

        setImages((prev) => [...prev, ...newImages]);
        setLoading(false);
      }
    } catch (error) {
      const err = error as Error;
      console.error("Error picking images:", err);
      Alert.alert("Error", "Failed to load images from your library.");
      setLoading(false);
    }
  };

  const handleTakePhoto = async (): Promise<void> => {
    try {
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "Please grant access to your camera."
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        quality: 0.8,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
      });

      if (!result.canceled && result.assets.length > 0) {
        setLoading(true);
        const asset = result.assets[0];
        const base64Uri = await convertToBase64(asset.uri);

        if (base64Uri) {
          const newImage: ImageItem = {
            id:
              Date.now().toString() +
              Math.random().toString(36).substring(2, 9),
            uri: base64Uri,
            originalUri: asset.uri,
            isBase64: base64Uri.startsWith("data:"),
          };

          setImages((prev) => [...prev, newImage]);
        }
        setLoading(false);
      }
    } catch (error) {
      const err = error as Error;
      console.error("Error taking photo:", err);
      Alert.alert("Error", "Failed to capture photo.");
      setLoading(false);
    }
  };

  const handleUpload = async (): Promise<void> => {
    if (images.length === 0) {
      Alert.alert(
        "No Images",
        "Please add at least one image before uploading."
      );
      return;
    }

    try {
      setLoading(true);
      console.log("Uploading images:", images.length);

      // Convert base64 images to blobs for API upload
      const imageBlobs = await Promise.all(
        images.map(async (image) => {
          // If the image is already in base64 format
          if (image.isBase64 && image.uri.startsWith("data:")) {
            // Extract the base64 data without the prefix
            const base64Data = image.uri.split(",")[1];
            // Determine the mime type
            const mimeType =
              image.uri.split(";")[0].split(":")[1] || "image/jpeg";

            // Convert base64 to blob using expo-file-system
            const fileName = `image_${Date.now()}_${Math.floor(
              Math.random() * 1000
            )}.jpg`;
            const fileUri = `${FileSystem.cacheDirectory}${fileName}`;

            await FileSystem.writeAsStringAsync(fileUri, base64Data, {
              encoding: FileSystem.EncodingType.Base64,
            });

            // Create file object compatible with FormData
            return {
              uri: fileUri,
              name: fileName,
              type: mimeType,
            };
          } else if (image.originalUri) {
            // If we have the original URI, use that instead
            const fileName =
              image.originalUri.split("/").pop() || `image_${Date.now()}.jpg`;
            return {
              uri: image.originalUri,
              name: fileName,
              type: "image/jpeg", // Default to JPEG if unknown
            };
          }
          return null;
        })
      );

      // Filter out any null values
      const validImageBlobs = imageBlobs.filter((blob) => blob !== null);

      // Create form data for API request
      const formData = new FormData();
      validImageBlobs.forEach((blob) => {
        if (blob.uri.startsWith("data:")) {
          // Convert base64 data to Blob
          const base64Data = blob.uri.split(",")[1];
          const mimeType = blob.type;
          const binaryData = atob(base64Data);
          const arrayBuffer = new Uint8Array(binaryData.length);
          for (let i = 0; i < binaryData.length; i++) {
            arrayBuffer[i] = binaryData.charCodeAt(i);
          }
          const fileBlob = new Blob([arrayBuffer], { type: mimeType });
          formData.append("images", fileBlob, blob.name);
        } else {
          // Append file URI directly
          formData.append("images", {
            uri: blob.uri,
            type: blob.type,
            name: blob.name,
          } as unknown as Blob);
        }
      });

      // Make the API request
      const response = await fetch(`${ENV_MODEL_URL}/predict`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.ok) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Please test again with clear eye photo!",
        });
        setTimeout(() => {
          router.back();
        }, 2000);
      }

      console.log("Images uploaded successfully", response);

      const resultData = await response.json();

      console.log("Overall Result:", resultData.overall_result);

      // Store the results for display on the success screen
      await AsyncStorage.setItem(
        "strabismusResults",
        JSON.stringify(resultData)
      );

      if (resultData.overall_result.prediction === "Normal") {
        router.push({
          pathname: "/test/TestNormal",
        });
        return;
      } else {
        router.push({
          pathname: "/test/TestMajor",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to upload images. Please try again.",
      });
      setTimeout(() => {
        router.back();
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  // Remove an image
  const handleRemoveImage = (id: string): void => {
    setImages(images.filter((img) => img.id !== id));
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center p-4">
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold ml-4 text-purple-900">
          Add Images
        </Text>
      </View>

      {/* Loading indicator */}
      {loading && (
        <View className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-20 z-10">
          <View className="bg-white p-4 rounded-lg">
            <ActivityIndicator size="large" color="#F97316" />
            <Text className="mt-2">Processing images...</Text>
          </View>
        </View>
      )}

      {/* Image Selection Area */}
      <ScrollView className="flex-1">
        <View className="flex-row flex-wrap p-4">
          {/* Display selected images */}
          {images.map((image) => (
            <View key={image.id} className="m-1 relative">
              <Image
                source={{ uri: image.uri }}
                style={{ width: 80, height: 80, borderRadius: 8 }}
                contentFit="cover"
                transition={300}
              />
              <TouchableOpacity
                className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1"
                onPress={() => handleRemoveImage(image.id)}
              >
                <Ionicons name="close" size={14} color="white" />
              </TouchableOpacity>
            </View>
          ))}

          {/* Add More Images Buttons */}
          <View className="flex-row">
            {/* Add from gallery button */}
            <TouchableOpacity
              onPress={handleAddMoreImages}
              className="w-20 h-20 bg-orange-100 rounded-md justify-center items-center m-1"
              disabled={loading}
            >
              <Ionicons name="images-outline" size={24} color="#F97316" />
              <Text className="text-orange-500 text-xs text-center mt-1">
                Gallery
              </Text>
            </TouchableOpacity>

            {/* Take photo button */}
            <TouchableOpacity
              onPress={handleTakePhoto}
              className="w-20 h-20 bg-orange-100 rounded-md justify-center items-center m-1"
              disabled={loading}
            >
              <Ionicons name="camera-outline" size={24} color="#F97316" />
              <Text className="text-orange-500 text-xs text-center mt-1">
                Camera
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Record Information */}
        <View className="px-4 mt-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-700">Record for</Text>
            <TouchableOpacity>
              <Ionicons name="pencil-outline" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <Text className="text-orange-500 text-lg font-semibold mb-6">
            {recordName}
          </Text>

          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-700">Record created on</Text>
            <TouchableOpacity>
              <Ionicons name="pencil-outline" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <Text className="text-orange-500 text-lg font-semibold">
            {recordDate}
          </Text>
        </View>
      </ScrollView>

      {/* Upload Button */}
      <View className="p-4">
        <TouchableOpacity
          onPress={handleUpload}
          disabled={images.length === 0 || loading}
          className={`py-4 rounded-lg items-center ${
            images.length === 0 || loading ? "bg-gray-300" : "bg-orange-500"
          }`}
        >
          <Text className="text-white font-semibold text-lg">
            {images.length === 0
              ? "Add Images to Upload"
              : `Upload (${images.length})`}
          </Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
}
