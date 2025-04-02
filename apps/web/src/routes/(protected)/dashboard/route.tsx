import { api } from "@packages/backend/convex/_generated/api";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { useQuery } from "convex/react";

export const Route = createFileRoute("/(protected)/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const currentUser = useQuery(api.users.currentUser);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h3>Dashboard Layout</h3>
      <Outlet />
    </div>
  );
}
