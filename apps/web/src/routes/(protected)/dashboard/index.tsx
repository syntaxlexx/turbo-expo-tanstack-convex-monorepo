import { Button } from "@/components/ui/button";
import { api } from "@packages/backend/convex/_generated/api";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "convex/react";

export const Route = createFileRoute("/(protected)/dashboard/")({
  component: Page,
});

function Page() {
  const currentUser = useQuery(api.users.currentUser);

  return (
    <div>
      <h3>Dashboard</h3>
      {currentUser ? (
        <div>
          User: {currentUser.email}. Role: {currentUser.role}
        </div>
      ) : (
        <div>
          <p>Unauthenticated server-side</p>
        </div>
      )}

      <div className="h-10">---</div>
      <Button asChild>
        <Link to="/">Home</Link>
      </Button>
    </div>
  );
}
