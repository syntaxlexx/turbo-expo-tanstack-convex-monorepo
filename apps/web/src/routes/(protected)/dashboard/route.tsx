import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/(protected)/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
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
        <Outlet />
      </Authenticated>
    </div>
  );
}
