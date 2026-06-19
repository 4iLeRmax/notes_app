"use client";

import { X } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";

const RootDialog = ({
  children,
  handleClose,
}: {
  children: React.ReactNode;
  handleClose: () => void;
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose]);

  return children;
};

const CloseModalOnNotFound = ({ noteExists }: { noteExists: boolean }) => {
  const router = useRouter();

  useEffect(() => {
    if (!noteExists) {
      redirect("/notes");
    }
  }, [noteExists, router]);

  return null;
};

const DialogWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed top-0 left-0 z-30 w-full h-dvh flex items-center justify-center">
      {children}
    </div>
  );
};

const DialogPortal = ({ children }: { children: React.ReactNode }) => {
  const modalsContainer = document.getElementById("modals");

  if (!modalsContainer) return null;

  return createPortal(children, modalsContainer);
};

const DialogOverlay = ({ handleClose }: { handleClose: () => void }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!overlayRef.current || overlayRef.current.offsetWidth === 0) {
      return;
    }

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.documentElement.style.overflow = "";
      document.documentElement.style.paddingRight = "";
    };
  }, []);

  return (
    <>
      <motion.div
        ref={overlayRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/30 backdrop-blur-xs"
        onClick={handleClose}
      ></motion.div>
    </>
  );
};

const DialogContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        className="relative"
      >
        {children}
      </motion.div>
    </>
  );
};

const DialogCloseButton = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <>
      <button
        onClick={handleClose}
        className="hidden xs:flex absolute top-4 right-8 bg-primary shadow-outside-small rounded-full text-txt-secondary hover:text-custom-blue transition-colors p-1.5"
      >
        <X size={20} />
      </button>
    </>
  );
};

export {
  RootDialog,
  CloseModalOnNotFound,
  DialogWrapper,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogCloseButton,
};
