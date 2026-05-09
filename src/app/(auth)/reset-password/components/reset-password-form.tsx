"use client";

import ControlledCustomInput from "@/components/UI/formElements/controlled-custom-input";
import FormButton from "@/components/UI/formElements/form-button";
import { resetPassword } from "@/lib/actions/auth";
import {
  ResetPasswordScheme,
  TResetPassword,
} from "@/lib/zod-schemes/auth-schemes/reset-password-scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export default function ResetPasswordForm() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ResetPasswordScheme),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const error = searchParams.get("error");

  const onSubmit: SubmitHandler<TResetPassword> = async (data) => {
    if (!token)
      if (error === "INVALID_TOKEN") {
        setError("root", { message: "This password reset link has expired" });
      } else {
        setError("root", { message: "Something went wrong" });
      }
    const res = await resetPassword(data, token as string);
    if (res?.error) {
      setError("root", { message: res.error });
    }
  };

  return (
    <>
      <div className="bg-secondary shadow-outside px-8 xs:px-16 py-4 xs:py-8 rounded-4xl w-120">
        <h1 className="text-center text-txt-primary text-2xl font-bold">
          Set new password
        </h1>

        <div className="mt-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center gap-4">
              <ControlledCustomInput
                name="password"
                control={control}
                error={errors.password}
                placeholder="New password..."
                isPassword
              />
              <ControlledCustomInput
                name="confirmPassword"
                control={control}
                error={errors.confirmPassword}
                placeholder="Confirm new password..."
                isPassword
              />
            </div>
            <div className="mt-10">
              <FormButton isLoading={isSubmitting}>Set new password</FormButton>
              {errors.root ? (
                <span className="text-custom-red text-xs flex justify-center mt-2">
                  {errors.root.message}
                </span>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
