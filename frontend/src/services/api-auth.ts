import { queryOptions } from "@tanstack/react-query";
import { pb } from "./pocketbase";
import { userSchema } from "@/schemas/user-schema";

/**
 * Обновляет аутентификацию пользователя, если он авторизован.
 * @async
 * @returns {Promise<void>}
 */
export async function authRefresh() {
  if (!pb.authStore.isValid) return;
  await pb.collection("users").authRefresh();
}

/**
 * Создает нового пользователя.
 * @async
 * @param {Object} newUserData - Данные нового пользователя.
 * @param {string} newUserData.name - Имя пользователя.
 * @param {string} newUserData.email - Email пользователя.
 * @param {string} newUserData.password - Пароль пользователя.
 * @param {string} newUserData.passwordConfirm - Подтверждение пароля.
 * @returns {Promise<void>}
 */
export async function createNewUser(newUserData: {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}) {
  await pb.collection("users").create({ ...newUserData });
}

/**
 * Авторизует пользователя с помощью email и пароля.
 * @async
 * @param {string} email - Email пользователя.
 * @param {string} password - Пароль пользователя.
 * @returns {Promise<Object>} - Результат аутентификации.
 */
export async function loginWithPassword(email: string, password: string) {
  const authResult = await pb
    .collection("users")
    .authWithPassword(email, password);
  return authResult;
}

/**
 * Подтверждает сброс пароля и автоматически авторизует пользователя.
 * @async
 * @param {string} password - Новый пароль.
 * @param {string} passwordConfirm - Подтверждение нового пароля.
 * @param {string} token - Токен сброса пароля.
 * @returns {Promise<void>}
 */
export async function confirmPasswordReset(
  oldPassword: string,
  password: string,
  passwordConfirm: string
) {
  if (pb.authStore.record?.id)
    await pb.collection("users").update(pb.authStore.record?.id, {
      "oldPassword": oldPassword,
      "password": password,
      "passwordConfirm": passwordConfirm,
    });

  if (pb.authStore.record)
    await loginWithPassword(pb.authStore.record.email, password);
}

/**
 * Выполняет выход пользователя из системы.
 */
export function logout() {
  pb.authStore.clear();
}

/**
 * Опции запроса пользователя для React Query.
 * @constant
 * @type {Object}
 */
export const userQueryOptions = queryOptions({
  queryKey: ["user"],
  queryFn: async () => {
    if (!pb.authStore.isValid) return null;

    try {
      await authRefresh();
    } catch {
      logout();
      return null;
    }

    const userData = userSchema.parse({
      ...pb.authStore.record,
    });

    return userData;
  },
  staleTime: 5 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
  refetchInterval: false,
});
