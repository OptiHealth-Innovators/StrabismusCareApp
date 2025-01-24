import { MaterialIcons, FontAwesome, Feather } from "@expo/vector-icons";
import DoctorCard from "@/components/DoctorCard";
import HealthArticle from "@/components/HealthArticle";
import React from "react";
import Testes from "@/components/Testes"
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import TestsComponent from "@/components/Testes";

const handleBookAppointment = () => {
  alert("Book Appointment");
};

const Dashboard: React.FC = () => {
  return (
    <View className="flex-1 bg-[#2E004F]">
      <ScrollView className="">
        {/* Header Section */}
        <View className="p-4 pt-8">
          {/* User Greeting */}
          <View className="flex-row items-center">
            <Image
              source={require("@/assets/images/doc.png")}
              className="w-12 h-12 rounded-full mr-4"
            />
            <View>
              <Text className="text-[#B1A5A5] text-base">Hi, Welcome Back,</Text>
              <Text className="text-white text-lg font-bold">John Doe William</Text>
            </View>
          </View>
          <View className="flex-row bg-[#C4521A] p-5 rounded-lg items-center mt-5 mb-5">
            {/* Text Section */}
            <View className="flex-1 mr-7">
              <Text className="text-2xl font-bold text-white mb-2">Medical Center</Text>
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
					  <Testes/>
</View>

          {/* Top Doctors Section */}
          <View className="flex-row justify-between items-center mb-4 mt-2">
            <Text className="text-lg font-bold text-[#333333]">Top Doctors</Text>
            <TouchableOpacity>
              <Text className="text-[#6200EE] text-sm pr-2">See All</Text>
            </TouchableOpacity>
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
            <Text className="text-lg font-normal text-[#333333] mb-5 mt-4 -ml-4">
              Book Appointments in <Text className="font-bold">3 easy steps</Text>
            </Text>

            {/* Step 1 */}
            <View className="flex-row items-center mb-3">
              <View className="w-10 h-10 bg-[#FF6A0E] rounded-full justify-center items-center">
                <Feather name="search" size={20} color="#FFFFFF" />
              </View>
              <Text className="ml-3">
                Search for doctors by{" "}
                <Text className="font-bold">speciality</Text>,{" "}
                <Text className="font-bold">service</Text> or{" "}
                <Text className="font-bold">disease</Text>
              </Text>
            </View>

            {/* Step 2 */}
            <View className="flex-row items-center mb-3">
              <View className="w-10 h-10 bg-[#FF6A0E] rounded-full justify-center items-center">
                <MaterialIcons
                  name="bookmark-border"
                  size={24}
                  color="#FFFFFF"
                />
              </View>
              <Text className="ml-3">
                Book and <Text className="font-bold">confirm appointment</Text>{" "}
                within seconds
              </Text>
            </View>

            {/* Step 3 */}
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-[#FF6A0E] rounded-full justify-center items-center">
                <View className="w-8 h-8 bg-[#FF6A0E] rounded-full justify-center items-center">
                  <Feather name="check" size={15} color="#FFFFFF" />
                </View>
              </View>
              <Text className="ml-3">
                Select based on <Text className="font-bold">experience</Text>,{" "}
                <Text className="font-bold">fee</Text> or{" "}
                <Text className="font-bold">rating</Text>
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
