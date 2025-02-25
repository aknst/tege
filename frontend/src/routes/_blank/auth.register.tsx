import RegisterForm from "@/components/forms/register-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_blank/auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full max-w-sm md:max-w-3xl">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Регистрация</CardTitle>
          <CardDescription className="text-balance text-muted-foreground">
            Введите свою почту и укажите пароль
          </CardDescription>
        </CardHeader>

        <CardContent>
          <RegisterForm />
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                ИЛИ
              </span>
            </div>
          </div>

          <Link to="/auth/login">
            <Button variant="outline" className="w-full">
              Войти в аккаунт
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
