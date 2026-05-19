"use client";

import React, { useState } from "react";
import BaseModal from "../../UI/base-modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CreateLabelForm from "./create-label-form";
import { createLabel, getLabels } from "@/lib/actions/label";
import EditLabelsList from "./edit-labels-list";
import { Loader2 } from "lucide-react";

interface EditLabelsModalProps {
  handleClose: () => void;
}

export default function EditLabelsModal({ handleClose }: EditLabelsModalProps) {
  const [searchValue, setSearchValue] = useState("");

  const queryClient = useQueryClient();

  const { data: labels } = useQuery({
    queryKey: ["labels"],
    queryFn: async () => await getLabels(),
  });

  const { mutate: handleSubmit } = useMutation({
    mutationFn: async (FormData: FormData) => {
      await createLabel(FormData);
    },
    onSuccess: async () => {
      setSearchValue("");
      await queryClient.invalidateQueries({
        queryKey: ["labels"],
      });
    },
  });

  if (!labels) return null;

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.slice(0, 50));
  };

  const exactMatchOfSearch = labels.some(
    (label) => label.name.toLowerCase() === searchValue.toLowerCase(),
  );

  return (
    <>
      <BaseModal customClose={handleClose}>
        <div className="bg-primary pt-[60px] pb-4 rounded-4xl shadow-outside w-screen sm:w-150">
          <div>
            <h2 className="flex items-center gap-1 text-lg font-bold mb-4 px-4 sm:px-8 text-txt-secondary">
              <span>Edit Labels</span>
              {labels.length > 0 ? <span>({labels.length})</span> : null}
            </h2>
            <div className="px-4 sm:px-8">
              <CreateLabelForm
                searchValue={searchValue}
                handleChangeValue={handleChangeValue}
                handleSubmit={handleSubmit}
                exactMatchOfSearch={exactMatchOfSearch}
              />
            </div>
            <EditLabelsList labels={labels} searchValue={searchValue} />
          </div>
        </div>
      </BaseModal>
    </>
  );
}
