import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";

export const Route = createFileRoute("/(auth)/login")({
  component: Page,
});

function Page() {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"signIn" | { email: string }>("signIn");
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, isLoading: isLoadingAuthState } = useCurrentUser();

  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }

  if (isLoadingAuthState) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Button
        onClick={() =>
          void signIn("google", {
            redirectTo: "/dashboard",
          })
        }
        variant={"destructive"}
      >
        Sign in with Google
      </Button>

      <p>OR</p>

      {step === "signIn" ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setIsLoading(true);
            const formData = new FormData(event.currentTarget);
            void signIn("resend-otp", formData).then(() =>
              setStep({ email: formData.get("email") as string }),
            );
            setIsLoading(false);
          }}
        >
          <input name="email" placeholder="Email" type="text" />
          <button type="submit" disabled={isLoading}>
            Send code
            {isLoading && <Loader2 className="animate-spin" />}
          </button>
        </form>
      ) : (
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            formData.set("redirectTo", "/dashboard");
            setIsLoading(true);

            const { signingIn, redirect } = await signIn(
              "resend-otp",
              formData,
            );
            if (signingIn) {
              console.log("Signing in...");
            }
            if (redirect) {
              console.log("Redirecting...");
            }
            setIsLoading(false);
          }}
        >
          <input
            name="code"
            placeholder="Code"
            type="text"
            autoCorrect="off"
            autoComplete="off"
          />
          <input name="email" value={step.email} type="hidden" />
          <button type="submit" disabled={isLoading}>
            Continue
            {isLoading && <Loader2 className="animate-spin" />}
          </button>
          <button type="button" onClick={() => setStep("signIn")}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}
