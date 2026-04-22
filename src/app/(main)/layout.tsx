import AsideSection from "@/components/aside/aside-section";
import Header from "@/components/header/header";
import MobileHeader from "@/components/mobile-header/mobile-header";
import React from "react";

export default function MainLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="relative flex items-start mx-3 sm:mx-5 sm:gap-5">
      <div className="hidden sm:flex">
        <AsideSection />
        <Header />
      </div>
      <div className="flex sm:hidden">
        <MobileHeader />
      </div>

      <main className="w-full">
        {children}
        {modal}
      </main>
    </div>
  );
}
