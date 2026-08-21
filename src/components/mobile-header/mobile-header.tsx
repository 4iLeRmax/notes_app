"use client";

import React, { Activity, Suspense, useEffect, useState } from "react";
import User from "../header/header-section/user/user";
import ConditionalSearch from "../wrappers/notes-search-boundary";
import MobileMenu from "./menu/mobile-menu";
import useSelectedNotesStore from "@/lib/store/useSelectedNotesStore";
import SelectNotesSection from "../header/select-notes-section/select-notes-section";
import { UserIconSkeleton } from "../UI/skeletons";
import { usePathname } from "next/navigation";
import { vibrate } from "@/lib/haptics";
import NotesSearchBoundary from "../wrappers/notes-search-boundary";
import Search from "../header/header-section/search/search";

export default function MobileHeader() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const selectedNoteIds = useSelectedNotesStore((s) => s.selectedNoteIds);
  const pathname = usePathname();

  const toggleMenuIsOpen = () => {
    vibrate([10]);
    setMenuIsOpen((p) => !p);
  };
  const handleClose = () => setMenuIsOpen(false);

  useEffect(() => {
    handleClose();
  }, [pathname]);

  return (
    <>
      <div className="fixed top-0 left-0 z-30 w-full outline-none p-3 flex items-center justify-between">
        <MobileMenu
          menuIsOpen={menuIsOpen}
          toggleMenuIsOpen={toggleMenuIsOpen}
          handleClose={handleClose}
        />

        {selectedNoteIds.length === 0 ? (
          <div data-header="true" className="flex items-start gap-4">
            <NotesSearchBoundary>
              <Search />
            </NotesSearchBoundary>
            <Suspense fallback={<UserIconSkeleton />}>
              <User />
            </Suspense>
          </div>
        ) : (
          <SelectNotesSection />
        )}
      </div>
    </>
  );
}
