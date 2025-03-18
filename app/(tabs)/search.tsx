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
  FlatList,
} from "react-native";
import { Feather, MaterialIcons, AntDesign } from "@expo/vector-icons";
import DoctorCard from "@/components/DoctorCard";
import PatientCard from "@/components/PatientCard";
import { doctorService } from "@/services/api/doctorService";
import { patientService } from "@/services/api/patientService";
import { medicalRecordService } from "@/services/api/medicalRecordService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import { useLocalSearchParams } from "expo-router";

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

interface MedicalRecord {
  _id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  diagnosis: string;
  symptoms: string[];
  treatment: string;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  notes: string;
  followUp?: string;
  vitals?: {
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    respiratoryRate?: number;
    oxygenSaturation?: number;
    weight?: number;
    height?: number;
  };
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
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

export default function SearchScreen(): JSX.Element {
  // Get URL parameters from navigation
  const params = useLocalSearchParams();
  const fromDashboard = params.fromDashboard === "true";
  const showAllDoctors = params.showAllDoctors === "true";
  
  const [userRole, setUserRole] = useState<string>("patient"); // Default role
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [specialty, setSpecialty] = useState<string>("");
  
  // States for medical records
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [selectedPatientName, setSelectedPatientName] = useState<string>("");
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [recordsLoading, setRecordsLoading] = useState<boolean>(false);
  const [recordsError, setRecordsError] = useState<string | null>(null);
  const [showRecords, setShowRecords] = useState<boolean>(false);

  // Handle the navigation parameters
  useEffect(() => {
    if (fromDashboard && showAllDoctors) {
      console.log("Navigated from dashboard to see all doctors");
      // Force user role to patient to show doctors
      setUserRole("patient");
      // Fetch all doctors
      fetchDoctors();
    }
  }, [fromDashboard, showAllDoctors]);

  // Run once on component mount to check user role
  useEffect(() => {
    // Only check user role if not coming from dashboard
    if (!fromDashboard || !showAllDoctors) {
      checkUserRole();
    }
  }, [fromDashboard, showAllDoctors]);

  // Fetch data when tab is focused
  useFocusEffect(
    React.useCallback(() => {
      console.log("Search tab focused");
      if (!fromDashboard || !showAllDoctors) {
        if (userRole === "doctor") {
          fetchPatients();
        } else {
          fetchDoctors();
        }
      }
      return () => {
        // Optional cleanup if needed
      };
    }, [userRole, fromDashboard, showAllDoctors]) // Depend on these variables
  );

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
        
        if (response && response.data) {
          if (Array.isArray(response.data)) {
            setDoctors(response.data);
          } else if (typeof response.data === 'object') {
            // Some APIs nest the array in a property
            const possibleArrays = Object.values(response.data).filter(val => Array.isArray(val));
            if (possibleArrays.length > 0) {
              setDoctors(possibleArrays[0] as Doctor[]);
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
      const medications = patient.medications ? patient.medications.map((med: any) => {
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
      
      if (patientService && typeof patientService.getAllPatients === 'function') {
        const response = await fetchWithRetry(() => patientService.getAllPatients());
      
        if (response && response.data) {
          if (response.data.data && Array.isArray(response.data.data)) {
            setPatients(transformPatients(response.data.data));
            console.log("Patients set from response.data.data, length:", response.data.data.length);
            setError(null);
            setLoading(false);
            return;
          } 
          else if (Array.isArray(response.data)) {
            setPatients(transformPatients(response.data));
            console.log("Patients set from response.data array, length:", response.data.length);
            setError(null);
            setLoading(false);
            return; 
          } 
          else if (response.data.success && Array.isArray(response.data.data)) {
            setPatients(transformPatients(response.data.data));
            console.log("Patients set from response.data.success.data, length:", response.data.data.length);
            setError(null);
            setLoading(false);
            return; 
          } else {
            console.warn("Unexpected response format");
            setPatients([]);
          }
        }
      } else {
        console.error("Patient service is not properly initialized");
        setError("Service initialization error. Please restart the app.");
        setPatients([]);
        
        Alert.alert(
          "Service Initialization Issue",
          "Patient service is not properly initialized. Please restart the app or contact support.",
          [{ text: "OK" }]
        );
      }
      
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
    
      if (userRole === "doctor") {
        try {
          if (patientService && typeof patientService.searchPatients === 'function') {
            const searchParams: SearchParams = {
              name: searchQuery,
              medicalHistory: searchQuery, 
            };
            const response = await patientService.searchPatients(searchParams);
          
            if (response && response.data) {
              if (response.data.data && Array.isArray(response.data.data)) {
                setPatients(transformPatients(response.data.data));
              } else if (Array.isArray(response.data)) {
                setPatients(transformPatients(response.data));
              } else if (response.data.success && Array.isArray(response.data.data)) {
                setPatients(transformPatients(response.data.data));
              } else {
                console.warn("Invalid search response format");
              }
            }
          } else {
            console.error("Patient search service is not properly initialized");
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
        try {
          if (doctorService && typeof doctorService.searchDoctors === 'function') {
            const searchParams: SearchParams = {
              name: searchQuery,
              specialty: specialty,
            };
            const response = await doctorService.searchDoctors(searchParams);
            
            if (response && response.data && Array.isArray(response.data)) {
              setDoctors(response.data);
              console.log("Search results set, count:", response.data.length);
            } else {
              console.warn("Invalid search response format");
            }
          } else {
            console.error("Doctor search service is not properly initialized");
            
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

  // Function to fetch medical records for a patient
  const fetchMedicalRecords = async (patientId: string, patientName: string): Promise<void> => {
    try {
      setRecordsLoading(true);
      setSelectedPatientId(patientId);
      setSelectedPatientName(patientName);
      console.log(`Fetching medical records for patient: ${patientId}`);
      
      try {
        const response = await fetchWithRetry(() => medicalRecordService.getPatientRecords(patientId));
        
        if (response && response.data) {
          // Check if the response has a success property and data array
          if (response.data.success && Array.isArray(response.data.data)) {
            console.log("Medical records fetched successfully:", response.data.data.length);
            // Validate each record before setting to state
            const validatedRecords = response.data.data.map(record => ({
              _id: record._id || `temp-${Math.random()}`,
              patientId: record.patientId || selectedPatientId,
              patientName: record.patientName || selectedPatientName,
              doctorId: record.doctorId || "",
              doctorName: record.doctorName || "Unknown Doctor",
              date: record.date || new Date().toISOString(),
              diagnosis: record.diagnosis || "No diagnosis",
              symptoms: Array.isArray(record.symptoms) ? record.symptoms : [],
              treatment: record.treatment || "",
              medications: Array.isArray(record.medications) ? record.medications : [],
              notes: record.notes || "",
              followUp: record.followUp || "",
              vitals: record.vitals || null,
              attachments: Array.isArray(record.attachments) ? record.attachments : [],
              createdAt: record.createdAt || record.date || new Date().toISOString(),
              updatedAt: record.updatedAt || record.date || new Date().toISOString(),
            }));
            setMedicalRecords(validatedRecords);
            setShowRecords(true);
            setRecordsError(null);
          }
        } else {
          console.warn("No data received from reports API");
          setRecordsError("Failed to fetch medical records. No data received.");
          setMedicalRecords([]);
        }
      } catch (apiError) {
        console.error("Failed to fetch medical records:", apiError);
        setRecordsError("Failed to fetch medical records. Please try again.");
        setMedicalRecords([]);
      }
    } catch (err) {
      console.error("Error in fetchMedicalRecords:", err);
      setRecordsError("An unexpected error occurred. Please try again.");
      setMedicalRecords([]);
    } finally {
      setRecordsLoading(false);
    }
  };

  const handleBookAppointment = (doctorId: string): void => {
    alert(`Booking appointment with doctor ID: ${doctorId}`);
  };

  // Updated to fetch and show medical records
  const handleViewPatient = (patientId: string): void => {
    const patient = patients.find(p => p._id === patientId);
    if (patient) {
      fetchMedicalRecords(patientId, patient.name);
    } else {
      Alert.alert("Error", "Patient information not found");
    }
  };

  // Function to close the records view
  const handleCloseRecords = (): void => {
    setShowRecords(false);
    setSelectedPatientId(null);
    setMedicalRecords([]);
  };

  // Format date for display
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  // Render a single medical record
  const renderMedicalRecord = (record: MedicalRecord): JSX.Element => {
    return (
      <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-lg font-bold text-gray-800">{record.diagnosis || "No diagnosis"}</Text>
          <Text className="text-sm text-gray-500">{formatDate(record.date)}</Text>
        </View>
        
        <View className="mb-3">
          <Text className="text-sm font-semibold text-gray-700 mb-1">Doctor:</Text>
          <Text className="text-sm text-gray-600">{record.doctorName || "Unknown"}</Text>
        </View>
        
        <View className="mb-3">
          <Text className="text-sm font-semibold text-gray-700 mb-1">Symptoms:</Text>
          <View className="flex-row flex-wrap">
            {record.symptoms && Array.isArray(record.symptoms) ? (
              record.symptoms.map((symptom, index) => (
                <View key={index} className="bg-gray-100 rounded-full px-3 py-1 mr-2 mb-2">
                  <Text className="text-xs text-gray-700">{symptom}</Text>
                </View>
              ))
            ) : (
              <Text className="text-sm text-gray-600">No symptoms recorded</Text>
            )}
          </View>
        </View>
        
        <View className="mb-3">
          <Text className="text-sm font-semibold text-gray-700 mb-1">Treatment:</Text>
          <Text className="text-sm text-gray-600">{record.treatment || "No treatment recorded"}</Text>
        </View>
        
        <View className="mb-3">
          <Text className="text-sm font-semibold text-gray-700 mb-1">Medications:</Text>
          {record.medications && Array.isArray(record.medications) && record.medications.length > 0 ? (
            record.medications.map((med, index) => (
              <View key={index} className="ml-2 mb-1">
                <Text className="text-sm text-gray-600">
                  • {med.name} ({med.dosage}, {med.frequency}, {med.duration})
                </Text>
              </View>
            ))
          ) : (
            <Text className="text-sm text-gray-600">No medications prescribed</Text>
          )}
        </View>
        
        {record.vitals && (
          <View className="mb-3">
            <Text className="text-sm font-semibold text-gray-700 mb-1">Vitals:</Text>
            <View className="flex-row flex-wrap">
              <Text className="text-xs text-gray-600 mr-3">BP: {record.vitals.bloodPressure}</Text>
              <Text className="text-xs text-gray-600 mr-3">HR: {record.vitals.heartRate} bpm</Text>
              <Text className="text-xs text-gray-600 mr-3">Temp: {record.vitals.temperature}°F</Text>
              {record.vitals.respiratoryRate && (
                <Text className="text-xs text-gray-600 mr-3">RR: {record.vitals.respiratoryRate}</Text>
              )}
              {record.vitals.oxygenSaturation && (
                <Text className="text-xs text-gray-600">O2: {record.vitals.oxygenSaturation}%</Text>
              )}
            </View>
          </View>
        )}
        
        {record.notes && (
          <View className="mb-3">
            <Text className="text-sm font-semibold text-gray-700 mb-1">Notes:</Text>
            <Text className="text-sm text-gray-600">{record.notes}</Text>
          </View>
        )}
        
        {record.followUp && (
          <View className="mb-3">
            <Text className="text-sm font-semibold text-gray-700 mb-1">Follow-up:</Text>
            <Text className="text-sm text-gray-600">{formatDate(record.followUp)}</Text>
          </View>
        )}
      </View>
    );
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

      {/* Medical Records Section */}
      {showRecords && (
        <View className="flex-1 bg-gray-100 rounded-lg mb-4">
          <View className="flex-row justify-between items-center p-4 bg-orange-500 rounded-t-lg">
            <Text className="text-white font-bold text-lg">
              {selectedPatientName}'s Medical Records
            </Text>
            <TouchableOpacity onPress={handleCloseRecords}>
              <AntDesign name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          {recordsLoading ? (
            <View className="flex-1 justify-center items-center p-4">
              <ActivityIndicator size="large" color="#FF6C00" />
              <Text className="text-gray-500 mt-4">Loading medical records...</Text>
            </View>
          ) : recordsError ? (
            <View className="flex-1 justify-center items-center p-4">
              <Text className="text-red-500 mb-4">{recordsError}</Text>
              <TouchableOpacity
                className="bg-orange-500 px-4 py-2 rounded-lg"
                onPress={() => fetchMedicalRecords(selectedPatientId!, selectedPatientName)}
              >
                <Text className="text-white font-medium">Retry</Text>
              </TouchableOpacity>
            </View>
          ) : medicalRecords.length === 0 ? (
            <View className="flex-1 justify-center items-center p-4">
              <MaterialIcons name="folder-open" size={48} color="#CCCCCC" />
              <Text className="text-gray-500 text-lg mt-4">No medical records found</Text>
              <Text className="text-gray-400 text-sm mt-2 text-center px-6">
                {`${selectedPatientName} doesn't have any medical records in the system yet.`}
              </Text>
              {userRole === "doctor" && (
                <TouchableOpacity
                  className="mt-6 bg-orange-500 px-5 py-2 rounded-lg"
                  onPress={() => {
                    // Navigate to create record screen or show create record modal
                    Alert.alert(
                      "Create Medical Record",
                      `Would you like to create a new medical record for ${selectedPatientName}?`,
                      [
                        { text: "Cancel", style: "cancel" },
                        { 
                          text: "Create", 
                          onPress: () => {
                            // Navigate to create record screen with patient info
                            Alert.alert("Feature Coming Soon", "The ability to create medical records will be available in the next update.");
                          } 
                        }
                      ]
                    );
                  }}
                >
                  <Text className="text-white font-medium">Create New Record</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <FlatList
              data={medicalRecords}
              renderItem={({ item }) => renderMedicalRecord(item)}
              keyExtractor={(item) => item._id}
              contentContainerStyle={{ padding: 16 }}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      )}

      {/* List of Doctors or Patients */}
      {!showRecords && (
        loading ? (
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
            ) : 
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
        )
      )}
    </View>
  );
}
