import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { Loader2 } from "lucide-react";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/(public)/")({
  component: App,
});

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <AuthLoading>
          <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </AuthLoading>
        <Unauthenticated>
          <Hero />
        </Unauthenticated>
        <Authenticated>
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Welcome back!</h1>
            <Button asChild>
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </Authenticated>
      </main>

      <Footer />
    </div>
  );
}
