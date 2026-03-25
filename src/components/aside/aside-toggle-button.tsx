"use client";

import { Ellipsis, EllipsisVertical } from "lucide-react";
import cn from "@/lib/cn";

interface AsideToggleButtonProps {
  isOpen: boolean;
  toggle: () => void;
  iconSize?: number;
}

export default function AsideToggleButton({
  isOpen,
  toggle,
  iconSize = 20,
}: AsideToggleButtonProps) {
  return (
    <>
      <button
        onClick={toggle}
        className={cn(
          "w-[41px] h-[41px] flex items-center justify-center bg-primary rounded-full shrink-0",
          {
            "shadow-outside_small": !isOpen,
            "shadow-inside": isOpen,
          },
        )}
      >
        {isOpen ? (
          <EllipsisVertical size={iconSize} />
        ) : (
          <Ellipsis size={iconSize} />
        )}
      </button>
    </>
  );
}
