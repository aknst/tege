import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useThrottle } from "@/hooks/use-throttle";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { cn } from "@/lib/utils";
import { RegisterFields, registerSchema } from "@/schemas/auth-schema";
import useAuth from "@/hooks/use-auth";
import InputField from "./input-field";
import PasswordField from "./password-field";

export default function RegisterForm({
  className,
}: React.ComponentProps<"form">) {
  const { register } = useAuth();

  const form = useForm<RegisterFields>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const [handleRegister, isRegistering] = useThrottle(
    async (newUserData: RegisterFields) => {
      await register(newUserData);
    }
  );

  return (
    <Form {...form}>
      <form
        className={cn("space-y-6", className)}
        onSubmit={form.handleSubmit(handleRegister)}>
        <InputField form={form} name="email" type="email" label="Email" />
        <InputField form={form} name="name" type="text" label="Name" />
        <PasswordField form={form} name="password" label="Password" />
        <PasswordField
          form={form}
          name="passwordConfirm"
          label="Confirm Password"
        />

        <Button
          className="w-full"
          type="submit"
          disabled={!form.formState.isDirty || isRegistering}>
          Зарегистрироваться
        </Button>
      </form>
    </Form>
  );
}
