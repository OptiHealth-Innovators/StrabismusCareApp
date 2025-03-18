import { MaterialIcons, FontAwesome, Feather } from "@expo/vector-icons";
import DoctorCard from "@/components/DoctorCard";
import HealthArticle from "@/components/HealthArticle";
import React, { useState, useEffect } from "react";
import Testes from "@/components/Testes";
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Link, useRouter } from "expo-router";
import { doctorService } from "@/services/api/doctorService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string>("patient"); // Default to patient
  const [topDoctors, setTopDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check user role on component mount
  useEffect(() => {
    checkUserRole();
  }, []);

  // Fetch top doctors if user is a patient
  useEffect(() => {
    if (userRole === "patient") {
      fetchTopDoctors();
    }
  }, [userRole]);

  const checkUserRole = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        if (userData && userData.role) {
          setUserRole(userData.role);
          console.log("User role set to:", userData.role);
        }
      }
    } catch (error) {
      console.error("Error retrieving user role:", error);
    }
  };

  // Function to fetch with retry logic
  const fetchWithRetry = async (fetchFunction, maxRetries = 3) => {
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
      
      // Check if doctorService exists and has getAllDoctors method
      if (doctorService && typeof doctorService.getAllDoctors === 'function') {
        const response = await fetchWithRetry(() => doctorService.getAllDoctors());
        
        if (response && response.data) {
          let doctors = [];
          
          if (Array.isArray(response.data)) {
            doctors = response.data;
          } else if (typeof response.data === 'object') {
            // Some APIs nest the array in a property
            const possibleArrays = Object.values(response.data).filter(val => Array.isArray(val));
            if (possibleArrays.length > 0) {
              doctors = possibleArrays[0];
            } else {
              console.warn("Response data is an object but contains no arrays");
            }
          } else {
            console.warn("Unexpected response data format:", typeof response.data);
          }
          
          // Sort by rating (highest first) and take the top N
          const topN = doctors
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 5); // Show top 5 doctors
            
          setTopDoctors(topN);
          console.log("Top doctors set, count:", topN.length);
        } else {
          console.warn("No response data received");
        }
      } else {
        console.error("Doctor service is not properly initialized");
        setError("Service initialization error. Please restart the app.");
      }
      
      setError(null);
    } catch (err) {
      console.error("Failed to fetch top doctors:", err);
      setError("Failed to fetch doctors. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = (doctorId) => {
    alert(`Appointment Booked with doctor ID: ${doctorId || 'unknown'}`);
  };

  // New function to navigate to the search screen
  const navigateToAllDoctors = () => {
    router.push({
      pathname: "/(tabs)/search",
      params: { 
        showAllDoctors: true,
        fromDashboard: true
      }
    });
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
          {userRole === "patient" && (
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
                <View className="h-20 justify-center items-center">
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
                    // Fallback to static data if no doctors are available from API
                    <>
                      <DoctorCard
                        name="Dr. John Tauhid"
                        specialty="Cardiologist"
                        rating={4.8}
                        date="16th Jan 2025"
                        time="10:30 AM"
                        onPress={() => handleBookAppointment("fallback1")}
                      />
                      <DoctorCard
                        name="Dr. John Doe"
                        specialty="Cardiologist"
                        rating={4.8}
                        date="16th Jan 2025"
                        time="10:30 AM"
                        onPress={() => handleBookAppointment("fallback2")}
                      />
                    </>
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
