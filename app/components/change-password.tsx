import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const ChangePassword: React.FC = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <Image
          style={styles.backArrow}
          source={require("@/assets/images/back-button.png")}
        />
        <Image
          source={require("@/assets/images/logo-hz.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Change Password</Text>
          <Text style={styles.subtitle}>
            Create a new, strong password that you don&apos;t use before
          </Text>
        </View>

        <View style={styles.passwordFields}>
        <View style={styles.textField}>
            <TextInput
              placeholder="Email"
              style={styles.input}
            />
            </View>
          {/* Create Password */}
          <View style={styles.textField}>
            <TextInput
              placeholder="Current password"
              secureTextEntry={true}
              style={styles.input}
            />
            <TouchableOpacity style={styles.eyeIcon}>
              <Image
                source={require("@/assets/images/eye.png")}
                style={styles.eyeIconImage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.textField}>
            <TextInput
              placeholder="Create password"
              secureTextEntry={true}
              style={styles.input}
            />
            <TouchableOpacity style={styles.eyeIcon}>
              <Image
                source={require("@/assets/images/eye.png")}
                style={styles.eyeIconImage}
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <View style={styles.textField}>
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry={true}
              style={styles.input}
            />
            <TouchableOpacity style={styles.eyeIcon}>
              <Image
                source={require("@/assets/images/eye.png")}
                style={styles.eyeIconImage}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.supportingText}>At least 8 characters</Text>
        </View>

        {/* Save Password Button */}
        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.saveButtonText}>Save Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 32,
  },
  logo: {
    width: 230,
    height: 33,
    marginLeft: 8,
  },
  backArrow: {
    width: 32,
    height: 32,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 34,
  },
  header: {
    marginBottom: 36,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#240046",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#525a66",
    marginTop: 4,
  },
  passwordFields: {
    marginBottom: 24,
  },
  textField: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#79747e",
    borderRadius: 4,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    height: 56,
    fontSize: 16,
    color: "#1c1b1f",
  },
  eyeIcon: {
    padding: 12,
  },
  eyeIconImage: {
    width: 24,
    height: 24,
  },
  supportingText: {
    fontSize: 12,
    color: "#1c1b1f",
    marginTop: 4,
  },
  saveButton: {
    position: "absolute",
    bottom: 20,
    left: 20, 
    right: 20,
    backgroundColor: "#ff6d00",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    padding: 15,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default ChangePassword;
