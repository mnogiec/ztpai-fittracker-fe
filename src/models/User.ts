import { Exercise } from "./Exercise";
import { WorkoutDay } from "./WorkoutDay";

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  exercises?: Exercise[];
  workoutDays?: WorkoutDay[];
}
