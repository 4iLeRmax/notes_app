"use server";

import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import prisma from "../prisma";
import { auth } from "../auth";
import { cache } from "react";
import {
  SignUpScheme,
  TSignUp,
} from "../zod-schemes/auth-schemes/sign-up-scheme";
import {
  SignInScheme,
  TSignIn,
} from "../zod-schemes/auth-schemes/sign-in-scheme";
import {
  FindAccountScheme,
  TFindAccount,
} from "../zod-schemes/auth-schemes/find-account-scheme";
import {
  ResetPasswordScheme,
  TResetPassword,
} from "../zod-schemes/auth-schemes/reset-password-scheme";
import { APIError } from "better-auth";
import sha256 from "../SHA256";
import { EmailScheme } from "../zod-schemes/basic-schemes";

export const getSession = cache(async (caller?: string) => {
  console.log(`getSession ${caller || ""}`);
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

  if (!safeData.success) return;
  const { email, firstName, lastName, password } = safeData.data;
  const userExist = await emailAlreadyTaken(email);

  if (userExist) return { error: "An account with this email already exists" };

  const name = `${firstName} ${lastName}`;

  try {
    await auth.api.signUpEmail({
      body: {
        email,
        name,
        password,
      },
    });
  } catch (error) {
    console.log(error);
  }

  return { success: true };
};

export const SigninAction = async (formData: TSignIn) => {
  const safeData = SignInScheme.safeParse(formData);

  if (!safeData.success) return;

  const { email, password } = safeData.data;
  const userExist = await emailAlreadyTaken(email);

  if (!userExist)
    return {
      error: {
        message: "An account with this email doesn't exist",
      },
    };

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      if (error.body?.code === "INVALID_EMAIL_OR_PASSWORD") {
        return {
          error: {
            code: error.body.code,
            message: error.body.message || "Invalid email or password",
          },
        };
      }
      if (error.body?.code === "EMAIL_NOT_VERIFIED") {
        return {
          error: {
            code: error.body.code,
            message: error.body.message || "Email not verified",
          },
        };
      }
    }
  }

  return { success: true };

  // redirect("/notes");
};

export const SignOutAction = async () => {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (err) {
    console.log("Error during sign out:", err);
  }
  redirect("/sign-in");
};

export const findAccountAction = async (formData: TFindAccount) => {
  const safeData = FindAccountScheme.safeParse(formData);

  if (safeData.success) {
    const user = await prisma.user.findUnique({
      where: {
        email: safeData.data.email,
      },
    });

    if (!user) return { error: "An account with this email doesn't exist" };
    return { success: true };
    // redirect("/send-email?email=" + safeData.data.email);
  }
};

export const sendResetPasswordEmail = async (
  redirectURL: string,
  formData: TFindAccount,
) => {
  const safeData = FindAccountScheme.safeParse(formData);

  if (!safeData.success) return;
  const user = await prisma.user.findUnique({
    where: {
      email: safeData.data.email,
    },
  });

  if (!user) return { error: "An account with this email doesn't exist" };
  try {
    const res = await auth.api.requestPasswordReset({
      body: {
        email: safeData.data.email,
        redirectTo: redirectURL,
      },
    });
    return { success: res.status };
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentPasswordByVerificationToken = async (token: string) => {
  const verification = await prisma.verification.findFirst({
    where: {
      identifier: `reset-password:${token}`,
    },
    select: {
      value: true,
    },
  });

  if (!verification) {
    // console.log({ verification });
    return null;
  }

  const userId = verification.value;

  const account = await prisma.account.findFirst({
    where: {
      userId,
      providerId: "credential",
    },
    select: {
      password: true,
    },
  });

  if (!account) {
    // console.log({ account });
    return null;
  }

  return account.password;
};

export const resetPassword = async (
  formData: TResetPassword,
  token: string,
) => {
  const safeData = ResetPasswordScheme.safeParse(formData);

  if (!safeData.success) return;

  const currentPasswordHash =
    await getCurrentPasswordByVerificationToken(token);
  if (!currentPasswordHash) return { error: "Something went wrong" };

  const newPasswordHash = await sha256(safeData.data.password);

  if (currentPasswordHash === newPasswordHash)
    return { error: "New password must be different from the old one" };

  try {
    await auth.api.resetPassword({
      body: {
        newPassword: safeData.data.password,
        token,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      console.log(error);
    }
  }

  return { success: true };
};

export const resendVerificationEmail = async (email: string) => {
  const safeData = EmailScheme.safeParse(email);
  if (!safeData.success) return { status: false };

  const safeEmail = safeData.data;

  try {
    const res = await auth.api.sendVerificationEmail({
      body: {
        email: safeEmail,
        callbackURL: "/sign-in",
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return { status: false };
  }
};
