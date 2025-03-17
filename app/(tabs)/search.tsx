import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import DoctorCard from "@/components/DoctorCard";

const SearchBarWithBadge = () => {
  const handleBookAppointment = () => {
    alert("Appointment Booked");
  };

  const doctors = [
    {
      name: "Dr. John Tauhid",
      specialty: "Cardiologist",
      rating: 4.8,
      date: "16th Jan 2025",
      time: "10:30 AM",
    },
    {
      name: "Dr. John Doe",
      specialty: "Cardiologist",
      rating: 4.8,
      date: "16th Jan 2025",
      time: "10:30 AM",
    },
    {
      name: "Dr. John Doe",
      specialty: "Cardiologist",
      rating: 4.8,
      date: "16th Jan 2025",
      time: "10:30 AM",
    },
    {
      name: "Dr. John Doe",
      specialty: "Cardiologist",
      rating: 4.8,
      date: "16th Jan 2025",
      time: "10:30 AM",
    },
  ];

  return (
    <View className="p-6 pt-12">
      <View className="flex-row items-center justify-between bg-white border border-gray-300 rounded-lg p-2">
        {/* Search Input */}
        <View className="flex-row items-center flex-1">
          <Feather name="search" size={20} color="gray" />
          <TextInput
            placeholder="Physician"
            className="ml-2 text-gray-500 flex-1"
          />
        </View>

        <TouchableOpacity className="relative">
          <View className="bg-orange-500 w-8 h-8 rounded-lg items-center justify-center">
            <MaterialIcons name="filter-list" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Doctor Cards List */}
      <ScrollView
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 16 }} 
        className="mb-4"
      >
        {doctors.map((doctor, index) => (
          <DoctorCard
            key={index}
            name={doctor.name}
            specialty={doctor.specialty}
            rating={doctor.rating}
            date={doctor.date}
            time={doctor.time}
            onPress={handleBookAppointment}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default SearchBarWithBadge;
