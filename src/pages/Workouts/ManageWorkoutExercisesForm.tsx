import { useForm, useFieldArray } from 'react-hook-form';
import { WorkoutsApi } from '../../api/WorkoutsApi';
import { UpdateWorkoutExerciseBody } from '../../api/WorkoutsApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { WORKOUTS_API_KEYS } from '../../api/WorkoutsApi';
import { WorkoutDay } from '../../models/WorkoutDay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';

interface ManageWorkoutExercisesFormProps {
  workoutDay: WorkoutDay;
  reset: () => void;
  onClose: () => void;
}

interface WorkoutExerciseFormData {
  exercises: {
    id: string;
    name?: string;
    imageUrl?: string;
    sets: number;
    reps: number;
    weight: number;
  }[];
}

export const ManageWorkoutExercisesForm = ({
  workoutDay,
  reset: resetParent,
  onClose,
}: ManageWorkoutExercisesFormProps) => {
  const queryClient = useQueryClient();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<WorkoutExerciseFormData>({
    defaultValues: {
      exercises: workoutDay.workoutExercises?.map((exercise) => ({
        id: exercise.id,
        name: exercise.exercise?.name,
        imageUrl: exercise.exercise?.imageUrl,
        sets: exercise.sets,
        reps: exercise.reps,
        weight: exercise.weight,
      })),
    },
  });

  const { fields } = useFieldArray({
    control,
    name: 'exercises',
  });

  const updateExerciseMutation = useMutation({
    mutationFn: (data: UpdateWorkoutExerciseBody) =>
      WorkoutsApi.updateWorkoutExercise(data.exerciseId!, {
        exerciseId: data.exerciseId!,
        workoutDayId: data.workoutDayId!,
        sets: Number(data.sets),
        reps: Number(data.reps),
        weight: Number(data.weight),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [WORKOUTS_API_KEYS.GET_ALL_DAYS],
      });
      resetParent();
      onClose();
    },
  });

  const deleteExerciseMutation = useMutation({
    mutationFn: (id: string) => WorkoutsApi.deleteWorkoutExercise(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [WORKOUTS_API_KEYS.GET_ALL_DAYS],
      });
      resetParent();
      onClose();
    },
  });

  const saveExercise = (index: number) => {
    const workoutExercise = workoutDay.workoutExercises![index];
    const formValues = getValues();
    updateExerciseMutation.mutate({
      workoutDayId: workoutDay.id,
      exerciseId: workoutExercise.id,
      sets: formValues.exercises[index].sets,
      reps: formValues.exercises[index].reps,
      weight: formValues.exercises[index].weight,
    });
  };

  const deleteExercise = (index: number) => {
    const workoutExercise = workoutDay.workoutExercises![index];
    if (window.confirm('Are you sure you want to delete this exercise?')) {
      deleteExerciseMutation.mutate(workoutExercise.id);
    }
  };

  return (
    <div id='exercisesList' className='workouts-exercises-list'>
      {fields.map((field, index) => (
        <div key={field.id} className='workouts-unit exercise-item'>
          <img
            src={field.imageUrl}
            alt={field.name}
            className='workouts-image'
          />
          <div className='workouts-text'>
            <p className='font-medium text-lg'>{field.name}</p>
            <div className='workouts-edit-wrapper'>
              <div className='workouts-edit-input-box'>
                <label htmlFor={`exercises.${index}.sets`}>Sets:</label>
                <input
                  {...register(`exercises.${index}.sets` as const, {
                    required: 'Sets is required',
                    min: { value: 1, message: 'Minimum value is 1' },
                  })}
                  type='number'
                  min='1'
                  className={`workouts-edit-input ${
                    errors.exercises?.[index]?.sets ? 'error-border' : ''
                  }`}
                />
              </div>
              <div className='workouts-edit-input-box'>
                <label htmlFor={`exercises.${index}.reps`}>Reps:</label>
                <input
                  {...register(`exercises.${index}.reps` as const, {
                    required: 'Reps is required',
                    min: { value: 1, message: 'Minimum value is 1' },
                  })}
                  type='number'
                  min='1'
                  className={`workouts-edit-input ${
                    errors.exercises?.[index]?.reps ? 'error-border' : ''
                  }`}
                />
              </div>
              <div className='workouts-edit-input-box'>
                <label htmlFor={`exercises.${index}.weight`}>Weight:</label>
                <input
                  {...register(`exercises.${index}.weight` as const, {
                    required: 'Weight is required',
                    min: { value: 0, message: 'Minimum value is 0' },
                  })}
                  type='number'
                  min='0'
                  className={`workouts-edit-input ${
                    errors.exercises?.[index]?.weight ? 'error-border' : ''
                  }`}
                />
              </div>
              <div className='workouts-actions'>
                <button
                  className='save-exercise-btn workouts-action-button'
                  onClick={handleSubmit(() => saveExercise(index))}>
                  <FontAwesomeIcon icon={faSave} color='royalblue' size='lg' />
                </button>
                <button
                  className='delete-exercise-btn workouts-action-button'
                  onClick={() => deleteExercise(index)}>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    color='royalblue'
                    size='lg'
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
