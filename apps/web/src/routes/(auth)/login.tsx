import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";

type Provider = "google" | "resend-otp";
type SignInStep = "provider" | "email" | { type: "code"; email: string };

export const Route = createFileRoute("/(auth)/login")({
  component: Page,
});

function Page() {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<SignInStep>("provider");
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, isLoading: isLoadingAuthState } = useCurrentUser();

  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }

  if (isLoadingAuthState) {
    return <div>Loading...</div>;
  }

  const handleProviderSignIn = async (
    provider: Provider,
    options?: Record<string, any>,
  ) => {
    setIsLoading(true);
    try {
      if (provider === "resend-otp") {
        setStep("email");
        return;
      }

      await signIn(provider, {
        redirectTo: "/dashboard",
        ...options,
      });
    } catch (error) {
      console.error(`${provider} sign-in error:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("resend-otp", formData);
      setStep({ type: "code", email: formData.get("email") as string });
    } catch (error) {
      console.error("Email submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(event.currentTarget);
      formData.set("redirectTo", "/dashboard");
      await signIn("resend-otp", formData);
    } catch (error) {
      console.error("Code submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case "provider":
        return (
          <div className="space-y-4">
            <Button
              onClick={() => handleProviderSignIn("google")}
              variant="destructive"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Sign in with Google"
              )}
            </Button>

            <Button
              onClick={() => handleProviderSignIn("resend-otp")}
              variant="outline"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Sign in with Email"
              )}
            </Button>
          </div>
        );

      case "email":
        return (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <input
              name="email"
              placeholder="Email"
              type="email"
              required
              className="w-full p-2 border rounded"
            />
            <div className="space-x-2">
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : "Send code"}
              </button>
              <button
                type="button"
                onClick={() => setStep("provider")}
                className="px-4 py-2 border rounded"
              >
                Back
              </button>
            </div>
          </form>
        );

      default:
        if (step.type === "code") {
          return (
            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <input
                name="code"
                placeholder="Enter verification code"
                type="text"
                autoCorrect="off"
                autoComplete="off"
                required
                className="w-full p-2 border rounded"
              />
              <input name="email" value={step.email} type="hidden" />
              <div className="space-x-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : "Verify"}
                </button>
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="px-4 py-2 border rounded"
                >
                  Back
                </button>
              </div>
            </form>
          );
        }
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Sign In</h1>
      {renderStep()}
    </div>
  );
}
