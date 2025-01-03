import { ExerciseCategory } from '../models/ExerciseCategory';
import { HttpService } from './HttpService';

export const EXERCISES_CATEGORIES_API_KEYS = {
  GET_ALL: 'exerciseCategories',
} as const;

export const ExerciseCategoriesApi = {
  getAll: () => HttpService.get<ExerciseCategory[]>('/exercise-categories'),
};
