import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_main/")({
  component: Index,
});

function Index() {
  return (
    <div className="">
      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold tracking-tight lg:text-4xl">
          Банк задач
        </h1>
        <p className="text-muted-foreground">Открытый банк ФИПИ</p>
      </div>
    </div>
  );
}
