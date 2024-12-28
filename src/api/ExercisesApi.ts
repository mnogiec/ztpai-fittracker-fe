import { Exercise } from "../models/Exercise";
import { HttpService } from "./HttpService";

export const EXERCISES_API_KEYS = {
  GET_ALL_PUBLIC: 'exercises/public',
  GET_ALL_PRIVATE: 'exercises/private',
  GET_ALL_MY: 'exercises/my',
} as const;

export interface CreateExerciseBody {
  name: string;
  categoryId: number;
  isPrivate: boolean;
}

type UpdateExerciseBody = Partial<CreateExerciseBody>;

type GetExerciseResponse = Record<string, Exercise[]>;

export const ExercisesApi = {
  getAllPublic: () => HttpService.get<GetExerciseResponse>('/exercises/public'),
  getAllPrivate: () => HttpService.get<GetExerciseResponse>('/exercises/private'),
  getAllMy: () => HttpService.get<GetExerciseResponse>('/exercises'),
  createExercise: (body: CreateExerciseBody) => HttpService.post<Exercise>('/exercises', body),
  updateExercise: (id: string, body: UpdateExerciseBody) => HttpService.patch<Exercise>(`/exercises/${id}`, body),
  deleteExercise: (id: string) => HttpService.delete<void>(`/exercises/${id}`),
}