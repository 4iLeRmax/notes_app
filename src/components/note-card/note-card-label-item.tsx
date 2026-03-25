"use client";

import { removeLabelFromNote } from "@/lib/actions/label";
import clsx from "clsx";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface NoteCardLabelItemProps {
  label: Label;
  noteId: string;
}

export default function NoteCardLabelItem({
  label,
  noteId,
}: NoteCardLabelItemProps) {
  const [showButton, setShowButton] = useState(false);

  const router = useRouter();

  const handleLink = (e: React.MouseEvent) => {
    e.preventDefault();

    router.push(`/labels/${label.id}`);
  };

  return (
    <>
      <div
        onClick={handleLink}
        onMouseEnter={() => setShowButton(true)}
        onMouseLeave={() => setShowButton(false)}
        className="relative flex items-center min-w-12 max-w-full shadow-inside text-sm py-1 rounded-3xl cursor-pointer text-txt-primary"
      >
        <span
          className={clsx("truncate pl-2 w-full", {
            "pr-5": !showButton,
          })}
        >
          {label.name}
        </span>
        <form
          key={label.id}
          action={removeLabelFromNote.bind(null, noteId, label.id)}
          className="flex items-center"
        >
          {showButton ? (
            <button
              className="p-1 outline-none text-txt-secondary"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <X size={12} />
            </button>
          ) : null}
        </form>
      </div>
    </>
  );
}
