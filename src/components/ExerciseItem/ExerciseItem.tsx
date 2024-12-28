import { Exercise as ExerciseModel } from "../../models/Exercise";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ExerciseDetailsModal } from "../ExerciseDetailsModal/ExerciseDetailsModal";

interface ExerciseProps {
  exercise: ExerciseModel;
  canManage?: boolean;
  onEdit?: (exercise: ExerciseModel) => void;
  onDelete?: (exercise: ExerciseModel) => void;
}

export const ExerciseItem = ({
  exercise,
  canManage = false,
  onEdit,
  onDelete,
}: ExerciseProps) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  return (
    <>
      {isDetailsModalOpen && (
        <ExerciseDetailsModal
          isOpen={isDetailsModalOpen}
          exercise={exercise}
          onClose={() => setIsDetailsModalOpen(false)}
        />
      )}
      <div
        className="exercises-box"
        onClick={() => {
          setIsDetailsModalOpen(true);
        }}
      >
        <img
          src={exercise.imageUrl}
          alt={exercise.name}
          className="exercises-image"
        />
        <div className="exercises-text-box">
          <h3 className="font-bold">{exercise.name}</h3>
          <p className="text-sm text-gray exercises-description">
            {exercise.description}
          </p>
        </div>
        {canManage && (
          <div className="exercises-options-wrapper">
            <button
              type="button"
              className="exercises-option-btn edit-btn"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(exercise);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button
              type="button"
              className="exercises-option-btn delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(exercise);
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
