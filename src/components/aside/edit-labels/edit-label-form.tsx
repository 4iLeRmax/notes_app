"use client";

import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { updateLabel } from "@/lib/actions/label";
import { Loader } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const DEBOUNCE_VALUE = 300;

interface EditLabelFormProps {
  labelName: string;
  labelId: string;
}

export default function EditLabelForm({
  labelName,
  labelId,
}: EditLabelFormProps) {
  const [text, setText] = useState(labelName);
  const [value] = useDebounce(text, DEBOUNCE_VALUE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (value === labelName) return;

    const submitForm = async () => {
      setIsSubmitting(true);
      try {
        const formData = new FormData();
        formData.append("label", value);
        await updateLabel(labelId, formData);
        await queryClient.refetchQueries({ queryKey: ["labels"] });
      } catch (error) {
        console.error("Failed to update label:", error);
      } finally {
        setIsSubmitting(false);
      }
    };

    submitForm();
  }, [value, labelId, labelName]);

  return (
    <>
      <div className="w-full flex items-center gap-2">
        <textarea
          name="label"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isSubmitting}
          className="w-full overflow-hidden outline-none resize-none field-sizing-content"
        ></textarea>
        {isSubmitting ? (
          <Loader size={20} className="animate-spin shrink-0" />
        ) : null}
      </div>
    </>
  );
}
