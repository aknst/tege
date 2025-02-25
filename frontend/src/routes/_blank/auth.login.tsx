import LoginCard from "@/components/auth/login-card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_blank/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full max-w-sm md:max-w-3xl">
      <LoginCard />
    </div>
  );
}
