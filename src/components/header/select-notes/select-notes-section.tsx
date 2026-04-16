"use client";

import useSelectedNotesStore from "@/lib/store/useSelectedNotesStore";
import { X } from "lucide-react";
import React from "react";
import SelectNotesMoreMenu from "./select-notes-more-menu";

interface SelectNotesSectionProps {}

export default function SelectNotesSection({}: SelectNotesSectionProps) {
  const { selectedNotes, removeAll } = useSelectedNotesStore();

  return (
    <>
      <div data-header="true" className="flex items-start justify-end gap-4">
        <div className="w-[41px] h-[41px] shrink-0 flex items-center justify-center rounded-3xl bg-primary text-txt-primary text-xl font-bold select-none shadow-outside-small">
          {selectedNotes.length}
        </div>

        <SelectNotesMoreMenu noteIds={selectedNotes.map((sn) => sn.id)} />
        <button
          onClick={removeAll}
          className="w-[41px] h-[41px] shrink-0 flex items-center justify-center rounded-3xl bg-primary text-txt-primary text-xl font-bold select-none shadow-outside-small"
        >
          <X size={25} />
        </button>
      </div>
    </>
  );
}
