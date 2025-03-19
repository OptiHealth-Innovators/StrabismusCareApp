import React, { useState } from "react";
import Toast from "react-native-toast-message";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ImageSourcePropType,
  Platform,
  ScrollView,
  Modal,
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome } from "@expo/vector-icons";
import Constants from "expo-constants";

const ENV_BACKEND_URL = Constants.expoConfig?.extra?.ENV_BACKEND_URL_LOCAL;

interface PasswordRequirement {
  test: RegExp;
  text: string;
}

const SignUp: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [emailError, setEmailError] = useState<string>("");
  const [roleError, setRoleError] = useState<string>("");

  // Doctor specific fields
  const [showDoctorFields, setShowDoctorFields] = useState<boolean>(false);
  const [contact, setContact] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [specialty, setSpecialty] = useState<string>("Ophthalmologist");
  const [tenure, setTenure] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [education, setEducation] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // iOS Picker modal state
  const [showRolePicker, setShowRolePicker] = useState<boolean>(false);
  const [showSpecializationPicker, setShowSpecialtyPicker] =
    useState<boolean>(false);
  const [tempRole, setTempRole] = useState<string>("");
  const [tempSpecialty, setTempSpecialty] = useState<string>("Ophthalmologist");

  interface SaveUserData {
    (userId: string): Promise<void>;
  }

  const saveUserData: SaveUserData = async (userId) => {
    try {
      await AsyncStorage.setItem("user", userId);
      const userData = await AsyncStorage.getItem("user");
      console.log("User data saved to AsyncStorage:", userData);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex: RegExp =
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }

    setEmailError("");
    return true;
  };

  const validateRole = (role: string): boolean => {
    if (!role) {
      setRoleError("Please select your role");
      return false;
    }

    setRoleError("");
    return true;
  };

  const validatePassword = (password: string): boolean => {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Password must contain at least one special character");
    }

    setPasswordErrors(errors);
    return errors.length === 0;
  };

  const handlePasswordChange = (text: string): void => {
    setPassword(text);
    validatePassword(text);
  };

  const handleEmailChange = (text: string): void => {
    setEmail(text);
    validateEmail(text);
  };

  const handleRoleChange = (value: string): void => {
    if (Platform.OS === "ios") {
      setTempRole(value);
    } else {
      setRole(value);
      validateRole(value);
      setShowDoctorFields(value === "doctor");
    }
  };

  const confirmRoleSelection = (): void => {
    setRole(tempRole);
    validateRole(tempRole);
    setShowDoctorFields(tempRole === "doctor");
    setShowRolePicker(false);
  };

  const confirmSpecialtySelection = (): void => {
    setSpecialty(tempSpecialty);
    setShowSpecialtyPicker(false);
  };

  interface RegisterResponse {
    message?: string;
    userId?: string;
    success?: boolean;
  }

  const createAccount = async (): Promise<void> => {
    // Validate name
    if (!name.trim()) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter your name",
      });
      return;
    }

    // Validate email
    if (!validateEmail(email.trim())) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: emailError,
      });
      return;
    }

    // Validate role
    if (!validateRole(role)) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select your role",
      });
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fix password requirements",
      });
      return;
    }

    // Validate doctor fields if role is doctor
    if (role === "doctor") {
      if (!contact.trim()) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Please enter your contact information",
        });
        return;
      }

      if (!address.trim()) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Please enter your address",
        });
        return;
      }

      if (!tenure.trim()) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Please enter your practicing tenure",
        });
        return;
      }

      if (!dateOfBirth.trim()) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Please enter your date of birth",
        });
        return;
      }
    }

    setLoading(true);

    try {
      // Create the request body with conditional doctor fields
      const requestBody: any = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role: role,
        password,
      };

      // Add doctor-specific fields if role is doctor
      if (role === "doctor") {
        requestBody.doctorInfo = {
          contact: contact.trim(),
          address: address.trim(),
          specialty,
          tenure: tenure.trim(),
          dateOfBirth: dateOfBirth.trim(),
          education: education.trim(),
          description,
        };
      }

      // Debug log to verify the URL being used
      console.log("Making request to:", `${ENV_BACKEND_URL}/register`);

      const response = await fetch(`${ENV_BACKEND_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data: RegisterResponse = await response.json();

      if (data.success) {
        const user = data.userId;
        if (user) {
          saveUserData(user);
        }
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Account created successfully!",
        });

        setName("");
        setEmail("");
        setRole("");
        setPassword("");
        setPasswordErrors([]);
        setEmailError("");
        setRoleError("");
        setContact("");
        setAddress("");
        setSpecialty("Dentist");
        setTenure("");
        setDateOfBirth("");
        setShowDoctorFields(false);

        setTimeout(() => {
          router.push("/(tabs)");
        }, 1000);
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: data.message || "Registration failed",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Network error. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const passwordRequirements: PasswordRequirement[] = [
    { test: /.{8,}/, text: "At least 8 characters" },
    { test: /[A-Z]/, text: "One uppercase letter" },
    { test: /[a-z]/, text: "One lowercase letter" },
    { test: /[0-9]/, text: "One number" },
    { test: /[!@#$%^&*(),.?":{}|<>]/, text: "One special character" },
  ];

  const eyeIcon: ImageSourcePropType = require("@/assets/images/eye.png");
  const logoIcon: ImageSourcePropType = require("../../assets/images/icon-hz.png");
  const calendarIcon: ImageSourcePropType = require("../../assets/images/calender.png");

  // iOS Role Picker Modal
  const renderRolePickerModal = () => {
    return (
      <Modal visible={showRolePicker} transparent={true} animationType="slide">
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", flex: 1 }}
            onTouchEnd={() => setShowRolePicker(false)}
          />
          <View
            style={{
              backgroundColor: "white",
              padding: 16,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 15,
              }}
            >
              <TouchableOpacity onPress={() => setShowRolePicker(false)}>
                <Text
                  style={{ color: "#ff7900", fontSize: 16, fontWeight: "500" }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmRoleSelection}>
                <Text
                  style={{ color: "#ff7900", fontSize: 16, fontWeight: "500" }}
                >
                  Done
                </Text>
              </TouchableOpacity>
            </View>
            <Picker
              selectedValue={tempRole}
              onValueChange={handleRoleChange}
              enabled={!loading}
              itemStyle={{ height: 120, fontSize: 16 }}
            >
              <Picker.Item label="Select your role" value="" color="#aaa" />
              <Picker.Item label="Doctor" value="doctor" />
              <Picker.Item label="Patient" value="patient" />
            </Picker>
          </View>
        </View>
      </Modal>
    );
  };

  // iOS Specialization Picker Modal
  const renderSpecialtyPickerModal = () => {
    return (
      <Modal
        visible={showSpecializationPicker}
        transparent={true}
        animationType="slide"
      >
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", flex: 1 }}
            onTouchEnd={() => setShowSpecialtyPicker(false)}
          />
          <View
            style={{
              backgroundColor: "white",
              padding: 16,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 15,
              }}
            >
              <TouchableOpacity onPress={() => setShowSpecialtyPicker(false)}>
                <Text
                  style={{ color: "#ff7900", fontSize: 16, fontWeight: "500" }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmSpecialtySelection}>
                <Text
                  style={{ color: "#ff7900", fontSize: 16, fontWeight: "500" }}
                >
                  Done
                </Text>
              </TouchableOpacity>
            </View>
            <Picker
              selectedValue={tempSpecialty}
              onValueChange={(value) => setTempSpecialty(value)}
              enabled={!loading}
              itemStyle={{ height: 120, fontSize: 16 }}
            >
              <Picker.Item label="Ophthalmologist" value="Ophthalmologist" />
              <Picker.Item label="Optometrist" value="Optometrist" />
              <Picker.Item label="Optician" value="Optician" />
              <Picker.Item
                label="Retina Specialist"
                value="Retina Specialist"
              />
              <Picker.Item
                label="Glaucoma Specialist"
                value="Glaucoma Specialist"
              />
              <Picker.Item
                label="Pediatric Ophthalmologist"
                value="Pediatric Ophthalmologist"
              />
            </Picker>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <ScrollView className="pt-20 bg-white">
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <View className="w-4/5">
          <Image
            source={logoIcon}
            className="mt-4 mb-4 h-8 w-[230px] self-center"
          />

          <View className="mb-8">
            <Text className="text-2xl text-[#240046] pt-4 font-manrope-semibold text-center">
              Create a new account
            </Text>
          </View>

          <View className="w-full mb-8">
            <View className="mb-6">
              <Text className="text-sm text-[#525a66] mb-2 font-normal">
                Name
              </Text>
              <TextInput
                className="border border-[#e9e9e9] rounded-md px-4 py-3 text-base text-black"
                placeholder="Enter your name"
                placeholderTextColor="#aaa"
                value={name}
                onChangeText={setName}
                editable={!loading}
                autoCapitalize="words"
              />
            </View>

            <View className="mb-6">
              <Text className="text-sm text-[#525a66] mb-2 font-normal">
                Email
              </Text>
              <TextInput
                className={`border rounded-md px-4 py-3 text-base text-black ${
                  emailError ? "border-red-500" : "border-[#e9e9e9]"
                }`}
                placeholder="Enter your email"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={handleEmailChange}
                editable={!loading}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
              />
              {emailError ? (
                <Text className="text-red-500 text-sm mt-1">{emailError}</Text>
              ) : null}
            </View>

            {/* Role Selection */}
            <View className="mb-6">
              <Text className="text-sm text-[#525a66] mb-2 font-normal">
                Role
              </Text>
              {Platform.OS === "ios" ? (
                <TouchableOpacity
                  className={`border rounded-md px-4 py-3 ${
                    roleError ? "border-red-500" : "border-[#e9e9e9]"
                  }`}
                  onPress={() => setShowRolePicker(true)}
                  disabled={loading}
                >
                  <Text
                    className={`text-base ${
                      role ? "text-black" : "text-[#aaa]"
                    }`}
                  >
                    {role || "Select your role"}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View
                  className={`border rounded-md overflow-hidden ${
                    roleError ? "border-red-500" : "border-[#e9e9e9]"
                  }`}
                >
                  <Picker
                    selectedValue={role}
                    onValueChange={handleRoleChange}
                    enabled={!loading}
                    style={{ height: 50 }}
                    mode="dropdown"
                  >
                    <Picker.Item
                      label="Select your role"
                      value=""
                      enabled={false}
                      color="#aaa"
                    />
                    <Picker.Item label="Doctor" value="doctor" />
                    <Picker.Item label="Patient" value="patient" />
                  </Picker>
                </View>
              )}
              {roleError ? (
                <Text className="text-red-500 text-sm mt-1">{roleError}</Text>
              ) : null}
            </View>

            {/* Doctor-specific fields */}
            {showDoctorFields && (
              <>
                {/* Contact Information */}
                <View className="mb-6">
                  <Text className="text-sm text-[#525a66] mb-2 font-normal">
                    Contact
                  </Text>
                  <TextInput
                    className="border border-[#e9e9e9] rounded-md px-4 py-3 text-base text-black"
                    placeholder="(555) 555-1234"
                    placeholderTextColor="#aaa"
                    value={contact}
                    onChangeText={setContact}
                    editable={!loading}
                    keyboardType="phone-pad"
                  />
                </View>

                {/* Address */}
                <View className="mb-6">
                  <Text className="text-sm text-[#525a66] mb-2 font-normal">
                    Address
                  </Text>
                  <TextInput
                    className="border border-[#e9e9e9] rounded-md px-4 py-3 text-base text-black"
                    placeholder="Enter your address"
                    placeholderTextColor="#aaa"
                    value={address}
                    onChangeText={setAddress}
                    editable={!loading}
                  />
                </View>

                {/* Specialization */}
                <View className="mb-6">
                  <Text className="text-sm text-[#525a66] mb-2 font-normal">
                    Specialization
                  </Text>
                  {Platform.OS === "ios" ? (
                    <TouchableOpacity
                      className="border border-[#e9e9e9] rounded-md px-4 py-3"
                      onPress={() => setShowSpecialtyPicker(true)}
                      disabled={loading}
                    >
                      <Text className="text-base text-black">{specialty}</Text>
                    </TouchableOpacity>
                  ) : (
                    <View className="border border-[#e9e9e9] rounded-md overflow-hidden">
                      <Picker
                        selectedValue={specialty}
                        onValueChange={(value) => setSpecialty(value)}
                        enabled={!loading}
                        style={{ height: 50 }}
                        mode="dropdown"
                      >
                        <Picker.Item
                          label="Ophthalmologist"
                          value="Ophthalmologist"
                        />
                        <Picker.Item label="Optometrist" value="Optometrist" />
                        <Picker.Item label="Optician" value="Optician" />
                        <Picker.Item
                          label="Retina Specialist"
                          value="Retina Specialist"
                        />
                        <Picker.Item
                          label="Glaucoma Specialist"
                          value="Glaucoma Specialist"
                        />
                        <Picker.Item
                          label="Pediatric Ophthalmologist"
                          value="Pediatric Ophthalmologist"
                        />
                      </Picker>
                    </View>
                  )}
                </View>

                {/* Practicing Tenure */}
                <View className="mb-6">
                  <Text className="text-sm text-[#525a66] mb-2 font-normal">
                    Practicing tenure
                  </Text>
                  <TextInput
                    className="border border-[#e9e9e9] rounded-md px-4 py-3 text-base text-black"
                    placeholder="e.g., 5 years"
                    placeholderTextColor="#aaa"
                    value={tenure}
                    onChangeText={setTenure}
                    editable={!loading}
                  />
                </View>

                {/* Date of Birth */}
                <View className="mb-6">
                  <Text className="text-sm text-[#525a66] mb-2 font-normal">
                    Date of Birth
                  </Text>
                  <View className="relative">
                    <TextInput
                      className="border border-[#e9e9e9] rounded-md px-4 py-3 text-base text-black"
                      placeholder="DD MMM YYYY (e.g., 17 Aug 1993)"
                      placeholderTextColor="#aaa"
                      value={dateOfBirth}
                      onChangeText={setDateOfBirth}
                      editable={!loading}
                    />
                    {/* <Image
                      source={calendarIcon}
                      className="absolute right-3 top-3 w-6 h-6"
                    /> */}
                  </View>
                </View>

                {/* Education */}
                <View className="mb-6">
                  <Text className="text-sm text-[#525a66] mb-2 font-normal">
                    Education
                  </Text>
                  <TextInput
                    className="border border-[#e9e9e9] rounded-md px-4 py-3 text-base text-black"
                    placeholder="Enter your education details"
                    placeholderTextColor="#aaa"
                    value={education}
                    onChangeText={setEducation}
                    editable={!loading}
                  />
                </View>

                {/* About Me */}
                <View className="mb-6">
                  <Text className="text-sm text-[#525a66] mb-2 font-normal">
                    About Me
                  </Text>
                  <TextInput
                    className="border border-[#e9e9e9] rounded-md px-4 py-3 text-base text-black"
                    placeholder="Tell us about yourself"
                    placeholderTextColor="#aaa"
                    value={description}
                    onChangeText={setDescription}
                    editable={!loading}
                    multiline={true}
                    numberOfLines={4}
                  />
                </View>
              </>
            )}

            <View className="mb-6 relative">
              <Text className="text-sm text-[#525a66] mb-2 font-normal">
                Password
              </Text>
              <TextInput
                className={`border rounded-md px-4 py-3 text-base text-black ${
                  passwordErrors.length > 0
                    ? "border-red-500"
                    : "border-[#e9e9e9]"
                }`}
                placeholder="Enter your password"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={handlePasswordChange}
                editable={!loading}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute right-3 top-10"
                disabled={loading}
              >
                <Image
                  className="w-6 h-6"
                  source={eyeIcon}
                  style={{ opacity: loading ? 0.5 : 1 }}
                />
              </TouchableOpacity>

              {/* Password requirements */}
              {password.length > 0 && (
                <View className="mt-2">
                  <Text className="text-sm text-[#525a66] mb-1">
                    Password must contain:
                  </Text>
                  {passwordRequirements.map((requirement, index) => (
                    <View key={index} className="flex-row items-center">
                      <Text
                        className={`text-sm ${
                          requirement.test.test(password)
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {requirement.test.test(password) ? "✓" : "×"}{" "}
                        {requirement.text}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>

            <TouchableOpacity
              className={`bg-[#ff7900] py-3 items-center rounded mb-4 ${
                loading || passwordErrors.length > 0 || !!emailError || !role
                  ? "opacity-50"
                  : ""
              }`}
              onPress={createAccount}
              disabled={
                loading || passwordErrors.length > 0 || !!emailError || !role
              }
            >
              {loading ? (
                <View className="flex-row items-center">
                  <ActivityIndicator color="white" style={{ marginRight: 8 }} />
                  <Text className="text-lg text-white font-manrope-medium">
                    Creating account...
                  </Text>
                </View>
              ) : (
                <Text className="text-lg text-white font-manrope-medium">
                  Sign up
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center mb-40">
            <Text className="text-lg text-[#525a66] text-center font-manrope-regular font-[800]">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/")}
              disabled={loading}
            >
              <Text
                className={`text-lg text-[#ff7900] font-manrope-regular font-[800] ${
                  loading ? "opacity-50" : ""
                }`}
              >
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* iOS Picker Modals */}
        {renderRolePickerModal()}
        {renderSpecialtyPickerModal()}

        <Toast />
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUp;
