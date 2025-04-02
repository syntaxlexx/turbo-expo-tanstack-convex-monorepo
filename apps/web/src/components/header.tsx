import { useAuthActions } from "@convex-dev/auth/react";
import { Link } from "@tanstack/react-router";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { GithubIcon, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { githubUrl } from "@/lib/utils";

export default function Header() {
  const { signOut } = useAuthActions();

  return (
    <header className="container mx-auto w-full p-2 flex gap-2 bg-white items-center text-black justify-between">
      <nav className="flex gap-2 items-center flex-row">
        <div className="px-2 font-bold">
          <Link to="/">Home</Link>
        </div>
      </nav>

      <div className="flex gap-2 items-center flex-row">
        <a href={githubUrl}>
          <Button variant={"outline"}>
            <GithubIcon className="size-4" />
            Github
          </Button>
        </a>

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

        {/* theme toggler */}
      </div>
    </header>
  );
}
