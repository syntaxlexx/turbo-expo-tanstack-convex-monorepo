import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const site = {
  name: "KopaKopa",
  description: "KopaKopa is a platform for financial planning and literacy",
  logo: "/logo.png",
  phone: undefined,
  email: "loans@acelords.com",
  links: {
    twitter: undefined,
    github: undefined,
  },
};
