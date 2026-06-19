import { getAllNotes } from "@/lib/actions/note";
import React from "react";
import NotesHydratorClient from "./note-hydrate-client";

export default async function NoteHydrate() {
  console.log("hydrate notes");
  try {
    const notes = await getAllNotes();

    return <NotesHydratorClient notes={notes ?? []} />;
  } catch {
    return <NotesHydratorClient notes={[]} />;
  }
}
