import Sidebar from "@/components/layout/sidebar";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context, location }) => {
    console.log(location.href);
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href || undefined,
        },
      });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="p-4 h-full w-full mx-auto">
        <Outlet />
      </div>
    </div>
  );
}
