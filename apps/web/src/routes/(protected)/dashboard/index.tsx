import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/dashboard/")({
  component: Page,
});

function Page() {
  const { currentUser } = useCurrentUser();

  return (
    <div className="pt-8">
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
        <Link to="/">Back Home</Link>
      </Button>
    </div>
  );
}
