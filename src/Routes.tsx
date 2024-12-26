import {
  BrowserRouter,
  Routes as RouterRoutes,
  Route,
  Navigate,
} from "react-router";
import { WorkoutsPage } from "./pages/Workouts/WorkoutsPage";
import { RegisterPage } from "./pages/Register/RegisterPage";
import { ExercisesBasePage } from "./pages/ExercisesBase/ExercisesBasePage";
import { PrivateExercisesPage } from "./pages/PrivateExercises/PrivateExercisesPage";
import { LoginPage } from "./pages/Login/LoginPage";

import "./App.css";

export const Routes = () => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path="/" element={<WorkoutsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="exercises-base" element={<ExercisesBasePage />} />
        <Route path="private-exercises" element={<PrivateExercisesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </RouterRoutes>
    </BrowserRouter>
  );
};
