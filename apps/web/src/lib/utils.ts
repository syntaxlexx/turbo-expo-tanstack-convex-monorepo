import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const site = {
  name: "KopaKopa",
  slogan: "Empower Your Finances!",
  description:
    "KopaKopa is a Platform for Financial Planning, Tracking, and Literacy",
  logo: "/logo.png",
  phone: undefined,
  email: "loans@acelords.com",
  links: {
    twitter: undefined,
    github: undefined,
  },
};

export const images = {
  mpesaLogo:
    "https://u2hvyvc0j4.ufs.sh/f/InRyQ50mbzvEZQUL73HeMIFPqBm135Eg7HQLOwdc2RzYv4UD",
  lipaNaMpesa:
    "https://u2hvyvc0j4.ufs.sh/f/InRyQ50mbzvEaxdsswjrEqJHRIOCK7g4db3jYk2ftTUvA9MD",
};
