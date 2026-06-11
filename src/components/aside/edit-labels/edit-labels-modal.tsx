"use client";

import React, { useState } from "react";
import BaseModal from "../../UI/base-modal";
import CreateLabelForm from "./create-label-form";
import EditLabelsList from "./edit-labels-list";
import { useNotesStore } from "@/lib/store/useNotesStore";
import { authClient } from "@/lib/auth-client";
import { LABEL_LIMITS } from "@/lib/constants";

interface EditLabelsModalProps {
  handleClose: () => void;
}

export default function EditLabelsModal({ handleClose }: EditLabelsModalProps) {
  const [searchValue, setSearchValue] = useState("");

  const labels = useNotesStore((s) => s.labels);
  const addLabel = useNotesStore((s) => s.addLabel);
  if (!labels) return null;

  const session = authClient.useSession();
  if (!session.data) return null;
  const userId = session.data.session.userId;

  const handleSubmit = async () => {
    await addLabel(searchValue, userId);
    setSearchValue("");
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.slice(0, LABEL_LIMITS.MAX_LABEL_NAME_CHARS));
  };

  const sortedLabels = labels.filter((label) =>
    label.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const exactMatchOfSearch = sortedLabels.some(
    (l) => l.name.toLowerCase() === searchValue.toLowerCase(),
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
            <EditLabelsList labels={sortedLabels} searchValue={searchValue} />
          </div>
        </div>
      </BaseModal>
    </>
  );
}
