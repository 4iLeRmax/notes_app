"use client";

import cn from "@/lib/cn";
import { Tag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface LabelItemProps {
  label: Label;
  menuIsOpen: boolean;
}

export default function LabelItem({ label, menuIsOpen }: LabelItemProps) {
  const path = usePathname();

  return (
    <>
      <Link
        href={`/labels/${label.id}`}
        className={cn(
          "w-full flex items-center gap-2 p-2 bg-primary rounded-3xl snap-center text-txt-primary hover:text-custom-blue transition-colors",
          {
            "shadow-outside-small": path !== `/labels/${label.id}`,
            "shadow-inside text-custom-blue": path === `/labels/${label.id}`,
          },
        )}
      >
        <Tag size={25} className="shrink-0" />
        <AnimatePresence>
          {menuIsOpen ? (
            <motion.span
              className="truncate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {label.name}
            </motion.span>
          ) : null}
        </AnimatePresence>
        {/* {menuIsOpen ? <span className="truncate">{label.name}</span> : null} */}
      </Link>
    </>
  );
}
