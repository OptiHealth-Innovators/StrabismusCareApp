import { MaterialIcons, FontAwesome, Feather } from "@expo/vector-icons";
import DoctorCard from "@/components/DoctorCard";
import HealthArticle from "@/components/HealthArticle";
import React from "react";
import Testes from "@/components/Testes";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import Tests from "@/components/Testes";
import { Link } from "expo-router";

const handleBookAppointment = () => {
  alert("Appointment Booked");
};

const Dashboard: React.FC = () => {
  return (
    <View className="flex-1 bg-[#2E004F]">
      <ScrollView className="pt-4 mb-16">
        <View className="p-4 pt-8">
          <View className="flex-row items-center pt-5">
            <Image
              source={require("@/assets/images/doc.png")}
              className="w-12 h-12 rounded-full mr-4"
            />
            <View className="flex-1">
              <Text className="text-[#B1A5A5] text-base">
                Hi, Welcome Back!
              </Text>
              <Text className="text-white text-lg font-bold">
                John Doe William
              </Text>
            </View>
            <Image
              source={require("@/assets/images/notification.png")}
              className="absolute right-3 w-6 h-6"
            />
          </View>
          <View className="flex-row bg-[#C4521A] p-5 rounded-lg items-center mt-5 mb-5">
            {/* Text Section */}
            <View className="flex-1 mr-7">
              <Text className="text-2xl font-bold text-white mb-2">
                Medical Center
              </Text>
              <Text className="text-xs text-white leading-5">
                Eyes are essential to how we experience the world. Proper eye
                care is the foundation for preserving sight and ensuring a
                lifetime of clarity and vision.
              </Text>
            </View>

            <Image
              source={require("@/assets/images/doc-f.png")}
              className="w-40 h-40 rounded-lg -ml-10 -mb-5"
            />
          </View>
        </View>

        {/* Main Content */}
        <View className="p-4 bg-white rounded-t-2xl">
          <View>
            <Testes />
          </View>

          {/* Top Doctors Section */}
          <View className="flex-row justify-between items-center mb-4 mt-2">
            <Text className="text-lg  font-bold text-[#333333]">
              Top Doctors
            </Text>
            {/* <TouchableOpacity>
              <Text className="text-[#FF7900] font-[16] pr-6">See All</Text>
            </TouchableOpacity> */}
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            <DoctorCard
              name="Dr. John Tauhid"
              specialty="Cardiologist"
              rating={4.8}
              date="16th Jan 2025"
              time="10:30 AM"
              onPress={handleBookAppointment}
            />

            <DoctorCard
              name="Dr. John Doe"
              specialty="Cardiologist"
              rating={4.8}
              date="16th Jan 2025"
              time="10:30 AM"
              onPress={handleBookAppointment}
            />
          </ScrollView>

          <HealthArticle />

          <View className="p-4 bg-white">
            <Text className="text-lg font-bold text-[#333333] mb-5 mt-4 -ml-4">
              Book Appointments in 3 easy steps
            </Text>

            {/* Step 1 */}
            <View className="flex-row items-center mb-3">
              <Image
                source={require("@/assets/images/search.png")}
                className="w-10 h-10"
              />
              <Text className="ml-3">
                Search for doctors by speciality, service or disease.
              </Text>
            </View>

            {/* Step 2 */}
            <View className="flex-row items-center mb-3">
              <Image
                source={require("@/assets/images/bookmark.png")}
                className="w-10 h-10"
              />
              <Text className="ml-3">
                Book and confirm appointment within seconds.
              </Text>
            </View>

            {/* Step 3 */}
            <View className="flex-row items-center">
              <Image
                source={require("@/assets/images/check.png")}
                className="w-10 h-10"
              />

              <Text className="ml-3">
                Select based on experience, free or ratings.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;

// import { useState } from 'react';
// import {
// 	Text,
// 	View,
// 	StyleSheet,
// 	KeyboardAvoidingView,
// 	TextInput,
// 	Button,
// 	ActivityIndicator
// } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import { FirebaseError } from 'firebase/app';
// import React from 'react';

// export default function Index() {
// 	const [email, setEmail] = useState('');
// 	const [password, setPassword] = useState('');
// 	const [loading, setLoading] = useState(false);

// 	const signUp = async () => {
// 		setLoading(true);
// 		try {
// 			await auth().createUserWithEmailAndPassword(email, password);
// 			alert('Check your emails!');
// 		} catch (e: any) {
// 			const err = e as FirebaseError;
// 			alert('Registration failed: ' + err.message);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	const signIn = async () => {
// 		setLoading(true);
// 		try {
// 			await auth().signInWithEmailAndPassword(email, password);
// 		} catch (e: any) {
// 			const err = e as FirebaseError;
// 			alert('Sign in failed: ' + err.message);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	return (
// 		<View style={styles.container}>
// 			<KeyboardAvoidingView behavior="padding">
// 				<TextInput
// 					style={styles.input}
// 					value={email}
// 					onChangeText={setEmail}
// 					autoCapitalize="none"
// 					keyboardType="email-address"
// 					placeholder="Email"
// 				/>
// 				<TextInput
// 					style={styles.input}
// 					value={password}
// 					onChangeText={setPassword}
// 					secureTextEntry
// 					placeholder="Password"
// 				/>
// 				{loading ? (
// 					<ActivityIndicator size={'small'} style={{ margin: 28 }} />
// 				) : (
// 					<>
// 						<Button onPress={signIn} title="Login" />
// 						<Button onPress={signUp} title="Create account" />
// 					</>
// 				)}
// 			</KeyboardAvoidingView>
// 		</View>
// 	);
// }

// const styles = StyleSheet.create({
// 	container: {
// 		marginHorizontal: 20,
// 		flex: 1,
// 		justifyContent: 'center'
// 	},
// 	input: {
// 		marginVertical: 4,
// 		height: 50,
// 		borderWidth: 1,
// 		borderRadius: 4,
// 		padding: 10,
// 		backgroundColor: '#fff'
// 	}
// });
