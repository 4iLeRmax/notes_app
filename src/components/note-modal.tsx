"use client";

import React from "react";
import {
  DialogCloseButton,
  DialogContent,
  DialogOverLay,
  DialogPortal,
  DialogWrapper,
  RootDialog,
} from "./UI/dialog";
import { useRouter } from "next/navigation";

export default function NoteModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleClose = () => router.back();

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
