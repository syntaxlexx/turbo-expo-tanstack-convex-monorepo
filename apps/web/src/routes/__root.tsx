import { ThemeProvider } from "@/components/theme-provider";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ConvexReactClient } from "convex/react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
    ],
    links: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  component: () => (
    <ThemeProvider defaultTheme="system" storageKey="app-theme">
      <ConvexAuthProvider client={convex}>
        <Header />
        <main className="min-h-[calc(100vh-8rem)]">
          <Outlet />
        </main>
        <Footer />
        <TanStackRouterDevtools position="bottom-right" />
      </ConvexAuthProvider>
    </ThemeProvider>
  ),
});
