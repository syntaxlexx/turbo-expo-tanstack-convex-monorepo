import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Authenticated,
  Unauthenticated,
  AuthLoading,
  useQuery,
} from "convex/react";
import { Loader2 } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "@packages/backend/convex/_generated/api";

export const Route = createFileRoute("/(protected)/dashboard/")({
  component: Page,
});

function Page() {
  const { signOut } = useAuthActions();
  const currentUser = useQuery(api.users.currentUser);

  return (
    <div>
      {currentUser ? (
        <div>User: {currentUser.email}</div>
      ) : (
        <div>
          <p>Unauthenticated server-side</p>
        </div>
      )}

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

        <Button onClick={() => void signOut()}>Sign out</Button>
      </Authenticated>

      <br />
      <br />
      <Button asChild>
        <Link to="/">Home</Link>
      </Button>
    </div>
  );
}
