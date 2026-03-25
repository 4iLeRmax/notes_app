"use client";

import React from "react";
import EditLabelItem from "./edit-label-item";

interface EditListLabelsProps {
  labels: Label[];
  searchValue: string;
}

export default function EditListLabels({
  labels,
  searchValue,
}: EditListLabelsProps) {
  const sortedLabels = labels.filter((label) =>
    label.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  if (labels.length < 1)
    return (
      <div className="text-txt-primary mt-4 px-8 flex items-center justify-center">
        Create your first label
      </div>
    );

  return (
    <>
      <div className="flex flex-col gap-4 overflow-y-scroll max-h-[calc(3/5*100vh)] mt-4 py-4 px-8">
        {sortedLabels.map((label) => (
          <EditLabelItem label={label} key={label.id} />
        ))}
      </div>
    </>
  );
}
