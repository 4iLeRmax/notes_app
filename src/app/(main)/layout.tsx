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
    <div className="flex items-start mx-3 xs:mx-0 xs:gap-5">
      <div className="hidden xs:flex">
        <AsideSection />
        <Header />
      </div>
      <div className="flex xs:hidden">
        <MobileHeader />
      </div>

      <main className="w-full">
        {children}
        {modal}
      </main>
    </div>
  );
}
