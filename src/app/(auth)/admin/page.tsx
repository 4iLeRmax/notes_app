"use client";

import { createNote, getAllNotes } from "@/lib/actions/note";
import { TCreateNote } from "@/lib/zod-schemes/create-note.scheme";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { startTransition, useOptimistic, useState } from "react";

export default function AdminPage() {
  const { data: notes } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => await getAllNotes(),
  });

  const queryClient = useQueryClient();

  const [note, setNote] = useState<TCreateNote>({
    title: "",
    content: [],
    type: "TEXT",
    isPinned: false,
  });

  const [optimisticNotes, createOptimisticNotes] = useOptimistic(
    notes ?? [],
    (state, newNote: Note) => [newNote, ...state],
  );
  if (!notes) return null;

  const contentToText = note.content.map((el) => el.content).join("\n");
  const textToObj = (text: string) => {
    const content = text
      .split("\n")
      .map((el) => ({ content: el, isDone: false }));

    setNote((n) => ({ ...n, content }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tempNote: Note = {
      ...note,
      id: `temp-${crypto.randomUUID()}`, // temporary ID
      userId: "optimistic",
      color: null,
      labels: [],
      content: note.content.map((el, i) => ({
        ...el,
        id: `temp-${i}`,
        noteId: "temp",
        position: i,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    startTransition(async () => {
      createOptimisticNotes(tempNote);
      await createNote(note);
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
    });
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-center">
          <form
            onSubmit={onSubmit}
            className="w-100 flex flex-col gap-2 p-4 shadow-outside-small rounded-4xl "
          >
            <input
              type="text"
              placeholder="Title..."
              value={note.title}
              onChange={(e) =>
                setNote((p) => ({ ...p, title: e.target.value }))
              }
            />
            <textarea
              placeholder="Text..."
              value={contentToText}
              onChange={(e) => textToObj(e.target.value)}
            />
            <button>Create</button>
          </form>
        </div>
        <div className="flex gap-2 items-center justify-center flex-wrap">
          {optimisticNotes.map((note) => (
            <div
              key={note.id}
              className="flex flex-col gap-2 p-4 rounded-4xl shadow-outside-small"
            >
              <p>{note.id.slice(0, 10)}</p>
              <h1 className="font-bold">{note.title}</h1>
              <p>{note.content.map((item) => item.content).join("\n")}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
