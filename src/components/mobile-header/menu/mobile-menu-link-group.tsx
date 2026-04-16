"use client";

import cn from "@/lib/cn";
import { ChevronRight, NotebookText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { memo } from "react";

function MobileMenuLinkGroup() {
  const path = usePathname();

  return (
    <>
      <div>
        <h1 className="text-txt-primary font-bold text-xl">Links</h1>
        <div className="flex flex-col gap-4 mt-2">
          <Link
            href={"/notes"}
            className={cn(
              "bg-primary  p-4 rounded-3xl text-txt-primary flex items-center justify-between",
              {
                "shadow-outside": path !== "/notes",
                "shadow-inside": path === "/notes",
              },
            )}
          >
            <div className="flex items-center gap-2">
              <NotebookText size={20} />
              <span>Notes</span>
            </div>
            <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    </>
  );
}

export default memo(MobileMenuLinkGroup);
