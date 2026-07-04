"use client";

import React from "react";
import { useNotesStore } from "@/lib/store/useNotesStore";
import NoteColorsDesktop from "./note-colors-desktop";
import NoteColorsMobile from "./note-colors-mobile";

interface NoteColorsModalProps {
  note: Note;
  modalXPosition: "left" | "right";
}

export default function NoteColorsModal({
  note,
  modalXPosition,
}: NoteColorsModalProps) {
  const addColor = useNotesStore((s) => s.addColor);

  const handleChangeColor = async (newColor: Note["color"]) => {
    await addColor(note.id, newColor);
  };

  return (
    <>
      <NoteColorsMobile
        noteColor={note.color}
        onChangeColor={handleChangeColor}
      />
      <NoteColorsDesktop
        noteColor={note.color}
        onChangeColor={handleChangeColor}
        modalXPosition={modalXPosition}
      />
    </>
  );
}
