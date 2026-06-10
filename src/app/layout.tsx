import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageViewTracker } from "@/components/shared/PageViewTracker";
import { WittyConsole } from "@/components/shared/WittyConsole";
import { TabTitleManager } from "@/components/shared/TabTitleManager";
import { EasterEggProvider } from "@/components/shared/EasterEggProvider";
import { PageTransition } from "@/components/shared/PageTransition";
import { EasterEggPopup } from "@/components/shared/EasterEggPopup";
import { createMetadata } from "@/lib/metadata";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = createMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      {/* 
        Hi there. You looked at the source. 
        That's exactly the kind of person I want to work with.
        siddharthbayapureddy@gmail.com 

        good. now check /well-actually
      */}
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <EasterEggProvider>
          <PageViewTracker />
          <WittyConsole />
          <TabTitleManager />
          <Navbar />
          <main className="flex-1 pt-14">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <EasterEggPopup />
        </EasterEggProvider>
      </body>
    </html>
  );
}
