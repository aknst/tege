import { useRouter } from "@tanstack/react-router";
import { Button } from "../ui/button";
import ModeToggle from "./mode-toggle";

export default function NotFoundComponent() {
  const { history } = useRouter();

  return (
    <div className="relative flex flex-col h-screen items-center justify-center">
      <main className="flex flex-col items-center gap-y-2 text-center p-4">
        <div className="mt-4 space-y-2 text-2xl font-bold sm:text-5xl">
          Страница не найдена
        </div>
        <p className="text-sm font-light sm:text-lg">
          К сожалению, мы не смогли найти страницу, которую вы ищете
        </p>
        <Button variant="outline" className="" onClick={() => history.go(-1)}>
          ← Вернуться назад
        </Button>
      </main>
      <div className="absolute bottom-0 right-0 m-6">
        <ModeToggle />
      </div>
    </div>
  );
}
