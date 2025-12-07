import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImageSourcePropType } from "react-native";

export type Exercise = {
  id: string;
  name: string;
  desc: string;
  image?: ImageSourcePropType | string | null;
}

const defaultExerciseData: Exercise[] = [
  {
    id: "1",
    name: "Bench Press",
    desc: "A compound chest exercise targeting the pectorals, triceps, and shoulders. Lie on a bench, lower the barbell to your chest, and press it back up.",
    image: require("../../assets/bench_press.jpeg"),
  },
  {
    id: "2",
    name: "Deadlift",
    desc: "A full-body compound movement engaging the posterior chain. Lift the barbell from the ground to a standing position using hips and legs.",
    image: require("../../assets/deadlift.jpeg"),
  },
  {
    id: "3",
    name: "Hammer Curl",
    desc: "An isolation exercise targeting the biceps and brachialis. Hold dumbbells with a neutral grip and curl them upward without rotating the wrist.",
    image: require("../../assets/hammer_curl.jpeg"),
  },
  {
    id: "4",
    name: "Overhead Press",
    desc: "A shoulder-focused compound movement. Press a barbell or dumbbells overhead while keeping your core tight and back neutral.",
    image: require("../../assets/overhead_press.jpeg"),
  },
];

interface ExerciseState {
  items: Exercise[];
}

const initialState: ExerciseState = {
  items: defaultExerciseData,
};

const exerciseReducer = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    addExercise: (state, action: PayloadAction<Exercise>) => {
      state.items = [...state.items, action.payload];
    },
  },
});

export const { addExercise } = exerciseReducer.actions;
export default exerciseReducer.reducer;
