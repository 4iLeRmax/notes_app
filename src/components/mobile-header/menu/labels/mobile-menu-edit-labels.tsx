"use client";

import EditLabelsModal from "@/components/aside/edit-labels/edit-labels-modal";
import { ChevronRight, Edit } from "lucide-react";
import React, { useState } from "react";

export default function MobileMenuEditLabels() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModalOpen = () => setModalIsOpen((p) => !p);

  return (
    <>
      {modalIsOpen ? (
        <EditLabelsModal handleClose={() => setModalIsOpen(false)} />
      ) : null}
      <div>
        <button
          onClick={toggleModalOpen}
          className="bg-primary shadow-outside-small p-4 rounded-3xl w-full flex items-center justify-between text-txt-primary"
        >
          <div className="flex items-center gap-2">
            <Edit size={20} />
            <span>Edit Labels</span>
          </div>
          <ChevronRight />
        </button>
      </div>
    </>
  );
}
