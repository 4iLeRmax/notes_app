"use client";

import React, { useCallback, useEffect, useState } from "react";
import CreateNoteListItem from "./create-note-list-item";
import CreateNoteItemBtn from "./create-note-item-btn";
import { AnimatePresence, motion, Reorder } from "motion/react";
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
  const [pendingFocusId, setPendingFocusId] = React.useState<string | null>(
    null,
  );
  const clearPendingFocusId = useCallback(() => setPendingFocusId(null), []);

  const handleChangeItem = (targetValue: string, itemId: string) => {
    setNote((n) => ({
      ...n,
      content: n.content.map((item) =>
        item.id === itemId ? { ...item, content: targetValue } : item,
      ),
    }));
  };

  const addNewItem = (createAtPosition?: number) => {
    const newItemId = crypto.randomUUID();

    setNote((n) => {
      const newItem = {
        id: newItemId,
        position: createAtPosition ?? n.content.length,
        content: "",
        isDone: false,
      };

      return {
        ...n,
        content: [
          ...n.content.map((el) =>
            el.position >= newItem.position
              ? { ...el, position: el.position + 1 }
              : el,
          ),
          newItem,
        ].sort((a, b) => a.position - b.position),
      };
    });

    setPendingFocusId(newItemId); // NEW
  };

  const removeItem = (itemId: string) => {
    const isLast = content.length === 1;
    if (isLast && listRef.current) listRef.current.focus();

    setNote((n) => ({
      ...n,
      content: n.content
        .filter((item) => item.id !== itemId)
        .sort((a, b) => a.position - b.position)
        .map((item, i) => ({ ...item, position: i })),
    }));
  };

  const toggleItemStatus = (itemId: string) => {
    setNote((n) => ({
      ...n,
      content: n.content.map((item) =>
        item.id === itemId ? { ...item, isDone: !item.isDone } : item,
      ),
    }));
  };

  // const [liveOrder, setLiveOrder] = useState(content);

  // useEffect(() => {
  //   setLiveOrder(content);
  // }, [content]);

  // const handleReorder = (newOrder: CreateLocalNote["content"]) => {
  //   setLiveOrder(newOrder);
  // };

  // const handleDragEnd = () => {
  //   setNote((n) => ({
  //     ...n,
  //     content: liveOrder.map((item, i) => ({ ...item, position: i })),
  //   }));
  // };

  const [order, setOrder] = useState(content.map((item) => item.id));

  useEffect(() => {
    const newOrder = content.map((el) => el.id);

    setOrder((prevOrder) => {
      const sameSet =
        prevOrder.length === newOrder.length &&
        prevOrder.every((id) => newOrder.includes(id));

      if (sameSet) return prevOrder;
      return newOrder;
    });
  }, [content]);

  const orderedItems = order
    .map((id) => content.find((item) => item.id === id))
    .filter((item) => !!item);

  const handleReorder = (newOrder: CreateLocalNote["content"]) => {
    setOrder(newOrder.map((item) => item.id));
  };

  const handleDragEnd = () => {
    setNote((n) => ({
      ...n,
      content: order
        .map((id) => n.content.find((item) => item.id === id))
        .filter((item) => !!item)
        .map((item, i) => ({ ...item, position: i })),
    }));
  };

  return (
    <>
      <div className="flex flex-col">
        {content.length > 0 || true ? (
          <motion.div
            className={cn(
              "flex flex-col text-txt-primary max-h-[calc((52px*5)+16px)] overflow-y-scroll outline-none",
              "pl-4 pr-2 md:pl-8 md:pr-6",
              "snap-y snap-mandatory",
              {
                "py-2": content.length > 0,
                "py-0": content.length === 0,
              },
            )}
            tabIndex={0}
            ref={listRef}
          >
            <Reorder.Group
              axis="y"
              values={orderedItems}
              onReorder={handleReorder}
              as="div"
            >
              <AnimatePresence mode="popLayout">
                {orderedItems.map((item) => (
                  <Reorder.Item
                    key={item.id}
                    value={item}
                    onDragEnd={handleDragEnd}
                    dragElastic={0.1}
                    dragConstraints={listRef}
                    // layout
                    // initial={{ opacity: 0, scale: 0.8 }}
                    // animate={{ opacity: 1, scale: 1 }}
                    // exit={{ opacity: 0, scale: 0.8 }}
                    as="div"
                  >
                    <CreateNoteListItem
                      item={item}
                      addNewItem={addNewItem}
                      removeItem={removeItem}
                      handleChangeItem={handleChangeItem}
                      toggleItemStatus={toggleItemStatus}
                      listRef={listRef}
                      pendingFocusId={pendingFocusId}
                      clearPendingFocusId={clearPendingFocusId}
                    />
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </Reorder.Group>
          </motion.div>
        ) : null}

        <div className="px-4 md:px-8">
          <CreateNoteItemBtn
            addNewItem={addNewItem}
            valueLength={content.length}
          />
        </div>
      </div>
    </>
  );
}
