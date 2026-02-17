import FormButton from "@/components/UI/formElements/form-button";
import FormInput from "@/components/UI/formElements/form-input";
import React from "react";

export default function FindAccountForm() {
  return (
    <>
      <div className="bg-secondary px-16 py-8 rounded-secondary w-120">
        <h1 className="text-center text-txt-secondary text-3xl">
          Find your account
        </h1>

        <div className="mt-6">
          <form action="">
            <div className="flex flex-col items-center gap-4">
              <FormInput type="email" name="email" placeholder="Email..." />
            </div>
            <div className="mt-10">
              <FormButton>Search</FormButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
