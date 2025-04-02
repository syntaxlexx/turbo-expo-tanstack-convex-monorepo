import { convexAuth } from "@convex-dev/auth/server";
// import Google from "@auth/core/providers/google";
import GitHub from "@auth/core/providers/github";
import Resend from "@auth/core/providers/resend";
import { ResendOTP } from "./resend.otp";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    // Google,
    Resend,
    ResendOTP,
    GitHub({
      profile(githubProfile) {
        return {
          id: String(githubProfile.id),
          name: githubProfile.name,
          email: githubProfile.email,
          image: githubProfile.picture as string | null,
          githubId: githubProfile.id,
        };
      },
    }),
  ],
  callbacks: {
    async afterUserCreatedOrUpdated(ctx, { userId }) {
      const user = await ctx.db.get(userId);
      if (!user?.role) {
        await ctx.db.patch(userId, { role: "user" });
      }
    },
  },
});
