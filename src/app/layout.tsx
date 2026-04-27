import type { Metadata } from "next";

import { fraunces, inter, jetbrains } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "BASE Premier",
  description: "Премиальный барбершоп в Казани. Шаляпина 26.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-bg-primary">{children}</body>
    </html>
  );
}
