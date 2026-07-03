"use client";

import React, { Activity, useState, useTransition } from "react";
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
import { CreateNoteSkeleton } from "../UI/skeletons";

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

  if (sessionIsPending) return <CreateNoteSkeleton />;

  if (!sessionData) return null;
  const userId = sessionData.session.userId;

  const closeForm = () => {
    setFormIsOpen(false);
    setNote((n) => ({ ...n, type: "TEXT", isPinned: false }));
  };

  const clearForm = () => {
    setNote((n) => ({ ...n, title: "", content: [] }));
  };

  const submit = () => {
    if (!note.title && !note.content.some((el) => el.content.length > 0))
      return;
    addNote(
      {
        ...note,
        content: note.content.map((item) => ({
          content: item.content,
          isDone: item.isDone,
        })),
      },
      userId,
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
    if (note.type === "TEXT" && !formIsOpen) {
      setNote((n) => ({ ...n, type: "TODO" }));
      setFormIsOpen(true);
    } else if (note.type === "TEXT" && formIsOpen) {
      setNote((n) => ({ ...n, type: "TODO" }));
    } else {
      setNote((n) => ({ ...n, type: "TEXT" }));
    }

    containerRef.current?.focus();
  };

  return (
    <>
      <motion.div
        ref={containerRef}
        tabIndex={-1}
        onFocus={handleFocus}
        onBlur={handleBlur}
        animate={{ padding: formIsOpen ? "32px 0" : "16px 0" }}
        // animate={{ padding: formIsOpen ? "32px 0" : "12.5px 0" }}
        // className="bg-secondary relative w-full sm:max-w-150 rounded-4xl shadow-outside-small outline-none select-none"
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
              animate={{ opacity: 1, height: "auto", marginBottom: "16px" }}
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
                  formIsOpen={formIsOpen}
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
                      height: "auto",
                      marginBottom: "16px",
                    }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className="px-4 md:px-8"
                  >
                    <FormInput
                      type="text"
                      name="title"
                      value={note.title}
                      onChange={(e) =>
                        setNote((n) => ({ ...n, title: e.target.value }))
                      }
                      placeholder="Title..."
                      className="text-txt-primary bg-primary"
                    />
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
                    className={cn("flex items-center gap-2 overflow-hidden", {
                      "px-4": !formIsOpen,
                      "px-4 md:px-8": formIsOpen,
                    })}
                  >
                    <CreateNoteTextarea
                      content={note.content}
                      setNote={setNote}
                      formIsOpen={formIsOpen}
                    />
                    {!formIsOpen ? (
                      <button
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
                  animate={{ opacity: 1, height: "auto", marginTop: "16px" }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="px-4 md:px-8"
                >
                  <FormButton isLoading={isPending}>
                    {formIsOpen ? <Plus size={20} className="" /> : null}
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
