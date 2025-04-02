import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const githubUrl =
  "https://github.com/syntaxlexx/turbo-expo-tanstack-convex-monorepo";

export const twitterUrl = "https://x.com/syntaxlexx";
