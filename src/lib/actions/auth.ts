"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import prisma from "../prisma";
import { SignInScheme, SignUpScheme, TSignIn, TSignUp } from "../zod-schemes";
import { auth } from "../auth";
import sha256 from "../SHA256";

export const getSession = async () => {
  console.log("session");
  const session = await auth.api.getSession({ headers: await headers() });
  return session;
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
