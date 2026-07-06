"use client";

import useSelectedNotesStore from "@/lib/store/useSelectedNotesStore";
import { X } from "lucide-react";
import React from "react";
import SelectNotesOptions from "./select-notes-options/select-notes-options";

interface SelectNotesSectionProps {}

function SelectNotesSection({}: SelectNotesSectionProps) {
  const selectedNoteIds = useSelectedNotesStore((s) => s.selectedNoteIds);
  const removeAll = useSelectedNotesStore((s) => s.removeAll);

  return (
    <>
      <div data-header="true" className="flex items-start justify-end gap-4">
        <div className="bg-secondary w-[41px] h-[41px] shrink-0 flex items-center justify-center rounded-3xl text-txt-primary text-xl font-bold select-none shadow-outside">
          {selectedNoteIds.length}
        </div>

        <SelectNotesOptions noteIds={selectedNoteIds} />
        <button
          onClick={removeAll}
          className="bg-secondary w-[41px] h-[41px] shrink-0 flex items-center justify-center rounded-3xl text-txt-primary hover:text-custom-blue transition-colors text-xl font-bold select-none shadow-outside"
        >
          <X size={25} />
        </button>
      </div>
    </>
  );
}

export default React.memo(SelectNotesSection);
