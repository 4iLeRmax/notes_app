import React, { Suspense } from "react";
import ResetPasswordForm from "./components/reset-password-form";

export default function ResetpasswordPage() {
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <Suspense fallback={null}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </>
  );
}
