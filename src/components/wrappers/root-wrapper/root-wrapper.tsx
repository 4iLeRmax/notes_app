import React from "react";
import TanstackQueryWrapper from "./tanstack-query-wrapper";
import { ThemeProvider } from "@/lib/context/theme-context";

export default function RootWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TanstackQueryWrapper>
        <ThemeProvider>{children}</ThemeProvider>
      </TanstackQueryWrapper>
    </>
  );
}
