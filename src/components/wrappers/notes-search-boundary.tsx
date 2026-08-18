"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";
import React from "react";

function NotesSearchBoundary({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return pathname === "/notes" ? (
    <Suspense fallback={null}>{children}</Suspense>
  ) : null;
}

export default React.memo(NotesSearchBoundary);
