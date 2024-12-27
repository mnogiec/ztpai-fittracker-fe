import { Navigate } from "react-router";
import { ACCESS_TOKEN_KEY } from "../../pages/Login/LoginPage";

export const NotForLogged = ({ children }: { children: React.ReactNode }) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (accessToken) {
    return <Navigate to="/" replace />;
  }
  return children;
};