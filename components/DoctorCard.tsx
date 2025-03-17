// components/DoctorCard.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

type DoctorCardProps = {
  name: string;
  specialty: string;
  rating: number;
  date: string;
  time: string;
  onPress: () => void;
  profileImage?: string;
};

const DoctorCard: React.FC<DoctorCardProps> = ({
  name,
  specialty,
  rating,
  date,
  time,
  onPress,
  profileImage,
}) => {
  // Safely format date without using date-fns
  const formatDateSafely = () => {
    if (!date || date === "No available slots") return null;
    
    try {
      const dateObj = new Date(date);
      
      // Check if date is valid
      if (isNaN(dateObj.getTime())) {
        return null;
      }
      
      // Get day name
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayName = days[dateObj.getDay()];
      
      // Get month name
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthName = months[dateObj.getMonth()];
      
      return {
        dayName,
        formattedDate: `${monthName} ${dateObj.getDate()}, ${dateObj.getFullYear()}`
      };
    } catch (e) {
      console.log("Error formatting date:", e);
      return null;
    }
  };
  
  const dateInfo = formatDateSafely();
  
  return (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
      {/* Header Section */}
      <View className="flex-row items-center mb-3">
        <Image
          source={
            profileImage 
              ? { uri: profileImage } 
              : require("../assets/images/doc.png")
          }
          className="w-12 h-12 rounded-full"
        />
        <View className="flex-1 ml-3">
          <Text className="text-base font-semibold text-gray-800">{name}</Text>
          <Text className="text-sm text-gray-500 mt-0.5">{specialty}</Text>
        </View>
        <View className="flex-row items-center bg-orange-50 px-2 py-1 rounded-xl">
          <Text className="mr-1">❤️</Text>
          <Text className="text-sm font-medium text-orange-500">
            {typeof rating === 'number' ? rating.toFixed(1) : rating}
          </Text>
        </View>
      </View>

      {/* Appointment Details */}
      <View className="mb-4">
        <View className="flex-row items-center mb-2">
          <Image
            source={require("../assets/images/timer.png")}
            className="w-4 h-4 mr-2"
          />
          {dateInfo ? (
            <View className="flex-row items-center">
              <Text className="text-sm text-gray-500 mr-2">{dateInfo.dayName}</Text>
              <Text className="text-sm text-gray-500 mr-2">{dateInfo.formattedDate}</Text>
              <Text className="text-sm font-medium text-gray-700">{time}</Text>
            </View>
          ) : (
            <Text className="text-sm text-gray-500">No available slots</Text>
          )}
        </View>
      </View>

      {/* Book Appointment Button */}
      <TouchableOpacity 
        className="bg-orange-500 rounded-xl py-3 items-center justify-center"
        onPress={onPress}
      >
        <View className="flex-row items-center">
          <Image
            source={require("../assets/images/calender.png")}
            className="w-6 h-6 mr-2"
          />
          <Text className="text-white text-base font-semibold">Book Appointment</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DoctorCard;
