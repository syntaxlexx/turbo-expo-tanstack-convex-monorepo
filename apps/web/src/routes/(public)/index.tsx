import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/")({
  component: App,
});

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="container mx-auto">
        <Hero />
      </main>

      <Footer />
    </div>
  );
}
