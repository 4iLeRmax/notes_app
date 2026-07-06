"use client";

import React from "react";
import User from "./user/user";
import ConditionalSearch from "./search/conditional-search";
import SelectNotesSection from "./select-notes/select-notes-section";
import cn from "@/lib/cn";
import useSelectedNotesStore from "@/lib/store/useSelectedNotesStore";
import SyncDataBtn from "./sync-data/sync-data-btn";
import { motion, AnimatePresence } from "motion/react";

function Header() {
  const hasAnySelected = useSelectedNotesStore(
    (s) => s.selectedNoteIds.length > 0,
  );

  return (
    <>
      <div className={cn("fixed z-30 top-5 right-5")}>
        <AnimatePresence mode="popLayout">
          {hasAnySelected ? (
            <motion.div
              key="select-notes"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SelectNotesSection />
            </motion.div>
          ) : (
            <motion.div
              key="header-actions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              data-header="true"
              className="flex items-start justify-end gap-4"
            >
              <SyncDataBtn iconSize={25} />
              <ConditionalSearch />
              <User />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default React.memo(Header);
