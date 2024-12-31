import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ManageWorkoutDayModal } from './ManageWorkoutDayModal';
import { WORKOUTS_API_KEYS, WorkoutsApi } from '../../api/WorkoutsApi';
import { Layout } from '../../components/Layout/Layout';
import { WorkoutDay } from '../../models/WorkoutDay';
import { WorkoutDayItem } from './WorkoutDayItem';
import moment from 'moment';

export const WorkoutsPage = () => {
  const { data: workoutDaysData, isLoading: workoutDaysLoading } = useQuery({
    queryKey: [WORKOUTS_API_KEYS.GET_ALL_DAYS],
    queryFn: WorkoutsApi.getAllDays,
  });

  const workoutDays = workoutDaysData?.data;

  const [selectedDay, setSelectedDay] = useState<WorkoutDay | null>(null);

  const today = new Date().toISOString().split('T')[0];
  const todayWorkoutDay = workoutDays?.find((day) =>
    moment(day.date).isSame(today, 'day'),
  );

  return (
    <Layout>
      <div className='workouts-container'>
        <h1 className='text-4xl font-bold'>Your Workouts</h1>
        <div className='workouts-days-wrapper'>
          {workoutDaysLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              {!todayWorkoutDay && (
                <div className='workouts-day-box'>
                  <p className='font-medium text-xl'>Today</p>
                  <div className='workouts-units-wrapper'>
                    <p className='workouts-not-found text-gray text-center'>
                      You don't have any exercises done today.
                    </p>
                  </div>
                  <div className='workouts-manage-wrapper'>
                    <button
                      type='button'
                      className='btn'
                      onClick={() =>
                        setSelectedDay({
                          date: today,
                          workoutExercises: [],
                          id: '',
                          createdAt: '',
                          updatedAt: '',
                        })
                      }>
                      Add exercise
                      <i className='fa-solid fa-plus'></i>
                    </button>
                  </div>
                </div>
              )}

              {workoutDays?.map((day) => (
                <WorkoutDayItem
                  key={day.id}
                  day={day}
                  onManageDay={setSelectedDay}
                />
              ))}
            </>
          )}
        </div>
      </div>

      {selectedDay && (
        <ManageWorkoutDayModal
          workoutDay={selectedDay}
          onClose={() => setSelectedDay(null)}
        />
      )}
    </Layout>
  );
};
