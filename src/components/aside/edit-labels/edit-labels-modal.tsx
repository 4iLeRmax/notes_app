"use client";

import React, { useState } from "react";
import BaseModal from "../../UI/base-modal";
import CreateLabelForm from "./create-label-form";
import EditLabelsList from "./edit-labels-list";
import { useNotesStore } from "@/lib/store/useNotesStore";
import { authClient } from "@/lib/auth-client";
import { LABEL_LIMITS } from "@/lib/constants";
import BackButton from "@/components/UI/back-button";
import { ArrowLeft } from "lucide-react";
import { vibrate } from "@/lib/haptics";

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
        {/* <div className="bg-primary pt-[60px] pb-4 rounded-4xl shadow-outside w-screen sm:w-150"> */}
        <div className="w-screen flex flex-col gap-4 sm:w-150 h-dvh xs:h-auto bg-primary xs:pt-12 pb-4 rounded-none xs:rounded-4xl shadow-outside">
          <div className="flex flex-col gap-4 px-4 sm:px-8">
            <div className="flex items-center gap-2 pt-4 xs:pt-0">
              <BackButton
                onClick={() => {
                  vibrate(10);
                  handleClose();
                }}
                className="flex xs:hidden p-2 shadow-outside-small rounded-3xl bg-secondary text-txt-secondary"
              >
                <ArrowLeft size={25} />
              </BackButton>
              <h2 className="flex items-center gap-1 text-lg font-bold text-txt-secondary">
                <span>Edit Labels</span>
                {labels.length > 0 ? <span>({labels.length})</span> : null}
              </h2>
            </div>

            <CreateLabelForm
              searchValue={searchValue}
              handleChangeValue={handleChangeValue}
              handleSubmit={handleSubmit}
              exactMatchOfSearch={exactMatchOfSearch}
            />
          </div>

          <EditLabelsList labels={sortedLabels} />
        </div>
      </BaseModal>
    </>
  );
}
