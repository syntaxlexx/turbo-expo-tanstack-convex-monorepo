import { useCurrentUser } from "@/hooks/use-current-user";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/(protected)/admin")({
  component: RouteComponent,
});

function RouteComponent() {
  const { currentUser } = useCurrentUser();

  return (
    <div className="container mx-auto pt-16 pb-8">
      <AuthLoading>
        <div className="flex w-full h-full justify-center items-center">
          <Loader2 className="h-4 w-4 animate-spin" />
          <p className="ml-2">Loading...</p>
        </div>
      </AuthLoading>

      <Unauthenticated>
        <Navigate to="/login" replace />
      </Unauthenticated>

      <Authenticated>
        <div className="w-full h-full flex flex-col">
          <div className="w-full py-2 bg-orange-500 text-center rounded-b-lg -mt-2 text-white font-semibold">
            <h1>Admin</h1>
          </div>
          <div className="w-full h-full">
            {currentUser?.role === "admin" ? (
              <Outlet />
            ) : (
              <Navigate to="/dashboard" replace />
            )}
          </div>
        </div>
      </Authenticated>
    </div>
  );
}
