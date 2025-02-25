import { errorToast, successToast } from "@/lib/toast";
import { RegisterFields } from "@/schemas/auth-schema";
import {
  confirmPasswordReset as confirmPasswordResetApi,
  createNewUser,
  loginWithPassword as loginWithPasswordApi,
  logout as logoutApi,
  userQueryOptions,
} from "@/services/api-auth";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export default function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user } = useSuspenseQuery(userQueryOptions);

  const logout = () => {
    logoutApi();
    queryClient.invalidateQueries({ queryKey: ["user"] });
    router.navigate({ to: "/" });
    successToast("Вы вышли из аккаунта");
  };

  const getRedirectUrl = () => {
    const searchParams = new URLSearchParams(router.state.location.search);
    return searchParams.get("redirectUrl") || "/";
  };

  const loginWithPassword = async (email: string, password: string) => {
    try {
      await loginWithPasswordApi(email, password);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.navigate({ to: getRedirectUrl() });
      successToast("Успешная авторизация");
    } catch (error) {
      errorToast("Could not log in", error);
    }
  };

  const register = async (newUserData: RegisterFields) => {
    try {
      await createNewUser(newUserData);
      successToast(
        "Registration successful!",
        "Please check your inbox for a verification email"
      );
      await loginWithPasswordApi(newUserData.email, newUserData.password);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.navigate({ to: getRedirectUrl() });
    } catch (error) {
      errorToast("Could not register", error);
    }
  };

  const confirmPasswordReset = async (
    password: string,
    passwordConfirm: string,
    token: string
  ) => {
    try {
      await confirmPasswordResetApi(password, passwordConfirm, token);
      successToast("Changed password", "Your password has been updated");
      router.navigate({ to: "/" });
    } catch (error) {
      errorToast("Could not update password", error);
    }
  };

  return {
    user,
    logout,
    loginWithPassword,
    register,
    confirmPasswordReset,
  };
}
