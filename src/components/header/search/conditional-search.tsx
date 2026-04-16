"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";
import Search from "./search";

export default function ConditionalSearch() {
  const pathname = usePathname();
  return pathname === "/notes" ? (
    <Suspense fallback={null}>
      <Search />
    </Suspense>
  ) : null;
}
