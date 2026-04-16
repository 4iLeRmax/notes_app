"use client";

import cn from "@/lib/cn";
import clsx from "clsx";
import { Eye, EyeClosed, X } from "lucide-react";
import { register } from "module";
import React, { useState } from "react";
import { Path, UseFormRegister } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isPassword?: boolean;
  customClassNames?: string;
  customRef?: any;
}

export default function FormInput({
  isPassword,
  value,
  onChange,
  // customClassNames,
  className,
  customRef,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const clearInput = () => {
    onChange?.({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="relative w-full">
      <input
        ref={customRef}
        {...(showPassword ? { type: "text" } : { type: "password" })}
        className={cn(
          "w-full shadow-inside bg-primary pl-4 py-3 rounded-3xl outline-none text-txt-secondary placeholder:text-txt-primary",
          className,
          {
            "pr-[57px]": String(value).length > 0,
            "pr-[106px]": isPassword,
          },
        )}
        value={value}
        onChange={onChange}
        // onInput={(e) => setValue(e.currentTarget.value)}
        {...props}
      />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 z-20 flex items-center justify-center pr-2 text-txt-primary">
        {isPassword ? (
          <button
            onClick={() => setShowPassword((p) => !p)}
            type="button"
            className="outline-0 cursor-pointer px-3 h-12 flex items-center justify-center"
          >
            {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
          </button>
        ) : null}
        {String(value).length > 0 ? (
          <button
            type="button"
            className="outline-0  cursor-pointer px-3 h-12 flex items-center justify-center"
            onClick={clearInput}
          >
            <X size={20} />
          </button>
        ) : null}
      </div>
    </div>
  );
}
