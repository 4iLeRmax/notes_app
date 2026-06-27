"use client";

import React from "react";
import User from "./user/user";
import ConditionalSearch from "./search/conditional-search";
import SelectNotesSection from "./select-notes/select-notes-section";
import cn from "@/lib/cn";
import useSelectedNotesStore from "@/lib/store/useSelectedNotesStore";
import SyncDataBtn from "./sync-data/sync-data-btn";

function Header() {
  const selectedNoteIds = useSelectedNotesStore((s) => s.selectedNoteIds);

  return (
    <>
      <div className={cn("fixed z-30 top-5 right-5")}>
        {selectedNoteIds.length === 0 ? (
          <div
            data-header="true"
            className="flex items-start justify-end gap-4"
          >
            <div className="text-txt-primary">EN</div>
            <SyncDataBtn iconSize={25} />
            <ConditionalSearch />
            <User />
          </div>
        ) : (
          <SelectNotesSection />
        )}
      </div>
    </>
  );
}

export default React.memo(Header);
