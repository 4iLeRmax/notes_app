import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import ResetPasswordEmail from "@/components/emails/reset-password";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      resend.emails.send({
        from: "ailer.com",
        to: user.email,
        subject: "Reset your password",
        react: ResetPasswordEmail({
          userName: user.name,
          userEmail: user.email,
          resetUrl: url,
          expiryMinutes: 30,
        }),
      });
    },
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
      scopes: ["email", "public_profile", "user_friends"],
      fields: ["user_friends"],

      getUserInfo: async (token) => {
        const res = await fetch(
          `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token.accessToken}`,
        );
        const profile = await res.json();

        if (!profile.id) return null;

        return {
          user: {
            id: profile.id,
            name: profile.name,
            email: profile.email,
            image: profile.picture?.data?.url,
            emailVerified: true,
          },
          data: profile,
        };
      },
    },
  },
  // session: {
  //   cookieCache: {
  //     enabled: true,
  //     maxAge: 2 * 60,
  //   },
  // },
  plugins: [nextCookies()],
});
