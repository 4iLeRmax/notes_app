"use client";

import React, { useState } from "react";
import { ChevronRight, Settings2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import cn from "@/lib/cn";
import NotesFilterModal from "./notes-filter-modal";
import useNoteFilterStore, {
  SortTypes,
  sortTypesName,
} from "@/lib/store/useNoteFilterStore";
import More from "@/components/UI/more";

export default function NotesFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const { sortType, sortDirection } = useNoteFilterStore((s) => s.filter);

  const toggleOpen = () => {
    setIsOpen((p) => !p);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <More
        isOpen={isOpen}
        handleOpen={toggleOpen}
        handleClose={handleClose}
        buttonContent={
          <div
            className={cn(
              "flex items-center gap-2",
              "bg-secondary text-txt-primary",
              "rounded-3xl p-2",
              {
                "shadow-outside-small": !isOpen,
                "shadow-inside": isOpen,
              },
            )}
          >
            <Settings2 className="rotate-90" />
            <span>{sortTypesName[sortType]}</span>
            <motion.div
              animate={{ transform: isOpen ? "rotate(90deg)" : "rotate(0)" }}
            >
              <ChevronRight className="" />
            </motion.div>
          </div>
        }
      >
        <NotesFilterModal />
      </More>
    </>
  );
}
