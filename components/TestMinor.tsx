import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function TestResultScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* Icon */}
      <View style={styles.iconContainer}>
        <Image
          source={require("@/assets/images/doc-f.png")}
          style={styles.icon}
        />
      </View>

      <Text style={styles.title}>Minor</Text>

      <Text style={styles.subtitle}>Test Successfully Completed</Text>

      <Text style={styles.description}>
        Vision is one of our most valuable senses—preserving it through proper
        eye care is an investment in a lifetime of clarity and sight.
      </Text>

      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => navigation.navigate("TestMajor")}
      >
        <Text style={styles.mainButtonText}>Consult a Doctor</Text>
      </TouchableOpacity>

      <View style={styles.footerButtonsContainer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate("TestAgain")}
        >
          <Text style={styles.footerButtonText}>Test Again</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate("SaveTest")}
        >
          <Text style={styles.footerButtonText}>Save Test</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate("Share")}
        >
          <Text style={styles.footerButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
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
    shadowOpacity: 0.4,
    shadowRadius: 4,
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
  mainButton: {
    backgroundColor: "#FF6F00",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
    width: "100%",
  },
  mainButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  footerButtonsContainer: {
    flexDirection: "row",
    width: "100%",
  },
  footerButton: {
    flex: 1,
    alignItems: "center",
  },
  footerButtonText: {
    fontSize: 10,
    color: "#555",
  },
});
