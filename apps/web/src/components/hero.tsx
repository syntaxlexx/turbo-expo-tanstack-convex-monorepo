import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { ChevronRight, Loader2 } from "lucide-react";
import HeroScene from "./hero-scene";
import { githubUrl } from "@/lib/utils";

export function Hero() {
  return (
    <div className="relative isolate overflow-hidden bg-white">
      <div className="grid lg:grid-cols-2 gap-8 ">
        <div className=" max-w-2xl lg:mx-0 lg:max-w-xl lg:pt-8">
          <div className="mt-6 sm:mt-12 lg:mt-16">
            <a href={githubUrl} className="inline-flex space-x-6">
              <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-600/10">
                What's new
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                <span>Just shipped v1.0</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </span>
            </a>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your Modern Web Application
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Build beautiful, responsive web applications with our modern tech
            stack. Powered by React, TanStack Router, and Convex.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Button asChild size="lg">
              <a href={githubUrl}>Get started</a>
            </Button>

            <AuthLoading>
              <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            </AuthLoading>

            <Unauthenticated>
              <Button asChild variant="outline" size="lg">
                <Link to="/login">Sign in</Link>
              </Button>
            </Unauthenticated>

            <Authenticated>
              <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Welcome back!</h1>
                <Button asChild>
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            </Authenticated>
          </div>
        </div>

        <div className="mt-16 sm:mt-24 lg:mt-32">
          <HeroScene />
        </div>
      </div>
    </div>
  );
}
