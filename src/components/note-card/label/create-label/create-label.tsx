"use client";

import { createLabel } from "@/lib/actions/label";
import { useQueryClient } from "@tanstack/react-query";
import CreateLabelBtn from "./create-label-btn";

interface CreateLabelProps {
  customRef: any;
}

export default function CreateLabel({ customRef }: CreateLabelProps) {
  const queryClient = useQueryClient();

  const handleCreateLabel = async (formData: FormData) => {
    const data = await createLabel(formData);
    await queryClient.invalidateQueries({
      queryKey: ["labels"],
    });
  };

  return (
    <div className="px-2 py-2 flex flex-col mt-2">
      <form action={handleCreateLabel}>
        <input
          ref={customRef}
          type="text"
          name="label"
          placeholder="label..."
          className="w-full shadow-inside px-4 py-2 rounded-2xl outline-none placeholder:text-txt-primary"
        />
        <CreateLabelBtn />
      </form>
      {/* {state?.error ? <div className="text-red-500">{state.error}</div> : null} */}
    </div>
  );
}
