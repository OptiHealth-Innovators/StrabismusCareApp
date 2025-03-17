// app/(tabs)/search.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import DoctorCard from "@/components/DoctorCard";
import { doctorService } from "@/services/api/doctorService";

interface Slot {
  startTime: string;
  // Add other slot properties if needed
}

interface AvailableSlot {
  date: string;
  slots: Slot[];
}

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  rating: number;
  availableSlots?: AvailableSlot[];
  profileImage?: string;
}

export default function SearchScreen() {
  // Initialize doctors as an empty array to prevent undefined errors
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [specialty, setSpecialty] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await doctorService.getAllDoctors();
      // Ensure we're setting an array even if response is empty or malformed
      setDoctors(response.data || []);
      setError(null);
    } catch (err) {
      setError("Failed to fetch doctors. Please try again.");
      console.error(err);
      // Reset doctors to empty array on error
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await doctorService.searchDoctors({
        name: searchQuery,
        specialty: specialty,
      });
      // Ensure we're setting an array even if response is empty or malformed
      setDoctors(response.data || []);
      setError(null);
    } catch (err) {
      setError("Search failed. Please try again.");
      console.error(err);
      // Reset doctors to empty array on error
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = async (doctorId: string) => {
    // Navigate to appointment booking screen with doctor ID
    // Or implement booking logic here
    alert(`Booking appointment with doctor ID: ${doctorId}`);
  };

  return (
    <View className="p-6 pt-12 flex-1 bg-gray-50">
      <View className="flex-row items-center justify-between bg-white border border-gray-300 rounded-lg p-2 mb-4">
        {/* Search Input */}
        <View className="flex-row items-center flex-1">
          <Feather name="search" size={20} color="gray" />
          <TextInput
            placeholder="Search doctors..."
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

      {/* Doctor Cards List */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#FF6C00" />
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500">{error}</Text>
          <TouchableOpacity 
            className="mt-4 bg-orange-500 px-4 py-2 rounded-lg"
            onPress={fetchDoctors}
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
          {/* Ensure doctors exists and has items before mapping */}
          {doctors && doctors.length > 0 ? (
            doctors.map((doctor) => (
              <DoctorCard
                key={doctor._id}
                name={doctor.name}
                specialty={doctor.specialty}
                rating={doctor.rating}
                date={doctor.availableSlots?.[0]?.date || "No available slots"}
                time={doctor.availableSlots?.[0]?.slots?.[0]?.startTime || ""}
                onPress={() => handleBookAppointment(doctor._id)}
                profileImage={doctor.profileImage}
              />
            ))
          ) : (
            <View className="flex-1 justify-center items-center py-10">
              <Text className="text-gray-500">There is no doctor available</Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}
