import React, { Suspense } from "react";
import SendEmailForm from "./components/send-email-form";

export default function SendEmailPage() {
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <Suspense fallback={null}>
          <SendEmailForm />
        </Suspense>
      </div>
    </>
  );
}
