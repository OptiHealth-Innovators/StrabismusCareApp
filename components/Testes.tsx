import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";

interface TestCardProps {
  title: string;
  icon: React.ReactNode;
}

const TestCard: React.FC<TestCardProps> = ({ title, icon }) => {
  const handlePress = () => {
    Alert.alert("Stay tuned", "This test will be added in future update");
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFE4C7",
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 8,
        width: "48%",
      }}
    >
      <View style={{ marginRight: 8 }}>{icon}</View>
      <Text style={{ color: "#FF7900", fontWeight: "bold", fontSize: 14 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const TestsComponent = () => {
  return (
    <View style={{ padding: 16 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#222" }}>
          Tests
        </Text>
        <Text style={{ fontSize: 14, color: "#FF7900" }}>See All</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <TestCard title="Strabismus" icon={<Text>👁️</Text>} />
        <TestCard title="Color Blindness" icon={<Text>🎨</Text>} />
        <TestCard title="Vision" icon={<Text>📋</Text>} />
        <TestCard title="60 Amblyopia" icon={<Text>👁️</Text>} />
      </View>
    </View>
  );
};

export default TestsComponent;
