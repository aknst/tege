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
      errorToast("Не удалось авторизоваться", error);
    }
  };

  const register = async (newUserData: RegisterFields) => {
    try {
      await createNewUser(newUserData);
      successToast("Регистрация прошла успешно!", "...");
      await loginWithPasswordApi(newUserData.email, newUserData.password);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.navigate({ to: getRedirectUrl() });
    } catch (error) {
      errorToast("Не удалось зарегистрироваться", error);
    }
  };

  const confirmPasswordReset = async (
    oldPassword: string,
    password: string,
    passwordConfirm: string
  ) => {
    try {
      await confirmPasswordResetApi(oldPassword, password, passwordConfirm);
      successToast("Пароль изменен", "Ваш пароль был изменен");
      router.navigate({ to: "/" });
    } catch (error) {
      errorToast("Не удалось изменить пароль", error);
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
