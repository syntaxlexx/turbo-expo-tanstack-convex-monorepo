import { convexAuth } from "@convex-dev/auth/server";
import Google from "@auth/core/providers/google";
import Resend from "@auth/core/providers/resend";
import { ResendOTP } from "./resend.otp";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Google, Resend, ResendOTP],
  callbacks: {
    async afterUserCreatedOrUpdated(ctx, { userId }) {
      const user = await ctx.db.get(userId);
      if (!user?.role) {
        await ctx.db.patch(userId, { role: "user" });
      }
    },
  },
});
