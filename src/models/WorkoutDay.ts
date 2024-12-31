import { User } from './User';
import { WorkoutExercise } from './WorkoutExercise';

export interface WorkoutDay {
  id: string;
  createdAt: string;
  updatedAt: string;
  date: string;
  user?: User;
  workoutExercises?: WorkoutExercise[];
}
