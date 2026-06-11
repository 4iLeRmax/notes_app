"use client";

import cn from "@/lib/cn";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React from "react";

interface MobileMenuToggleBtnProps {
  menuIsOpen: boolean;
  iconSize?: number;
  toggleMenuIsOpen: () => void;
}

export default function MobileMenuToggleBtn({
  menuIsOpen,
  iconSize = 20,
  toggleMenuIsOpen,
}: MobileMenuToggleBtnProps) {
  return (
    <>
      <motion.button
        className={cn("z-40 p-2 rounded-3xl bg-secondary transition-colors", {
          "shadow-outside": !menuIsOpen,
          "shadow-inside": menuIsOpen,
        })}
        onClick={toggleMenuIsOpen}
      >
        <AnimatePresence mode="wait">
          {!menuIsOpen ? (
            <motion.div
              key="open-menu"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className=" text-txt-primary"
            >
              <Menu size={iconSize} />
            </motion.div>
          ) : (
            <motion.div
              key="close-menu"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className=" text-custom-blue"
            >
              <X size={iconSize} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
