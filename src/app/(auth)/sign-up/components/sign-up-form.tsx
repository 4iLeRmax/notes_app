"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";
import Link from "next/link";
import FormButton from "@/components/UI/formElements/form-button";
import ControlledCustomInput from "@/components/UI/formElements/controlled-custom-input";
import { SignUpAction, signinActionWithGoogle } from "@/lib/actions/auth";
import { authClient } from "@/lib/auth-client";
import {
  SignUpScheme,
  TSignUp,
} from "@/lib/zod-schemes/auth-schemes/sign-up-scheme";
import StatusBar from "@/components/UI/status-bar/status-bar";

export default function SignUpForm() {
  const [successfullySignedUp, setSuccessfullySignedUp] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SignUpScheme),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<TSignUp> = async (data) => {
    setSuccessfullySignedUp(false);
    const res = await SignUpAction(data);
    if (res?.error) {
      setError("root", { message: res.error });
    }
    if (res?.success) setSuccessfullySignedUp(true);
  };

  const handleSignInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/notes",
    });
  };

  const handleSignInWithFacebook = async () => {
    await authClient.signIn.social({
      provider: "facebook",
      callbackURL: "/notes",
    });
  };

  if (successfullySignedUp)
    return (
      <StatusBar
        status="pending"
        title="We sent a verification link to your inbox"
        description="Click the link in that email to activate your account"
      />
    );

  return (
    <>
      <div className="bg-secondary shadow-outside px-8 xs:px-16 py-8 rounded-4xl w-120">
        <h1 className="text-center text-txt-primary text-2xl font-bold">
          Sign Up
        </h1>

        <div className="mt-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center gap-4">
              <ControlledCustomInput
                type="email"
                name="email"
                control={control}
                error={errors.email}
                placeholder="Email..."
              />
              <ControlledCustomInput
                type="text"
                name="firstName"
                control={control}
                error={errors.firstName}
                placeholder="First name..."
              />
              <ControlledCustomInput
                type="text"
                name="lastName"
                control={control}
                error={errors.lastName}
                placeholder="Last name..."
              />
              <ControlledCustomInput
                name="password"
                control={control}
                error={errors.password}
                placeholder="Password..."
                isPassword
              />
              <ControlledCustomInput
                name="confirmPassword"
                control={control}
                error={errors.confirmPassword}
                placeholder="Confirm password..."
                isPassword
              />
            </div>

            <div className="mt-8">
              <Link
                href="/sign-in"
                className="text-txt-primary text-sm flex items-center justify-center mb-2"
              >
                Already have an account
              </Link>

              <FormButton isLoading={isSubmitting}>Sign Up</FormButton>
              {errors.root ? (
                <span className="text-custom-red text-xs flex justify-center mt-2">
                  {errors.root.message}
                </span>
              ) : null}
            </div>
          </form>

          <div>
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="bg-txt-primary w-full flex h-px"></div>
              <p className="text-txt-primary shrink-0 text-sm">
                or continue with
              </p>
              <div className="bg-txt-primary w-full flex h-px"></div>
            </div>

            <div className="flex items-center justify-center mt-2 gap-3">
              <button
                type="button"
                onClick={handleSignInWithGoogle}
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src={"google.svg"}
                  width={40}
                  height={40}
                  alt="Sign in with Google"
                />
              </button>
              <button
                type="button"
                onClick={handleSignInWithFacebook}
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src={"facebook.svg"}
                  width={40}
                  height={40}
                  alt="Sign in with Facebook"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
