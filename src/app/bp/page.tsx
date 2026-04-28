import { Metadata } from "next";

import { BpClient } from "./BpClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "bp — BASE Premier",
  description: "Monogram study.",
  robots: { index: false, follow: false },
};

export default function BpPage() {
  return <BpClient />;
}
