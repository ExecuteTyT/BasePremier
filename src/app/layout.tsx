import type { Metadata } from "next";
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
    <html lang="ru" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
