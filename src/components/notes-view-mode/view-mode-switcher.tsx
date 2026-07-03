"use client";

import cn from "@/lib/cn";
import { vibrate } from "@/lib/haptics";
import useViewModeStore, { ViewMode } from "@/lib/store/useViewModeStore";
import { LayoutGrid, Rows3 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ViewModeSwitcher({
  iconSize = 20,
}: {
  iconSize?: number;
}) {
  const viewMode = useViewModeStore((s) => s.viewMode);
  const toggleViewMode = useViewModeStore((s) => s.toggleViewMode);

  const handleToggle = () => {
    vibrate(10);
    toggleViewMode();
  };

  return (
    <>
      <button
        onClick={handleToggle}
        className={cn(
          "w-[41px] h-[41px] flex items-center justify-center bg-secondary sm:bg-primary rounded-full shrink-0 transition-colors",
          {
            "shadow-outside-small text-txt-primary hover:text-custom-blue":
              viewMode === ViewMode.GRID,
            "shadow-inside text-custom-blue": viewMode === ViewMode.LIST,
          },
        )}
      >
        <AnimatePresence mode="popLayout">
          {viewMode === ViewMode.GRID ? (
            <motion.div
              key="rows"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Rows3 size={iconSize} />
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <LayoutGrid size={iconSize} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </>
  );
}
