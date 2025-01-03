import { useState, useCallback } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { Exercise } from '../../models/Exercise';
import { useQuery } from '@tanstack/react-query';
import { ExercisesApi, EXERCISES_API_KEYS } from '../../api/ExercisesApi';
import { UpsertExerciseModal } from '../../components/UpsertExerciseModal/UpsertExerciseModal';
import { DeleteExerciseModal } from '../../components/DeleteExerciseModal/DeleteExerciseModal';
import { ExerciseItem } from '../../components/ExerciseItem/ExerciseItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import debounce from 'lodash/debounce';

export const PrivateExercisesPage = () => {
  const [isCreateEditModalOpen, setIsCreateEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null,
  );

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setDebouncedSearch(value);
    }, 500),
    [],
  );

  const { data: exercisesData } = useQuery({
    queryKey: [EXERCISES_API_KEYS.GET_ALL_PRIVATE, debouncedSearch],
    queryFn: () => ExercisesApi.getAllPrivate(debouncedSearch),
  });
  const exercises = exercisesData?.data;

  return (
    <Layout>
      <div className='exercises-container'>
        <div className='exercises-topbar'>
          <h1 className='text-4xl font-bold'>Private Exercises</h1>
          <div className='exercises-topbar-right'>
            <button
              type='button'
              className='btn exercises-add-button'
              onClick={() => {
                setSelectedExercise(null);
                setIsCreateEditModalOpen(true);
              }}>
              <span className='exercises-add-button-content'>
                <span className='exercises-add-text'>Add Exercise</span>
                <FontAwesomeIcon icon={faPlus} color='white' size='lg' />
              </span>
            </button>
            <input
              type='text'
              placeholder='Search by exercise name'
              className='exercises-search-input text-input'
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                debouncedSetSearch(e.target.value);
              }}
            />
          </div>
        </div>

        <div className='exercises-wrapper'>
          {!exercises || Object.keys(exercises).length === 0 ? (
            <p className='exercises-not-found text-gray text-center'>
              No exercises found
            </p>
          ) : (
            Object.entries(exercises).map(([categoryName, exercisesList]) => (
              <section key={categoryName} className='exercises-section'>
                <h2 className='text-2xl font-semibold'>{categoryName}</h2>
                <div className='exercises-boxes-wrapper'>
                  {exercisesList?.map((exercise: Exercise) => (
                    <ExerciseItem
                      key={exercise.id}
                      exercise={exercise}
                      canManage
                      onEdit={() => {
                        setSelectedExercise(exercise);
                        setIsCreateEditModalOpen(true);
                      }}
                      onDelete={() => {
                        setSelectedExercise(exercise);
                        setIsDeleteModalOpen(true);
                      }}
                    />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </div>

      {isCreateEditModalOpen && (
        <UpsertExerciseModal
          exercise={selectedExercise}
          onClose={() => setIsCreateEditModalOpen(false)}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteExerciseModal
          exercise={selectedExercise!}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </Layout>
  );
};
