// components/DoctorCard.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface DoctorCardProps {
  name: string;
  specialty: string;
  rating: number;
  date: string;
  time: string;
  onPress: () => void;
  profileImage?: string;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  name,
  specialty,
  rating,
  date,
  time,
  onPress,
  profileImage,
}) => {
  // Default profile image if none provided
  const defaultImage = require("@/assets/images/doc.png");
  
  return (
    <View className="bg-white rounded-lg shadow-md mr-4 mb-2 w-96">
      {/* Previously this might have been w-64 or similar */}
      <View className="p-4">
        <View className="flex-row items-center mb-3">
          <Image
            source={profileImage ? { uri: profileImage } : defaultImage}
            className="w-16 h-16 rounded-full"
          />
          <View className="ml-3">
            <Text className="font-bold text-base text-gray-800">{name}</Text>
            <Text className="text-gray-600">{specialty}</Text>
            <View className="flex-row items-center mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesome
                  key={star}
                  name={star <= Math.floor(rating) ? "star" : star <= rating + 0.5 ? "star-half-o" : "star-o"}
                  size={14}
                  color="#FFB800"
                  style={{ marginRight: 2 }}
                />
              ))}
              <Text className="text-gray-600 ml-1">{rating.toFixed(1)}</Text>
            </View>
          </View>
        </View>
        
        <View className="bg-gray-50 p-3 rounded-lg">
          <Text className="text-sm text-gray-500 mb-1">Next Available</Text>
          <View className="flex-row items-center">
            <FontAwesome name="calendar" size={14} color="#666" />
            <Text className="ml-2 text-gray-700">{date}</Text>
          </View>
          {time && (
            <View className="flex-row items-center mt-1">
              <FontAwesome name="clock-o" size={14} color="#666" />
              <Text className="ml-2 text-gray-700">{time}</Text>
            </View>
          )}
        </View>
        
        <TouchableOpacity
          className="bg-[#FF7900] py-3 rounded-lg mt-3 items-center"
          onPress={onPress}
        >
          <Text className="text-white font-medium">Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DoctorCard;
