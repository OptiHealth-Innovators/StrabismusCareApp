import { MaterialIcons, FontAwesome, Feather } from "@expo/vector-icons";
import DoctorCard from "@/components/DoctorCard";
import HealthArticle from "@/components/HealthArticle";
import React, { useState, useEffect } from "react";
import Testes from "@/components/Testes";
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Link, useRouter } from "expo-router";
import { doctorService } from "@/services/api/doctorService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

// Define types for user and doctor
interface User {
  id: string; // Changed from _id to id to match backend response
  name?: string;
  firstName?: string;
  lastName?: string;
  role: string;
  email: string;
  createdAt?: string;
}

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  rating: number;
  profileImage?: string;
  availableSlots?: Array<{
    date: string;
    slots: Array<{
      startTime: string;
      endTime: string;
    }>;
  }>;
}

// Updated to match backend response format
interface UserResponse {
  success: boolean;
  message: string;
  user: User;
}

// Add this interface for the doctor service response
interface DoctorServiceResponse {
  data?: {
    doctors?: Doctor[];
    [key: string]: any;
  } | Doctor[];
  // Allow direct array response without data wrapper
  [key: string]: any;
}

const ENV_BACKEND_URL = Constants.expoConfig?.extra?.ENV_BACKEND_URL;

console.log("ENV_BACKEND_URL:", ENV_BACKEND_URL);

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [topDoctors, setTopDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user info on component mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = await AsyncStorage.getItem("user");
        console.log("User ID from AsyncStorage:", userId);
        if (!userId) {
          throw new Error("User ID not found in AsyncStorage");
        }

        const response = await fetch(`${ENV_BACKEND_URL}/user/${userId}`);
        console.log("Response status:", response.status);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch user info: ${response}`);
        }
        
        const data = await response.json() as UserResponse;
        console.log("Response data:", data);
        
        if (data.success && data.user) {
          setUserInfo(data.user);
        } else {
          throw new Error("Invalid response format or user data not found");
        }
      } catch (error) {
        console.error("Error fetching user info:", error instanceof Error ? error.message : String(error));
      }
    };

    fetchUserInfo();
  }, []);

  // Fetch top doctors if user is a patient
  useEffect(() => {
    if (userInfo && userInfo.role === "patient") {
      fetchTopDoctors();
    }
  }, [userInfo]);

  // Function to fetch with retry logic
  const fetchWithRetry = async <T,>(fetchFunction: () => Promise<T>, maxRetries = 3): Promise<T> => {
    let retries = 0;
    
    while (retries < maxRetries) {
      try {
        return await fetchFunction();
      } catch (error) {
        retries++;
        if (retries === maxRetries) {
          throw error;
        }
        // Wait for a bit before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retries)));
      }
    }
    
    throw new Error("Unexpected error in fetchWithRetry");
  };

  const fetchTopDoctors = async () => {
    try {
      setLoading(true);
      console.log("Fetching top doctors...");
      
      if (!doctorService || typeof doctorService.getAllDoctors !== 'function') {
        throw new Error("Doctor service is not properly initialized");
      }
      
      const response = await fetchWithRetry<any>(() => doctorService.getAllDoctors());
      console.log("Doctor API response:", response);
      
      // Determine where the doctor array is in the response
      let doctorsArray: Doctor[] = [];
      
      if (Array.isArray(response)) {
        // Direct array response
        doctorsArray = response;
      } else if (response?.data) {
        // Response has a data property
        if (Array.isArray(response.data)) {
          doctorsArray = response.data;
        } else if (response.data.doctors && Array.isArray(response.data.doctors)) {
          doctorsArray = response.data.doctors;
        }
      } else if (response?.doctors && Array.isArray(response.doctors)) {
        doctorsArray = response.doctors;
      }
      
      if (doctorsArray.length === 0) {
        console.warn("No doctors found in the response");
      }
      
      // Sort by rating and take top 5
      const topN = doctorsArray
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 5);
        
      setTopDoctors(topN);
      console.log("Top doctors set, count:", topN.length);
      setError(null);
      
    } catch (err) {
      console.error("Failed to fetch top doctors:", err);
      setError("Failed to fetch doctors. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleBookAppointment = (doctorId: string) => {
    alert(`Appointment Booked with doctor ID: ${doctorId || 'unknown'}`);
  };

  // Navigate to the search screen
  const navigateToAllDoctors = () => {
    router.push({
      pathname: "/(tabs)/search" as any,
      params: { 
        showAllDoctors: "true",
        fromDashboard: "true"
      }
    });
  };

  // Get user name from userInfo
  const getUserName = (): string => {
    if (!userInfo) return "User";
    
    if (userInfo.name) return userInfo.name;
    if (userInfo.firstName && userInfo.lastName) return `${userInfo.firstName} ${userInfo.lastName}`;
    if (userInfo.firstName) return userInfo.firstName;
    
    return "User";
  };

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
                {getUserName()}
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
              className="w-36 h-44 rounded-lg -ml-10 -mb-5"
            />
          </View>
        </View>

        {/* Main Content */}
        <View className="p-4 bg-white rounded-t-2xl">
          <View>
            <Testes />
          </View>

          {/* Top Doctors Section - Only show for patients */}
          {userInfo && userInfo.role === "patient" && (
            <>
              <View className="flex-row justify-between items-center mb-4 mt-2">
                <Text className="text-lg font-bold text-[#333333]">
                  Top Doctors
                </Text>
                <TouchableOpacity onPress={navigateToAllDoctors}>
                  <Text className="text-[#FF7900] font-[16] pr-6">See All</Text>
                </TouchableOpacity>
              </View>
              
              {loading ? (
                <View className="h-20 w-full justify-center items-center">
                  <ActivityIndicator size="small" color="#FF7900" />
                </View>
              ) : error ? (
                <View className="h-20 justify-center items-center">
                  <Text className="text-red-500 p-2">{error}</Text>
                  <TouchableOpacity 
                    className="mt-2 bg-orange-500 px-3 py-1 rounded-lg"
                    onPress={fetchTopDoctors}
                  >
                    <Text className="text-white">Retry</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mb-4"
                >
                  {topDoctors && topDoctors.length > 0 ? (
                    topDoctors.map((doctor) => (
                      <DoctorCard
                        key={doctor._id || `temp-${Math.random()}`}
                        name={doctor.name || "Unknown Doctor"}
                        specialty={doctor.specialty || "General Practice"}
                        rating={doctor.rating || 0}
                        date={doctor.availableSlots?.[0]?.date || "No available slots"}
                        time={doctor.availableSlots?.[0]?.slots?.[0]?.startTime || ""}
                        onPress={() => handleBookAppointment(doctor._id)}
                        profileImage={doctor.profileImage}
                      />
                    ))
                  ) : (
                    <View className="h-20 justify-center items-center w-full">
                      <Text className="text-gray-500">No doctors available at the moment</Text>
                    </View>
                  )}
                </ScrollView>
              )}
            </>
          )}

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
