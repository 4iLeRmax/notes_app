"use client";

import React from "react";
import SyncData from "./sync-data/sync-data";
import Search from "./search/search";
import User from "./user/user";
import NotesPathBoundary from "@/components/wrappers/notes-path-boundary";

export default function HeaderSection() {
  return (
    <>
      <div
        className="flex items-start justify-end gap-4"
        data-testid="header-section"
      >
        <SyncData iconSize={25} />
        <NotesPathBoundary>
          <Search />
        </NotesPathBoundary>
        <User />
      </div>
    </>
  );
}
