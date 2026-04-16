"use client";

import React, { Activity, Suspense, useState } from "react";
import User from "../header/user/user";
import ConditionalSearch from "../header/search/conditional-search";
import MobileMenu from "./menu/mobile-menu";
import useSelectedNotesStore from "@/lib/store/useSelectedNotesStore";
import SelectNotesSection from "../header/select-notes/select-notes-section";

export default function MobileHeader() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { selectedNotes } = useSelectedNotesStore();

  const toggleMenuIsOpen = () => setMenuIsOpen((p) => !p);
  const handleClose = () => setMenuIsOpen(false);

  return (
    <>
      <div className="fixed top-0 left-0 z-30 w-full outline-none">
        <MobileMenu
          menuIsOpen={menuIsOpen}
          toggleMenuIsOpen={toggleMenuIsOpen}
          handleClose={handleClose}
        />
      </div>
      <Activity mode={menuIsOpen ? "hidden" : "visible"}>
        <div className="fixed top-3 right-3 z-30">
          <div className="flex items-center gap-4">
            {selectedNotes.length === 0 ? (
              <div data-header="true" className="flex items-start gap-4">
                <ConditionalSearch />
                <User />
              </div>
            ) : (
              <SelectNotesSection />
            )}
          </div>
        </div>
      </Activity>
    </>
  );
}
