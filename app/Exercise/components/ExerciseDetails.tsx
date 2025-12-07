import { Exercise } from "@/app/Redux/Exercise";
import React from "react";
import {
  Image,
  Modal,
  Text,
  View,
  StyleSheet,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";

interface ExerciseDetailModalProps {
  visible: boolean;
  onClose: () => void;
  exercise: Exercise | null;
}

const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({
  visible,
  onClose,
  exercise,
}) => {
  if (!exercise) return null;

  const getImageSource = (): ImageSourcePropType | { uri: string } | null => {
    if (!exercise.image) return null;
    return typeof exercise.image === "string"
      ? { uri: exercise.image }
      : exercise.image;
  };

  const imageSource = getImageSource();

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>{exercise.name}</Text>

          {imageSource && (
            <Image
              source={imageSource}
              style={styles.image}
              resizeMode="contain"
            />
          )}

          <Text style={styles.description}>{exercise.desc}</Text>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
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
    backgroundColor: "rgba(0,0,0,0.75)",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    elevation: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    color: "#111",
    marginBottom: 16,
  },

  image: {
    width: "100%",
    height: 240,
    borderRadius: 16,
    marginBottom: 18,
  },

  description: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: "center",
    color: "#555",
    marginBottom: 22,
  },

  closeButton: {
    backgroundColor: "#333",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  closeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default ExerciseDetailModal;
