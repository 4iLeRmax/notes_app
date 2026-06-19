"use client";

import React, { useEffect, useState } from "react";
import StatusBar from "./status-bar";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PasswordUpdateSuccess() {
  const [seconds, setSeconds] = useState(10);
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (seconds <= 0) {
      router.push("/sign-in");
    }
  }, [seconds, router]);

  const TimerToRedirect = () => (
    <div className="flex flex-col gap-2 items-center mt-2">
      <p className="text-txt-primary">
        You'll be redirected in <span className="font-bold">{seconds}s</span>
      </p>

      <Link
        href="/sign-in"
        className="text-primary px-4 py-1 bg-custom-blue rounded-3xl"
      >
        Go to login page now
      </Link>
    </div>
  );

  return (
    <>
      <StatusBar
        status="success"
        title="You've successfully updated your password"
        description={<TimerToRedirect />}
      />
    </>
  );
}
