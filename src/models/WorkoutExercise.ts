import { Exercise } from "./Exercise";
import { WorkoutDay } from "./WorkoutDay";

export interface WorkoutExercise {
  id: string;
  sets: number;
  reps: number;
  weight: number;
  exercise?: Exercise;
  workoutDay?: WorkoutDay;
}
