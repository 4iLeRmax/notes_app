"use client";

import React, { Activity, useState } from "react";
import MobileMenuToggleBtn from "./mobile-menu-toggle-btn";
import MobileMenuModal from "./mobile-menu-modal";
import ThemeSwitcher from "@/components/header/theme-switcher";
import ViewModeSwitcher from "@/components/notes-view-mode/view-mode-switcher";
// import { motion, AnimatePresence } from "motion/react";

interface MobileMenuProps {
  menuIsOpen: boolean;
  toggleMenuIsOpen: () => void;
  handleClose: () => void;
}

export default function MobileMenu({
  menuIsOpen,
  toggleMenuIsOpen,
  handleClose,
}: MobileMenuProps) {
  return (
    <>
      <div>
        <div className="fixed top-3 left-3">
          <MobileMenuToggleBtn
            menuIsOpen={menuIsOpen}
            toggleMenuIsOpen={toggleMenuIsOpen}
          />
          <Activity mode={menuIsOpen ? "visible" : "hidden"}>
            <div className="fixed top-3 right-3 flex items-center gap-4 text-txt-primary">
              <ThemeSwitcher iconSize={25} />
              <ViewModeSwitcher iconSize={25} />
            </div>
          </Activity>
        </div>

        <Activity mode={menuIsOpen ? "visible" : "hidden"}>
          <MobileMenuModal menuIsOpen={menuIsOpen} handleClose={handleClose} />
        </Activity>
      </div>
    </>
  );
}
