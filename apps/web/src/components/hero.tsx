import { Button } from "@/components/ui/button";
import { images, site } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import {
  ChevronRight,
  CreditCard,
  Loader2,
  TrendingUp,
  Users,
} from "lucide-react";

const features = [
  {
    icon: CreditCard,
    title: "Smart Planning",
    description: "Manage your money smarter",
  },
  {
    icon: TrendingUp,
    title: "Financial Literacy",
    description: "Learn how to manage your money",
  },
  {
    icon: Users,
    title: "Ease of Use",
    description: "Easy to use, easy to understand",
  },
] as const;

export function Hero() {
  return (
    <div className="relative isolate overflow-hidden bg-background min-h-[90vh] flex items-center">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/10 to-transparent dark:from-primary/10 dark:via-primary/15 dark:to-background" />

      <div className="container mx-auto px-4 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="max-w-2xl pt-20">
            <div className="mb-8">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
                {site.name}
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
              {site.slogan}
            </h1>
            <p className="text-xl leading-4 text-muted-foreground mb-8">
              {site.description}
            </p>
            <p className="text-base leading-4 text-muted-foreground mb-8">
              Get cash flow under control with our easy-to-use platform.
            </p>

            <div className="flex flex-wrap gap-4">
              <AuthLoading>
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </Button>
              </AuthLoading>

              <Unauthenticated>
                <Button asChild size="lg" className="font-semibold">
                  <Link to="/login">Get Started</Link>
                </Button>
              </Unauthenticated>

              <Authenticated>
                <Button asChild size="lg">
                  <Link to="/dashboard">
                    Go to Dashboard
                    <ChevronRight className="size-4" />
                  </Link>
                </Button>
              </Authenticated>
            </div>

            {/* Features grid */}
            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-2 items-start">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right content - Floating Card UI */}
          <div className="relative lg:block">
            <div className="relative mx-auto w-full max-w-[400px]">
              {/* Main card */}
              <div className="rounded-2xl bg-card p-6 shadow-2xl ring-1 ring-gray-900/10 dark:ring-white/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Welcome</p>
                    <p className="font-semibold">Hi Beatrice</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl bg-card p-4 ring-1 ring-gray-900/5 dark:ring-white/5">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-muted-foreground">
                        Balance
                      </span>
                      <span className="text-sm font-medium">KES</span>
                    </div>
                    <div className="text-2xl font-semibold">KES 4,358.44</div>
                  </div>

                  <div className="rounded-xl bg-card p-4 ring-1 ring-gray-900/5 dark:ring-white/5">
                    <div className="text-sm text-muted-foreground mb-2">
                      Mpesa Number
                    </div>
                    <div className="font-mono text-lg">+254701234567</div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -left-8 top-8 animate-float">
                <div className="rounded-lg bg-card p-2 shadow-lg ring-1 ring-gray-900/10 dark:ring-white/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="absolute -right-8 bottom-8 animate-float-delayed">
                <div className="rounded-lg bg-card p-2 shadow-lg ring-1 ring-gray-900/10 dark:ring-white/10">
                  <img src={images.mpesaLogo} className="w-auto h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
