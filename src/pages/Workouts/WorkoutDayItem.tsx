import { WorkoutDay } from '../../models/WorkoutDay';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  if (isToday) return 'Today';

  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  const formattedDate = date.toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return `${dayName} ${formattedDate}`;
};

export const WorkoutDayItem = ({
  day,
  onManageDay,
}: {
  day: WorkoutDay;
  onManageDay: (day: WorkoutDay) => void;
}) => (
  <div className='workouts-day-box'>
    <p className='font-medium text-xl'>{formatDate(day.date)}</p>
    <div className='workouts-units-wrapper'>
      {day.workoutExercises?.length === 0 ? (
        <p className='workouts-not-found text-gray text-center'>
          No exercises for this day.
        </p>
      ) : (
        day.workoutExercises?.map((exercise) => (
          <div
            key={exercise.id}
            className='workouts-unit exercise-item'
            data-id={exercise.id}>
            <img
              src={exercise.exercise?.imageUrl}
              alt={exercise.exercise?.name}
              className='workouts-image'
            />
            <div className='workouts-text'>
              <p className='font-medium text-lg'>{exercise.exercise?.name}</p>
              <div className='workouts-details'>
                <p className='text-gray workouts-info'>Sets: {exercise.sets}</p>
                <p className='text-gray workouts-info'>Reps: {exercise.reps}</p>
                <p className='text-gray workouts-info'>
                  Weight: {exercise.weight}kg
                </p>
                <p className='text-gray workouts-info workouts-info--long'>
                  Volume: {exercise.sets * exercise.reps * exercise.weight}kg
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>

    <div className='workouts-units-wrapper-mobile text-gray text-sm'>
      {day.workoutExercises?.length === 0 ? (
        <p className='workouts-not-found text-gray text-center'>
          No exercises for this day.
        </p>
      ) : (
        <ul>
          {day.workoutExercises?.map((exercise) => (
            <li key={exercise.id}>
              {exercise.exercise?.name} -{' '}
              <span
                className='mobile-exercise-item og-data'
                data-id={exercise.id}>
                {exercise.sets}x{exercise.reps}x{exercise.weight}kg
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
    <div className='workouts-manage-wrapper'>
      <button type='button' className='btn' onClick={() => onManageDay(day)}>
        {day.workoutExercises?.length === 0
          ? 'Add Exercise'
          : 'Manage this day'}
        <i className='fa-solid fa-plus'></i>
      </button>
    </div>
  </div>
);
