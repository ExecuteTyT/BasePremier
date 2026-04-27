import type { Metadata, Viewport } from "next";

import { YandexMetrika } from "@/components/analytics/YandexMetrika";

import { fraunces, inter, jetbrains } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BASE Premier — Барбершоп в Казани",
    template: "%s",
  },
  description: "Премиальный барбершоп в Казани. Шаляпина 26.",
  metadataBase: new URL("https://basepremier.ru"),
  openGraph: {
    siteName: "BASE Premier",
    locale: "ru_RU",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "BASE Premier — премиальный барбершоп в Казани",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  other: {
    "theme-color": "#0A0A0B",
  },
};

export const viewport: Viewport = {
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-bg-primary">
        <YandexMetrika />
        {children}
      </body>
    </html>
  );
}
