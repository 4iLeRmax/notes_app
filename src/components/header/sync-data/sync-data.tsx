"use client";

import { getNotes } from "@/lib/actions/note";
import cn from "@/lib/cn";
import { useNotesStore } from "@/lib/store/useNotesStore";
import { toast } from "@/components/UI/toast";
import { useQuery } from "@tanstack/react-query";
import { CloudCheck, Loader2, RotateCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { getLabels } from "@/lib/actions/label";

interface SyncDataBtnProps {
  iconSize?: number;
  mobileVersion?: boolean;
}

export default function SyncData({
  iconSize = 20,
  mobileVersion,
}: SyncDataBtnProps) {
  const { isFetching, refetch } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const [notes, labels] = await Promise.all([getNotes(), getLabels()]);
      return { notes, labels };
    },
    enabled: false,
    staleTime: 0,
    gcTime: 0,
  });

  const setNotes = useNotesStore((s) => s.setNotes);
  const setLabels = useNotesStore((s) => s.setLabels);
  const isPending = useNotesStore((s) => s.isPending);
  const [tempIcon, setTempIcon] = useState(false);

  const prevIsPending = useRef(isPending);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flashCheck = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setTempIcon(true);
    timeoutRef.current = setTimeout(() => setTempIcon(false), 2000);
  };

  const syncStoreData = async () => {
    const { data, isSuccess } = await refetch();
    if (data) {
      const { notes, labels } = data;
      setNotes(notes);
      setLabels(labels);
      flashCheck();
    }
    if (isSuccess) toast.success("Synced", "Your data are up to date.");
  };

  useEffect(() => {
    const wasPending = prevIsPending.current;
    prevIsPending.current = isPending;

    if (wasPending && !isPending) {
      flashCheck();
    }
  }, [isPending]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <button
      aria-label="Sync data"
      title="Sync data"
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
  );
}
