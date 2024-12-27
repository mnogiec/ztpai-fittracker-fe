import { useNavigate } from "react-router";
import { ACCESS_TOKEN_KEY } from "../pages/Login/LoginPage";

export const useRedirectIfLogged = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const navigate = useNavigate();
  if (accessToken) {
    navigate('/');
  } 
};