import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import MasonryGallery from "@/components/MasonryGallery";
import ServiceCard from "@/components/ServiceCard";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { getPortfolioImages, getSiteContent } from "@/lib/content";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import CtaButton from "@/components/motion/CtaButton";

export const dynamic = "force-dynamic";

export default function Home() {
  const site = getSiteContent();
  const gallery = getPortfolioImages();
  const heroImages =
    site.hero.images.length > 0
      ? site.hero.images
      : site.hero.image
        ? [site.hero.image]
        : gallery[0]
          ? [gallery[0].src]
          : [];
  const featured = gallery.slice(0, 8);

  return (
    <>
      <Hero
        title={site.hero.title}
        subtitle={site.hero.subtitle}
        images={heroImages}
        photographerName={site.photographerName}
      />

      <section className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
        <Reveal>
          <p className="text-xl leading-relaxed font-light text-pretty text-stone sm:text-2xl">
            {site.homepageText}
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28 md:px-10 md:pb-36">
        <SectionHeading
          title="Featured Photography"
          subtitle="A glimpse into recent sessions — explore the full portfolio for more."
        />
        <div className="mt-16">
          <MasonryGallery images={featured} />
        </div>
        <div className="mt-14 text-center">
          <Link
            href="/portfolio"
            className="inline-block rounded-full border border-gold/70 px-9 py-3.5 text-xs font-medium tracking-[0.12em] text-gold uppercase transition-colors hover:bg-gold hover:text-ink"
          >
            View Full Portfolio
          </Link>
        </div>
      </section>

      <section className="bg-charcoal py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionHeading
            title="Services"
            subtitle="A range of packages tailored to your story — from intimate portraits to full wedding-day coverage."
          />
          <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {site.services.slice(0, 4).map((service, index) => (
              <RevealItem key={service.title}>
                <ServiceCard index={index} {...service} />
              </RevealItem>
            ))}
          </RevealGroup>
          <div className="mt-14 text-center">
            <Link
              href="/services"
              className="inline-block rounded-full border border-gold/70 px-9 py-3.5 text-xs font-medium tracking-[0.12em] text-gold uppercase transition-colors hover:bg-gold hover:text-ink"
            >
              See All Services &amp; Pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36">
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          <Reveal x={-32} y={0}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-charcoal">
              {site.about.image ? (
                <Image
                  src={site.about.image}
                  alt={site.about.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-stone">
                  <span className="font-display text-2xl">{site.photographerName}</span>
                </div>
              )}
            </div>
          </Reveal>
          <Reveal x={32} y={0} delay={0.1}>
            <SectionHeading title={site.about.title} align="left" />
            <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-pretty text-stone/85">
              {site.about.text.length > 320
                ? `${site.about.text.slice(0, 320).trim()}…`
                : site.about.text}
            </p>
            <Link
              href="/about"
              className="mt-8 inline-block rounded-full border border-gold/70 px-9 py-3.5 text-xs font-medium tracking-[0.12em] text-gold uppercase transition-colors hover:bg-gold hover:text-ink"
            >
              More About Us
            </Link>
          </Reveal>
        </div>
      </section>

      {site.testimonials.length > 0 && (
        <section className="bg-charcoal py-28 md:py-36">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <SectionHeading
              title="What Clients Say"
              subtitle="A few notes from the people we've had the pleasure of working with."
            />
            <Reveal>
              <TestimonialsCarousel testimonials={site.testimonials} />
            </Reveal>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36">
        <Reveal className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-charcoal px-6 py-20 text-center sm:py-24">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,164,92,0.08),transparent_60%)]"
            aria-hidden="true"
          />
          <div className="relative">
            <SectionHeading
              title="Ready to capture your story?"
              subtitle="Reach out with your dates and ideas — we'd love to hear from you."
            />
            <div className="mt-8">
              <CtaButton href="/contact">Get in Touch</CtaButton>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
