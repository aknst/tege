import ModeToggle from "@/components/shared/mode-toggle";
import { pb } from "@/services/pocketbase";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_blank")({
  component: RouteComponent,
  beforeLoad: async () => {
    if (pb.authStore.isValid) {
      throw redirect({
        to: "/",
      });
    }
  },
});

function RouteComponent() {
  return (
    <div className="relative flex flex-col h-screen items-center justify-center">
      <Outlet />
      <div className="absolute bottom-0 right-0 m-6">
        <ModeToggle />
      </div>
    </div>
  );
}
