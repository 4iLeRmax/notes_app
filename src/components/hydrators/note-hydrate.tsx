"use client";

import { getNotes } from "@/lib/actions/note";
import { authClient } from "@/lib/auth-client";
import { useNotesStore } from "@/lib/store/useNotesStore";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

export default function NoteHydrate() {
  const setNotes = useNotesStore((s) => s.setNotes);
  const session = authClient.useSession();
  const userId = session.data?.user.id;

  const { data: notes } = useQuery({
    queryKey: ["notes", userId],
    queryFn: async () => await getNotes(),
    staleTime: 0,
    gcTime: 0,
  });

  useEffect(() => {
    if (notes) setNotes(notes);
  }, [notes, setNotes]);

  return null;
}
