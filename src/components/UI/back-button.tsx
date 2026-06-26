"use client";

import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface BackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconSize?: number;
}

export default function BackButton({
  iconSize = 20,
  children,
  ...props
}: BackButtonProps) {
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => router.back()}
        {...props}
        className="flex xs:hidden p-2 shadow-outside-small rounded-3xl bg-secondary text-txt-secondary"
      >
        <Undo2 size={iconSize} />
      </button>
    </>
  );
}
