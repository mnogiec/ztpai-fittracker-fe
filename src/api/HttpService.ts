import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { ACCESS_TOKEN_KEY } from '../pages/Login/LoginPage';

export const HttpService = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const onRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> =>
  Promise.reject(error);

const onResponse = (response: AxiosResponse): AxiosResponse => response;

const onResponseError = async (
  error: AxiosError,
): Promise<AxiosError | AxiosResponse> => {
  if (
    error.response &&
    error.response.status === 401 &&
    error.config?.url !== '/auth/login'
  ) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    window.location.href = '/login';
  }

  return Promise.reject(error);
};

HttpService.interceptors.request.use(onRequest, onRequestError);
HttpService.interceptors.response.use(onResponse, onResponseError);
