import React from "react";

interface NoteOptionsListItemProps {
  children: React.ReactNode;
  onClick: () => void;
  icon?: React.ReactNode;
}

export default function NoteOptionsListItem({
  children,
  onClick,
  icon,
}: NoteOptionsListItemProps) {
  return (
    <>
      <button
        onClick={onClick}
        className="w-full hover:bg-custom-blue text-txt-primary hover:text-primary px-4 py-2 flex items-center gap-2"
      >
        {icon ? icon : null}
        {children}
      </button>
    </>
  );
}
