"use client";

import React from "react";
import SelectNotesSection from "./select-notes-section/select-notes-section";
import cn from "@/lib/cn";
import useSelectedNotesStore from "@/lib/store/useSelectedNotesStore";
import { motion, AnimatePresence } from "motion/react";
import HeaderSection from "./header-section/header-section";

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
            >
              <HeaderSection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default React.memo(Header);
