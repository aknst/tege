import { UpdatePasswordForm } from "@/components/forms/update-password-form";
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/profile/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-6 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Настройки</h2>
        <p className="text-muted-foreground">
          Управляйте настройками своей учетной записи.
        </p>
      </div>
      <Separator className="my-6" />
      <UpdatePasswordForm />
    </div>
  );
}
