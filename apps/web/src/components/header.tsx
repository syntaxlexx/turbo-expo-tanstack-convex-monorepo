import { useAuthActions } from "@convex-dev/auth/react";
import { Link } from "@tanstack/react-router";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { Loader2 } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { site } from "@/lib/utils";

export function Header() {
  const { signOut } = useAuthActions();

  return (
    <header className="w-full py-3 shadow text-foreground border-b border-transparent dark:border-gray-500 bg-background/40 backdrop-blur-sm">
      <div className="container mx-auto justify-between flex gap-2 items-center">
        <nav className="flex gap-2 items-center flex-row">
          <div className="px-2 font-bold text-primary dark:text-primary-foreground">
            <Link to="/">{site.name}</Link>
          </div>
        </nav>

        <div className="flex gap-2 items-center flex-row">
          <ThemeToggle />

          <AuthLoading>
            <Loader2 className="animate-spin" />
          </AuthLoading>

          <Unauthenticated>
            <Link to="/login">
              <Button>Sign In</Button>
            </Link>
          </Unauthenticated>

          <Authenticated>
            <Link to="/dashboard">
              <Button>Dashboard</Button>
            </Link>

            <Button onClick={signOut} variant={"outline"}>
              Sign Out
            </Button>
          </Authenticated>
        </div>
      </div>
    </header>
  );
}
