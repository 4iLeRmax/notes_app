"use client";

import { createLabel } from "@/lib/actions/label";
import { useQueryClient } from "@tanstack/react-query";
import CreateLabelBtn from "./create-label-btn";
import FormInput from "@/components/UI/formElements/form-input";

interface CreateLabelProps {
  customRef: React.Ref<HTMLInputElement | null>;
  searchValue: string;
  handleChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CreateLabel({
  customRef,
  searchValue,
  handleChangeValue,
}: CreateLabelProps) {
  const queryClient = useQueryClient();

  const handleCreateLabel = async (formData: FormData) => {
    await createLabel(formData);
    await queryClient.invalidateQueries({
      queryKey: ["labels"],
    });
  };

  return (
    <div className="px-2 py-2 flex flex-col mt-2">
      <form action={handleCreateLabel}>
        <FormInput
          // ref={customRef}\
          customRef={customRef}
          type="text"
          name="label"
          value={searchValue}
          onChange={handleChangeValue}
          placeholder="label..."
          className="w-full shadow-inside px-4 py-2 rounded-2xl outline-none text-txt-primary"
        />

        <CreateLabelBtn />
      </form>
      {/* {state?.error ? <div className="text-red-500">{state.error}</div> : null} */}
    </div>
  );
}
