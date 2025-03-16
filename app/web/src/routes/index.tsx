import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
