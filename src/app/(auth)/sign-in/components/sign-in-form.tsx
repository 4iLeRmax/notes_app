"use client";

import ControlledCustomInput from "@/components/UI/formElements/controlled-custom-input";
import FormButton from "@/components/UI/formElements/form-button";
import EmailNotVerified from "@/components/UI/status-bar/email-not-verified";
import { SigninAction } from "@/lib/actions/auth";
import { authClient } from "@/lib/auth-client";
import {
  SignInScheme,
  TSignIn,
} from "@/lib/zod-schemes/auth-schemes/sign-in-scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

export default function SignInFrom() {
  const {
    control,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SignInScheme),
    defaultValues: {
      email: "test@gmail.com",
      password: "Qwerty123456",
    },
  });

  const onSubmit: SubmitHandler<TSignIn> = async (data) => {
    const res = await SigninAction(data);
    if (res?.error) {
      setError("root", { message: res.error.message });
    }
    if (res?.error.code === "EMAIL_NOT_VERIFIED") {
      setError("root", { message: res.error.message, type: res.error.code });
    }
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
  if (errors.root?.type === "EMAIL_NOT_VERIFIED")
    return <EmailNotVerified email={getValues("email")} />;

  return (
    <>
      <div className="bg-secondary shadow-outside px-8 xs:px-16 py-8 rounded-4xl w-120">
        <h1 className="text-center text-txt-primary text-2xl font-bold">
          Sign In
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
                name="password"
                control={control}
                error={errors.password}
                placeholder="Password..."
                isPassword
              />
            </div>
            {/* <div className="flex flex-col items-center gap-4">
              <FormInput type="email" name="email" placeholder="Email..." />
              <FormInput isPassword name="password" placeholder="Password..." />
            </div> */}
            <div className="mt-10">
              <div className="mb-2 flex items-center justify-between">
                <Link href="/sign-up" className="text-txt-primary text-sm">
                  Create an account
                </Link>
                <Link href="/find-account" className="text-txt-primary text-sm">
                  Forgot password
                </Link>
              </div>
              <FormButton isLoading={isSubmitting}>Sign In</FormButton>
              {errors.root ? (
                <span className="text-custom-red text-xs flex justify-center mt-2">
                  {errors.root.message}
                </span>
              ) : null}
            </div>
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
                  // onClick={signinActionWithGoogle}
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
          </form>
        </div>
      </div>
    </>
  );
}
