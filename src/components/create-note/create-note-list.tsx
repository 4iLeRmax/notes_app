"use client";

import React from "react";
import CreateNoteListItem from "./create-note-list-item";
import CreateNoteItemBtn from "./create-note-item-btn";
import { AnimatePresence, motion } from "motion/react";
import { CreateLocalNote } from "./create-note";
import cn from "@/lib/cn";

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
      <div className="flex flex-col">
        {content.length > 0 ? (
          <motion.div
            layout
            className={cn(
              "flex flex-col text-txt-primary max-h-[calc(52px*5)] overflow-y-scroll outline-none",
              "pl-4 pr-2 md:pl-8 md:pr-6 py-2",
              "snap-y snap-mandatory",
            )}
            tabIndex={0}
            ref={listRef}
          >
            <AnimatePresence>
              {content.map((item) => (
                <motion.div
                  key={item.index}
                  layout
                  initial={{ opacity: 0, height: 0, scale: 0.8 }}
                  animate={{ opacity: 1, height: "auto", scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.8 }}
                  className="snap-start"
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
              ))}
            </AnimatePresence>
          </motion.div>
        ) : null}

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
