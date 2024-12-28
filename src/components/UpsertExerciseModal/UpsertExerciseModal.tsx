import { Controller, useForm } from "react-hook-form";
import { Exercise } from "../../models/Exercise";
import { ExercisesApi } from "../../api/ExercisesApi";
import { EXERCISES_API_KEYS } from "../../api/ExercisesApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EXERCISES_CATEGORIES_API_KEYS } from "../../api/ExerciseCategoriesApi";
import { ExerciseCategoriesApi } from "../../api/ExerciseCategoriesApi";
import { User } from "../../models/User";
import { USER_KEY } from "../../pages/Login/LoginPage";

interface UpsertForm {
  name: string;
  categoryId?: number;
  description?: string;
  videoUrl?: string;
  imageUrl?: string;
  isPrivate: boolean;
}

export const UpsertExerciseModal = ({
  exercise,
  onClose,
}: {
  exercise: Exercise | null;
  onClose: () => void;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpsertForm>({
    defaultValues: {
      name: exercise?.name || "",
      categoryId: exercise?.category?.id,
      description: exercise?.description || "",
      videoUrl: exercise?.videoUrl || "",
      imageUrl: exercise?.imageUrl || "",
      isPrivate: exercise?.isPrivate ?? false,
    },
  });

  const user: User|null = JSON.parse(localStorage.getItem(USER_KEY) || "{}");
  const isAdmin = user?.isAdmin;

  const queryClient = useQueryClient();

  const { data: categoriesData } = useQuery({
    queryKey: [EXERCISES_CATEGORIES_API_KEYS.GET_ALL],
    queryFn: ExerciseCategoriesApi.getAll,
  });
  const categories = categoriesData?.data;

  const saveExerciseMutation = useMutation({
    mutationFn: (body: UpsertForm) =>
      exercise
        ? ExercisesApi.updateExercise(exercise.id, body)
        : ExercisesApi.createExercise({
            ...body,
            categoryId: body.categoryId!,
          }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [EXERCISES_API_KEYS.GET_ALL_PRIVATE],
      });
      queryClient.invalidateQueries({
        queryKey: [EXERCISES_API_KEYS.GET_ALL_MY],
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
          <h3 className="modal-title font-bold text-2xl">
            {exercise ? "Edit Exercise" : "Add Exercise"}
          </h3>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <form
            className="exercises-form"
            onSubmit={handleSubmit((data) => {
              saveExerciseMutation.mutate(data);
            })}
          >
            <div className="exercises-form-row">
              <label htmlFor="name">Name:</label>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <input {...field} id="name" className="text-input" />
                )}
              />
              {errors.name && (
                <p className="text-error">{errors.name.message}</p>
              )}
            </div>
            <div className="exercises-form-row">
              <label htmlFor="categoryId">Category:</label>
              <Controller
                name="categoryId"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <select {...field} id="categoryId" className="text-input">
                    <option value="">Select a category</option>
                    {categories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.categoryId && (
                <p className="text-error">{errors.categoryId.message}</p>
              )}
            </div>
            <div className="exercises-form-row">
              <label htmlFor="imageUrl">Image URL:</label>
              <Controller
                name="imageUrl"
                control={control}
                render={({ field }) => (
                  <input {...field} id="imageUrl" className="text-input" />
                )}
              />
            </div>
            <div className="exercises-form-row">
              <label htmlFor="videoUrl">Video URL:</label>
              <Controller
                name="videoUrl"
                control={control}
                render={({ field }) => (
                  <input {...field} id="videoUrl" className="text-input" />
                )}
              />
            </div>
            <div className="exercises-form-row">
              <label htmlFor="description">Description:</label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="description"
                    className="text-input text-area"
                  />
                )}
              />
            </div>
            {isAdmin && (
              <div className="is-private-row">
                <label htmlFor="isPrivate">Private:</label>
                <Controller
                  name="isPrivate"
                  control={control}
                  render={({ field: { value, onBlur, onChange, name, ref, disabled } }) => (
                     <input
                      type="checkbox"
                      checked={value}
                      onBlur={onBlur}
                      ref={ref}
                      disabled={disabled}
                      onChange={onChange}
                      name={name}
                    />
                  )}
                />
              </div>
            )}
            <button type="submit" className="btn">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
