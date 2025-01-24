import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function OnboardingScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Group 50 Image */}
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.groupImage}
      />

      {/* Ellipse 17 */}
      <Image
        source={require("@/assets/images/ball-up.png")}
        style={styles.ellipse17}
      />

      {/* Ellipse 20 */}
      <Image
        source={require("@/assets/images/ball-down.png")}
        style={styles.ellipse20}
      />

      <TouchableOpacity
        style={styles.mainButton}
        //onPress={() => navigation.navigate("DashBoard")}
      >
        <Text style={styles.mainButtonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    position: "relative",
  },
  groupImage: {
    opacity: 1,
    height: 150,
    width: 150,
    position: "absolute",
    left: 120,
    top: 325,
  },
  ellipse17: {
    width: 234,
    height: 234,
    position: "absolute",
    left: -53,
    top: 648,
  },
  ellipse20: {
    width: 234,
    height: 234,
    position: "absolute",
    left: 210,
    top: -38,
  },
  mainButton: {
    backgroundColor: "#FF6F00",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
    width: "90%",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  mainButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
