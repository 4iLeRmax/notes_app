"use client";

import { getLabels } from "@/lib/actions/label";
import cn from "@/lib/cn";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Tag,
  Tags,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useState, memo } from "react";

interface MobileMenuLabelListProps {
  //   menuIsOpen: boolean;
}

function MobileMenuLabelList(
  {
    //   menuIsOpen,
  }: MobileMenuLabelListProps,
) {
  const [listIsOpen, setListIsOpen] = useState(false);
  const { data: labels } = useQuery({
    queryKey: ["labels"],
    queryFn: async () => await getLabels(),
    enabled: listIsOpen,
    staleTime: 5 * 60 * 1000,
  });

  if (!labels || labels.length < 1) return null;

  return (
    <>
      <button
        onClick={() => {
          setListIsOpen((p) => !p);
        }}
        className={cn(
          "flex items-center justify-between text-txt-primary p-4 rounded-3xl bg-secondary",
          {
            "shadow-outside-small": !listIsOpen,
            "shadow-inside": listIsOpen,
          },
        )}
      >
        <div className="flex items-center gap-2">
          <Tags size={20} />
          <span>Labels</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            animate={{ transform: listIsOpen ? "rotate(90deg)" : "rotate(0)" }}
          >
            <ChevronRight size={20} />
          </motion.div>
        </AnimatePresence>
      </button>
      {labels ? (
        <AnimatePresence mode="popLayout">
          {listIsOpen ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: "calc(100vh * 0.9 - 533px - 16px)",
              }}
              exit={{ opacity: 0, height: 0 }}
              className={cn(
                "w-full flex flex-col items-start gap-4", //must be 124
                "pl-4 pr-2 overflow-y-scroll snap-y snap-mandatory",
              )}
            >
              {labels.map((label) => (
                <Link
                  href={`/labels/${label.id}`}
                  key={label.id}
                  className="flex items-center justify-between bg-secondary rounded-3xl shadow-outside-small w-full p-2 text-txt-primary"
                >
                  <div className="flex items-center gap-2 w-full">
                    <Tag size={20} />
                    <span className="w-full truncate">{label.name}</span>
                  </div>
                  <ExternalLink size={20} />
                </Link>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      ) : null}
    </>
  );
}

export default memo(MobileMenuLabelList);
