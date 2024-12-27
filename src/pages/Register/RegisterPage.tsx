import { Link } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { Layout } from "../../components/Layout/Layout";
import { TextInput } from "../../components/TextInput/TextInput";
import { useMutation } from "@tanstack/react-query";
import { RegisterBody, UsersApi } from "../../api/UsersApi";
import { AxiosError } from "axios";

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatedPassword: string;
  terms: boolean;
}

export const RegisterPage = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterForm>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatedPassword: "",
      terms: false,
    },
  });

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: (data: RegisterBody) => UsersApi.register(data),
  });

  const onSubmit = (data: RegisterForm) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { terms: _, ...body } = data;
    mutate(body);
  };

  if(isSuccess){
    return (
      <Layout isSimpleHeader={true}>
        <div className="flex-center">
          <div className="card flex-column auth-card text-center">
            <p className="text-4xl font-bold">Welcome to the app!</p>
            <h1 className="text-xl font-medium text-gray">
              Your account has been created successfully
            </h1>
            <Link to="/login" className="btn auth-btn">
              Login
            </Link>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout isSimpleHeader={true} isUtils={true}>
      <div className="auth-container flex-center">
        <div className="card flex-column auth-card text-center">
          <div>
            <p className="text-4xl font-bold">Nice to meet you!</p>
            <h1 className="text-xl font-medium text-gray">
              Create an account to start using the app
            </h1>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-column auth-form"
          >
            <Controller
              name="firstName"
              control={control}
              rules={{ required: "First name is required" }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  placeholder="First name"
                  error={errors.firstName?.message}
                />
              )}
            />

            <Controller
              name="lastName"
              control={control}
              rules={{ required: "Last name is required" }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  placeholder="Last name"
                  error={errors.lastName?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email format",
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
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  type="password"
                  placeholder="Password"
                  error={errors.password?.message}
                />
              )}
            />

            <Controller
              name="repeatedPassword"
              control={control}
              rules={{
                required: "Please repeat your password",
                validate: (value) =>
                  value === getValues().password || "Passwords do not match",
              }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  type="password"
                  placeholder="Repeat password"
                  error={errors.repeatedPassword?.message}
                />
              )}
            />

            <div className="flex auth-terms-wrapper">
              <Controller
                name="terms"
                control={control}
                rules={{
                  required: "You must agree to the terms and privacy policy",
                }}
                render={({
                  field: { value, onBlur, onChange, name, ref, disabled },
                }) => (
                  <>
                    <input
                      type="checkbox"
                      checked={value}
                      onBlur={onBlur}
                      ref={ref}
                      disabled={disabled}
                      onChange={onChange}
                      name={name}
                    />
                    <label htmlFor="terms">
                      I agree to{" "}
                      <a href="#" className="link">
                        terms of service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="link">
                        privacy policy
                      </a>
                      .
                    </label>
                  </>
                )}
              />
            </div>
            {errors.terms && (
              <p className="text-error">{errors.terms.message}</p>
            )}

            {error && (
              <p className="text-error">
                {(error as AxiosError<{ message: string }>)?.response?.data
                  ?.message || "Error registering"}
              </p>
            )}

            <button type="submit" className="btn auth-btn" disabled={isPending}>
              {isPending ? "Registering..." : "Register"}
            </button>
          </form>

          <Link to="/login" className="link">
            I already have an account
          </Link>
        </div>
      </div>
    </Layout>
  );
};
