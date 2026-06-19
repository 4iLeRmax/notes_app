"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import EditLabelsModal from "./edit-labels-modal";
import EditLabelsBtn from "./UI/edit-labels-btn";
import { motion, AnimatePresence } from "motion/react";

interface EditLabelsProps {
  menuIsOpen: boolean;
}

export default function EditLabels({ menuIsOpen }: EditLabelsProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setModalIsOpen(false);
  }, [pathname]);

  const toggleModalOpen = () => setModalIsOpen((p) => !p);

  return (
    <>
      <AnimatePresence>
        {modalIsOpen ? (
          <EditLabelsModal handleClose={() => setModalIsOpen(false)} />
        ) : null}
      </AnimatePresence>
      <EditLabelsBtn
        menuIsOpen={menuIsOpen}
        modalIsOpen={modalIsOpen}
        toggleModalOpen={toggleModalOpen}
      />
    </>
  );
}
