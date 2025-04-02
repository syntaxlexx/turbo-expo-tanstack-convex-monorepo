import { convexAuth } from "@convex-dev/auth/server";
import Google from "@auth/core/providers/google";
import GitHub from "@auth/core/providers/github";
import Resend from "@auth/core/providers/resend";
import { ResendOTP } from "./resend.otp";
import { DatabaseWriter } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Google,
    Resend,
    ResendOTP,
    // GitHub({
    //   profile(githubProfile, tokens) {
    //     return {
    //       id: githubProfile.id,
    //       name: githubProfile.name,
    //       email: githubProfile.email,
    //       image: githubProfile.picture,
    //       githubId: githubProfile.id,
    //     };
    //   },
    // }),
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
