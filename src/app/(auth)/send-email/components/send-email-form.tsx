"use client";

import ControlledCustomInput from "@/components/UI/formElements/controlled-custom-input";
import FormButton from "@/components/UI/formElements/form-button";
import { FindAccountAction, SendResetPasswordEmail } from "@/lib/actions/auth";
import {
  FindAccountScheme,
  TFindAccount,
} from "@/lib/zod-schemes/auth-schemes";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function SendEmailForm() {
  const {
    control,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(FindAccountScheme),
    defaultValues: {
      email: "",
    },
  });

  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email");

  const onSubmit: SubmitHandler<TFindAccount> = async (data) => {
    const res = await SendResetPasswordEmail("/reset-password", data);
    if (res?.error) {
      setError("root", { message: res.error });
    }
  };

  return (
    <>
      <div className="bg-secondary shadow-outside px-8 xs:px-16 py-4 xs:py-8 rounded-4xl w-120">
        <h1 className="text-center text-txt-primary text-2xl font-bold">
          Send Email
        </h1>

        <div className="mt-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center gap-4">
              <ControlledCustomInput
                type="email"
                name="email"
                value={emailFromQuery || ""}
                control={control}
                error={errors.email}
                placeholder="Email..."
              />
            </div>

            <div className="mt-10">
              {errors.root ? (
                <div className="mb-2 flex items-center justify-center">
                  <Link href="/sign-up" className="text-txt-primary text-sm">
                    Create an account
                  </Link>
                </div>
              ) : null}
              <FormButton isLoading={isSubmitting}>Find Account</FormButton>
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
