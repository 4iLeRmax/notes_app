"use client";

import cn from "@/lib/cn";
import { Pencil } from "lucide-react";
import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface EditLabelsBtnProps {
  menuIsOpen: boolean;
  modalIsOpen: boolean;
  toggleModalOpen: () => void;
}

export default function EditLabelsBtn({
  menuIsOpen,
  modalIsOpen,
  toggleModalOpen,
}: EditLabelsBtnProps) {
  return (
    <>
      <motion.button
        animate={{ width: menuIsOpen ? 208 : 41 }}
        className={cn(
          "h-[41px] flex items-center bg-primary gap-2 rounded-3xl p-2  transition-colors",
          {
            "shadow-outside-small text-txt-primary hover:text-custom-blue":
              !modalIsOpen,
            "shadow-inside text-custom-blue": modalIsOpen,
          },
        )}
        onClick={toggleModalOpen}
      >
        <Pencil size={25} className="shrink-0" />
        <AnimatePresence>
          {menuIsOpen ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.2, delay: 0.15 },
              }}
              exit={{ opacity: 0, transition: { duration: 0.1, delay: 0 } }}
            >
              Edit Labels
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
