// app/(tabs)/search.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import DoctorCard from "@/components/DoctorCard";
import PatientCard from "@/components/PatientCard";
import { doctorService } from "@/services/api/doctorService";
import { patientService } from "@/services/api/patientService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "@/services/api/config";

// Define interfaces for our data types
interface Medication {
  name: string;
  dosage: string;
  frequency: string;
}

interface Patient {
  _id: string;
  name: string;
  age: number;
  gender: string;
  medicalHistory: string[];
  allergies: string[];
  medications: Medication[];
  lastVisit?: string;
  upcomingAppointment?: string;
  bloodType?: string;
  profileImage?: string | null;
  vitals?: any;
  contact?: any;
  insuranceInfo?: any;
  emergencyContact?: any;
  notes?: string;
  status?: string;
  updatedAt?: string;
}

interface TimeSlot {
  startTime: string;
}

interface AvailableSlot {
  date: string;
  slots: TimeSlot[];
}

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  rating: number;
  availableSlots: AvailableSlot[];
  profileImage: string | null;
}

interface UserData {
  role: string;
  [key: string]: any;
}

interface SearchParams {
  name?: string;
  specialty?: string;
  medicalHistory?: string;
}

interface ApiResponse<T> {
  data: T | T[] | any;
  [key: string]: any;
}

export default function SearchScreen(): JSX.Element {
  const [userRole, setUserRole] = useState<string>("doctor"); // Default role
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [specialty, setSpecialty] = useState<string>("");

  useEffect(() => {
    checkUserRole();
  }, []);

  const checkUserRole = async (): Promise<void> => {
    try {
      console.log("Checking user role...");
      // Get user data from AsyncStorage
      const userDataString = await AsyncStorage.getItem("userData");
      if (userDataString) {
        const userData: UserData = JSON.parse(userDataString);
        console.log("User data retrieved:", userData);
        // Check if user role exists in userData
        if (userData && userData.role) {
          setUserRole(userData.role);
          console.log("User role set to:", userData.role);
          // Fetch appropriate data based on role
          if (userData.role === "doctor") {
            fetchPatients();
          } else {
            fetchDoctors();
          }
        } else {
          console.log("No user role found, defaulting to doctor");
          // Default to fetching doctors if role is not specified
          fetchDoctors();
        }
      } else {
        console.log("No user data found, defaulting to doctor");
        fetchDoctors();
      }
    } catch (error) {
      console.error("Error retrieving user role:", error);
      // Default to fetching doctors on error
      fetchDoctors();
    }
  };

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
    
    // TypeScript requires a return statement here, but this will never be reached
    throw new Error("Unexpected error in fetchWithRetry");
  };

  const fetchDoctors = async (): Promise<void> => {
    try {
      setLoading(true);
      console.log("Fetching doctors...");
      
      // Check if doctorService exists and has getAllDoctors method
      if (doctorService && typeof doctorService.getAllDoctors === 'function') {
        const response = await fetchWithRetry(() => doctorService.getAllDoctors());
        console.log("Raw doctor API response:", response);
        
        if (response && response.data) {
          // Debug the API response
          console.log("Doctor response data type:", typeof response.data);
          console.log("Is array?", Array.isArray(response.data));
          console.log("Length:", response.data ? response.data.length : "N/A");
          
          if (Array.isArray(response.data)) {
            setDoctors(response.data);
            console.log("Doctors set to array of length:", response.data.length);
          } else if (typeof response.data === 'object') {
            // Some APIs nest the array in a property
            const possibleArrays = Object.values(response.data).filter(val => Array.isArray(val));
            if (possibleArrays.length > 0) {
              setDoctors(possibleArrays[0] as Doctor[]);
              console.log("Doctors set from nested array, length:", possibleArrays[0].length);
            } else {
              console.warn("Response data is an object but contains no arrays");
              setDoctors([]);
            }
          } else {
            console.warn("Unexpected response data format:", typeof response.data);
            setDoctors([]);
          }
        } else {
          console.warn("No response data received");
          setDoctors([]);
        }
      } else {
        console.error("Doctor service is not properly initialized");
        setError("Service initialization error. Please restart the app.");
        setDoctors([]);
      }
      
      setError(null);
    } catch (err) {
      console.error("Failed to fetch doctors:", err);
      setError("Failed to fetch doctors. Please try again.");
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  

  // Transform patient data from MongoDB format to the format expected by PatientCard
  const transformPatients = (patientsData: any[]): Patient[] => {
    return patientsData.map(patient => {
      // Extract medication data in the format expected by PatientCard
      const medications = patient.medications ? patient.medications.map((med: any) => {
        // If medication is already in the right format, return it
        if (med.name && med.dosage && med.frequency) {
          return med;
        }
        // Otherwise, try to parse it (assuming it might be a string or different format)
        return {
          name: typeof med === 'string' ? med : 'Unknown medication',
          dosage: 'As prescribed',
          frequency: 'As directed'
        };
      }) : [];

      // Extract medical history
      const medicalHistory = Array.isArray(patient.medicalHistory) 
        ? patient.medicalHistory 
        : [];

      // Extract allergies
      const allergies = Array.isArray(patient.allergies)
        ? patient.allergies
        : [];

      // Return the transformed patient object
      return {
        _id: patient._id || `temp-${Math.random()}`,
        name: patient.name || 'Unknown Patient',
        age: patient.age || 0,
        gender: patient.gender || 'Unknown',
        medicalHistory: medicalHistory,
        allergies: allergies,
        medications: medications,
        lastVisit: patient.lastVisit || (patient.vitals && patient.vitals.lastVisit),
        upcomingAppointment: patient.upcomingAppointment || (patient.vitals && patient.vitals.upcomingAppointment),
        bloodType: patient.bloodType || (patient.vitals && patient.vitals.bloodType),
        profileImage: patient.profileImage || null,
        vitals: patient.vitals || null,
        contact: patient.contact || null,
        insuranceInfo: patient.insuranceInfo || null,
        emergencyContact: patient.emergencyContact || null,
        notes: patient.notes || '',
        status: patient.status || 'Unknown',
        updatedAt: patient.updatedAt || ''
      };
    });
  };

  const fetchPatients = async (): Promise<void> => {
    try {
      setLoading(true);
      console.log("Fetching patients...");
      
      // Check if patientService exists and has getAllPatients method before calling it
      if (patientService && typeof patientService.getAllPatients === 'function') {
        const response = await fetchWithRetry(() => patientService.getAllPatients());
        console.log("Raw patient API response:", response);
        
        // Handle the specific structure from your MongoDB/API
        if (response && response.data) {
          // Check if the response has a data.data structure (common in some APIs)
          if (response.data.data && Array.isArray(response.data.data)) {
            setPatients(transformPatients(response.data.data));
            console.log("Patients set from response.data.data, length:", response.data.data.length);
            setError(null);
            setLoading(false);
            return; // Exit early as we've handled the data
          } 
          // Check if response.data is the array directly
          else if (Array.isArray(response.data)) {
            setPatients(transformPatients(response.data));
            console.log("Patients set from response.data array, length:", response.data.length);
            setError(null);
            setLoading(false);
            return; // Exit early as we've handled the data
          } 
          // Check if response.data.success exists (matches your backend format)
          else if (response.data.success && Array.isArray(response.data.data)) {
            setPatients(transformPatients(response.data.data));
            console.log("Patients set from response.data.success.data, length:", response.data.data.length);
            setError(null);
            setLoading(false);
            return; // Exit early as we've handled the data
          } else {
            console.warn("Unexpected response format");
            setPatients([]);
          }
        }
      } else {
        console.error("Patient service is not properly initialized");
        setError("Service initialization error. Please restart the app.");
        setPatients([]);
        
        // Show alert to notify about service initialization issue
        Alert.alert(
          "Service Initialization Issue",
          "Patient service is not properly initialized. Please restart the app or contact support.",
          [{ text: "OK" }]
        );
      }
      
      // This code will run if we didn't return early above
      setError(null);
    } catch (err) {
      console.error("Failed to fetch patients:", err);
      setError("Failed to fetch patients. Please try again.");
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  // Enhanced search functionality
  const handleSearch = async (): Promise<void> => {
    try {
      setLoading(true);
      console.log(`Searching for ${userRole === "doctor" ? "patients" : "doctors"} with query:`, searchQuery);
      
      if (userRole === "doctor") {
        // Search patients with more comprehensive options
        try {
          // Check if patientService exists and has searchPatients method
          if (patientService && typeof patientService.searchPatients === 'function') {
            const searchParams: SearchParams = {
              name: searchQuery,
              medicalHistory: searchQuery, // Also search in medical history
            };
            const response = await patientService.searchPatients(searchParams);
            
            console.log("Search patients response:", response);
            
            if (response && response.data) {
              // Check for different response structures
              if (response.data.data && Array.isArray(response.data.data)) {
                setPatients(transformPatients(response.data.data));
              } else if (Array.isArray(response.data)) {
                setPatients(transformPatients(response.data));
              } else if (response.data.success && Array.isArray(response.data.data)) {
                setPatients(transformPatients(response.data.data));
              } else {
                console.warn("Invalid search response format");
                // Keep existing patients data
              }
            }
          } else {
            console.error("Patient search service is not properly initialized");
            // If search API is not available, filter the existing data client-side
            if (patients.length > 0) {
              const filteredPatients = patients.filter(patient => 
                patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (patient.medicalHistory && patient.medicalHistory.some(
                  condition => condition.toLowerCase().includes(searchQuery.toLowerCase())
                ))
              );
              setPatients(filteredPatients);
              console.log("Fallback to client-side filtering, results:", filteredPatients.length);
            }
          }
        } catch (searchError) {
          console.error("Search API error:", searchError);
          // If search fails, filter the existing data client-side
          if (patients.length > 0) {
            const filteredPatients = patients.filter(patient => 
              patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (patient.medicalHistory && patient.medicalHistory.some(
                condition => condition.toLowerCase().includes(searchQuery.toLowerCase())
              ))
            );
            setPatients(filteredPatients);
            console.log("Fallback to client-side filtering, results:", filteredPatients.length);
          }
        }
      } else {
        // Search doctors
        try {
          // Check if doctorService exists and has searchDoctors method
          if (doctorService && typeof doctorService.searchDoctors === 'function') {
            const searchParams: SearchParams = {
              name: searchQuery,
              specialty: specialty,
            };
            const response = await doctorService.searchDoctors(searchParams);
            
            console.log("Search doctors response:", response);
            
            if (response && response.data && Array.isArray(response.data)) {
              setDoctors(response.data);
              console.log("Search results set, count:", response.data.length);
            } else {
              console.warn("Invalid search response format");
              // Keep existing doctors data
            }
          } else {
            console.error("Doctor search service is not properly initialized");
            // If search API is not available, filter the existing data client-side
            if (doctors.length > 0) {
              const filteredDoctors = doctors.filter(doctor => 
                doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (doctor.specialty && doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()))
              );
              setDoctors(filteredDoctors);
              console.log("Fallback to client-side filtering, results:", filteredDoctors.length);
            }
          }
        } catch (searchError) {
          console.error("Search API error:", searchError);
          // If search fails, filter the existing data client-side
          if (doctors.length > 0) {
            const filteredDoctors = doctors.filter(doctor => 
              doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (doctor.specialty && doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            setDoctors(filteredDoctors);
            console.log("Fallback to client-side filtering, results:", filteredDoctors.length);
          }
        }
      }
      
      setError(null);
    } catch (err) {
      console.error("Search failed:", err);
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Test API connection function
  const testAPIConnection = async () => {
    try {
      setLoading(true);
      const baseURL = apiClient.defaults.baseURL || 'http://localhost:3000';
      const response = await fetch(`${baseURL}/patients`);
      const data = await response.json();
      console.log("API Test Response:", data);
      Alert.alert(
        "API Test Result",
        `Status: ${response.status}\nEndpoint: ${baseURL}/patients\nPatients found: ${data.data ? data.data.length : 'unknown'}`
      );
    } catch (error) {
      console.error("API Test Error:", error);
      Alert.alert(
        "API Connection Failed",
        `Error: ${error.message}\n\nCheck your API configuration and server status.`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = (doctorId: string): void => {
    alert(`Booking appointment with doctor ID: ${doctorId}`);
  };

  const handleViewPatient = (patientId: string): void => {
    alert(`Viewing details for patient ID: ${patientId}`);
  };

  return (
    <View className="p-6 pt-12 flex-1 bg-gray-50">
      <View className="flex-row items-center justify-between bg-white border border-gray-300 rounded-lg p-2 mb-4">
        {/* Search Input */}
        <View className="flex-row items-center flex-1">
          <Feather name="search" size={20} color="gray" />
          <TextInput
            placeholder={
              userRole === "doctor" ? "Search patients..." : "Search doctors..."
            }
            className="ml-2 text-gray-500 flex-1"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
        </View>

        <TouchableOpacity className="relative" onPress={handleSearch}>
          <View className="bg-orange-500 w-8 h-8 rounded-lg items-center justify-center">
            <MaterialIcons name="filter-list" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      {/* API Test button */}
      <View className="flex-row justify-end mb-2">
        <TouchableOpacity onPress={testAPIConnection}>
          <Text className="text-xs text-blue-500">
            Test API Connection
          </Text>
        </TouchableOpacity>
      </View>

      {/* List of Doctors or Patients */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#FF6C00" />
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500">{error}</Text>
          <TouchableOpacity
            className="mt-4 bg-orange-500 px-4 py-2 rounded-lg"
            onPress={userRole === "doctor" ? fetchPatients : fetchDoctors}
          >
            <Text className="text-white font-medium">Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
          className="mb-4"
        >
          {userRole === "doctor" ? (
            // Display patients using enhanced PatientCard
            patients && patients.length > 0 ? (
              patients.map((patient) => (
                <PatientCard
                  key={patient._id || `temp-${Math.random()}`}
                  _id={patient._id || `temp-${Math.random()}`}
                  name={patient.name || "Unknown Patient"}
                  age={patient.age || 0}
                  gender={patient.gender || "Unknown"}
                  medicalHistory={patient.medicalHistory || []}
                  allergies={patient.allergies || []}
                  medications={patient.medications || []}
                  lastVisit={patient.lastVisit}
                  upcomingAppointment={patient.upcomingAppointment}
                  bloodType={patient.bloodType}
                  vitals={patient.vitals}
                  onPress={handleViewPatient}
                  profileImage={patient.profileImage}
                />
              ))
            ) : (
              <View className="flex-1 justify-center items-center py-10">
                <Text className="text-gray-500">No patients found</Text>
                <Text className="text-gray-400 text-xs mt-2">
                  Please check your API connection or try again later.
                </Text>
                <TouchableOpacity
                  className="mt-4 bg-orange-500 px-4 py-2 rounded-lg"
                  onPress={fetchPatients}
                >
                  <Text className="text-white font-medium">Refresh</Text>
                </TouchableOpacity>
              </View>
            )
          ) : // Display doctors for patient/admin users
          doctors && doctors.length > 0 ? (
            doctors.map((doctor) => (
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
            <View className="flex-1 justify-center items-center py-10">
              <Text className="text-gray-500">No doctors available</Text>
              <Text className="text-gray-400 text-xs mt-2">
                Please check your API connection or try again later.
              </Text>
              <TouchableOpacity
                className="mt-4 bg-orange-500 px-4 py-2 rounded-lg"
                onPress={fetchDoctors}
              >
                <Text className="text-white font-medium">Refresh</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}
