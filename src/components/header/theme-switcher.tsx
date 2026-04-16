"use client";

import cn from "@/lib/cn";
import { ThemeContext } from "@/lib/context/theme-context";
import { Moon, Sun } from "lucide-react";
import React, { useContext } from "react";

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
      className={cn("p-2 rounded-3xl bg-primary text-txt-primary", {
        "shadow-outside-small": value.theme === "light",
        "shadow-inside": value.theme === "dark",
      })}
    >
      {value.theme === "light" ? (
        <Moon size={iconSize} />
      ) : (
        <Sun size={iconSize} />
      )}
    </button>
  );
}
