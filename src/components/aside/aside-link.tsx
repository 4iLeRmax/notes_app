"use client";

import cn from "@/lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface AsideLinkProps {
  link: string;
  label: string;
  menuIsOpen: boolean;
  icon?: React.ReactNode;
}

export default function AsideLink({
  link,
  label,
  menuIsOpen,
  icon,
}: AsideLinkProps) {
  const path = usePathname();

  return (
    <>
      <motion.div
        animate={{ width: menuIsOpen ? 208 : 41 }}
        // transition={{ duration: 1,  }}
      >
        <Link
          href={link}
          className={cn(
            "w-full flex items-center gap-2 p-2 bg-primary shadow-outside-small rounded-3xl transition-colors",
            {
              "shadow-outside-small text-txt-primary hover:text-custom-blue":
                path !== link,
              "shadow-inside text-custom-blue": path === link,
              // "w-[41px] ": !menuIsOpen,
              // "w-52 ": menuIsOpen,
            },
          )}
        >
          <div className="bg-primary">{icon ? icon : null}</div>
          <AnimatePresence mode="wait">
            {menuIsOpen ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.2, delay: 0.15 },
                }}
                exit={{ opacity: 0, transition: { duration: 0.1, delay: 0 } }}
              >
                {label}
              </motion.span>
            ) : null}
          </AnimatePresence>
        </Link>
      </motion.div>
    </>
  );
}
