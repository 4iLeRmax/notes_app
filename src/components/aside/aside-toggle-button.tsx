"use client";

import { Ellipsis, EllipsisVertical } from "lucide-react";
import cn from "@/lib/cn";
import { motion, AnimatePresence } from "motion/react";

interface AsideToggleButtonProps {
  isOpen: boolean;
  toggle: () => void;
  iconSize?: number;
}

export default function AsideToggleButton({
  isOpen,
  toggle,
  iconSize = 20,
}: AsideToggleButtonProps) {
  return (
    <>
      <button
        onClick={toggle}
        className={cn(
          "w-[41px] h-[41px] flex items-center justify-center bg-primary rounded-full shrink-0",
          {
            "shadow-outside-small": !isOpen,
            "shadow-inside": isOpen,
          },
        )}
      >
        <motion.div
          key="open"
          animate={{ transform: isOpen ? "rotate(90deg)" : "rotate(0)" }}
          transition={{ duration: 0.2 }}
        >
          <Ellipsis size={iconSize} />
        </motion.div>
        {/* <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="open"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <EllipsisVertical size={iconSize} />
            </motion.div>
          ) : (
            <motion.div
              key="closed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Ellipsis size={iconSize} />
            </motion.div>
          )}
        </AnimatePresence> */}
      </button>
    </>
  );
}
