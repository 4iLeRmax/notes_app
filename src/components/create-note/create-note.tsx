"use client";

import { createNote } from "@/lib/actions/note";
import clsx from "clsx";
import React, { useState } from "react";
import FormInput from "../UI/formElements/form-input";
import cn from "@/lib/cn";
import CreateNoteTextarea from "./create-note-textarea";
import ToggleNoteTypeButton from "./toggle-note-type-button";
import CreateNoteList from "./create-note-list";
import { Plus } from "lucide-react";
import CreateNotePinButton from "./create-note-pin-button";

export default function CreateNote() {
  const [titleValue, setTitleValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [noteType, setNoteType] = useState<NoteType>("TEXT");
  const [isPinned, setIsPinned] = useState(false);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleSubmit = async (formData: FormData) => {
    await createNote(noteType, isPinned, formData);
    setTitleValue("");
    setContentValue("");
    setIsPinned(false);
    setNoteType("TEXT");
    setFormIsOpen(false);
  };

  const handleFocus = () => {
    setFormIsOpen(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.relatedTarget as Node)
    ) {
      setFormIsOpen(false);
      setNoteType("TEXT");
      setIsPinned(false);
    }
  };

  const toggleNoteType = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (noteType === "TEXT" && !formIsOpen) {
      setNoteType("TODO");
      setFormIsOpen(true);
    } else if (noteType === "TEXT" && formIsOpen) {
      setNoteType("TODO");
    } else {
      setNoteType("TEXT");
    }

    containerRef.current?.focus();
  };
  // interface SearchResult {
  //   element: Element;
  //   matchedText: string;
  // }
  // function findElementsWithText(
  //   searchText: string,
  //   container: Element = document.body,
  // ): SearchResult[] {
  //   const results: SearchResult[] = [];
  //   const searchLower = searchText.toLowerCase();

  //   function traverse(node: Node) {
  //     if (node.nodeType === Node.TEXT_NODE) {
  //       const text = node.textContent?.toLowerCase() || "";
  //       if (text.includes(searchLower)) {
  //         const parent = node.parentElement;
  //         if (parent && !results.find((r) => r.element === parent)) {
  //           results.push({
  //             element: parent,
  //             matchedText: node.textContent || "",
  //           });
  //         }
  //       }
  //     } else if (node.nodeType === Node.ELEMENT_NODE) {
  //       node.childNodes.forEach(traverse);
  //     }
  //   }

  //   traverse(container);
  //   return results;
  // }

  // function highlightMatches(
  //   results: SearchResult[],
  //   className: string = "bg-yellow-200",
  // ): void {
  //   results.forEach(({ element }) => {
  //     element.classList.add(className);
  //   });
  // }

  // highlightMatches(
  //   findElementsWithText(
  //     "1",
  //     document.querySelector(".search_block") as Element,
  //   ),
  // );

  return (
    <>
      <div
        ref={containerRef}
        tabIndex={-1}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cn(
          "bg-primary relative w-full sm:w-2/3 max-w-120 rounded-4xl shadow-outside-small outline-none",
          {
            "py-4": !formIsOpen,
            "py-8": formIsOpen,
          },
        )}
      >
        {formIsOpen ? (
          <div className="flex items-center justify-between px-8 mb-5">
            <h1 className="text-txt-secondary font-bold text-xl">
              Create New Note
            </h1>
            <CreateNotePinButton
              isPinned={isPinned}
              togglePin={() => setIsPinned((p) => !p)}
            />
          </div>
        ) : null}
        <div>
          <form action={handleSubmit} className={clsx("flex flex-col", {})}>
            <div
              className={cn("flex gap-4 text-txt-secondary", {
                "": !formIsOpen,
                "flex-col": formIsOpen,
              })}
            >
              {formIsOpen ? (
                <div className="px-8">
                  <FormInput
                    type="text"
                    name="title"
                    value={titleValue}
                    onChange={(e) => setTitleValue(e.target.value)}
                    placeholder="Title..."
                    className="rounded-2xl text-txt-primary"
                  />
                </div>
              ) : null}

              {noteType === "TEXT" ? (
                <CreateNoteTextarea
                  value={contentValue}
                  handleChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setContentValue(e.target.value)
                  }
                  formIsOpen={formIsOpen}
                />
              ) : (
                <CreateNoteList
                  value={contentValue}
                  setContentValue={setContentValue}
                />
              )}

              <ToggleNoteTypeButton
                noteType={noteType}
                toggleNoteType={(e) => toggleNoteType(e)}
                formIsOpen={formIsOpen}
              />
            </div>
            {formIsOpen ? (
              <div className="px-8">
                <button className="w-full flex items-center justify-center gap-1 bg-custom-blue text-primary py-2 rounded-2xl mt-5">
                  {formIsOpen ? <Plus size={20} className="" /> : null}
                  <span>Create</span>
                </button>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </>
  );
}
