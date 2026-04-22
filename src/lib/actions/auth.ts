"use server";

import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import prisma from "../prisma";
import { auth } from "../auth";
import sha256 from "../SHA256";
import {
  SignInScheme,
  SignUpScheme,
  TSignIn,
  TSignUp,
} from "../zod-schemes/sign-in-up-schemes";
import { cache } from "react";
import { authClient } from "../auth-client";

export const getSession = cache(async () => {
  console.log("getSession");
  return await auth.api.getSession({ headers: await headers() });
});

export const isAuthorized = cache(async (whoCallIt?: string) => {
  console.log(`isAuthorized - ${whoCallIt}`);
  const sessionCookie = (await cookies()).get("better-auth.session_token");
  if (sessionCookie && sessionCookie.value) {
    return await prisma.session.findUnique({
      where: {
        token: sessionCookie.value.split(".")[0],
      },
    });
  }
});

const emailAlreadyTaken = async (emailToCheck: string) => {
  return !!(await prisma.user.count({
    where: {
      email: emailToCheck,
    },
  }));
};

export const SignUpAction = async (formData: TSignUp) => {
  const safeData = SignUpScheme.safeParse(formData);

  if (safeData.success) {
    const { email, firstName, lastName, password } = safeData.data;
    const userExist = await emailAlreadyTaken(email);

    if (!userExist) {
      const name = `${firstName} ${lastName}`;
      const hashedPassword = await sha256(password);

      await auth.api.signUpEmail({
        body: {
          email,
          name,
          password: hashedPassword,
        },
      });

      redirect("/");
    } else if (userExist) {
      return { error: "An account with this email already exists" };
    }
  }
};

export const SigninAction = async (formData: TSignIn) => {
  const safeData = SignInScheme.safeParse(formData);

  if (safeData.success) {
    const { email, password } = safeData.data;
    const userExist = await emailAlreadyTaken(email);

    if (userExist) {
      const hashedPassword = await sha256(password);

      await auth.api.signInEmail({
        body: {
          email,
          password: hashedPassword,
        },
      });

      redirect("/notes");
    } else if (!userExist) {
      return { error: "An account with this email doesn't exist" };
    }
  }
};

export const signinActionWithGoogle = async () => {
  const data = await auth.api.signInSocial({
    body: {
      provider: "google",
      callbackURL: "/notes",
    },
  });

  console.log(data);
};

export const SignOutAction = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect("/");
};
