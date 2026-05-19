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
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        exit={{ opacity: 0, x: 20 }}
        className="flex items-center justify-between gap-2  px-4 py-2 rounded-3xl bg-secondary shadow-outside-small text-txt-primary"
      >
        <LabelLinkBtn labelId={label.id} />
        <EditLabelForm labelId={label.id} labelName={label.name} />
        <DeleteLabelBtn labelId={label.id} />
      </motion.div>
    </>
  );
}
