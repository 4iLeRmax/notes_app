"use client";

import React, { useState } from "react";
import NoteViewListDisplay from "./note-view-list-display";
import NoteViewCreateItemBtn from "./note-view-create-item-btn";
import { useNotesStore } from "@/lib/store/useNotesStore";

interface NoteViewListProps {
  noteId: string;
  list: NoteItem[];
}

export default function NoteViewList({ noteId, list }: NoteViewListProps) {
  const addNoteItem = useNotesStore((s) => s.addNoteItem);

  const handleCreateItem = async () => {
    await addNoteItem(noteId);
  };

  return (
    <>
      <NoteViewListDisplay noteId={noteId} list={list} />
      <NoteViewCreateItemBtn
        listLength={list.length}
        handleCreateItem={handleCreateItem}
      />
    </>
  );
}
