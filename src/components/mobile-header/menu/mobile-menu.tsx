"use client";

import React from "react";
import MobileMenuToggleBtn from "./mobile-menu-toggle-btn";
import MobileMenuModal from "./mobile-menu-modal";
import { AnimatePresence } from "motion/react";

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
      <MobileMenuToggleBtn
        menuIsOpen={menuIsOpen}
        iconSize={25}
        toggleMenuIsOpen={toggleMenuIsOpen}
      />

      <AnimatePresence mode="wait">
        {menuIsOpen ? (
          <MobileMenuModal menuIsOpen={menuIsOpen} handleClose={handleClose} />
        ) : null}
      </AnimatePresence>
    </>
  );
}
