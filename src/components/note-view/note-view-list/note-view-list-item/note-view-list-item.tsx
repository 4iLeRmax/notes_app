"use client";

import cn from "@/lib/cn";
import React, { useState } from "react";
import NoteViewListItemStatusBtn from "./note-view-list-item-status-btn";
import NoteViewListItemDeleteBtn from "./note-view-list-item-delete-btn";
import NoteViewListItemContent from "./note-view-list-item-content";
import { motion } from "motion/react";

interface NoteViewListItemProps {
  listItem: NoteItem;
}

export default function NoteViewListItem({ listItem }: NoteViewListItemProps) {
  const [hovered, setHovered] = useState(false);
  // const [focused, setFocused] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20, height: 0 }}
        animate={{
          opacity: 1,
          x: 0,
          height: "auto",
        }}
        exit={{ opacity: 0, x: 20, height: 0 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        // onFocus={() => setFocused(true)}
        // onBlur={() => setFocused(false)}
        tabIndex={0}
        className={cn("rounded-4xl bg-secondary shadow-outside-small w-full")}
      >
        <div className="w-full flex items-center gap-2">
          <NoteViewListItemStatusBtn
            listItemId={listItem.id}
            isDone={listItem.isDone}
            size={32}
          />

          <NoteViewListItemContent
            listItemId={listItem.id}
            content={listItem.content}
            isDone={listItem.isDone}
            hovered={hovered}
          />
          <NoteViewListItemDeleteBtn
            listItemId={listItem.id}
            hovered={hovered}
          />
        </div>
      </motion.div>
    </>
  );
}
