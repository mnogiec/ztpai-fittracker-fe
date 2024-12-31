import { WorkoutDay } from '../models/WorkoutDay';
import { HttpService } from './HttpService';

export const WORKOUTS_API_KEYS = {
  GET_ALL_DAYS: 'workouts/days',
} as const;

export interface CreateWorkoutExerciseBody {
  workoutDayId?: string;
  exerciseId: string;
  sets: number;
  reps: number;
  weight: number;
}

export type UpdateWorkoutExerciseBody = {
  workoutDayId: string;
  exerciseId?: string;
  sets?: number;
  reps?: number;
  weight?: number;
};

export const WorkoutsApi = {
  getAllDays: () => HttpService.get<WorkoutDay[]>('/workouts'),
  createWorkoutExercise: (body: CreateWorkoutExerciseBody) =>
    HttpService.post<WorkoutDay>('/workouts/exercise', body),
  updateWorkoutExercise: (id: string, body: UpdateWorkoutExerciseBody) =>
    HttpService.patch<WorkoutDay>(`/workouts/exercise/${id}`, body),
  deleteWorkoutExercise: (id: string) =>
    HttpService.delete<void>(`/workouts/exercise/${id}`),
};
