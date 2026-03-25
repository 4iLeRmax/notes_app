"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Search from "./search";

export default function ConditionalSearch() {
  const pathname = usePathname();
  return pathname === "/notes" ? <Search /> : null;
}
