import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthActions } from "@convex-dev/auth/react";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";

interface EmailSignInProps {
  onBack: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const Route = createFileRoute("/(auth)/login")({
  component: Page,
});

function Page() {
  const { signIn } = useAuthActions();
  const [showEmailSignIn, setShowEmailSignIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOAuthSignIn = async ({
    provider,
  }: {
    provider: "google" | "facebook";
  }) => {
    setIsLoading(true);
    try {
      await signIn(provider, {
        redirectTo: "/dashboard",
      });
    } catch (error) {
      console.error(`${provider} sign-in error:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <AuthLoading>
        <div className="flex w-full h-full justify-center items-center">
          <Loader2 className="h-4 w-4 animate-spin" />
          <p className="ml-2">Loading...</p>
        </div>
      </AuthLoading>

      <Unauthenticated>
        {/* Left side - Image */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <div className="absolute inset-0 bg-black/20" />{" "}
          {/* Overlay for better text contrast */}
          <img
            src="/images/login-bg.jpg"
            alt="Nature background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="text-white text-center">
              <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
              <p className="text-lg">Sign in to continue your journey</p>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <div className="w-full max-w-md space-y-6">
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-2xl font-bold">Sign In</h1>
            </div>
            {showEmailSignIn ? (
              <EmailSignIn
                onBack={() => setShowEmailSignIn(false)}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            ) : (
              <div className="space-y-4">
                <Button
                  onClick={() => handleOAuthSignIn({ provider: "google" })}
                  variant="default"
                  disabled={isLoading}
                  className="w-full bg-[#EA4335] hover:bg-[#D33A2C] text-white"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Sign in with Google"
                  )}
                </Button>

                <Button
                  onClick={() => setShowEmailSignIn(true)}
                  variant="outline"
                  disabled={isLoading}
                  className="w-full"
                >
                  Sign in with Email
                </Button>
              </div>
            )}
          </div>
        </div>
      </Unauthenticated>

      <Authenticated>
        <Navigate to="/dashboard" replace />
      </Authenticated>
    </div>
  );
}

function EmailSignIn({ onBack, isLoading, setIsLoading }: EmailSignInProps) {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"email" | { type: "code"; email: string }>(
    "email",
  );
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!email) {
        throw new Error("Email is required");
      }

      const formData = new FormData();
      formData.append("email", email);
      await signIn("resend-otp", formData);
      setStep({ type: "code", email });
    } catch (error) {
      console.error("Email submission error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to send verification code",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!code) {
        throw new Error("Verification code is required");
      }

      const formData = new FormData();
      formData.append("code", code);
      formData.append("email", email);
      formData.append("redirectTo", "/dashboard");
      await signIn("resend-otp", formData);
    } catch (error) {
      console.error("Code submission error:", error);
      setError(
        error instanceof Error ? error.message : "Failed to verify code",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (step === "email") {
    return (
      <div className="space-y-4">
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            id="email"
            required
            className="w-full"
          />
          <div className="flex gap-2 items-center">
            <Button type="submit" disabled={isLoading || !email.trim()}>
              {isLoading ? <Loader2 className="animate-spin" /> : "Send code"}
            </Button>

            <Button type="button" onClick={onBack} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && <div className="text-red-500 text-sm">{error}</div>}

      <form onSubmit={handleCodeSubmit} className="space-y-4">
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter verification code"
          type="text"
          id="code"
          autoCorrect="off"
          autoComplete="off"
          required
          className="w-full"
        />
        <div className="flex gap-2 items-center">
          <Button type="submit" disabled={isLoading || !code.trim()}>
            {isLoading ? <Loader2 className="animate-spin" /> : "Verify"}
          </Button>
          <Button
            type="button"
            onClick={() => {
              setCode("");
              setStep("email");
            }}
            variant="outline"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back
          </Button>
        </div>
      </form>
    </div>
  );
}
