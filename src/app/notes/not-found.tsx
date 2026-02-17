import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-2xl">Note not found</h1>
          <Link href="/notes" className="flex items-center gap-1 text-sm">
            <ArrowLeft size={20} /> <span>Back to notes</span>
          </Link>
        </div>
      </div>
    </>
  );
}
