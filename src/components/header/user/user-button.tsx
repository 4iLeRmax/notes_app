"use client";

import cn from "@/lib/cn";
import { X } from "lucide-react";
import React from "react";

interface UserIconProps {
  userName: string;
  isActive: boolean;
  toggleOpen: () => void;
}

export default function UserButton({
  userName,
  isActive,
  toggleOpen,
}: UserIconProps) {
  return (
    <>
      <button
        className={cn(
          "w-[41px] h-[41px] flex items-center justify-center rounded-full bg-secondary text-txt-primary transition-colors text-xl font-bold select-none",
          {
            "shadow-outside hover:bg-custom-blue hover:text-primary": !isActive,
            "shadow-inside text-custom-blue": isActive,
          },
        )}
        onClick={toggleOpen}
      >
        {isActive ? <X size={25} /> : userName[0]}
      </button>
    </>
  );
}
