"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createPortal } from "react-dom";

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
  }, []);

  return children;
};

const CloseModalOnNotFound = ({ noteExists }: { noteExists: boolean }) => {
  const router = useRouter();

  useEffect(() => {
    if (!noteExists) {
      router.back();
    }
  }, [noteExists, router]);

  return null;
};

const DialogWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed top-0 left-0 z-30 w-full h-screen flex items-center justify-center">
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
  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-xs"
        onClick={handleClose}
      ></div>
    </>
  );
};

const DialogContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="relative">{children}</div>
    </>
  );
};

const DialogCloseButton = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <>
      <button
        onClick={handleClose}
        className="absolute top-4 right-8 bg-primary rounded-full text-txt-primary p-1"
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
