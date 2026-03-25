import { deleteLabel } from "@/lib/actions/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader, X } from "lucide-react";
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
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["labels"] });
    },
  });

  return (
    <>
      <button onClick={() => handleDeleteLabel()}>
        {isPending ? (
          <Loader size={20} className="animate-spin" />
        ) : (
          <X size={20} />
        )}
      </button>
    </>
  );
}
