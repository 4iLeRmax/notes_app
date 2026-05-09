"use client";

import ControlledCustomInput from "@/components/UI/formElements/controlled-custom-input";
import FormButton from "@/components/UI/formElements/form-button";
import StatusBar from "@/components/UI/status-bar/status-bar";
import { sendResetPasswordEmail } from "@/lib/actions/auth";
import {
  FindAccountScheme,
  TFindAccount,
} from "@/lib/zod-schemes/auth-schemes/find-account-scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function SendEmailForm() {
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email");

  const [successfulSendEmail, setSuccessfulSendEmail] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(FindAccountScheme),
    defaultValues: {
      email: emailFromQuery || "",
    },
  });

  const onSubmit: SubmitHandler<TFindAccount> = async (data) => {
    setSuccessfulSendEmail(false);
    const res = await sendResetPasswordEmail("/reset-password", data);
    if (res?.error) setError("root", { message: res.error });
    if (res?.success) setSuccessfulSendEmail(true);
  };

  if (successfulSendEmail)
    return (
      <StatusBar
        status="success"
        title="We've successfully sent a password reset link to your email"
        description="Check your spam folder too"
      />
    );

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
                control={control}
                error={errors.email}
                placeholder="Email..."
              />
            </div>

            <div className="mt-10">
              <FormButton isLoading={isSubmitting}>Send Email</FormButton>
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
