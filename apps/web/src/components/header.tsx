import { useCurrentUser } from "@/hooks/use-current-user";
import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

export default function Header() {
  const { currentUser, isLoading: isLoadingAuthState } = useCurrentUser();

  return (
    <header className="container mx-auto p-2 flex gap-2 bg-white text-black justify-between">
      <nav className="flex flex-row">
        <div className="px-2 font-bold">
          <Link to="/">Home</Link>
        </div>
        {isLoadingAuthState ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            {currentUser ? (
              <div className="px-2 font-bold">
                <Link to="/dashboard">Dashboard</Link>
              </div>
            ) : (
              <div className="px-2 font-bold">
                <Link to="/login">Login</Link>
              </div>
            )}
          </>
        )}
      </nav>
    </header>
  );
}
