import React, { useState } from "react";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

interface ArticleCardProps {
  date: string;
  title: string;
  description: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ date, title, description }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <View className="bg-[#FF6A00] rounded-xl p-4 w-[360px] my-2.5 shadow-md mr-4">
      <View className="flex-row justify-between items-center">
        <Text className="text-sm text-white font-medium">{date}</Text>
        <TouchableOpacity onPress={toggleBookmark}>
          <MaterialIcons 
            name={isBookmarked ? "bookmark" : "bookmark-border"} 
            size={32} 
            color="#FFFFFF" 
          />
        </TouchableOpacity>
      </View>

      {/* Title and Description */}
      <Text className="text-lg text-white font-bold mt-2">{title}</Text>
      <Text className="text-sm text-white mt-1 leading-5 mr-14">
        {description}
      </Text>

      {/* Arrow Icon */}
      <TouchableOpacity className="absolute bottom-4 right-4 bg-[#FFA726] rounded-full w-9 h-9 justify-center items-center">
        <Feather name="chevron-right" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const HealthArticle: React.FC = () => {
  return (
    <View>
      <View className="flex-row justify-between items-center p-4 pl-0 bg-white">
        <Text className="text-lg font-bold">Health Articles</Text>
        {/* <TouchableOpacity>
          <Text className="text-[#FF7900] pr-2">See All</Text>
        </TouchableOpacity> */}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="bg-white"
        contentContainerStyle={{ paddingHorizontal: 16, paddingLeft: 6 }}
      >
        <ArticleCard 
          date="18 March 2025"
          title="Preventing Digital Eye Strain"
          description="Learn how to protect your eyes from the harmful effects of prolonged screen time with the 20-20-20 rule and proper lighting techniques."
        />
        <ArticleCard 
          date="15 March 2025"
          title="Children's Vision Development"
          description="Early detection of vision problems is crucial for children's development. Discover the warning signs parents should watch for in their child's vision."
        />
        <ArticleCard 
          date="10 March 2025"
          title="Age-Related Macular Degeneration"
          description="New research shows promising treatments for AMD, the leading cause of vision loss in adults over 60. Learn about prevention and management strategies."
        />
      </ScrollView>
    </View>
  );
};

export default HealthArticle;
