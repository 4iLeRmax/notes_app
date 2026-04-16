"use client";

import cn from "@/lib/cn";
import { Menu, X } from "lucide-react";
import React from "react";

interface MobileMenuToggleBtnProps {
  menuIsOpen: boolean;
  toggleMenuIsOpen: () => void;
}

export default function MobileMenuToggleBtn({
  menuIsOpen,
  toggleMenuIsOpen,
}: MobileMenuToggleBtnProps) {
  return (
    <>
      <button
        className={cn("p-2 rounded-3xl bg-primary text-txt-primary", {
          "shadow-outside": !menuIsOpen,
          "shadow-inside": menuIsOpen,
        })}
        onClick={toggleMenuIsOpen}
      >
        {!menuIsOpen ? <Menu size={25} /> : <X size={25} />}
      </button>
    </>
  );
}
