"use client";

import React from "react";
import FormInput from "@/components/UI/formElements/form-input";
import CreateLabelBtn from "./UI/create-label-btn";

interface CreateLabelFormProps {
  searchValue: string;
  handleChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
      <div className="flex flex-col gap-4">
        <FormInput
          type="text"
          name="label"
          className="bg-secondary"
          placeholder="Create label..."
          value={searchValue}
          onChange={handleChangeValue}
        />
        <CreateLabelBtn onClick={handleSubmit} disabled={exactMatchOfSearch} />
      </div>
    </>
  );
}
