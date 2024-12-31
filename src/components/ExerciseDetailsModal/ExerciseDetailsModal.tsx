import React from 'react';
import { Exercise } from '../../models/Exercise';

interface ExerciseDetailsProps {
  isOpen: boolean;
  exercise: Exercise;
  onClose: () => void;
}

const getYouTubeVideoId = (url: string) => {
  const regex =
    /(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const ExerciseDetailsModal: React.FC<ExerciseDetailsProps> = ({
  isOpen,
  exercise,
  onClose,
}) => {
  if (!isOpen || !exercise) {
    return null;
  }

  const videoId = exercise.videoUrl
    ? getYouTubeVideoId(exercise.videoUrl)
    : null;

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='modal-topbar'>
          <h3 className='modal-title font-bold text-2xl'>{exercise.name}</h3>
          <span className='close' onClick={onClose}>
            &times;
          </span>
        </div>
        <div className='modal-body'>
          {videoId ? (
            <iframe
              width='100%'
              height='315'
              src={`https://www.youtube.com/embed/${videoId}`}
              frameBorder='0'
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen></iframe>
          ) : (
            exercise.imageUrl && (
              <img
                src={exercise.imageUrl}
                alt={exercise.name}
                className='w-full mb-4'
              />
            )
          )}
          <p className='modal-text text-gray'>{exercise.description}</p>
        </div>
      </div>
    </div>
  );
};
