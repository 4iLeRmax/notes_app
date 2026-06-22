"use client";

import React from "react";
import { motion } from "motion/react";
import cn from "@/lib/cn";
import useNoteFilterStore, {
  SortTypes,
  SortDirections,
  sortTypesName,
} from "@/lib/store/useNoteFilterStore";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function NotesFilterModal() {
  const { sortType, sortDirection } = useNoteFilterStore((s) => s.filter);
  const toggleFilter = useNoteFilterStore((s) => s.toggleFilter);

  return (
    <>
      <div className="w-full py-4 xs:py-0">
        {Object.values(SortTypes).map((st) => (
          <button
            key={st}
            onClick={() => toggleFilter(st)}
            className={cn(
              "w-full flex items-center justify-between gap-2 px-4 py-2",
              "hover:text-primary hover:bg-custom-blue",
              {
                "text-txt-primary ": st !== sortType,
                "text-custom-blue": st === sortType,
              },
            )}
          >
            <span>{sortTypesName[st]}</span>
            <motion.div
              animate={{
                transform:
                  st === sortType
                    ? sortDirection === SortDirections.desc
                      ? "rotate(0deg)"
                      : "rotate(-180deg)"
                    : "rotate(0deg)",
              }}
            >
              <ChevronDown className="" />
            </motion.div>
          </button>
        ))}
      </div>
    </>
  );
}
