import React from "react";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

const HealthArticle = () => {
  return (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Health Articles</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
      >
        <View style={styles.cardArt}>
          <View style={styles.headerArt}>
            <Text style={styles.dateArt}>02 July 2022</Text>
            <TouchableOpacity>
              <MaterialIcons name="bookmark-border" size={32} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Title and Description */}
          <Text style={styles.titleArt}>COVID-19 Vaccine</Text>
          <Text style={styles.descriptionArt}>
            Official public service is something service would know only when
            you do somethings stupid my name is Hello world
          </Text>

          {/* Arrow Icon */}
          <TouchableOpacity style={styles.arrowButtonArt}>
            <Feather name="chevron-right" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.cardArt}>
          <View style={styles.headerArt}>
            <Text style={styles.dateArt}>02 July 2022</Text>
            <TouchableOpacity>
              <MaterialIcons name="bookmark-border" size={32} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Title and Description */}
          <Text style={styles.titleArt}>COVID-19 Vaccine</Text>
          <Text style={styles.descriptionArt}>
            Official public service is something service would know only when
            you do somethings stupid my name is Hello world
          </Text>

          {/* Arrow Icon */}
          <TouchableOpacity style={styles.arrowButtonArt}>
            <Feather name="chevron-right" color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingLeft: -16,
    backgroundColor: "#FFFFFF",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAll: {
      color: "blue",
      paddingRight: -16,
  },
  horizontalScroll: {
      paddingHorizontal: 16,
      paddingLeft: 6,
    backgroundColor: "#FFFFFF",
  },
  cardArt: {
    backgroundColor: "#FF6A00",
    borderRadius: 12,
      padding: 16,  
    width: 360,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginRight: 16,
  },
  headerArt: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateArt: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  bookmarkIconArt: {
    width: 20,
    height: 20,
    tintColor: "#FFFFFF",
  },
  titleArt: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginTop: 8,
  },
  descriptionArt: {
    fontSize: 14,
    color: "#FFFFFF",
    marginTop: 4,
    lineHeight: 20,
    marginRight: 56,
  },
  arrowButtonArt: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#FFA726",
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowIconArt: {
    width: 16,
    height: 16,
    tintColor: "#FFFFFF",
  },
});

export default HealthArticle;
