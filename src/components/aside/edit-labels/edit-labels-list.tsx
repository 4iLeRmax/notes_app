"use client";

import React from "react";
import EditLabelItem from "./edit-label-item";
import { motion, AnimatePresence } from "motion/react";

interface EditLabelsListProps {
  labels: Label[];
}

export default function EditLabelsList({ labels }: EditLabelsListProps) {
  if (labels.length < 1)
    return (
      <div className="text-txt-primary mt-4 px-4 sm:px-8 flex items-center justify-center">
        Create your first label
      </div>
    );

  return (
    <>
      {/* <motion.div className="flex flex-col gap-4 overflow-y-scroll max-h-[calc(3/5*100vh)] mt-4 py-4 px-4 sm:px-8"> */}
      <motion.div className="flex flex-col xs:flex-auto flex-1 min-h-0 xs:max-h-[calc(100dvh*1/2)] overflow-y-scroll pl-4 pr-2 sm:pl-8 sm:pr-6 snap-y snap-mandatory">
        <AnimatePresence mode="popLayout">
          {labels.map((label) => (
            <EditLabelItem label={label} key={label.id} />
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
