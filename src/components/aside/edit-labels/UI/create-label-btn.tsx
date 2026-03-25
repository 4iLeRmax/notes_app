"use client";

import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";

interface CreateLabelBtnProps {
  searchValue: string;
}

export default function CreateLabelBtn({ searchValue }: CreateLabelBtnProps) {
  const { pending } = useFormStatus();

  return (
    <>
      <button
        className="bg-custom-blue text-primary py-2 rounded-2xl wrap-break-word flex items-center justify-center disabled:bg-txt-primary"
        disabled={pending}
      >
        {pending ? (
          <Loader size={20} className="animate-spin shrink-0" />
        ) : (
          <>
            <span>Create Label</span>
            {searchValue.length > 0 ? `: "${searchValue}"` : ""}
          </>
        )}
      </button>
    </>
  );
}
