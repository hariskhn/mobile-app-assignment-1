import React, { useState, useCallback } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  Image,
  Modal,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { addExercise, Exercise } from "@/app/Redux/Exercise";

interface AddExerciseModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddExerciseModal: React.FC<AddExerciseModalProps> = ({ visible, onClose }) => {
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseDescription, setExerciseDescription] = useState("");
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);

  const dispatch = useDispatch();

  const handleSubmit = useCallback(() => {
    if (!exerciseName.trim()) return;

    const newExercise: Exercise = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: exerciseName.trim(),
      desc: exerciseDescription.trim(),
      image: selectedImageUri,
    };

    dispatch(addExercise(newExercise));

    setExerciseName("");
    setExerciseDescription("");
    setSelectedImageUri(null);
    onClose();
  }, [exerciseName, exerciseDescription, selectedImageUri, dispatch, onClose]);

  const handleImageSelection = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        setSelectedImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  }, []);

  const handleCancel = useCallback(() => {
    setExerciseName("");
    setExerciseDescription("");
    setSelectedImageUri(null);
    onClose();
  }, [onClose]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <Text style={styles.title}>Add New Exercise</Text>

          <TextInput
            placeholder="Exercise Name"
            value={exerciseName}
            onChangeText={setExerciseName}
            style={styles.input}
            autoCapitalize="words"
            placeholderTextColor="#999"
          />

          <TextInput
            placeholder="Description"
            value={exerciseDescription}
            onChangeText={setExerciseDescription}
            style={[styles.input, styles.descriptionInput]}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />

          <TouchableOpacity style={styles.imagePickerButton} onPress={handleImageSelection}>
            <Text style={styles.imagePickerText}>
              {selectedImageUri ? "Change Image" : "Pick Image"}
            </Text>
          </TouchableOpacity>

          {selectedImageUri && (
            <Image source={{ uri: selectedImageUri }} style={styles.previewImage} />
          )}

          <View style={styles.footerButtons}>
            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },

  modalCard: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 20,
    elevation: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    color: "#111",
  },

  input: {
    height: 50,
    borderWidth: 1.5,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 18,
    backgroundColor: "#fafafa",
    marginBottom: 12,
  },

  descriptionInput: {
    height: 110,
    paddingTop: 10,
  },

  imagePickerButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 14,
  },

  imagePickerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },

  previewImage: {
    width: "100%",
    height: 170,
    borderRadius: 12,
    marginBottom: 16,
  },

  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 12,
  },

  addButton: {
    flex: 1,
    backgroundColor: "green",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  addButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },

  cancelButton: {
    flex: 1,
    backgroundColor: "#333",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  cancelButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
});

export default AddExerciseModal;
