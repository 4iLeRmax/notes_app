import React from "react";

export default function NoteOptionsListItem({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <>
      <button
        onClick={onClick}
        className="w-full hover:bg-custom-blue text-txt-primary hover:text-primary px-4 py-2 flex"
      >
        {children}
      </button>
    </>
  );
}
