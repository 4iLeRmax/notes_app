"use client";

import clsx from "clsx";
import { Eye, EyeClosed, X } from "lucide-react";
import { register } from "module";
import React, { useState } from "react";
import { Path, UseFormRegister } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isPassword?: boolean;
}

export default function FormInput({ isPassword, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState("");

  const clearInput = () => setValue("");

  return (
    <div className="relative w-full ">
      <input
        {...(showPassword ? { type: "text" } : { type: "password" })}
        className={clsx(
          "w-full bg-primary pl-5 py-3 rounded-primary outline-none text-txt-secondary placeholder:text-txt-primary",
          {
            "pr-[57px]": value.length > 0,
            "pr-[106px]": isPassword,
          }
        )}
        value={value}
        onInput={(e) => setValue(e.currentTarget.value)}
        {...props}
      />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 z-20 flex items-center justify-center pr-2 text-txt-primary">
        {isPassword ? (
          <button
            onClick={() => setShowPassword((p) => !p)}
            type="button"
            className="outline-0 cursor-pointer px-3 h-12 flex items-center justify-center"
          >
            {showPassword ? <EyeClosed size={25} /> : <Eye size={25} />}
          </button>
        ) : null}
        {value.length > 0 ? (
          <button
            type="button"
            className="outline-0 cursor-pointer px-3 h-12 flex items-center justify-center"
            onClick={clearInput}
          >
            <X size={25} />
          </button>
        ) : null}
      </div>
    </div>
  );
}
