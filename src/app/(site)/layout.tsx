import { BookingHandler } from "@/components/booking/BookingHandler";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { SoundProvider } from "@/components/motion/SoundProvider";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { MessengerButton } from "@/components/ui/MessengerButton";
import { StickyCTA } from "@/components/ui/StickyCTA";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SoundProvider>
      <BookingHandler />
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
  );
}
