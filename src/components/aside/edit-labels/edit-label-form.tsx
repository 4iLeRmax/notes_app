"use client";

import { useAutoSubmit } from "@/hooks/useAutoSubmit";
import { useNotesStore } from "@/lib/store/useNotesStore";

interface EditLabelFormProps {
  labelName: string;
  labelId: string;
}

export default function EditLabelForm({
  labelName,
  labelId,
}: EditLabelFormProps) {
  const updateLabelName = useNotesStore((s) => s.updateLabelName);

  const { value, setValue, isPending } = useAutoSubmit(async (text) => {
    await updateLabelName(labelId, text);
  }, labelName);

  return (
    <>
      <textarea
        name="label"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full overflow-hidden outline-none resize-none field-sizing-content"
      ></textarea>
    </>
  );
}
