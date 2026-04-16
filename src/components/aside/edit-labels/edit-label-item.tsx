"use client";

import EditLabelForm from "./edit-label-form";
import DeleteLabelBtn from "./UI/delete-label-btn";

interface EditLabelItemProps {
  label: Label;
}

export default function EditLabelItem({ label }: EditLabelItemProps) {
  return (
    <>
      <div className="flex items-center justify-between gap-2 px-4 py-2 rounded-3xl shadow-outside-small text-txt-primary">
        <EditLabelForm labelId={label.id} labelName={label.name} />
        <DeleteLabelBtn labelId={label.id} />
      </div>
    </>
  );
}
