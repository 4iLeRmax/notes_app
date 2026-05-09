"use client";

import React, { useState } from "react";
import StatusBar from "./status-bar";
import { ArrowRight, Loader2 } from "lucide-react";
import { resendVerificationEmail } from "@/lib/actions/auth";

interface EmailNotVerifiedProps {
  email: string;
}

export default function EmailNotVerified({ email }: EmailNotVerifiedProps) {
  const [
    successfullyResendEmailVerification,
    setSuccessfullyResendEmailVerification,
  ] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setSuccessfullyResendEmailVerification(false);
    setIsLoading(true);

    const res = await resendVerificationEmail(email);
    if (res.status) {
      setSuccessfullyResendEmailVerification(true);
    }
    setIsLoading(false);
  };

  if (successfullyResendEmailVerification)
    return (
      <StatusBar
        status="success"
        title="Verification email resent successfully"
        description="Please check your email for the verification link."
      />
    );

  return (
    <>
      <StatusBar
        status="pending"
        title="Email not verified"
        description={
          <div className="text-txt-primary flex flex-col items-center">
            <p>Please verify your email address before signing in</p>
            <button
              className="mt-2 w-full h-10 flex items-center justify-center gap-1 px-4 py-2 rounded-2xl bg-custom-blue text-primary"
              onClick={onSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin shrink-0" />
              ) : (
                <>
                  <span>Resend Verification Email</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
        }
      />
    </>
  );
}
