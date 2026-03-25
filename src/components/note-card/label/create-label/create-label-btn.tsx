import { Loader } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

export default function CreateLabelBtn() {
  const { pending } = useFormStatus();

  return (
    <>
      <button className="w-full py-2 shadow-button bg-custom-blue text-primary flex items-center justify-center rounded-3xl mt-5">
        {pending ? <Loader size={20} className="animate-spin" /> : "Create"}
      </button>
    </>
  );
}
