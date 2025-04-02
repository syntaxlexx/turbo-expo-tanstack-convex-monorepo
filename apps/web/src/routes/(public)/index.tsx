import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/(public)/")({
  component: App,
});

function App() {
  return (
    <div>
      <div className="h-10">---</div>
      <AuthLoading>
        <Loader2 className="h-4 w-4 animate-spin" />
      </AuthLoading>
      <Unauthenticated>
        <p>Unauthenticated</p>
        <Button asChild>
          <Link to="/login">Login</Link>
        </Button>
      </Unauthenticated>
      <Authenticated>
        <p>Authenticated</p>
      </Authenticated>

      <br />
      <br />
      <Button asChild>
        <Link to="/dashboard">Dashboard</Link>
      </Button>
    </div>
  );
}
