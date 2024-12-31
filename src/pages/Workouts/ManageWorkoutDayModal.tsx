import { useForm } from 'react-hook-form';
import { WorkoutDay } from '../../models/WorkoutDay';
import { NewWorkoutExerciseForm } from './NewWorkoutExerciseForm';
import { ManageWorkoutExercisesForm } from './ManageWorkoutExercisesForm';

export interface WorkoutDayFormData {
  sets: number;
  reps: number;
  weight: number;
  categoryId: number;
  exerciseId: string;
}

interface ManageWorkoutDayModalProps {
  workoutDay: WorkoutDay;
  onClose: () => void;
}

export const ManageWorkoutDayModal = ({
  workoutDay,
  onClose,
}: ManageWorkoutDayModalProps) => {
  const { control, handleSubmit, watch, reset } = useForm<WorkoutDayFormData>({
    defaultValues: {
      sets: 1,
      reps: 1,
      weight: 1,
      categoryId: 0,
      exerciseId: '',
    },
  });
  const selectedCategoryId = watch('categoryId');

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='modal-topbar'>
          <h3 className='modal-title font-bold text-2xl'>Manage Day</h3>
          <span className='close' onClick={onClose}>
            &times;
          </span>
        </div>
        <div className='modal-body'>
          <ManageWorkoutExercisesForm
            workoutDay={workoutDay}
            reset={reset}
            onClose={onClose}
          />
          <NewWorkoutExerciseForm
            control={control}
            handleSubmit={handleSubmit}
            onClose={onClose}
            selectedCategoryId={selectedCategoryId}
            workoutDay={workoutDay}
            reset={reset}
          />
        </div>
      </div>
    </div>
  );
};
