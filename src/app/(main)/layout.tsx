import AsideSection from "@/components/aside/aside-section";
import Header from "@/components/header/header";
import LabelHydrate from "@/components/hydrators/labels-hydrator/label-hydrate";
import NoteHydrate from "@/components/hydrators/notes-hydrator/note-hydrate";
import MobileHeader from "@/components/mobile-header/mobile-header";
import React, { Suspense } from "react";

export default function MainLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <NoteHydrate />
      <LabelHydrate />
      <div className="relative flex items-start mx-3 sm:mx-5 sm:gap-5">
        <div className="hidden sm:flex">
          <AsideSection />
          <Header />
        </div>
        <div className="flex sm:hidden">
          <MobileHeader />
        </div>

        <main className="w-full">
          <div className="mt-16 sm:mt-5">{children}</div>
          {modal}
        </main>
      </div>
    </>
  );
}
