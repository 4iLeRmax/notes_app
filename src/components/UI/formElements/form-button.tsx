import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function FormButton({ children }: ButtonProps) {
  return (
    <>
      <button className="bg-custom-blue text-primary py-3 w-full rounded-primary">
        {children}
      </button>
    </>
  );
}
