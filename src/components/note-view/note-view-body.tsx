"use client";

import React from "react";
import NoteOptions from "../note-card/note-card-options/note-options";
import NoteViewLastUpdate from "./note-view-last-update";
import NoteViewContent from "./note-view-content";
import cn from "@/lib/cn";
import NoteViewTitleForm from "./note-view-title-form";
import { redirect } from "next/navigation";

interface NoteViewProps {
  note: Note;
  fixedOptions?: boolean;
  scrollableContent?: boolean;
  headerSlot?: React.ReactNode;
}

export default function NoteViewBody({
  note,
  fixedOptions,
  scrollableContent,
  headerSlot,
}: NoteViewProps) {
  return (
    <>
      <div className="w-full md:w-150 h-screen sm:h-auto bg-secondary shadow-outside-small rounded-4xl pt-15 pb-4">
        <div className="flex items-center gap-4 px-4 sm:px-8">
          {headerSlot}
          <div className="w-full">
            <NoteViewTitleForm title={note.title} noteId={note.id} />
          </div>
        </div>

        <div
          className={cn("pl-4 pr-2 sm:pl-8 sm:pr-6 mt-5", {
            "max-h-[calc(3/5*100vh)] overflow-y-scroll py-1":
              !!scrollableContent,
          })}
        >
          <NoteViewContent note={note} />
        </div>

        <div className="flex items-center gap-4 mt-2 px-4 sm:px-8">
          <div className="w-full flex justify-start">
            <NoteViewLastUpdate note={note} />
          </div>
          <NoteOptions noteId={note.id} fixed={fixedOptions} />
        </div>
      </div>
    </>
  );
}
