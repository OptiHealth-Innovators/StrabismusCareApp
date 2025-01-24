import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";

export default function TestResultScreen( {navigation}: any) {
  return (
    <View style={styles.container}>
      {/* Icon */}
      <View style={styles.iconContainer}>
        <Image
          source={require("@/assets/images/doc-f.png")}
          style={styles.icon}
        />
      </View>

      {/* Title */}
      <Text style={styles.title}>Normal</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>Test Successfully Completed</Text>

      <Text style={styles.description}>
        Eyes are the windows to the soul, and proper eye care is the key to
        preserving the clarity of that vision. Investing in your eye health
        today ensures a clearer tomorrow.
      </Text>

      {/* Button */}
      <TouchableOpacity style={styles.button}
      onPress={() => navigation.navigate("TestMinor")}>
        <Text style={styles.buttonText}>Articles</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footer}>Share the articles and spread awareness</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginHorizontal: 40,
    marginVertical: 140,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4, // Shadow transparency
    shadowRadius: 4, // Shadow blur radius
    elevation: 5,
  },
  iconContainer: {
    marginBottom: 20,
  },
  icon: {
    width: 156,
    height: 156,
    borderRadius: 100,
    backgroundColor: "#DFF6DD",
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#FF6F00", // Orange color
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: "#000",
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#FF6F00",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  footer: {
    fontSize: 10,
    color: "#888",
    textAlign: "center",
  },
});
