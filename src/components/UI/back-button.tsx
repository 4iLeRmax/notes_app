"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface BackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function BackButton({ children, ...props }: BackButtonProps) {
  const router = useRouter();

  return (
    <>
      <button onClick={() => router.back()} {...props}>
        {children}
      </button>
    </>
  );
}
