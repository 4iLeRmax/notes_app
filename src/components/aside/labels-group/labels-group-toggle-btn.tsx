import cn from "@/lib/cn";
import { ChevronRight, Tags } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React from "react";

interface LabelsGroupToggleBtnProps {
  isOpen: boolean;
  toggleIsOpen: () => void;
  menuIsOpen: boolean;
}

export default function LabelsGroupToggleBtn({
  isOpen,
  toggleIsOpen,
  menuIsOpen,
}: LabelsGroupToggleBtnProps) {
  return (
    <>
      <div className="px-4">
        <button
          className={cn(
            "w-full h-[41px] flex items-center gap-2 bg-primary p-2 rounded-3xl justify-between transition-colors",
            {
              "shadow-outside-small text-txt-primary hover:text-custom-blue":
                !isOpen,
              "shadow-inside text-custom-blue": isOpen,
            },
          )}
          onClick={toggleIsOpen}
        >
          <div className="flex items-center gap-2">
            <Tags size={25} />
            <AnimatePresence mode="wait">
              {menuIsOpen ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.2, delay: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.1, delay: 0 },
                  }}
                >
                  Labels
                </motion.span>
              ) : null}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            {menuIsOpen ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.2, delay: 0.25 },
                }}
                exit={{ opacity: 0, transition: { duration: 0.1, delay: 0 } }}
              >
                <motion.div
                  animate={{
                    transform: isOpen ? "rotate(90deg)" : "rotate(0)",
                  }}
                >
                  <ChevronRight size={20} />
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </button>
      </div>
    </>
  );
}
