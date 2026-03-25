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
        className={cn(
          "w-[41px] h-[41px] flex items-center justify-center rounded-full bg-primary text-txt-primary text-xl font-bold select-none",
          {
            "shadow-outside": !isActive,
            "shadow-inside": isActive,
          },
        )}
        onClick={toggleOpen}
      >
        {isActive ? <X size={25} /> : <Search size={25} />}
      </button>
    </>
  );
}
