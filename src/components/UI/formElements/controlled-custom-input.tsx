import React from "react";
import FormInput from "./form-input";
import { Controller, FieldError } from "react-hook-form";
import z from "zod";
import { SignUpScheme } from "@/lib/zod-schemes/sign-in-up-schemes";

interface ControlledCustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: any;
  error: FieldError | undefined;
  name: keyof z.infer<typeof SignUpScheme>;
  isPassword?: boolean;
}

export default function ControlledCustomInput({
  control,
  error,
  name,
  isPassword = false,
  ...props
}: ControlledCustomInputProps) {
  return (
    <>
      <div className="w-full flex flex-col">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <FormInput {...field} {...props} isPassword={isPassword} />
          )}
        />
        {error ? (
          <span className="text-custom-red text-xs">{error.message}</span>
        ) : null}
      </div>
    </>
  );
}
