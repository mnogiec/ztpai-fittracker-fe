import { Exercise } from './Exercise';

export interface ExerciseCategory {
  id: number;
  name: string;
  exercises?: Exercise[];
}
