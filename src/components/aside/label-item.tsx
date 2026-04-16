"use client";

import cn from "@/lib/cn";
import { Tag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface LabelItemProps {
  label: Label;
  menuIsOpen: boolean;
}

export default function LabelItem({ label, menuIsOpen }: LabelItemProps) {
  const path = usePathname();

  return (
    <>
      <Link
        href={`/labels/${label.id}`}
        className={cn(
          "w-full flex items-center gap-2 p-2 bg-primary rounded-3xl snap-center",
          {
            "shadow-outside-small": path !== `/labels/${label.id}`,
            "shadow-inside": path === `/labels/${label.id}`,
          },
        )}
      >
        <Tag size={25} className="shrink-0" />
        {menuIsOpen ? <span className="truncate">{label.name}</span> : null}
      </Link>
    </>
  );
}
