import { api } from "@packages/backend/convex/_generated/api";
import { useQuery } from "convex/react";

export const useCurrentUser = () => {
  const currentUser = useQuery(api.users.currentUser);

  const isLoading = currentUser === undefined;

  return {
    isLoading,
    currentUser,
  };
};
