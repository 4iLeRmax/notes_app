"use client";

import React from "react";
import z from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";
import Link from "next/link";
import FormButton from "@/components/UI/formElements/form-button";
import FormInput from "@/components/UI/formElements/form-input";
import ControlledCustomInput from "@/components/UI/formElements/controlled-custom-input";
import { SignUpAction } from "@/lib/actions/auth";
import { SignUpScheme, TSignUp } from "@/lib/zod-schemes/sign-in-up-schemes";

export default function SignUpForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpScheme),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<TSignUp> = async (data) => {
    await SignUpAction(data);
  };

  return (
    <>
      <div className="bg-primary shadow-outside px-16 py-8 rounded-4xl w-120">
        {/* <div className="bg-secondary px-16 py-8 rounded-secondary w-120"> */}
        <h1 className="text-center text-txt-primary text-2xl font-bold">
          Sign Up
        </h1>

        <div className="mt-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center gap-4">
              <ControlledCustomInput
                type="email"
                name="email"
                control={control}
                error={errors.email}
                placeholder="Email..."
              />
              <ControlledCustomInput
                type="text"
                name="firstName"
                control={control}
                error={errors.firstName}
                placeholder="First name..."
              />
              <ControlledCustomInput
                type="text"
                name="lastName"
                control={control}
                error={errors.lastName}
                placeholder="Last name..."
              />
              <ControlledCustomInput
                name="password"
                control={control}
                error={errors.password}
                placeholder="Password..."
                isPassword
              />
              <ControlledCustomInput
                name="confirmPassword"
                control={control}
                error={errors.confirmPassword}
                placeholder="Confirm password..."
                isPassword
              />
            </div>
            {/* <div className="flex flex-col items-center gap-4">
              <div className="w-full flex flex-col">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      {...field}
                      type="email"
                      name="email"
                      placeholder="Email..."
                    />
                  )}
                />
                {errors.email ? (
                  <span className="text-custom-red text-xs">
                    {errors.email.message}
                  </span>
                ) : null}
              </div>
              <div className="w-full flex flex-col">
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      {...field}
                      type="text"
                      name="firstName"
                      placeholder="First name..."
                    />
                  )}
                />
                {errors.firstName ? (
                  <span className="text-custom-red text-xs">
                    {errors.firstName.message}
                  </span>
                ) : null}
              </div>
              <div className="w-full flex flex-col">
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      {...field}
                      type="text"
                      name="lastName"
                      placeholder="Last name..."
                    />
                  )}
                />
                {errors.lastName ? (
                  <span className="text-custom-red text-xs">
                    {errors.lastName.message}
                  </span>
                ) : null}
              </div>
              <div className="w-full flex flex-col">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      {...field}
                      isPassword
                      name="password"
                      placeholder="Password..."
                    />
                  )}
                />
                {errors.password ? (
                  <span className="text-custom-red text-xs">
                    {errors.password.message}
                  </span>
                ) : null}
              </div>
              <div className="w-full flex flex-col">
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      {...field}
                      isPassword
                      name="confirmPassword"
                      placeholder="Confirm password..."
                    />
                  )}
                />
                {errors.confirmPassword ? (
                  <span className="text-custom-red text-xs">
                    {errors.confirmPassword.message}
                  </span>
                ) : null}
              </div>
            </div> */}
            <div className="mt-10">
              <FormButton>Sign Up</FormButton>
              <Link
                href="/sign-in"
                className="text-txt-primary text-sm flex items-center justify-center mt-2"
              >
                Already have an account
              </Link>
            </div>
          </form>
          <div>
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="bg-txt-primary w-full flex h-px"></div>
              <p className="text-txt-primary shrink-0 text-sm">
                or continue with
              </p>
              <div className="bg-txt-primary w-full flex h-px"></div>
            </div>
            <div className="flex items-center justify-center mt-2 gap-3">
              <Image src={"google.svg"} width={40} height={40} alt="" />
              <Image src={"apple.svg"} width={40} height={40} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
