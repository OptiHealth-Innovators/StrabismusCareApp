import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';

export default function AddAltTestImages() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="flex-1 bg-purple-800">
      {/* Status Bar Placeholder */}
      <View className="pt-10" />

      {/* Top Bar */}
      <View className="flex-row justify-between items-center px-4 mt-4">
        <View className="flex-row items-center">
          <TouchableOpacity>
            <Text className="text-white text-xl mr-2">{'<'}</Text>
          </TouchableOpacity>
          <Text className="text-white text-xl">Add Images</Text>
        </View>
        <Text className="text-gray-300">4:20</Text>
        {/*  Simulated Phone Battery/Wifi Status Bar */}
        <View>
          <Text className="text-gray-300 text-right">
            <Text>&#x27e1; </Text>
            <Text>&#x1F873; </Text>
            <Text>&#x1F50B;</Text>
          </Text>
        </View>
      </View>

      {/* Image Grid */}
      <View className="flex-row justify-between px-4 mt-4">
        <View className="w-1/2 pr-2">
          <Image
            source={require('./assets/images/face_placeholder.jpg')} // Placeholder
            className="w-full aspect-square rounded-lg"
            resizeMode="cover"
          />
        </View>
        <View className="w-1/2 pl-2">
          <TouchableOpacity
            className="w-full aspect-square rounded-lg bg-orange-200 justify-center items-center"
            onPress={() => setModalVisible(true)} // Show modal on press
          >
            <Text className="text-orange-500 text-4xl">+</Text>
            <Text className="text-orange-500 text-sm">Add more</Text>
            <Text className="text-orange-500 text-sm">images</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 justify-end">
          <View className="bg-white rounded-t-3xl py-4 px-6">
          <View style={styles.modalLine} />
            <Text className="text-xl font-bold text-center mt-4 mb-6">Add a record</Text>
            <TouchableOpacity className="flex-row items-center mb-4">
              <Text className="text-2xl mr-4">&#x1F4F7;</Text> {/* Camera Icon */}
              <Text className="text-lg">Take a photo</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-2xl mr-4">&#x1F4C1;</Text> {/* Gallery Icon */}
              <Text className="text-lg">Upload from gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    modalLine: {
        width: 40,
        height: 5,
        backgroundColor: 'gray',
        borderRadius: 5,
        alignSelf: 'center',
      },
})
