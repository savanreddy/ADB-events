import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import CtaButton from "@/components/motion/CtaButton";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description: "Photography packages and pricing for weddings, portraits and events.",
};

export default function ServicesPage() {
  const site = getSiteContent();

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
      <SectionHeading
        title="Services & Pricing"
        subtitle="A range of packages tailored to your story — from intimate portraits to full wedding-day coverage."
      />

      <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {site.services.map((service, index) => (
          <RevealItem key={service.title}>
            <ServiceCard index={index} {...service} />
          </RevealItem>
        ))}
      </RevealGroup>

      {site.pricingText && (
        <div className="mx-auto mt-16 max-w-2xl rounded-lg border border-white/10 bg-charcoal p-8 text-center">
          <p className="text-sm leading-relaxed text-stone">{site.pricingText}</p>
        </div>
      )}

      <div className="mt-12 text-center">
        <CtaButton href="/contact">Get a Custom Quote</CtaButton>
      </div>
    </div>
  );
}
