"use client";

import cn from "@/lib/cn";
import { Plus, Square, X } from "lucide-react";
import React from "react";
import CreateNoteListItem from "./create-note-list-item";
import CreateNoteCreateItemBtn from "./create-note-create-item-btn";
import { TCreateNote } from "@/lib/zod-schemes/create-note.scheme";
import { AnimatePresence, motion } from "motion/react";

interface CreateNoteListProps {
  content: {
    content: string;
    isDone: boolean;
  }[];
  setNote: React.Dispatch<React.SetStateAction<TCreateNote>>;
}

export default function CreateNoteList({
  content,
  setNote,
}: CreateNoteListProps) {
  const listRef = React.useRef<HTMLDivElement>(null);

  const handleChangeItem = (targetValue: string, rowId: number) => {
    setNote((n) => ({
      ...n,
      content: n.content.map((el, i) =>
        i === rowId ? { ...el, content: targetValue } : el,
      ),
    }));
  };

  const addNewItem = async () => {
    await setNote((n) => ({
      ...n,
      content: [...n.content, { content: "", isDone: false }],
    }));
    const listItem = listRef.current?.lastChild?.childNodes[0]
      .childNodes[1] as HTMLTextAreaElement;
    console.log();
    if (listItem) {
      listItem.focus();
    }
  };

  const removeItem = (rowId: number) => {
    setNote((n) => ({
      ...n,
      content: n.content.filter((_, i) => i !== rowId),
    }));
  };

  const toggleItemStatus = (rowId: number) => {
    setNote((n) => ({
      ...n,
      content: n.content.map((el, i) =>
        i === rowId ? { ...el, isDone: !el.isDone } : el,
      ),
    }));
  };

  return (
    <>
      <div className="flex flex-col py-2">
        <div
          className="flex flex-col gap-3 text-txt-primary overflow-y-scroll max-h-[50vh] px-4 md:px-8 py-2"
          ref={listRef}
        >
          <AnimatePresence initial={false}>
            {content.length > 0
              ? content.map((item, id) => (
                  <motion.div
                    key={id}
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
                      // key={id}
                      itemId={id}
                      item={item}
                      removeItem={removeItem}
                      handleChangeItem={handleChangeItem}
                      toggleItemStatus={toggleItemStatus}
                    />
                  </motion.div>
                ))
              : null}
          </AnimatePresence>
        </div>

        <div className="px-4 md:px-8">
          <CreateNoteCreateItemBtn
            addNewItem={addNewItem}
            valueLength={content.length}
          />
        </div>
      </div>
    </>
  );
}
