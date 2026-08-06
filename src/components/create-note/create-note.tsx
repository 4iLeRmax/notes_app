"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import CreateNoteTextarea from "./create-note-textarea";
import ToggleNoteTypeButton from "./toggle-note-type-button";
import CreateNoteList from "./create-note-list";
import CreateNotePinButton from "./create-note-pin-button";

import FormInput from "../UI/formElements/form-input";
import FormButton from "../UI/formElements/form-button";
import { Plus } from "lucide-react";
import { useNotesStore } from "@/lib/store/useNotesStore";
import { TCreateNote } from "@/lib/zod-schemes/note-schemes/create-note.scheme";
import { authClient } from "@/lib/auth-client";
import useViewModeStore, { ViewMode } from "@/lib/store/useViewModeStore";
import cn from "@/lib/cn";
import { NOTE_LIMITS } from "@/lib/constants";
import CreateNoteTitle from "./create-note-title";
import { toast } from "../UI/toast";

export type CreateLocalNote = Omit<TCreateNote, "content"> & {
  content: ({
    id: string;
    position: number;
  } & TCreateNote["content"][number])[];
};

export default function CreateNote() {
  const [formIsOpen, setFormIsOpen] = useState(false);
  const viewMode = useViewModeStore((s) => s.viewMode);

  const addNote = useNotesStore((s) => s.addNote);
  const isPending = useNotesStore((s) => s.isPending);

  const { data: sessionData, isPending: sessionIsPending } =
    authClient.useSession();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [note, setNote] = useState<CreateLocalNote>({
    title: "",
    content: [],
    type: "TEXT",
    isPinned: false,
  });

  // if (sessionIsPending) return <CreateNoteSkeleton />;

  const closeForm = () => {
    setFormIsOpen(false);
    setNote((n) => ({ ...n, type: "TEXT", isPinned: false }));
  };

  const clearForm = () => {
    setNote((n) => ({ ...n, title: "", content: [] }));
  };

  const submit = () => {
    if (!sessionData) return;
    if (!note.title.trim() && !note.content.some((el) => !!el.content.trim()))
      return;
    addNote(
      {
        ...note,
        content: note.content.map((item) => ({
          content: item.content,
          isDone: item.isDone,
        })),
      },
      sessionData.session.userId,
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
    clearForm();
    closeForm();
  };

  const handleFocus = () => {
    setFormIsOpen(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.relatedTarget as Node)
    ) {
      submit();
      clearForm();
      closeForm();
    }
  };

  const toggleNoteType = () => {
    if (note.type === "TEXT") {
      if (
        !note.content.every(
          (el) => el.content.length <= NOTE_LIMITS.TODO.maxCharsPerItem,
        )
      ) {
        toast.warning("Can't convert into list format", "Content is too long");
        return;
      }
      setNote((n) => ({ ...n, type: "TODO" }));
    } else if (note.type === "TODO") {
      setNote((n) => ({ ...n, type: "TEXT" }));
    }

    containerRef.current?.focus();
  };

  return (
    <>
      <motion.div
        ref={containerRef}
        tabIndex={-1}
        data-testid="create-note-container"
        initial={false}
        animate={{
          padding: formIsOpen ? "32px 0" : "12.5px 0",
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cn(
          "bg-secondary relative w-full rounded-4xl shadow-outside-small outline-none select-none",
          {
            "sm:max-w-120": viewMode === ViewMode.GRID,
            "sm:max-w-150": viewMode === ViewMode.LIST,
          },
        )}
      >
        <AnimatePresence mode="sync" initial={false}>
          {formIsOpen ? (
            <motion.div
              key="header"
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "36px", marginBottom: "16px" }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="flex items-center justify-between px-4 md:px-8"
            >
              <h1 className="text-txt-secondary font-bold text-xl">
                Create note
              </h1>
              <div className="flex items-center gap-4">
                <ToggleNoteTypeButton
                  noteType={note.type}
                  toggleNoteType={toggleNoteType}
                />

                <CreateNotePinButton
                  isPinned={note.isPinned}
                  togglePin={() =>
                    setNote((n) => ({ ...n, isPinned: !n.isPinned }))
                  }
                />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex flex-col text-txt-secondary">
              <AnimatePresence mode="sync" initial={false}>
                {formIsOpen ? (
                  <motion.div
                    key="title-input"
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{
                      opacity: 1,
                      height: "48px",
                      marginBottom: "16px",
                    }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className="px-4 md:px-8"
                  >
                    <CreateNoteTitle noteTitle={note.title} setNote={setNote} />
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <AnimatePresence mode="sync" initial={false}>
                {note.type === "TEXT" ? (
                  <motion.div
                    key="textarea"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                    }}
                    exit={{ opacity: 0, height: 0 }}
                    className={cn("flex items-center gap-2", {
                      "px-4": !formIsOpen,
                      "px-4 md:px-8": formIsOpen,
                    })}
                  >
                    <CreateNoteTextarea
                      content={note.content}
                      setNote={setNote}
                    />
                    {!formIsOpen ? (
                      <button
                        aria-label="Open note form"
                        onMouseDown={() => containerRef.current?.focus()}
                        className={cn(
                          "p-2 rounded-full bg-primary shrink-0",
                          "shadow-outside-small text-txt-primary hover:text-custom-blue",
                        )}
                      >
                        <Plus size={20} />
                      </button>
                    ) : null}
                  </motion.div>
                ) : (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <CreateNoteList content={note.content} setNote={setNote} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence mode="sync" initial={false}>
              {formIsOpen ? (
                <motion.div
                  key="submit-btn"
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "48px", marginTop: "16px" }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="px-4 md:px-8"
                >
                  <FormButton isLoading={isPending}>
                    <Plus size={20} />
                    <span>Create</span>
                  </FormButton>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </form>
        </div>
      </motion.div>
    </>
  );
}
