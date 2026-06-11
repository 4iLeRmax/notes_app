"use client";

import { DialogOverlay } from "@/components/UI/dialog";
import cn from "@/lib/cn";
import { useNotesStore } from "@/lib/store/useNotesStore";
import { ChevronRight, ExternalLink, Tag, Tags } from "lucide-react";
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
  const labels = useNotesStore((s) => s.labels);

  if (!labels || labels.length < 1) return null;

  return (
    <>
      <button
        onClick={() => {
          setListIsOpen((p) => !p);
        }}
        className={cn(
          "flex items-center justify-between p-4 rounded-3xl bg-secondary transition-colors",
          {
            "shadow-outside-small text-txt-primary": !listIsOpen,
            "shadow-inside text-custom-blue": listIsOpen,
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
            <>
              <div className="fixed z-50">
                <DialogOverlay handleClose={() => setListIsOpen(false)} />
                <motion.div
                  initial={{ y: 150, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 150, opacity: 0 }}
                  transition={{ type: "tween" }}
                  className="fixed bg-secondary bottom-0 left-0 shadow-outside-small  rounded-ss-3xl rounded-se-3xl w-full pt-10 pb-4"
                >
                  <div
                    className={cn(
                      "w-full flex flex-col items-start gap-4",
                      "pl-4 pr-2 py-1 overflow-y-scroll max-h-[60vh] snap-y snap-mandatory",
                    )}
                  >
                    {labels.map((label) => (
                      <Link
                        href={`/labels/${label.id}`}
                        key={label.id}
                        className="flex items-center justify-between bg-secondary rounded-3xl shadow-outside-small w-full p-4 text-txt-primary"
                      >
                        <div className="flex items-center gap-2 w-full">
                          <Tag size={20} />
                          <span className="w-full truncate">{label.name}</span>
                        </div>
                        <ExternalLink size={20} />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </div>
            </>
          ) : null}
        </AnimatePresence>
      ) : null}
    </>
  );
}

export default memo(MobileMenuLabelList);
