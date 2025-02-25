import NotFoundComponent from "@/components/shared/not-found";
import { userQueryOptions } from "@/services/api-auth";
import { QueryClient } from "@tanstack/react-query";
import {
  // createRootRoute,
  createRootRouteWithContext,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";
import { Toaster } from "sonner";

interface RootContext {
  queryClient: QueryClient;
  getTitle?: () => string | Promise<string>;
}

function RootLayoutWithTitle() {
  // const matches = useMatches();

  // useEffect(() => {
  //   const breadcrumbPromises = [...matches]
  //     .reverse()
  //     .map((match) => {
  //       const context = match.context as RootContext;
  //       return context.getTitle?.();
  //     })
  //     .filter(Boolean);

  //   void Promise.all(breadcrumbPromises).then((titles) => {
  //     document.title = titles.join(" · ");
  //   });
  // }, [matches]);

  return (
    <>
      <ScrollRestoration />
      <Outlet />
      <Toaster position="bottom-center" toastOptions={{ duration: 2500 }} />
    </>
  );
}

export const Route = createRootRouteWithContext<RootContext>()({
  component: RootLayoutWithTitle,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(userQueryOptions),
  beforeLoad: async ({ context: { queryClient } }) => {
    queryClient.getQueryData(userQueryOptions.queryKey);
    return { getTitle: () => "FastEGE" };
  },
  notFoundComponent: NotFoundComponent,
});
