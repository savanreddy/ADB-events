import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import MasonryGallery from "@/components/MasonryGallery";
import { getPortfolioImages } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Browse our full portfolio of wedding, portrait and event photography.",
};

export default function PortfolioPage() {
  const gallery = getPortfolioImages();

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
      <SectionHeading
        title="Portfolio"
        subtitle="A collection of moments from weddings, portraits and events. Click any photo for a closer look."
      />
      <div className="mt-12">
        <MasonryGallery images={gallery} />
      </div>
    </div>
  );
}
