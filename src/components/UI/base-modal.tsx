"use client";

import React from "react";
import {
  DialogCloseButton,
  DialogContent,
  DialogOverLay,
  DialogPortal,
  DialogWrapper,
  RootDialog,
} from "./dialog";
import { useRouter } from "next/navigation";

export default function BaseModal({
  children,
  customClose,
}: {
  children: React.ReactNode;
  customClose?: () => void;
}) {
  const router = useRouter();

  const handleClose = () => {
    if (customClose) {
      customClose();
    } else {
      router.back();
    }
  };

  return (
    <>
      <RootDialog handleClose={handleClose}>
        <DialogPortal>
          <DialogWrapper>
            <DialogOverLay handleClose={handleClose} />
            <DialogContent>
              <DialogCloseButton handleClose={handleClose} />
              {children}
            </DialogContent>
          </DialogWrapper>
        </DialogPortal>
      </RootDialog>
    </>
  );
}
