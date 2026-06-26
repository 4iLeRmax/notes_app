import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import ResetPasswordEmail from "@/components/emails/reset-password-email";
import sha256 from "./SHA256";
import VerifyEmailEmail from "@/components/emails/verify-email-email";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    deleteUser: {
      enabled: true,
    },
  },
  emailAndPassword: {
    enabled: true,
    password: {
      hash: async (password: string) => await sha256(password),
      verify: async (data: { hash: string; password: string }) => {
        const { hash, password } = data;
        const hashedPassword = await sha256(password);
        return hashedPassword === hash;
      },
    },
    sendResetPassword: async ({ user, url, token }, request) => {
      await resend.emails.send({
        from: "security@zlatin.it.com",
        to: user.email,
        subject: "Reset your password",
        html: ResetPasswordEmail({ user, url }),
      });
    },
    requireEmailVerification: true, ////////////////////////////////////
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await resend.emails.send({
        from: "security@zlatin.it.com",
        to: user.email,
        subject: "Verify your email address",
        html: VerifyEmailEmail({ user, url }),
      });
    },
    sendOnSignUp: true,
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
