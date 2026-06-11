"use client";

import React from "react";
import CreateNoteListItem from "./create-note-list-item";
import CreateNoteItemBtn from "./create-note-item-btn";
import { AnimatePresence, motion } from "motion/react";
import { TCreateNote } from "@/lib/zod-schemes/note-schemes/create-note.scheme";
import { CreateLocalNote } from "./create-note";

interface CreateNoteListProps {
  content: CreateLocalNote["content"];
  setNote: React.Dispatch<React.SetStateAction<CreateLocalNote>>;
}

export default function CreateNoteList({
  content,
  setNote,
}: CreateNoteListProps) {
  const listRef = React.useRef<HTMLDivElement>(null);

  const handleChangeItem = (targetValue: string, itemIndex: number) => {
    setNote((n) => ({
      ...n,
      content: n.content.map((item) =>
        item.index === itemIndex ? { ...item, content: targetValue } : item,
      ),
    }));
  };

  const addNewItem = (createAtPosition?: number) => {
    setNote((n) => {
      const newItem = {
        index: createAtPosition ?? n.content.length,
        content: "",
        isDone: false,
      };

      return {
        ...n,
        content: [
          ...n.content.map((el) =>
            el.index >= newItem.index ? { ...el, index: el.index + 1 } : el,
          ),
          newItem,
        ].sort((a, b) => a.index - b.index),
      };
    });
  };

  const removeItem = (itemIndex: number) => {
    const isLast = content.length === 1;
    setNote((n) => ({
      ...n,
      content: n.content
        .filter((item) => item.index !== itemIndex)
        .sort((a, b) => a.index - b.index)
        .map((item, i) => ({ ...item, index: i })),
    }));
    if (isLast) listRef.current?.focus();
  };

  const toggleItemStatus = (itemIndex: number) => {
    setNote((n) => ({
      ...n,
      content: n.content.map((item) =>
        item.index === itemIndex ? { ...item, isDone: !item.isDone } : item,
      ),
    }));
  };
  return (
    <>
      <div className="flex flex-col py-2">
        <div
          className="flex flex-col gap-3 text-txt-primary overflow-y-scroll max-h-[50vh] px-4 md:px-8 py-2 outline-none"
          tabIndex={0}
          ref={listRef}
        >
          <AnimatePresence initial={false}>
            {content.length > 0
              ? content.map((item) => (
                  <motion.div
                    key={item.index}
                    initial={{ opacity: 0, x: -20, height: 0 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      height: "auto",
                    }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <CreateNoteListItem
                      item={item}
                      addNewItem={addNewItem}
                      removeItem={removeItem}
                      handleChangeItem={handleChangeItem}
                      toggleItemStatus={toggleItemStatus}
                      listRef={listRef}
                    />
                  </motion.div>
                ))
              : null}
          </AnimatePresence>
        </div>

        <div className="px-4 md:px-8">
          <CreateNoteItemBtn
            listRef={listRef}
            addNewItem={addNewItem}
            valueLength={content.length}
          />
        </div>
      </div>
    </>
  );
}
