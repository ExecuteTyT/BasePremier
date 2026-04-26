import { BarbersPreviewSection } from "@/components/sections/BarbersPreviewSection";
import { CtaFinalSection } from "@/components/sections/CtaFinalSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { HeroSection } from "@/components/sections/Hero/HeroSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { ServicesPreviewSection } from "@/components/sections/ServicesPreviewSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ManifestoSection />
      <ServicesPreviewSection />
      <BarbersPreviewSection />
      <ProcessSection />
      <ReviewsSection />
      <FaqSection />
      <CtaFinalSection />
    </>
  );
}
