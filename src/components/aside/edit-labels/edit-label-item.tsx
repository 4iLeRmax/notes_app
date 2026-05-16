"use client";

import EditLabelForm from "./edit-label-form";
import DeleteLabelBtn from "./UI/delete-label-btn";
import LabelLinkBtn from "./UI/label-link-btn";
import { motion } from "motion/react";
interface EditLabelItemProps {
  label: Label;
}

export default function EditLabelItem({ label }: EditLabelItemProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        exit={{ opacity: 0, x: 20 }}
        className="flex items-center justify-between px-4 py-2 rounded-3xl bg-secondary shadow-outside-small text-txt-primary"
      >
        <EditLabelForm labelId={label.id} labelName={label.name} />
        <div className="flex items-center gap-2">
          <LabelLinkBtn labelId={label.id} />
          <DeleteLabelBtn labelId={label.id} />
        </div>
      </motion.div>
    </>
  );
}
