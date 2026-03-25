import AsideSection from "@/components/aside/aside-section";
import Header from "@/components/header/header";
import React from "react";

export default function MainLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="flex items-start mx-5 xs:mx-0 xs:gap-5">
      <AsideSection />
      <Header />

      <main className="w-full">
        {children}
        {modal}
      </main>
    </div>
  );
}
