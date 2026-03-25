import cn from "@/lib/cn";
import { Pencil } from "lucide-react";
import React from "react";

interface EditLabelsBtnProps {
  menuIsOpen: boolean;
  modalIsOpen: boolean;
  toggleModalOpen: () => void;
}

export default function EditLabelsBtn({
  menuIsOpen,
  modalIsOpen,
  toggleModalOpen,
}: EditLabelsBtnProps) {
  return (
    <>
      <button
        className={cn("h-[41px] flex items-center gap-2 rounded-3xl", {
          "w-[41px] justify-center": !menuIsOpen,
          "w-52 justify-start p-2": menuIsOpen,
          "shadow-outside_small": !modalIsOpen,
          "shadow-inside": modalIsOpen,
        })}
        onClick={toggleModalOpen}
      >
        <Pencil size={25} className="shrink-0" />
        {menuIsOpen ? <span>Edit Labels</span> : null}
      </button>
    </>
  );
}
