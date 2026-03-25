"use client";

import React from "react";
import CreateLabelBtn from "./UI/create-label-btn";
import FormInput from "@/components/UI/formElements/form-input";

interface CreateLabelFormProps {
  searchValue: string;
  handleChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // handleSubmit: (formData: FormData) => Promise<void>;
  handleSubmit: any;
  exactMatchOfSearch: boolean;
}

export default function CreateLabelForm({
  searchValue,
  handleChangeValue,
  handleSubmit,
  exactMatchOfSearch,
}: CreateLabelFormProps) {
  return (
    <>
      <form action={handleSubmit} className="flex flex-col gap-4">
        <FormInput
          type="text"
          name="label"
          placeholder="Create label..."
          value={searchValue}
          onChange={handleChangeValue}
        />
        {!exactMatchOfSearch ? (
          <CreateLabelBtn searchValue={searchValue} />
        ) : null}
      </form>
    </>
  );
}
