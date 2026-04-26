import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { SoundProvider } from "@/components/motion/SoundProvider";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { MessengerButton } from "@/components/ui/MessengerButton";
import { StickyCTA } from "@/components/ui/StickyCTA";

import { fraunces, inter, jetbrains } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "BASE Premier",
  description: "Премиальный барбершоп в Казани. Шаляпина 26.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-bg-primary">
        <SoundProvider>
          <CustomCursor />
          <Header />
          <SmoothScrollProvider>
            <main className="flex-1">{children}</main>
          </SmoothScrollProvider>
          <Footer />
          <StickyCTA />
          <MessengerButton />
          <CookieBanner />
        </SoundProvider>
      </body>
    </html>
  );
}
