import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function TestChoose() {
    return (
        <View className="flex-1 ">

            {/* Main Content (Blurred Background - Placeholder) */}
            <View style={styles.mainContent} className="flex-1 justify-center items-center px-4">
                {/* Image Container */}
                <View className="bg-orange-400 rounded-full p-8">
                    <Image
                        source={require('@/assets/images/eye.png')} // Placeholder
                        className="w-40 h-40" // Adjusted size
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
                <TouchableOpacity className="bg-orange-500 rounded-full py-3 px-8 mt-12 w-full">
                    <Text className="text-white font-bold text-center">Ready</Text>
                </TouchableOpacity>
            </View>

            {/* Modal/Popup */}
            <View style={styles.modalContainer} className="absolute bottom-0 left-0 right-0">
                <View className="bg-white rounded-t-3xl px-6 py-6">
                    <Text className="text-lg font-bold mb-4">Add a record</Text>

                    {/* Option 1: Take a photo */}
                    <TouchableOpacity className="flex-row items-center py-3">
                        <Image
                            source={require('@/assets/images/camera.png')} // Placeholder
                            className="w-6 h-6 mr-3"
                            resizeMode="contain"
                        />
                        <Text className="text-base">Take a photo</Text>
                    </TouchableOpacity>

                    {/* Option 2: Upload from gallery */}
                    <TouchableOpacity className="flex-row items-center py-3">
                        <Image
                            source={require('@/assets/images/gallery.png')} // Placeholder
                            className="w-6 h-6 mr-3"
                            resizeMode="contain"
                        />
                        <Text className="text-base">Upload from gallery</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContent: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black for blur placeholder
    },
    modalContainer: {
        // No additional styles needed here, Tailwind handles positioning
    },
});
