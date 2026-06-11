"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { DialogOverlay, DialogPortal, RootDialog } from "./dialog";
import { motion, AnimatePresence } from "motion/react";
import cn from "@/lib/cn";

interface MoreProps {
  children: React.ReactNode;
  btnChildren: React.ReactNode;
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  fixed?: boolean;
  bgSecondaryForBtn?: boolean;
}

const calcPosition = (rect: DOMRect, fixed: boolean, modalHeight: number) => {
  const screenWidth = document.documentElement.clientWidth;
  const right = screenWidth - rect.right + (fixed ? 0 : window.scrollX);
  const opensDownward = window.innerHeight - rect.bottom >= modalHeight;

  if (opensDownward) {
    return {
      top: rect.bottom + (fixed ? 0 : window.scrollY),
      bottom: 0,
      right,
    };
  }
  return {
    top: 0,
    bottom: window.innerHeight - rect.top - (fixed ? 0 : window.scrollY),
    right,
  };
};

export default function More({
  children,
  btnChildren,
  isOpen,
  handleOpen,
  handleClose,
  fixed = false,
  bgSecondaryForBtn,
}: MoreProps) {
  const [position, setPosition] = useState({ top: 0, bottom: 0, right: 0 });

  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const mobileModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("resize", handleClose);
    return () => {
      window.removeEventListener("resize", handleClose);
    };
  }, [handleClose]);

  useLayoutEffect(() => {
    if (!isOpen || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    if (!modalRef.current) return;
    const modalHeight = modalRef.current.offsetHeight || 0;
    setPosition(calcPosition(rect, fixed, modalHeight));
  }, [isOpen, fixed]);

  const handleBlur = (e: React.FocusEvent) => {
    if (
      !buttonRef.current?.contains(e.relatedTarget as Node) &&
      !modalRef.current?.contains(e.relatedTarget as Node) &&
      !mobileModalRef.current?.contains(e.relatedTarget as Node)
    ) {
      handleClose();
    }
  };

  const opensUpward = position.top === 0;

  return (
    <>
      <button
        type="button"
        ref={buttonRef}
        onBlur={handleBlur}
        className={cn("p-1 outline-none rounded-full transition-colors", {
          "shadow-outside-small text-txt-secondary hover:text-custom-blue":
            !isOpen,
          "shadow-inside text-custom-blue": isOpen,
          "bg-primary": !bgSecondaryForBtn,
          "bg-secondary": bgSecondaryForBtn,
        })}
        onClick={handleOpen}
      >
        {btnChildren}
      </button>
      <AnimatePresence mode="wait">
        {isOpen ? (
          <RootDialog handleClose={handleClose}>
            <DialogPortal>
              <motion.div
                ref={modalRef}
                onBlur={handleBlur}
                tabIndex={0}
                initial={{ opacity: 0.5, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0.5, scaleY: 0 }}
                className={cn(
                  "hidden xs:flex bg-primary shadow-outside-small overflow-hidden rounded-xl sm:rounded-3xl xs:w-[200px] md:w-[184px] lg:w-[218px]",
                  {
                    "absolute z-20 ": !fixed,
                    "fixed z-50": fixed,
                    "origin-top": !opensUpward,
                    "origin-bottom": opensUpward,
                  },
                )}
                style={
                  opensUpward
                    ? {
                        bottom: `${position.bottom}px`,
                        right: `${position.right}px`,
                      }
                    : {
                        top: `${position.top}px`,
                        right: `${position.right}px`,
                      }
                }
              >
                {children}
              </motion.div>
              <div className="flex xs:hidden fixed z-50">
                <DialogOverlay handleClose={handleClose} />
                <motion.div
                  ref={mobileModalRef}
                  initial={{ y: 150, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 150, opacity: 0 }}
                  transition={{ type: "tween" }}
                  className="fixed bg-secondary bottom-0 left-0 shadow-outside-small overflow-hidden rounded-ss-3xl rounded-se-3xl w-full py-4"
                >
                  {children}
                </motion.div>
              </div>
            </DialogPortal>
          </RootDialog>
        ) : null}
      </AnimatePresence>
    </>
  );
}
