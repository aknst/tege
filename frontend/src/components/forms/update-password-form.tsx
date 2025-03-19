import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useThrottle } from "@/hooks/use-throttle";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/use-auth";

const passwordFormSchema = z
  .object({
    oldPassword: z.string().min(1, { message: "Введите текущий пароль." }),
    newPassword: z.string().min(6, {
      message: "Новый пароль должен содержать не менее 6 символов.",
    }),
    passwordConfirm: z
      .string()
      .min(6, { message: "Подтвердите новый пароль." }),
  })
  .refine((data) => data.newPassword === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Пароли не совпадают.",
  });

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

export function UpdatePasswordForm({
  className,
}: React.ComponentProps<"form">) {
  const { confirmPasswordReset } = useAuth();

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      passwordConfirm: "",
    },
    mode: "onChange",
  });

  const [handlePasswordReset, isResetting] = useThrottle(
    async (data: PasswordFormValues) => {
      await confirmPasswordReset(
        data.oldPassword,
        data.newPassword,
        data.passwordConfirm
      );
    }
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handlePasswordReset)}
        className={cn("space-y-8", className)}>
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Текущий пароль</FormLabel>
              <FormControl>
                <Input type="password" placeholder="**********" {...field} />
              </FormControl>
              <FormDescription>Введите ваш текущий пароль.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Новый пароль</FormLabel>
              <FormControl>
                <Input type="password" placeholder="**********" {...field} />
              </FormControl>
              <FormDescription>Введите новый пароль.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Подтверждение нового пароля</FormLabel>
              <FormControl>
                <Input type="password" placeholder="**********" {...field} />
              </FormControl>
              <FormDescription>Введите новый пароль ещё раз.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!form.formState.isDirty || isResetting}>
          {isResetting ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Изменить пароль"
          )}
        </Button>
      </form>
    </Form>
  );
}
