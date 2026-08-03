"use client";

import { Loader, Loader2 } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

export default function FormButton({ children, isLoading }: ButtonProps) {
  return (
    <>
      <button
        type="submit"
        className="h-12 bg-custom-blue shadow-button text-primary w-full rounded-3xl flex justify-center items-center"
        disabled={isLoading}
      >
        {isLoading ? <Loader2 size={20} className="animate-spin" /> : children}
      </button>
    </>
  );
}
