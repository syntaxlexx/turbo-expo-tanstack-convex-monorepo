import { useCurrentUser } from "@/hooks/use-current-user";
import { useAuthActions } from "@convex-dev/auth/react";
import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

export default function Header() {
  const { currentUser, isLoading: isLoadingAuthState } = useCurrentUser();
  const { signOut } = useAuthActions();

  return (
    <header className="container mx-auto w-full p-2 flex gap-2 bg-white items-center text-black justify-between">
      <nav className="flex gap-2 items-center flex-row">
        <div className="px-2 font-bold">
          <Link to="/">Home</Link>
        </div>
      </nav>

      <div className="flex gap-2 items-center flex-row">
        {isLoadingAuthState ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            {currentUser ? (
              <>
                <Link to="/dashboard">
                  <Button>Dashboard</Button>
                </Link>

                <Button onClick={signOut} variant={"outline"}>
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="px-2 font-bold">
                <Link to="/login">Login</Link>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
}
