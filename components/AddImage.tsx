import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

const AddImage = ({
  images,
  onAddImage,
  onEditRecord,
  onUpload,
  recordFor,
  recordDate,
}: {
  images: { id: string; uri: string }[];
  onAddImage: () => void;
  onEditRecord: () => void;
  onUpload: () => void;
  recordFor: string;
  recordDate: string;
}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Add Images</Text>

      <FlatList
        data={images}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.imageWrapper}>
            <Image source={{ uri: item.uri }} style={styles.image} />
          </View>
        )}
        ListFooterComponent={
          <TouchableOpacity style={styles.addImageButton} onPress={onAddImage}>
            <Text style={styles.addImageText}>+ Add more images</Text>
          </TouchableOpacity>
        }
        contentContainerStyle={styles.imageList}
      />

      <View style={styles.recordDetails}>
        <View style={styles.recordRow}>
          <Text style={styles.recordLabel}>Record for</Text>
          <TouchableOpacity onPress={onEditRecord}>
            <Text style={styles.recordValue}>{recordFor}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.recordRow}>
          <Text style={styles.recordLabel}>Record created on</Text>
          <TouchableOpacity onPress={onEditRecord}>
            <Text style={styles.recordValue}>{recordDate}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.uploadButton} onPress={onUpload}>
        <Text style={styles.uploadButtonText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4B0082", 
    marginBottom: 20,
  },
  imageList: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  addImageButton: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FF6F00",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF6E5", 
  },
  addImageText: {
    color: "#FF6F00",
    fontSize: 14,
    textAlign: "center",
  },
  recordDetails: {
    marginTop: 30,
    backgroundColor: "#F7F7F7",
    borderRadius: 10,
    padding: 15,
  },
  recordRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  recordLabel: {
    fontSize: 14,
    color: "#666",
  },
  recordValue: {
    fontSize: 14,
    color: "#FF6F00",
    fontWeight: "bold",
  },
  uploadButton: {
    marginTop: 20,
    backgroundColor: "#FF6F00",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
