"use client";

import React, { useState } from "react";
import { LabelsIconSkeleton } from "../../UI/skeletons";
import { motion, AnimatePresence } from "motion/react";
import LabelsGroupToggleBtn from "./labels-group-toggle-btn";
import LabelsGroupList from "./labels-group-list";
import { useNotesStore } from "@/lib/store/useNotesStore";

interface LabelsGroupProps {
  menuIsOpen: boolean;
}

export default function LabelsGroup({ menuIsOpen }: LabelsGroupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const labels = useNotesStore((s) => s.labels);
  const isHydratedLabel = useNotesStore((s) => s.isHydratedLabel);

  if (!isHydratedLabel) return <LabelsIconSkeleton />;
  if (!labels || labels.length < 1) return null;

  const toggleIsOpen = () => setIsOpen((p) => !p);

  return (
    <>
      <motion.div animate={{ width: menuIsOpen ? 240 : 73 }}>
        <div className="px-4">
          <LabelsGroupToggleBtn
            isOpen={isOpen}
            toggleIsOpen={toggleIsOpen}
            menuIsOpen={menuIsOpen}
          />
        </div>
        <AnimatePresence mode="wait">
          {isOpen ? (
            <LabelsGroupList labels={labels} menuIsOpen={menuIsOpen} />
          ) : null}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
