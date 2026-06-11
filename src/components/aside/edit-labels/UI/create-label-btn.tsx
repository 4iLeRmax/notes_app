"use client";

import cn from "@/lib/cn";

interface CreateLabelBtnProps {
  onClick: () => Promise<void>;
  disabled?: boolean;
}

export default function CreateLabelBtn({
  onClick,
  disabled = false,
}: CreateLabelBtnProps) {
  return (
    <>
      <button
        type="button"
        onClick={disabled ? () => {} : () => onClick()}
        // disabled={disabled}
        className={cn(
          "bg-custom-blue text-primary py-2 rounded-2xl wrap-break-word flex items-center justify-center",
          // "disabled:bg-custom-blue/40 disabled:cursor-default!",
          {
            "bg-custom-blue/40 cursor-default!": disabled,
          },
        )}
      >
        Create Label
      </button>
    </>
  );
}
