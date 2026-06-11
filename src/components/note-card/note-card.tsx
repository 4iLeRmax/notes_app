"use client";

import Link from "next/link";

import NoteOptions from "./note-card-options/note-options";
import NoteCardLabels from "./note-card-labels";
import NoteCardHeader from "./note-card-header";
import NoteCardMain from "./note-card-main";
import LastUpdate from "@/components/note-view/note-view-last-update";
import SelectNote from "./select-note";
import { useState } from "react";
import BaseModal from "../UI/base-modal";
import NoteViewBody from "../note-view/note-view-body";
import BackButton from "../UI/back-button";
import { ArrowLeft } from "lucide-react";

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <SelectNote note={note}>
        <div className="relative rounded-xl sm:rounded-3xl w-full select-none">
          {/* <Link href={`/notes/${note.id}`}> */}
          <div onClick={() => setIsOpen(true)}>
            <div className="px-2 sm:px-4 pt-3">
              <NoteCardHeader
                noteId={note.id}
                title={note.title}
                isPinned={note.isPinned}
              />
            </div>

            <div className="mt-3 px-2 sm:px-4 text-sm sm:text-base">
              <NoteCardMain noteType={note.type} noteContent={note.content} />
            </div>
            <div className="mt-4 px-2 sm:px-4 pb-5">
              <NoteCardLabels
                noteId={note.id}
                noteLabels={note.labels}
                maxLength={3}
              />
            </div>
            <div className="px-4 pb-3">
              <LastUpdate note={note} />
            </div>
          </div>

          <div className="absolute bottom-0 right-0 pb-3 px-2 sm:px-4">
            <NoteOptions noteId={note.id} />
          </div>
        </div>
      </SelectNote>
      {isOpen ? (
        <BaseModal customClose={() => setIsOpen(false)}>
          <NoteViewBody
            note={note}
            fixedOptions
            scrollableContent
            headerSlot={
              <BackButton
                onClick={() => setIsOpen(false)}
                className="p-2 shadow-outside-small rounded-3xl bg-primary text-txt-secondary"
              >
                <ArrowLeft size={25} />
              </BackButton>
            }
          />
        </BaseModal>
      ) : null}
    </>
  );
}
