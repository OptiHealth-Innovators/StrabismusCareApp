// components/DoctorCard.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type DoctorCardProps = {
  name: string;
  specialty: string;
  rating: number;
  date?: string;
  time?: string;
  onPress: () => void;
  profileImage?: string;
};

const DoctorCard: React.FC<DoctorCardProps> = ({
  name = "Unknown Doctor",
  specialty = "General Practice",
  rating = 0,
  date,
  time,
  onPress,
  profileImage,
}) => {
  // Format the rating to one decimal place
  const formattedRating = rating ? rating.toFixed(1) : "0.0";
  
  // Safely format date without using date-fns
  const formatDateSafely = (dateString: string | undefined) => {
    if (!dateString) return "Not available";
    
    try {
      const dateObj = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(dateObj.getTime())) {
        return dateString; // Return original string if not valid date
      }
      
      // Get month name
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthName = months[dateObj.getMonth()];
      
      return `${monthName} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
    } catch (e) {
      console.log("Error formatting date:", e);
      return dateString; // Return original string on error
    }
  };
  
  const formattedDate = formatDateSafely(date);

  // Generate stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Ionicons key={i} name="star" size={14} color="#FFB800" />);
      } else if (i === fullStars && halfStar) {
        stars.push(<Ionicons key={i} name="star-half" size={14} color="#FFB800" />);
      } else {
        stars.push(<Ionicons key={i} name="star-outline" size={14} color="#FFB800" />);
      }
    }
    
    return stars;
  };

  return (
    <TouchableOpacity 
      className="bg-white rounded-2xl p-4 mb-4 shadow-sm"
      onPress={onPress}
    >
      {/* Doctor Info */}
      <View className="flex-row items-center mb-3">
        <Image
          source={
            profileImage 
              ? { uri: profileImage } 
              : require("@/assets/images/doc.png")
          }
          className="w-16 h-16 rounded-full"
        />
        <View className="flex-1 ml-3">
          <Text className="text-base font-semibold text-gray-800">{name}</Text>
          <Text className="text-sm text-gray-500">{specialty}</Text>
          
          {/* Rating */}
          <View className="flex-row items-center mt-1">
            {renderStars()}
            <Text className="ml-1 text-sm text-gray-700">{formattedRating}</Text>
          </View>
        </View>
      </View>

      {/* Available Slot */}
      {date && (
        <View className="bg-blue-50 rounded-xl p-3 mb-3">
          <Text className="text-sm font-medium text-blue-800 mb-1">Next Available</Text>
          <View className="flex-row items-center">
            <Ionicons name="calendar-outline" size={16} color="#1E40AF" />
            <Text className="ml-1 text-blue-700">{formattedDate}</Text>
            
            {time && (
              <>
                <Text className="mx-1 text-blue-700">•</Text>
                <Ionicons name="time-outline" size={16} color="#1E40AF" />
                <Text className="ml-1 text-blue-700">{time}</Text>
              </>
            )}
          </View>
        </View>
      )}

      {/* Book Button */}
      <TouchableOpacity 
        className="bg-orange-500 rounded-xl py-3 items-center justify-center"
        onPress={onPress}
      >
        <Text className="text-white text-base font-semibold">Book Appointment</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default DoctorCard;
