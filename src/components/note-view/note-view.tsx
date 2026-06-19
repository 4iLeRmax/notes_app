"use client";

import React from "react";
import NoteOptions from "../note-card/note-card-options/note-options";
import NoteViewLastUpdate from "./note-view-last-update";
import NoteViewContent from "./note-view-content";
import NoteViewTitleForm from "./note-view-title-form";
import NoteCardLabels from "../note-card/note-card-labels";
import { LABEL_LIMITS } from "@/lib/constants";
import BackButton from "../UI/back-button";
import { ArrowLeft } from "lucide-react";
import { vibrate } from "@/lib/haptics";

interface NoteViewProps {
  note: Note;
  handleBack: () => void;
}

export default function NoteView({ note, handleBack }: NoteViewProps) {
  return (
    <>
      <div className="w-full md:w-150 h-dvh xs:h-auto bg-secondary shadow-outside-small rounded-none xs:rounded-4xl flex flex-col xs:pt-12">
        <div className="flex items-center gap-2 xs:gap-4 py-4 xs:py-0 px-4 sm:px-8 shrink-0 shadow-outside-small xs:shadow-none rounded-es-3xl rounded-ee-3xl bg-primary xs:bg-transparent">
          <BackButton
            onClick={() => {
              vibrate(10);
              handleBack();
            }}
            className="flex xs:hidden p-2 shadow-outside-small rounded-3xl bg-secondary text-txt-secondary"
          >
            <ArrowLeft size={25} />
          </BackButton>
          <div className="w-full">
            <NoteViewTitleForm title={note.title} noteId={note.id} />
          </div>
        </div>

        <div className="flex-1 xs:flex-auto xs:h-full xs:max-h-[calc(100vh*1/2)] overflow-y-scroll snap-y snap-mandatory">
          <NoteViewContent note={note} />
        </div>

        <div className="pt-5 px-4 sm:px-8 flex flex-col gap-2 pb-4 shrink-0 shadow-outside-small xs:shadow-none rounded-ss-3xl rounded-se-3xl bg-primary xs:bg-transparent">
          <NoteCardLabels
            noteId={note.id}
            noteLabels={note.labels}
            maxLength={LABEL_LIMITS.MAX_LABELS_PER_NOTE}
          />
          <div className="flex items-center justify-between gap-4">
            <NoteViewLastUpdate note={note} />
            <NoteOptions noteId={note.id} fixed />
          </div>
        </div>
      </div>
    </>
  );
}
