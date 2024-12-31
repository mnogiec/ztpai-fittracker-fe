import {
  BrowserRouter,
  Routes as RouterRoutes,
  Route,
  Navigate,
} from 'react-router';
import { WorkoutsPage } from './pages/Workouts/WorkoutsPage';
import { RegisterPage } from './pages/Register/RegisterPage';
import { ExercisesBasePage } from './pages/ExercisesBase/ExercisesBasePage';
import { PrivateExercisesPage } from './pages/PrivateExercises/PrivateExercisesPage';
import { LoginPage } from './pages/Login/LoginPage';

import './App.css';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { NotForLogged } from './components/NotForLogged/NotForLogged';

export const Routes = () => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <WorkoutsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='login'
          element={
            <NotForLogged>
              <LoginPage />
            </NotForLogged>
          }
        />
        <Route
          path='register'
          element={
            <NotForLogged>
              <RegisterPage />
            </NotForLogged>
          }
        />
        <Route
          path='exercises-base'
          element={
            <ProtectedRoute>
              <ExercisesBasePage />
            </ProtectedRoute>
          }
        />
        <Route
          path='private-exercises'
          element={
            <ProtectedRoute>
              <PrivateExercisesPage />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<Navigate to='/' replace />} />
      </RouterRoutes>
    </BrowserRouter>
  );
};
