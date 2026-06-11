"use client";

import { getAllNotes } from "@/lib/actions/note";
import cn from "@/lib/cn";
import { useNotesStore } from "@/lib/store/useNotesStore";
import { useQuery } from "@tanstack/react-query";
import { CloudCheck, Loader2, RotateCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React, { useEffect, useState } from "react";

interface SyncDataBtnProps {
  iconSize: number;
  mobileVersion?: boolean;
}

export default function SyncDataBtn({
  iconSize = 20,
  mobileVersion,
}: SyncDataBtnProps) {
  const { isFetching, refetch } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => await getAllNotes(),
    enabled: false,
    staleTime: 0,
    gcTime: 0,
  });

  const setNotes = useNotesStore((s) => s.setNotes);
  const isPending = useNotesStore((s) => s.isPending);
  const [tempIcon, setTempIcon] = useState(false);

  const syncStoreData = async () => {
    const { data } = await refetch();
    if (data) {
      setNotes(data);
      setTempIcon(true);
      setTimeout(() => setTempIcon(false), 2000);
    }
  };

  useEffect(() => {
    if (!isPending) {
      setTempIcon(true);
      setTimeout(() => setTempIcon(false), 2000);
    }
  }, [isPending]);

  return (
    <>
      <button
        onClick={syncStoreData}
        className={cn(
          "bg-secondary text-txt-primary p-2 rounded-full hover:text-custom-blue transition-colors",
          {
            "shadow-inside": isFetching,
            "shadow-outside": !isFetching && !mobileVersion,
            "shadow-outside-small": !isFetching && mobileVersion,
          },
        )}
        disabled={isFetching || tempIcon || isPending}
      >
        <AnimatePresence mode="wait">
          {isFetching || isPending ? (
            <motion.div
              key="loader"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex text-txt-primary"
            >
              <Loader2 className="animate-spin" size={iconSize} />
            </motion.div>
          ) : tempIcon ? (
            <motion.div
              key="check"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex text-txt-primary"
            >
              <CloudCheck size={iconSize} />
            </motion.div>
          ) : (
            <motion.div
              key="reload"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 1, scale: 1 }}
              className="flex"
            >
              <RotateCw size={iconSize} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </>
  );
}
