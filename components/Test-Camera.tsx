import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const TestCamera = ({ onCapture }: { onCapture: () => void }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/doc.png")}
          style={styles.image}
        />
      </View>

      <TouchableOpacity style={styles.captureButton} onPress={onCapture}>
        <Text style={styles.captureButtonText}>Capture</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TestCamera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  imageContainer: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 5,
    borderColor: "#FF6F00",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  captureButton: {
    backgroundColor: "#FF6F00",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  captureButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
