import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";

const Calendar = () => {
  const [dates, setDates] = useState<any[]>([]);
  const [currentMonth, setCurrentMonth] = useState<string>("");
  const [currentYear, setCurrentYear] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  useEffect(() => {
    generateCalendar();

    const timer = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        generateCalendar();
      }
    }, 60000);

    return () => clearInterval(timer); // Clean up the timer when the component unmounts
  }, []);

  const generateCalendar = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // 0-indexed (0 = January, 1 = February, etc.)
    const dayOfMonth = today.getDate(); // Current day of the month

    // Set current month and year
    setCurrentMonth(today.toLocaleString("default", { month: "long" }));
    setCurrentYear(year);

    // Get the number of days in the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Generate an array of dates for the current month starting from today
    const currentMonthDates = Array.from(
      { length: daysInMonth - dayOfMonth + 1 },
      (_, index) => {
        const date = dayOfMonth + index; // Start from today
        const weekday = new Date(year, month, date).toLocaleString("default", {
          weekday: "short",
        });

        return {
          day: date,
          weekday: weekday,
          month: month, // Current month
          isNextMonth: false, // Indicates it's in the current month
        };
      }
    );

    // Generate an array of dates for the next month
    const nextMonth = (month + 1) % 12; // Handle December -> January transition
    const nextMonthYear = month === 11 ? year + 1 : year; // Increment year if next month is January
    const daysInNextMonth = new Date(nextMonthYear, nextMonth + 1, 0).getDate();

    const nextMonthDates = Array.from({ length: 7 }, (_, index) => {
      const date = index + 1; // Start from the 1st of the next month
      const weekday = new Date(nextMonthYear, nextMonth, date).toLocaleString(
        "default",
        {
          weekday: "short",
        }
      );

      return {
        day: date,
        weekday: weekday,
        month: nextMonth,
        isNextMonth: true, 
      };
    });

    // Combine current month and next month dates
    const allDates = [...currentMonthDates, ...nextMonthDates];
    setDates(allDates);

    // Set the current day as selected
    setSelectedDate(dayOfMonth);
  };

  const handleDatePress = (day: number, isNextMonth: boolean) => {
    setSelectedDate(day); // Update the selected date
    if (isNextMonth) {
      // Update the current month and year if the user selects a date from the next month
      const nextMonth = (new Date().getMonth() + 1) % 12;
      const nextYear =
        new Date(currentYear, new Date().getMonth() + 1).getMonth() === 0
          ? currentYear + 1
          : currentYear;
      setCurrentMonth(
        new Date(currentYear, nextMonth).toLocaleString("default", {
          month: "long",
        })
      );
      setCurrentYear(nextYear);
    }
  };

  const renderDateItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => handleDatePress(item.day, item.isNextMonth)}
      style={{
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        width: 64,
        height: 80,
        backgroundColor:
          item.day === selectedDate && !item.isNextMonth
            ? "#2E004F"
            : "#E2E8F0",
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: item.isNextMonth
            ? "#A0AEC0" // Greyed out for next month's dates
            : item.day === selectedDate
            ? "#FFFFFF"
            : "#4A5568",
        }}
      >
        {item.day}
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: item.isNextMonth
            ? "#A0AEC0" // Greyed out for next month's dates
            : item.day === selectedDate
            ? "#FFFFFF"
            : "#A0AEC0",
        }}
      >
        {item.weekday}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ padding: 16 }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: "#4A5568",
          marginBottom: 16,
          paddingTop: 28,
        }}
      >
        {currentMonth} {currentYear}
      </Text>

      <FlatList
        data={dates}
        horizontal
        keyExtractor={(item, index) => `${item.day}-${index}`}
        renderItem={renderDateItem}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
      />

      <Appointments />
    </View>
  );
};

const Appointments = () => {
  const [activeTab, setActiveTab] = useState("All");

  const appointments = [
    {
      id: 1,
      time: "10:00 am - 10:30 am",
      doctor: "Dr. Emma Mia",
      specialty: "Retina Specialist",
      type: "Online visit",
      status: "Upcoming",
    },
    {
      id: 2,
      time: "08:00 am - 08:30 am",
      doctor: "Dr. Randy Levin",
      specialty: "Glaucoma Specialist",
      type: "Online visit",
      status: "Completed",
    },
    {
      id: 3,
      time: "09:00 am - 09:30 am",
      doctor: "Dr. Zain Calzoni",
      specialty: "Strabismus Specialist",
      type: "Online visit",
      status: "Canceled",
    },
  ];

  const filteredAppointments =
    activeTab === "All"
      ? appointments
      : appointments.filter((appointment) => appointment.status === activeTab);

  const renderAppointmentCard = ({ item }: { item: typeof appointments[0] }) => (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* Doctor's Profile Image */}
        <Image
          source={require("@/assets/images/doc.png")}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 16,
          }}
        />

        {/* Appointment Details */}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#2D3748" }}>
            {item.doctor}
          </Text>
          <Text style={{ fontSize: 14, color: "#718096" }}>
            {item.specialty} · {item.type}
          </Text>

          {/* Status Badge Below Specialty */}
          <View
            style={{
              marginTop: 8,
              alignSelf: "flex-start",
              backgroundColor:
                item.status === "Upcoming"
                  ? "#FEEBC8"
                  : item.status === "Completed"
                  ? "#C6F6D5"
                  : "#FED7D7",
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color:
                  item.status === "Upcoming"
                    ? "#DD6B20"
                    : item.status === "Completed"
                    ? "#38A169"
                    : "#E53E3E",
                fontSize: 12,
                fontWeight: "bold",
              }}
            >
              {item.status}
            </Text>
          </View>
        </View>
      </View>

      {/* Attend Now Button for Upcoming */}
      {item.status === "Upcoming" && (
        <TouchableOpacity
          style={{
            marginTop: 16,
            backgroundColor: "#ED8936",
            paddingVertical: 12,
            borderRadius: 8,
          }}
          onPress={() => alert("Attending...")}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Attend Now
          </Text>
        </TouchableOpacity>
      )}

      {/* View Details Button for Completed */}
      {item.status === "Completed" && (
        <TouchableOpacity
          style={{
            marginTop: 16,
            borderWidth: 1,
            borderColor: "#ED8936", // Orange border
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#ED8936", // Orange text
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            View Details
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={{ marginTop: 16 }}>
      {/* Tabs */}
      <View style={{ flexDirection: "row", marginBottom: 16 }}>
        {["All", "Upcoming", "Completed", "Canceled"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={{
              flex: 1,
              alignItems: "center",
              paddingVertical: 8,
              marginRight: 8,
              borderRadius: 8,
              backgroundColor:
                activeTab === tab ? "#FEEBC8" : "#E2E8F0",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: activeTab === tab ? "#DD6B20" : "#718096",
              }}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Appointments List */}
      <FlatList
        data={filteredAppointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAppointmentCard}
        contentContainerStyle={{ paddingBottom: 16 }}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: "#A0AEC0", marginTop: 16 }}>
            No appointments found.
          </Text>
        }
      />
    </View>
  );
};

export default Calendar;
