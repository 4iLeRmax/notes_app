"use client";

import ControlledCustomInput from "@/components/UI/formElements/controlled-custom-input";
import FormButton from "@/components/UI/formElements/form-button";
import EmailNotVerified from "@/components/UI/status-bar/email-not-verified";
import { emailAlreadyTaken } from "@/lib/actions/auth";
import { authClient } from "@/lib/auth-client";
import {
  SignInScheme,
  TSignIn,
} from "@/lib/zod-schemes/auth-schemes/sign-in-scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { email } from "zod";

const TEST_EMAIL = "test@gmail.com";
const TEST_PASSWORD = "Qwerty123456";

export default function SignInFrom() {
  const {
    control,
    handleSubmit,
    setError,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SignInScheme),
    defaultValues: {
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    },
  });

  const onSubmit: SubmitHandler<TSignIn> = async (data) => {
    const { email, password } = data;
    const userExists = await emailAlreadyTaken(email);

    if (!userExists) {
      setError("root", {
        message: "No account found with this email",
        type: "EMAIL_NOT_FOUND",
      });
      return;
    }

    await authClient.signIn.email({
      email,
      password,
      callbackURL: "/notes",
      fetchOptions: {
        onError(context) {
          console.log(context.error);
          if (context.error.code === "INVALID_EMAIL_OR_PASSWORD") {
            setError("root", {
              message: context.error.message,
              type: context.error.code,
            });
          } else if (context.error.code === "EMAIL_NOT_VERIFIED") {
            setError("root", {
              message: context.error.message,
              type: context.error.code,
            });
          } else {
            setError("root", {
              message: "An unexpected error occurred. Please try again.",
              type: "UNKNOWN_ERROR",
            });
          }
        },
      },
    });
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

  const emailValue = watch("email");
  const passwordValue = watch("password");

  if (errors.root?.type === "EMAIL_NOT_VERIFIED")
    return <EmailNotVerified email={getValues("email")} />;

  return (
    <>
      <div className="bg-secondary shadow-outside px-8 xs:px-16 py-8 rounded-4xl w-120">
        <h1 className="text-center text-txt-primary text-2xl font-bold">
          Sign In
        </h1>

        <div className="mt-6">
          {emailValue === TEST_EMAIL && passwordValue === TEST_PASSWORD && (
            <div className="bg-custom-blue text-primary px-4 py-2 rounded-lg mb-4 flex items-center gap-2">
              <Info size={20} />
              <h2>Test credentials !!!</h2>
            </div>
          )}
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

            <div className="mt-8">
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
        </div>
      </div>
    </>
  );
}
