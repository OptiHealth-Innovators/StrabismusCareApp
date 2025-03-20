// components/PatientCard.tsx
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type PatientCardProps = {
  _id: string;
  name: string;
  age: number;
  gender: string;
  medicalHistory: string[];
  allergies?: string[];
  medications?: Array<{
    name: string;
    dosage?: string;
    frequency?: string;
  }>;
  lastVisit?: string;
  upcomingAppointment?: string;
  bloodType?: string;
  vitals?: any; 
  onPress: (id: string) => void;
  profileImage?: string | null;
};

const PatientCard: React.FC<PatientCardProps> = ({
  _id = "unknown",
  name = "Unknown Patient",
  age = 0,
  gender = "Unknown",
  medicalHistory = [],
  allergies = [],
  medications = [],
  lastVisit,
  upcomingAppointment,
  bloodType,
  vitals, 
  onPress,
  profileImage,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  
  const effectiveBloodType = bloodType || (vitals && vitals.bloodType);
  const effectiveLastVisit = lastVisit || (vitals && vitals.lastVisit);
  const effectiveUpcomingAppointment = upcomingAppointment || (vitals && vitals.upcomingAppointment);


  const formatDateSafely = (dateString: string | undefined) => {
    if (!dateString) return "Not scheduled";
    
    try {
      const dateObj = new Date(dateString);
      
     
      if (isNaN(dateObj.getTime())) {
        return "Invalid date";
      }
      

      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthName = months[dateObj.getMonth()];
      
      return `${monthName} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
    } catch (e) {
      console.log("Error formatting date:", e);
      return "Error formatting date";
    }
  };
  
  const formattedLastVisit = formatDateSafely(effectiveLastVisit);
  const formattedUpcomingAppointment = formatDateSafely(effectiveUpcomingAppointment);

  
  const getNextMedication = () => {
    if (medications && Array.isArray(medications) && medications.length > 0) {
      return medications[0];
    }
    return null;
  };

  const nextMedication = getNextMedication();
  

  const safeRenderMedicalHistory = () => {
    if (!medicalHistory || !Array.isArray(medicalHistory) || medicalHistory.length === 0) {
      return (
        <Text className="text-sm text-gray-500">No medical history recorded</Text>
      );
    }
    
    return (
      <View className="flex-row flex-wrap">
        {medicalHistory.slice(0, 3).map((condition, index) => (
          <View key={index} className="bg-blue-50 px-2 py-1 rounded-lg mr-2 mb-2">
            <Text className="text-xs text-blue-600">{condition}</Text>
          </View>
        ))}
        {medicalHistory.length > 3 && (
          <View className="bg-gray-100 px-2 py-1 rounded-lg">
            <Text className="text-xs text-gray-600">+{medicalHistory.length - 3} more</Text>
          </View>
        )}
      </View>
    );
  };
  
  const safeRenderAllergies = () => {
    if (!allergies || !Array.isArray(allergies) || allergies.length === 0) {
      return (
        <Text className="text-gray-500">No known allergies</Text>
      );
    }
    
    return (
      <View className="flex-row flex-wrap">
        {allergies.map((allergy, index) => (
          <View key={index} className="bg-red-50 px-3 py-1.5 rounded-lg mr-2 mb-2">
            <Text className="text-sm text-red-600">{allergy}</Text>
          </View>
        ))}
      </View>
    );
  };
  
  const safeRenderMedications = () => {
    if (!medications || !Array.isArray(medications) || medications.length === 0) {
      return (
        <Text className="text-gray-500">No current medications</Text>
      );
    }
    
    return medications.map((medication, index) => (
      <View key={index} className="bg-yellow-50 p-3 rounded-lg mb-2">
        <Text className="text-base font-medium text-yellow-800">{medication.name || "Unknown medication"}</Text>
        <Text className="text-sm text-yellow-700">Dosage: {medication.dosage || "Not specified"}</Text>
        <Text className="text-sm text-yellow-700">Frequency: {medication.frequency || "Not specified"}</Text>
      </View>
    ));
  };
  
  return (
    <>
      <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
        {/* Header Section */}
        <View className="flex-row items-center mb-3">
          <Image
            source={
              profileImage 
                ? { uri: profileImage } 
                : require("@/assets/images/doc.png") 
            }
            className="w-12 h-12 rounded-full"
          />
          <View className="flex-1 ml-3">
            <Text className="text-base font-semibold text-gray-800">{name}</Text>
            <View className="flex-row items-center">
              <Text className="text-sm text-gray-500 mt-0.5">
                {age} years • {gender}
              </Text>
              {effectiveBloodType && (
                <View className="bg-red-50 px-2 py-0.5 rounded-md ml-2">
                  <Text className="text-xs text-red-600">{effectiveBloodType}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Medical History */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-1">Medical History:</Text>
          {safeRenderMedicalHistory()}
        </View>

        {/* Last Visit & Next Appointment */}
        <View className="mb-4">
          <View className="flex-row items-center mb-2">
            <Ionicons name="calendar-outline" size={16} color="#6B7280" className="mr-2" />
            <Text className="text-sm text-gray-500">Last visit: </Text>
            <Text className="text-sm font-medium text-gray-700">{formattedLastVisit}</Text>
          </View>
          
          {effectiveUpcomingAppointment && (
            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={16} color="#6B7280" className="mr-2" />
              <Text className="text-sm text-gray-500">Next appointment: </Text>
              <Text className="text-sm font-medium text-green-600">{formattedUpcomingAppointment}</Text>
            </View>
          )}
        </View>

        {/* Medication Reminder (if any) */}
        {nextMedication && (
          <View className="mb-4 bg-yellow-50 p-2 rounded-lg">
            <Text className="text-sm font-medium text-yellow-800">Current Medication:</Text>
            <Text className="text-sm text-yellow-700">
              {nextMedication.name || "Unknown"} ({nextMedication.dosage || "N/A"}) - {nextMedication.frequency || "N/A"}
            </Text>
          </View>
        )}

        {/* Action Buttons */}
        <View className="flex-row space-x-2 gap-3">
          <TouchableOpacity 
            className="bg-blue-500 rounded-xl py-3 flex-1 items-center justify-center"
            onPress={() => onPress(_id)}
          >
            <View className="flex-row items-center">
              <Ionicons name="document-text-outline" size={18} color="white" className="mr-2" />
              <Text className="text-white text-base font-semibold">Medical Records</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="bg-orange-500 rounded-xl py-3 flex-1 items-center justify-center"
            onPress={() => setShowDetails(true)}
          >
            <View className="flex-row items-center">
              <Ionicons name="information-circle-outline" size={18} color="white" className="mr-2" />
              <Text className="text-white text-base font-semibold">Details</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Patient Details Modal */}
      <Modal
        visible={showDetails}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDetails(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl p-6 h-3/4">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-bold text-gray-800">Patient Details</Text>
              <TouchableOpacity onPress={() => setShowDetails(false)}>
                <Ionicons name="close-circle" size={28} color="#6B7280" />
              </TouchableOpacity>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Patient Basic Info */}
              <View className="mb-6 flex-row items-center">
                <Image
                  source={
                    profileImage 
                      ? { uri: profileImage } 
                      : require("@/assets/images/cal.png")
                  }
                  className="w-16 h-16 rounded-full"
                />
                <View className="ml-4">
                  <Text className="text-lg font-bold text-gray-800">{name}</Text>
                  <Text className="text-gray-600">{age} years • {gender}</Text>
                  {effectiveBloodType && <Text className="text-gray-600">Blood Type: {effectiveBloodType}</Text>}
                </View>
              </View>
              
              {/* Medical History */}
              <View className="mb-4">
                <Text className="text-base font-semibold text-gray-800 mb-2">Medical History</Text>
                {safeRenderMedicalHistory()}
              </View>
              
              {/* Allergies */}
              <View className="mb-4">
                <Text className="text-base font-semibold text-gray-800 mb-2">Allergies</Text>
                {safeRenderAllergies()}
              </View>
              
              {/* Medications */}
              <View className="mb-4">
                <Text className="text-base font-semibold text-gray-800 mb-2">Current Medications</Text>
                {safeRenderMedications()}
              </View>
              
              {/* Appointments */}
              <View className="mb-4">
                <Text className="text-base font-semibold text-gray-800 mb-2">Appointments</Text>
                <View className="bg-gray-50 p-3 rounded-lg mb-2">
                  <Text className="text-sm font-medium text-gray-700">Last Visit:</Text>
                  <Text className="text-base text-gray-800">{formattedLastVisit}</Text>
                </View>
                {effectiveUpcomingAppointment && (
                  <View className="bg-green-50 p-3 rounded-lg">
                    <Text className="text-sm font-medium text-green-700">Upcoming Appointment:</Text>
                    <Text className="text-base text-green-800">{formattedUpcomingAppointment}</Text>
                  </View>
                )}
              </View>
              
              {/* Action Buttons */}
              <View className="flex-row space-x-3 mb-8">
                <TouchableOpacity 
                  className="bg-blue-500 rounded-xl py-3 flex-1 items-center justify-center"
                  onPress={() => {
                    setShowDetails(false);
                    onPress(_id);
                  }}
                >
                  <Text className="text-white text-base font-semibold">View Records</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  className="bg-green-500 rounded-xl py-3 flex-1 items-center justify-center"
                  onPress={() => {
                    setShowDetails(false);
                    alert(`Scheduling appointment for ${name}`);
                  }}
                >
                  <Text className="text-white text-base font-semibold">Schedule Visit</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default PatientCard;
