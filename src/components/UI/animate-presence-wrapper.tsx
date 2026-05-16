"use client";

import { AnimatePresence } from "motion/react";
import React from "react";

export default function AnimatePresenceWrapper({
  children,
  mode,
}: {
  children: React.ReactNode;
  mode: "wait" | "sync" | "popLayout";
}) {
  return <AnimatePresence mode={mode}>{children}</AnimatePresence>;
}
