"use client";

import React from "react";
import { motion } from "motion/react";
import cn from "@/lib/cn";
import useNoteSortStore, {
  SortTypes,
  SortDirections,
  sortTypesName,
} from "@/lib/store/useNoteSortStore";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function NotesSortModal() {
  const { sortType, sortDirection } = useNoteSortStore((s) => s.sort);
  const toggleSortTypeAndDirection = useNoteSortStore(
    (s) => s.toggleSortTypeAndDirection,
  );

  return (
    <>
      <div className="w-full py-4 xs:py-0 overflow-hidden rounded-ss-4xl rounded-se-4xl xs:rounded-3xl bg-secondary xs:bg-primary shadow-outside-small">
        <div className="flex flex-col w-full">
          {Object.values(SortTypes).map((st) => (
            <button
              key={st}
              onClick={() => toggleSortTypeAndDirection(st)}
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
      </div>
    </>
  );
}
