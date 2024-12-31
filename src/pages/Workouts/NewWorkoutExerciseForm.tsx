import { Control, Controller, UseFormHandleSubmit } from 'react-hook-form';
import { WorkoutDayFormData } from './ManageWorkoutDayModal';
import { EXERCISES_CATEGORIES_API_KEYS } from '../../api/ExerciseCategoriesApi';
import { EXERCISES_API_KEYS } from '../../api/ExercisesApi';
import { ExerciseCategoriesApi } from '../../api/ExerciseCategoriesApi';
import { ExercisesApi } from '../../api/ExercisesApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CreateWorkoutExerciseBody,
  WORKOUTS_API_KEYS,
} from '../../api/WorkoutsApi';
import { WorkoutsApi } from '../../api/WorkoutsApi';
import { WorkoutDay } from '../../models/WorkoutDay';

interface NewWorkoutExerciseFormProps {
  control: Control<WorkoutDayFormData>;
  handleSubmit: UseFormHandleSubmit<WorkoutDayFormData, undefined>;
  onClose: () => void;
  selectedCategoryId: number;
  workoutDay: WorkoutDay;
  reset: () => void;
}

export const NewWorkoutExerciseForm = ({
  control,
  handleSubmit,
  onClose,
  selectedCategoryId,
  workoutDay,
  reset,
}: NewWorkoutExerciseFormProps) => {
  const queryClient = useQueryClient();

  const { data: categoriesData } = useQuery({
    queryKey: [EXERCISES_CATEGORIES_API_KEYS.GET_ALL],
    queryFn: ExerciseCategoriesApi.getAll,
  });
  const categories = categoriesData?.data;

  const { data: myExercisesData } = useQuery({
    queryKey: [EXERCISES_API_KEYS.GET_ALL_MY],
    queryFn: ExercisesApi.getAllMy,
  });

  const myExercises = Object.values(myExercisesData?.data || {}).flat();

  const exercisesByCategory = myExercises?.filter(
    (exercise) => exercise.category?.id === Number(selectedCategoryId),
  );

  const createExerciseMutation = useMutation({
    mutationFn: (data: CreateWorkoutExerciseBody) =>
      WorkoutsApi.createWorkoutExercise(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [WORKOUTS_API_KEYS.GET_ALL_DAYS],
      });
      reset();
      onClose();
    },
  });

  const onSubmit = (data: WorkoutDayFormData) => {
    createExerciseMutation.mutate({
      workoutDayId: workoutDay.id || undefined,
      ...data,
    });
  };

  return (
    <form className='workouts-exercises-form' onSubmit={handleSubmit(onSubmit)}>
      <p className='font-bold text-xl'>New Exercise</p>

      <div className='workouts-edit-input-box' id='exerciseCategoryWrapper'>
        <label htmlFor='exerciseCategory'>Category:</label>
        <Controller
          name='categoryId'
          control={control}
          rules={{
            required: 'Category is required',
          }}
          render={({ field, fieldState: { error } }) => (
            <>
              <select
                {...field}
                id='exerciseCategory'
                className='workouts-select'>
                <option value=''>Select Category</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {error && <span className='text-error'>{error.message}</span>}
            </>
          )}
        />
      </div>

      {selectedCategoryId ? (
        <div className='workouts-edit-input-box' id='exerciseNameWrapper'>
          <label htmlFor='exerciseName'>Exercise:</label>
          <Controller
            name='exerciseId'
            control={control}
            rules={{
              required: 'Exercise is required',
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <select
                  {...field}
                  id='exerciseName'
                  className='workouts-select'>
                  <option value=''>Select Exercise</option>
                  {exercisesByCategory?.map((exercise) => (
                    <option key={exercise.id} value={exercise.id}>
                      {exercise.name}
                    </option>
                  ))}
                </select>
                {error && <span className='text-error'>{error.message}</span>}
              </>
            )}
          />
        </div>
      ) : null}

      <div className='workouts-edit-wrapper'>
        <div className='workouts-edit-input-box'>
          <label htmlFor='new-sets'>Sets:</label>
          <Controller
            name='sets'
            control={control}
            rules={{
              required: 'Sets are required',
              min: { value: 1, message: 'Minimum value is 1' },
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <input
                  {...field}
                  id='new-sets'
                  className={`workouts-edit-input ${
                    error ? 'error-border' : ''
                  }`}
                  type='number'
                  placeholder='Enter sets'
                  min='1'
                />
              </>
            )}
          />
        </div>

        <div className='workouts-edit-input-box'>
          <label htmlFor='new-reps'>Reps:</label>
          <Controller
            name='reps'
            control={control}
            rules={{
              required: 'Reps are required',
              min: { value: 1, message: 'Minimum value is 1' },
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <input
                  {...field}
                  id='new-reps'
                  className={`workouts-edit-input ${
                    error ? 'error-border' : ''
                  }`}
                  type='number'
                  placeholder='Enter reps'
                  min='1'
                />
              </>
            )}
          />
        </div>

        <div className='workouts-edit-input-box'>
          <label htmlFor='new-weight'>Weight:</label>
          <Controller
            name='weight'
            control={control}
            rules={{
              required: 'Weight is required',
              min: { value: 1, message: 'Minimum value is 1' },
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <input
                  {...field}
                  id='new-weight'
                  className={`workouts-edit-input ${
                    error ? 'error-border' : ''
                  }`}
                  type='number'
                  placeholder='Enter weight'
                  min='1'
                />
              </>
            )}
          />
        </div>
      </div>

      <div className='workouts-button-wrapper'>
        <button type='submit' className='btn'>
          Add Exercise
        </button>
        <button type='button' className='btn btn-secondary' onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};
