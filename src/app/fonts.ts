import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

// Fraunces has no Cyrillic subset — display use is English-only (hero, section marks)
export const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz", "SOFT", "WONK"],
  variable: "--font-fraunces",
  display: "swap",
  preload: true,
});

export const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});
