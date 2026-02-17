"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { DialogPortal } from "./dialog";

interface MoreProps {
  children: React.ReactNode;
  btnChildren: React.ReactNode;
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  fixed?: boolean;
}

export default function More({
  children,
  btnChildren,
  isOpen,
  handleOpen,
  handleClose,
  fixed,
}: MoreProps) {
  console.log("render: MORE");

  const [position, setPosition] = useState({ top: 0, bottom: 0, right: 0 });

  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalsContainer = useRef<HTMLElement>(null);

  useEffect(() => {
    modalsContainer.current = document.getElementById("modals");

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleClose);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleClose);
    };
  }, []);

  useLayoutEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const modalHeight = modalRef.current?.offsetHeight || 0;
      const screenWidth = document.documentElement.clientWidth;
      // console.log(rect.left, rect.right);

      if (!fixed) {
        setPosition({
          ...(window.innerHeight - rect.bottom >= modalHeight
            ? {
                top: rect.bottom + window.scrollY,
                bottom: 0,
                right: screenWidth - rect.right + window.scrollX,
              }
            : {
                top: 0,
                bottom: window.innerHeight - rect.top - window.scrollY,
                right: screenWidth - rect.right + window.scrollX,
              }),
        });
      } else {
        setPosition({
          ...(window.innerHeight - rect.bottom >= modalHeight
            ? {
                top: rect.bottom,
                bottom: 0,
                right: screenWidth - rect.right,
              }
            : {
                top: 0,
                bottom: window.innerHeight - rect.top,
                right: screenWidth - rect.right,
              }),
        });
      }
    }
  }, [isOpen]);

  const handleBlur = (e: React.FocusEvent) => {
    if (
      !buttonRef.current?.contains(e.relatedTarget as Node) &&
      !modalRef.current?.contains(e.relatedTarget as Node)
    ) {
      handleClose();
    }
  };

  return (
    <>
      <button
        ref={buttonRef}
        className="p-1 outline-none rounded-full hover:bg-gray-300"
        onClick={handleOpen}
        onBlur={handleBlur}
      >
        {btnChildren}
      </button>
      {isOpen && modalsContainer.current ? (
        <DialogPortal>
          <div
            ref={modalRef}
            onBlur={handleBlur}
            tabIndex={0}
            className={clsx(
              "z-40 bg-primary shadow-2xl rounded-md border-2 border-gray-300",
              fixed ? "fixed" : "absolute",
            )}
            style={{
              ...(position.top === 0
                ? { bottom: `${position.bottom}px` }
                : { top: `${position.top}px` }),
              right: `${position.right}px`,
            }}
          >
            {children}
          </div>
        </DialogPortal>
      ) : null}
    </>
  );
}
