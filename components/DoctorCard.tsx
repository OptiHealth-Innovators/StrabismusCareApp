import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

type DoctorCardProps = {
  name: string;
  specialty: string;
  rating: number;
  date: string;
  time: string;
  onPress: () => void;
};

const DoctorCard: React.FC<DoctorCardProps> = ({
  name,
  specialty,
  rating,
  date,
  time,
  onPress,
}) => {
  return (
    <View style={styles.cardTop}>
      {/* Header Section */}
      <View style={styles.headerTop}>
        <Image
          source={require("@/assets/images/doc.png")}
          style={styles.profileImageTop}
        />
        <View style={styles.headerTextTop}>
          <Text style={styles.nameTop}>{name}</Text>
          <Text style={styles.specialtyTop}>{specialty}</Text>
        </View>
        <View style={styles.ratingContainerTop}>
          <Text style={styles.heartIconTop}>❤️</Text>
          <Text style={styles.ratingTop}>{rating}</Text>
        </View>
      </View>

      {/* Appointment Details */}
                    <View style={styles.appointmentDetailsTop}>
                      <View style={styles.rowTop}>
                        <Image
                          source={require("@/assets/images/timer.png")}
                          style={{ width: 16, height: 16, marginRight: 8 }}
                        />
                        <Text style={styles.dateTop}>Monday</Text>
                        <Text style={styles.dateTop}>Oct 27, 2022</Text>
                        <Text style={styles.timeTop}>9:00 - 9:30 am</Text>
                      </View>
                    </View>

      {/* Book Appointment Button */}
      <TouchableOpacity style={styles.buttonTop} onPress={onPress}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
        source={require("@/assets/images/calender.png")}
        style={{ width: 24, height: 24, marginRight: 8 }}
          />
          <Text style={styles.buttonTextTop}>Book Appointment</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DoctorCard;

const styles = StyleSheet.create({
  cardTop: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    margin: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  profileImageTop: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  headerTextTop: {
    flex: 1,
  },
  nameTop: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  specialtyTop: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  ratingContainerTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  heartIconTop: {
    fontSize: 16,
    color: "red",
    marginRight: 4,
  },
  ratingTop: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  appointmentDetailsTop: {
    backgroundColor: "#E9F4FF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  rowTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconTop: {
    fontSize: 16,
    marginRight: 8,
  },
  dateTop: {
    fontSize: 14,
    color: "#333",
    marginRight: 12,
  },
  timeTop: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
  },
  buttonTop: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonTextTop: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6C00",
  },
});
