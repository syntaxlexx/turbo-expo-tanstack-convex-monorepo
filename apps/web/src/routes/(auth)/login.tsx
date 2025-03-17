import { createFileRoute } from "@tanstack/react-router";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/(auth)/login")({
  component: Page,
});

function Page() {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"signIn" | { email: string }>("signIn");

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
            const formData = new FormData(event.currentTarget);
            void signIn("resend-otp", formData).then(() =>
              setStep({ email: formData.get("email") as string }),
            );
          }}
        >
          <input name="email" placeholder="Email" type="text" />
          <button type="submit">Send code</button>
        </form>
      ) : (
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
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
          <button type="submit">Continue</button>
          <button type="button" onClick={() => setStep("signIn")}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}
