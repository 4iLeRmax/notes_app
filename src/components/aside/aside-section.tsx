"use client";

import { NotebookText } from "lucide-react";
import React, { useEffect, useState } from "react";
import LabelsGroup from "./labels-group/labels-group";
import ViewModeSwitcher from "../notes-view-mode/view-mode-switcher";
import AsideToggleButton from "./aside-toggle-button";
import cn from "@/lib/cn";
import AsideLink from "./aside-link";
import EditLabels from "./edit-labels/edit-labels";
import ThemeSwitcher from "../header/theme-switcher";
import { motion, AnimatePresence } from "motion/react";

export default function AsideSection() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useEffect(() => {
    const asideMenuOpen = localStorage.getItem("asideMenuOpen");
    if (asideMenuOpen !== null) {
      setMenuIsOpen(JSON.parse(asideMenuOpen));
    }
  }, []);

  const handleToggleOpen = () => {
    setMenuIsOpen((p) => {
      localStorage.setItem("asideMenuOpen", JSON.stringify(!p));
      return !p;
    });
  };

  return (
    <>
      <div className={cn("shrink-0 w-[73px] 2xl:hidden", {})}></div>
      <motion.div
        animate={{ width: menuIsOpen ? "240px" : "73px" }}
        className={cn("shrink-0 hidden 2xl:flex", {
          // "w-[73px]": !menuIsOpen,
          // "w-[73px] 2xl:w-60": menuIsOpen,
        })}
      ></motion.div>

      <motion.div
        initial={false}
        animate={{ width: menuIsOpen ? 240 : 73 }}
        // transition={{ duration: 1 }}
        data-aside
        className={cn(
          "fixed z-30 top-0 left-5 ",
          "py-4 mt-5",
          "bg-secondary shadow-outside rounded-4xl select-none outline-none",
        )}
      >
        <div className="flex flex-col items-start gap-4 justify-start">
          <div className="px-4">
            <AsideToggleButton
              isOpen={menuIsOpen}
              toggle={handleToggleOpen}
              iconSize={25}
            />
          </div>
          <div className="w-full px-4">
            <AsideLink
              link="/notes"
              label="Notes"
              menuIsOpen={menuIsOpen}
              icon={<NotebookText size={25} />}
            />
          </div>
          <LabelsGroup menuIsOpen={menuIsOpen} />

          <div className="w-full px-4">
            <EditLabels menuIsOpen={menuIsOpen} />
          </div>

          <div className="w-full px-4">
            <ThemeSwitcher iconSize={25} />
          </div>

          <div className="px-4">
            <ViewModeSwitcher iconSize={25} />
          </div>
        </div>
      </motion.div>
    </>
  );
}
