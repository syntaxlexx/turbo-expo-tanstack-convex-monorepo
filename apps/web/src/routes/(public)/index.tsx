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
        <div className="mb-4 md:mb-8 lg:mb-12 min-h-[calc(100vh-8rem)]">
          <Hero />
        </div>
      </main>

      <Footer />
    </div>
  );
}
