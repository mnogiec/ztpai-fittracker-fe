import { ExerciseCategory } from './ExerciseCategory';
import { User } from './User';
import { WorkoutExercise } from './WorkoutExercise';

export interface Exercise {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  category?: ExerciseCategory;
  videoUrl?: string;
  imageUrl?: string;
  isPrivate: boolean;
  creator?: User;
  workoutExercises?: WorkoutExercise[];
}
