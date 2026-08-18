"use client";

import cn from "@/lib/cn";
import { Search, X } from "lucide-react";
import React from "react";

interface UserIconProps {
  isActive: boolean;
  toggleOpen: () => void;
}

export default function SearchButton({ isActive, toggleOpen }: UserIconProps) {
  return (
    <>
      <button
        aria-label="open search bar"
        aria-pressed={isActive}
        title="Search"
        className={cn(
          "w-[41px] h-[41px] flex items-center justify-center rounded-full bg-secondary transition-colors text-xl font-bold select-none",
          {
            "shadow-outside text-txt-primary hover:text-custom-blue": !isActive,
            "shadow-inside text-custom-blue": isActive,
          },
        )}
        onClick={toggleOpen}
      >
        {isActive ? <X size={25} /> : <Search size={25} />}
      </button>
    </>
  );
}
