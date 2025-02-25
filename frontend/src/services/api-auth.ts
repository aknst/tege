import { queryOptions } from "@tanstack/react-query";
import { pb } from "./pocketbase";
import { userSchema } from "@/schemas/user-schema";

export async function authRefresh() {
  if (!pb.authStore.isValid) return;
  await pb.collection("users").authRefresh();
}

export async function createNewUser(newUserData: {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}) {
  await pb.collection("users").create({ ...newUserData });
}

export async function loginWithPassword(email: string, password: string) {
  const authResult = await pb
    .collection("users")
    .authWithPassword(email, password);
  return authResult;
}

export async function confirmPasswordReset(
  password: string,
  passwordConfirm: string,
  token: string
) {
  await pb
    .collection("users")
    .confirmPasswordReset(token, password, passwordConfirm);
  if (pb.authStore.record)
    await loginWithPassword(pb.authStore.record.email, password);
}

export function logout() {
  pb.authStore.clear();
}

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
