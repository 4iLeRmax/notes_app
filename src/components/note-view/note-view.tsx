"use client";

import { useNotesStore } from "@/lib/store/useNotesStore";
import React, { useEffect, useRef } from "react";
import { CloseModalOnNotFound } from "../UI/dialog";
import BaseModal from "../UI/base-modal";
import NoteViewBody from "./note-view-body";
import BackButton from "../UI/back-button";
import { ArrowLeft } from "lucide-react";
import { NoteViewSkeleton } from "../UI/skeletons";

interface NoteViewProps {
  noteId: string;
  modal?: boolean;
}

export default function NoteView({ noteId, modal }: NoteViewProps) {
  const notes = useNotesStore((s) => s.notes);
  const note = notes.find((n) => n.id === noteId);
  const isHydratedNote = useNotesStore((s) => s.isHydratedNote);

  if (!isHydratedNote) return <NoteViewSkeleton />;
  if (notes.length > 0 && !note) window.location.href = "/notes";

  return (
    <>
      {note ? (
        modal ? (
          <>
            {/* <CloseModalOnNotFound noteExists={!!note} /> */}
            <BaseModal>
              <NoteViewBody note={note} fixedOptions scrollableContent />
            </BaseModal>
          </>
        ) : (
          <div className="w-full flex items-center justify-center">
            <NoteViewBody
              note={note}
              headerSlot={
                <BackButton className="p-2 shadow-outside-small rounded-3xl bg-primary text-txt-secondary">
                  <ArrowLeft size={25} />
                </BackButton>
              }
            />
          </div>
        )
      ) : null}
    </>
  );
}
