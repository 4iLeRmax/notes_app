import { getAllNotes } from "@/lib/actions/note";
import React from "react";
import NotesHydratorClient from "./note-hydrate-client";

export default async function NoteHydrate() {
  const notes = await getAllNotes();

  return <NotesHydratorClient notes={notes ?? []} />;
}
