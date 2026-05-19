"use client";

import { updateLabel } from "@/lib/actions/label";
import { Loader2 } from "lucide-react";
import { useAutoSubmit } from "@/hooks/useAutoSubmit";
import { useQueryClient } from "@tanstack/react-query";

interface EditLabelFormProps {
  labelName: string;
  labelId: string;
}

export default function EditLabelForm({
  labelName,
  labelId,
}: EditLabelFormProps) {
  const queryClient = useQueryClient();

  const { value, setValue, isPending } = useAutoSubmit(async (text) => {
    await updateLabel(labelId, text);
    await queryClient.invalidateQueries({
      queryKey: ["labels"],
    });
  }, labelName);

  return (
    <>
      <div className="w-full flex items-center gap-2">
        <textarea
          name="label"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full overflow-hidden outline-none resize-none field-sizing-content"
        ></textarea>
        {isPending ? (
          <Loader2 size={20} className="animate-spin shrink-0" />
        ) : null}
      </div>
    </>
  );
}
