import { deleteLabel } from "@/lib/actions/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader, Loader2, X } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

interface DeleteLabelBtnProps {
  labelId: string;
}

export default function DeleteLabelBtn({ labelId }: DeleteLabelBtnProps) {
  const queryClient = useQueryClient();

  const { mutate: handleDeleteLabel, isPending } = useMutation({
    mutationFn: async () => await deleteLabel(labelId),
    mutationKey: ["labels"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["labels"] });
    },
  });

  return (
    <>
      <button onClick={() => handleDeleteLabel()}>
        {isPending ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <X size={20} />
        )}
      </button>
    </>
  );
}
