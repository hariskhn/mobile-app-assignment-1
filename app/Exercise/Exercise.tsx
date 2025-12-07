import React, { useCallback, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { Exercise } from "../Redux/Exercise";
import AddExerciseModal from "./components/AddExerciseModal";
import ExerciseDetailModal from "./components/ExerciseDetails";

const ExerciseScreen: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);

  const exerciseList = useSelector((state: any) => state.exercise.items);

  const openExerciseDetails = useCallback((exercise: Exercise) => {
    setCurrentExercise(exercise);
    setIsDetailModalOpen(true);
  }, []);

  const closeDetailModal = useCallback(() => {
    setIsDetailModalOpen(false);
    setCurrentExercise(null);
  }, []);

  const openAddModal = useCallback(() => {
    setIsAddModalOpen(true);
  }, []);

  const closeAddModal = useCallback(() => {
    setIsAddModalOpen(false);
  }, []);

  const renderExerciseItem = ({ item }: { item: Exercise }) => (
    <TouchableOpacity
      onPress={() => openExerciseDetails(item)}
      style={styles.exerciseCard}
      activeOpacity={0.8}
    >
      <Text style={styles.exerciseName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Exercises</Text>

      <FlatList
        data={exerciseList}
        keyExtractor={(item) => item.id}
        renderItem={renderExerciseItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
        <Text style={styles.addButtonText}>+ Add Exercise</Text>
      </TouchableOpacity>

      {/* Modals */}
      <AddExerciseModal visible={isAddModalOpen} onClose={closeAddModal} />
      <ExerciseDetailModal
        visible={isDetailModalOpen}
        onClose={closeDetailModal}
        exercise={currentExercise}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    paddingTop: 60,
    backgroundColor: "#0e0f24", // Darker modern background
  },

  title: {
    fontSize: 38,
    fontWeight: "700",
    textAlign: "center",
    color: "white",
    marginBottom: 30,
  },

  listContainer: {
    paddingBottom: 20,
  },

  exerciseCard: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },

  exerciseName: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    color: "#222",
  },

  addButton: {
    backgroundColor: "#4a4bff",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
  },

  addButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
});

export default ExerciseScreen;
