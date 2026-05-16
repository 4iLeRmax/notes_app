"use client";

import cn from "@/lib/cn";
import { ThemeContext } from "@/lib/context/theme-context";
import { Moon, Sun } from "lucide-react";
import React, { useContext } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function ThemeSwitcher({
  iconSize = 20,
}: {
  iconSize?: number;
}) {
  const value = useContext(ThemeContext);

  if (!value) return null;

  return (
    <button
      onClick={value.toggleTheme}
      aria-label={`Switch to ${value.theme === "light" ? "dark" : "light"} theme`}
      className={cn(
        "p-2 rounded-3xl bg-secondary sm:bg-primary text-txt-primary",
        {
          "shadow-outside-small": value.theme === "light",
          "shadow-inside": value.theme === "dark",
        },
      )}
    >
      <AnimatePresence mode="wait">
        {value.theme === "light" ? (
          <motion.div
            key="dark"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={iconSize} />
          </motion.div>
        ) : (
          <motion.div
            key="light"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={iconSize} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
