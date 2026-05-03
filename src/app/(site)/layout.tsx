import { BookingProvider } from "@/components/booking/BookingContext";
import { BookingHandler } from "@/components/booking/BookingHandler";
import { BookingModal } from "@/components/booking/BookingModal";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { PageTransitionOverlay } from "@/components/motion/PageTransitionOverlay";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { SoundProvider } from "@/components/motion/SoundProvider";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { MessengerButton } from "@/components/ui/MessengerButton";
import { StickyCTA } from "@/components/ui/StickyCTA";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SoundProvider>
      <BookingProvider>
        <PageTransitionOverlay />
        <BookingHandler />
        <BookingModal />
        <CustomCursor />
        <Header />
        <SmoothScrollProvider>
          <main className="flex-1">{children}</main>
        </SmoothScrollProvider>
        <Footer />
        <StickyCTA />
        <MessengerButton />
        <CookieBanner />
      </BookingProvider>
    </SoundProvider>
  );
}
