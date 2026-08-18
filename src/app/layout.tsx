import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Bitcount_Grid_Double } from "next/font/google";
import "./globals.css";
import RootWrapper from "@/components/wrappers/root-wrapper/root-wrapper";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// const bitcountGridDouble = Bitcount_Grid_Double({
//   variable: "--Bitcount_Grid_Double",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Morphic Notes",
  description: "Morphic Notes",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <RootWrapper>
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 5000,
              unstyled: true,
              classNames: {
                toast: `
                    flex items-center gap-2
                    px-4 py-2 text-txt-primary w-100
                    bg-secondary shadow-outside-small rounded-3xl
                `,
              },
            }}
          />
          {children}

          <div id="modals"></div>
        </RootWrapper>
      </body>
    </html>
  );
}
