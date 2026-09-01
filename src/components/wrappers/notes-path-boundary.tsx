"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";
import React from "react";

export default function NotesPathBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return pathname === "/notes" ? (
    <Suspense fallback={null}>{children}</Suspense>
  ) : null;
}
