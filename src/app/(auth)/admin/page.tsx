"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

export default function AdminPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex items-start w-full p-10 gap-5">
        <motion.div
          animate={{ width: isOpen ? "200px" : "50px" }}
          className=" h-100 bg-primary shadow-outside"
        >
          <button onClick={() => setIsOpen((p) => !p)}>O</button>
        </motion.div>
        <div className="w-full h-150 bg-primary shadow-outside"></div>
      </div>
    </>
  );
}
