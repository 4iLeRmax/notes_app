"use client";

import React from "react";
import SyncData from "./sync-data/sync-data";
import NotesSearchBoundary from "@/components/wrappers/notes-search-boundary";
import Search from "./search/search";
import User from "./user/user";

export default function HeaderSection() {
  return (
    <>
      <div
        className="flex items-start justify-end gap-4"
        data-testid="header-section"
      >
        <SyncData iconSize={25} />
        <NotesSearchBoundary>
          <Search />
        </NotesSearchBoundary>
        <User />
      </div>
    </>
  );
}
