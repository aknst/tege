import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useThrottle } from "@/hooks/use-throttle";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { cn } from "@/lib/utils";
import { LoginFields, loginSchema } from "@/schemas/auth-schema";
import useAuth from "@/hooks/use-auth";
import InputField from "./input-field";
import PasswordField from "./password-field";
import { Link } from "@tanstack/react-router";

export default function LoginForm({ className }: React.ComponentProps<"form">) {
  const { loginWithPassword } = useAuth();

  const form = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [handleLogin, isLoggingIn] = useThrottle(
    ({ username, password }: LoginFields) =>
      loginWithPassword(username, password)
  );
  return (
    <Form {...form}>
      <form
        className={cn("space-y-6", className)}
        onSubmit={form.handleSubmit(handleLogin)}>
        <InputField form={form} name="username" />
        <PasswordField form={form} name="password" />

        <Button
          className="w-full"
          type="submit"
          disabled={!form.formState.isDirty || isLoggingIn}>
          Войти
        </Button>
      </form>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">ИЛИ</span>
        </div>
      </div>

      <Button variant="outline" className="w-full" asChild>
        <Link to="/auth/register">Регистрация</Link>
      </Button>
    </Form>
  );
}
