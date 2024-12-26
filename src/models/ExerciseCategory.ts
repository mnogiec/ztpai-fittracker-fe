import { Exercise } from "./Exercise";

export interface ExerciseCategory {
  id: string;
  name: string;
  exercises?: Exercise[];
}
