import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { Feather, MaterialIcons, AntDesign } from "@expo/vector-icons";
import DoctorCard from "@/components/DoctorCard";

const SearchBarWithBadge = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [filteredDoctors, setFilteredDoctors] = useState<any[]>([]);

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
      name: "Dr. Sarah Johnson",
      specialty: "Neurologist",
      rating: 4.5,
      date: "17th Jan 2025",
      time: "9:00 AM",
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Dermatologist",
      rating: 4.9,
      date: "18th Jan 2025",
      time: "2:15 PM",
    },
    {
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrician",
      rating: 4.2,
      date: "19th Jan 2025",
      time: "11:45 AM",
    },
  ];

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    filterDoctors(text, minRating);
  };

  const handleFilterByRating = (rating: number) => {
    setMinRating(rating);
    filterDoctors(searchQuery, rating);
    setShowFilterModal(false);
  };

  const filterDoctors = (query: string, rating: number) => {
    const filtered = doctors.filter((doctor) => {
      const matchesSearch = 
        doctor.name.toLowerCase().includes(query.toLowerCase()) || 
        doctor.specialty.toLowerCase().includes(query.toLowerCase());
      const matchesRating = doctor.rating >= rating;
      return matchesSearch && matchesRating;
    });
    setFilteredDoctors(filtered);
  };

  // Initialize filtered doctors on first render
  React.useEffect(() => {
    setFilteredDoctors(doctors);
  }, []);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <AntDesign
          key={i}
          name={i <= rating ? "star" : "staro"}
          size={24}
          color={i <= rating ? "#FFA726" : "#D1D5DB"}
        />
      );
    }
    return stars;
  };

  return (
    <View className="p-6 pt-12">
      <View className="flex-row items-center justify-between bg-white border border-gray-300 rounded-lg p-2">
        {/* Search Input */}
        <View className="flex-row items-center flex-1">
          <Feather name="search" size={20} color="gray" />
          <TextInput
            placeholder="Physician"
            className="ml-2 text-gray-500 flex-1"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        <TouchableOpacity 
          className="relative"
          onPress={() => setShowFilterModal(true)}
        >
          <View className="bg-orange-500 w-8 h-8 rounded-lg items-center justify-center">
            <MaterialIcons name="filter-list" size={20} color="white" />
            {minRating > 0 && (
              <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                <Text className="text-white text-xs">{minRating}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Doctor Cards List */}
      <ScrollView
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 16 }} 
        className="mb-4 mt-4"
      >
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor, index) => (
            <DoctorCard
              key={index}
              name={doctor.name}
              specialty={doctor.specialty}
              rating={doctor.rating}
              date={doctor.date}
              time={doctor.time}
              onPress={handleBookAppointment}
            />
          ))
        ) : (
          <View className="items-center justify-center p-8">
            <Text className="text-gray-500 text-lg">No doctors found</Text>
          </View>
        )}
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <TouchableOpacity 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
          activeOpacity={1}
          onPress={() => setShowFilterModal(false)}
        >
          <View 
            className="bg-white rounded-t-3xl p-6 absolute bottom-0 left-0 right-0"
            style={{ elevation: 5 }}
          >
            <View className="items-center mb-4">
              <View className="w-16 h-1 bg-gray-300 rounded-full mb-4" />
              <Text className="text-lg font-bold">Filter by Rating</Text>
            </View>
            
            <View className="space-y-4">
              <TouchableOpacity 
                className="flex-row items-center justify-between p-3 border-b border-gray-200"
                onPress={() => handleFilterByRating(0)}
              >
                <Text className="text-base">All Ratings</Text>
                {minRating === 0 && <Feather name="check" size={20} color="#FF6A00" />}
              </TouchableOpacity>
              
              <TouchableOpacity 
                className="flex-row items-center justify-between p-3 border-b border-gray-200"
                onPress={() => handleFilterByRating(3)}
              >
                <View className="flex-row">
                  {renderStars(3)}
                  <Text className="ml-2 text-base">& up</Text>
                </View>
                {minRating === 3 && <Feather name="check" size={20} color="#FF6A00" />}
              </TouchableOpacity>
              
              <TouchableOpacity 
                className="flex-row items-center justify-between p-3 border-b border-gray-200"
                onPress={() => handleFilterByRating(4)}
              >
                <View className="flex-row">
                  {renderStars(4)}
                  <Text className="ml-2 text-base">& up</Text>
                </View>
                {minRating === 4 && <Feather name="check" size={20} color="#FF6A00" />}
              </TouchableOpacity>
              
              <TouchableOpacity 
                className="flex-row items-center justify-between p-3 border-b border-gray-200"
                onPress={() => handleFilterByRating(4.5)}
              >
                <View className="flex-row">
                  {renderStars(4.5)}
                  <Text className="ml-2 text-base">& up</Text>
                </View>
                {minRating === 4.5 && <Feather name="check" size={20} color="#FF6A00" />}
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity
              className="bg-orange-500 rounded-xl p-4 items-center mt-6"
              onPress={() => setShowFilterModal(false)}
            >
              <Text className="text-white font-bold text-base">Apply</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default SearchBarWithBadge;
