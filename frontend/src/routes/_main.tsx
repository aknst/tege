import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_main")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="h-full min-h-full flex flex-col">
      <Header />
      <div className="relative mx-auto max-w-7xl w-full px-4 md:px-6 flex-grow pt-8 ">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}
