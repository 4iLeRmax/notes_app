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

export const getSession = async () => {
  return await auth.api.getSession({ headers: await headers() });
};

export const isAuthorized = async (whoCallIt?: string) => {
  console.log(whoCallIt);
  console.log("isAuthorized");
  const sessionCookie = (await cookies()).get("better-auth.session_token");
  if (sessionCookie && sessionCookie.value) {
    return await prisma.session.findUnique({
      where: {
        token: sessionCookie.value.split(".")[0],
      },
    });
  }
};

const emailAlreadyTaken = async (emailToCheck: string) => {
  return await prisma.user.findUnique({
    where: {
      email: emailToCheck,
    },
  });
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
    }
  }
};

export const SignOutAction = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect("/");
};
