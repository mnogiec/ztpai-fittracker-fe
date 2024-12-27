import { User } from "../models/User";
import { HttpService } from "./HttpService";

export interface LoginBody{
  email: string;
  password: string;
};

interface LoginResponse {
  accessToken: string;
  user: User;
}

export interface RegisterBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const UsersApi = {
  login: (body: LoginBody) => HttpService.post<LoginResponse>('/auth/login', body),
  register: (body: RegisterBody) => HttpService.post<User>('/users/register', body),
}