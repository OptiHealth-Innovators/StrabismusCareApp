import { Link, Stack } from 'expo-router';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

const TestChooseScreen = () => {
  return (
    <View className="flex-1 bg-gray-100">
      <Stack.Screen options={{
                      headerTitle: "",
                      headerStyle: {
                        backgroundColor: 'white',
                      },
                      headerTintColor: '#4338ca',
                      headerBackTitle: "Back",
                    }} />
      {/* <StatusBar barStyle="dark-content" /> */}

      {/* Main Content */}
      <View className="flex-1 justify-center items-center px-4" style={styles.gradientBackground}>
        <View className="bg-[#FF7900] rounded-full p-8">
                  <Image
                    source={require('@/assets/images/eye.png')}
                    className="w-32 h-32"
                    resizeMode="contain"
                  />
                </View>

        <Text className="text-2xl font-bold text-gray-800 mt-8 text-center">
          Prepare for Eye Test Photo
        </Text>
        <Text className="text-gray-600 mt-2 text-center">
          Keep eyes open & avoid blinking for better result!
        </Text>

        <TouchableOpacity className="bg-amber-600 py-3 px-8 rounded-full mt-8">
          <Text className="text-white font-semibold">Ready</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <View className="bg-white rounded-t-3xl py-6 px-4 absolute bottom-0 left-0 right-0">
        <View className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
        <Text className="text-lg font-bold text-gray-800 mb-4">Add a record</Text>

        <Link href="/test/TestCamera">
        <TouchableOpacity className="flex-row items-center mb-4">
          <Image
            source={require('@/assets/images/camera.png')} 
            className="w-6 h-6 mr-4"
            resizeMode="contain"
          />
          <Text className="text-gray-700">Take a photo</Text>
        </TouchableOpacity>
        </Link>

        <TouchableOpacity className="flex-row items-center">    
          <Image
            source={require('@/assets/images/gallery.png')}
            className="w-6 h-6 mr-4"
            resizeMode="contain"
          />
          <Text className="text-gray-700">Upload from gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    backgroundColor: '#d4d4d4', // A light gray, adjust as needed
  },
});

export default TestChooseScreen;

