"use client";

import React, { useState } from "react";
import { ArrowUpDown, ChevronRight, Settings2 } from "lucide-react";
import { motion } from "motion/react";
import cn from "@/lib/cn";
import NotesSortModal from "./notes-sort-modal";
import useNoteSortStore, { sortTypesName } from "@/lib/store/useNoteSortStore";
import More from "@/components/UI/more";

export default function NotesSort() {
  const [isOpen, setIsOpen] = useState(false);
  const { sortType } = useNoteSortStore((s) => s.sort);

  const toggleOpen = () => {
    setIsOpen((p) => !p);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-2 select-none">
        <h1 className="hidden xs:flex text-txt-primary">Sort by</h1>
        <More
          isOpen={isOpen}
          handleOpen={toggleOpen}
          handleClose={handleClose}
          buttonContent={
            <div
              className={cn(
                "flex items-center gap-1",
                "bg-secondary",
                "rounded-3xl px-2 py-2 xs:py-1",
                "select-none transition-colors",
                {
                  "shadow-outside-small text-txt-primary hover:text-custom-blue":
                    !isOpen,
                  "shadow-inside text-custom-blue": isOpen,
                },
              )}
            >
              <ArrowUpDown size={20} />
              <span className="">{sortTypesName[sortType]}</span>
              {/* <motion.div
                animate={{ transform: isOpen ? "rotate(90deg)" : "rotate(0)" }}
                className=" "
              >
                <ChevronRight className="" />
              </motion.div> */}
            </div>
          }
        >
          <NotesSortModal />
        </More>
      </div>
    </>
  );
}
