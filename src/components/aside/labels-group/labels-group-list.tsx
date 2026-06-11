import React from "react";
import { motion } from "motion/react";
import cn from "@/lib/cn";
import LabelItem from "./label-item";

interface LabelsGroupListProps {
  labels: Label[];
  menuIsOpen: boolean;
}

export default function LabelsGroupList({
  labels,
  menuIsOpen,
}: LabelsGroupListProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: 1,
          height: "auto",
          paddingLeft: menuIsOpen ? "32px" : "16px",
        }}
        exit={{ opacity: 0, height: 0 }}
        className={cn(
          "w-full flex flex-col items-start gap-4 max-h-[calc(100vh-358px-40px-16px)]",
          "mt-4 overflow-y-scroll snap-y snap-mandatory scrollbar-thin pr-3",
        )}
      >
        {labels.map((label) => (
          <LabelItem label={label} key={label.id} menuIsOpen={menuIsOpen} />
        ))}
      </motion.div>
    </>
  );
}
