import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";

export default function TestChoose() {
    const [modalVisible, setModalVisible] = useState(false);

    // Function to open camera
    const handleTakePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
            return;
        }
        
        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            
            if (!result.canceled) {
                // Handle the captured image
                console.log('Photo taken:', result.assets[0].uri);
                // Here you would typically save the image or navigate to next screen
            }
        } catch (error) {
            console.error('Error taking photo:', error);
        }
        
        setModalVisible(false);
    };

    // Function to open gallery
    const handleChooseFromGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
            alert('Sorry, we need media library permissions to make this work!');
            return;
        }
        
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            
            if (!result.canceled) {
                // Handle the selected image
                console.log('Image selected:', result.assets[0].uri);
                // Here you would typically save the image or navigate to next screen
            }
        } catch (error) {
            console.error('Error selecting image:', error);
        }
        
        setModalVisible(false);
    };

    return (
        <>
        <Stack.Screen
        options={{
          headerTitle: "",
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
        <TouchableWithoutFeedback onPress={() => modalVisible && setModalVisible(false)}>
            <View className="flex-1 ">
                {/* Main Content */}
                <View style={styles.mainContent} className="flex-1 justify-center items-center px-4">
                    {/* Image Container */}
                    <View className="bg-orange-400 rounded-full p-10">
                        <Image
                            source={require('@/assets/images/pesc.png')}
                            className="w-40 h-40"
                            resizeMode="contain"
                        />
                    </View>

                    {/* Text */}
                    <Text className="text-white text-2xl font-bold mt-8 text-center">
                        Prepare for Eye Test Photo
                    </Text>
                    <Text className="text-gray-300 mt-4 text-center">
                        Keep eyes open & avoid blinking for better result!
                    </Text>

                    {/* Button */}
                    <TouchableOpacity 
                        className="bg-orange-500 rounded-full py-3 px-8 mt-12 w-full"
                        onPress={() => setModalVisible(true)}
                    >
                        <Text className="text-white font-bold text-center">Ready</Text>
                    </TouchableOpacity>
                </View>

                {/* Modal/Popup - Only shown when modalVisible is true */}
                {modalVisible && (
                    <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                        <View className="absolute bottom-0 left-0 right-0">
                            <View className="bg-white rounded-t-3xl px-6 py-6">
                                <Text className="text-lg font-bold mb-4">Add a record</Text>

                                {/* Option 1: Take a photo */}
                                <TouchableOpacity 
                                    className="flex-row items-center py-3"
                                    onPress={handleTakePhoto}
                                >
                                    <Image
                                        source={require('@/assets/images/camera.png')}
                                        className="w-6 h-6 mr-3"
                                        resizeMode="contain"
                                    />
                                    <Text className="text-base">Take a photo</Text>
                                </TouchableOpacity>

                                {/* Option 2: Upload from gallery */}
                                <TouchableOpacity 
                                    className="flex-row items-center py-3"
                                    onPress={handleChooseFromGallery}
                                >
                                    <Image
                                        source={require('@/assets/images/gallery.png')}
                                        className="w-6 h-6 mr-3"
                                        resizeMode="contain"
                                    />
                                    <Text className="text-base">Upload from gallery</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                )}
            </View>
        </TouchableWithoutFeedback>
        </>
    );
}

const styles = StyleSheet.create({
    mainContent: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    }
});
