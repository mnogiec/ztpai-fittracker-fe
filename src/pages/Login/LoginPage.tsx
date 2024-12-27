import { Controller, useForm } from "react-hook-form";
import { Layout } from "../../components/Layout/Layout";
import { TextInput } from "../../components/TextInput/TextInput";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { UsersApi } from "../../api/UsersApi";
import { AxiosError } from "axios";

export const ACCESS_TOKEN_KEY = "accessToken";

interface LoginForm {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isPending, error } = useMutation({
    mutationFn: (data: LoginForm) => UsersApi.login(data),
    onSuccess: (data) => {
      const { accessToken } = data.data;
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      navigate("/");
    },
  });

  const onSubmit = (data: LoginForm) => {
    login(data);
  };

  return (
    <Layout isSimpleHeader={true} isUtils={true}>
      <div className="auth-container flex-center">
        <div className="card flex-column auth-card text-center">
          <div>
            <p className="text-4xl font-bold">Good to see you again!</p>
            <h1 className="text-xl font-medium text-gray">
              Login to start using the app
            </h1>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-column auth-form"
          >
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  placeholder="Email"
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  type="password"
                  placeholder="Password"
                  error={errors.password?.message}
                />
              )}
            />

            {error && (
              <p className="text-error">
                {(error as AxiosError<{ message: string }>)?.response?.data
                  ?.message || "Error registering"}
              </p>
            )}

            <button type="submit" className="btn auth-btn" disabled={isPending}>
              Login
            </button>
          </form>

          <Link to="/register" className="link">
            I don't have an account
          </Link>
        </div>
      </div>
    </Layout>
  );
};
