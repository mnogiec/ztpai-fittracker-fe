import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { ExercisesApi } from "../../api/ExercisesApi";
import { EXERCISES_API_KEYS } from "../../api/ExercisesApi";
import { Exercise } from "../../models/Exercise";

export const DeleteExerciseModal = ({
  exercise,
  onClose,
}: {
  exercise: Exercise;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();

  const deleteExerciseMutation = useMutation({
    mutationFn: (id: string) => ExercisesApi.deleteExercise(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [EXERCISES_API_KEYS.GET_ALL_MY],
      });
      queryClient.invalidateQueries({
        queryKey: [EXERCISES_API_KEYS.GET_ALL_PRIVATE],
      });
      queryClient.invalidateQueries({
        queryKey: [EXERCISES_API_KEYS.GET_ALL_PUBLIC],
      });
      onClose();
    },
  });

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-topbar">
          <h3 className="modal-title font-bold text-2xl">Confirm Delete</h3>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <p className="mb-1">
            Are you sure you want to delete the exercise{" "}
            <strong>{exercise?.name}</strong>?
          </p>
          <div className="modal-footer">
            <button
              onClick={() => deleteExerciseMutation.mutate(exercise?.id)}
              className="btn"
            >
              Yes
            </button>
            <button onClick={onClose} className="btn">
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
