import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import TeamMemberCard from "@/components/TeamMemberCard";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about our photography studio and the team behind the camera.",
};

export default function AboutPage() {
  const site = getSiteContent();

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
      <SectionHeading title={site.about.title} />

      <div className="mt-14 grid gap-12 md:grid-cols-2 md:items-center">
        <Reveal x={32} y={0} className="md:order-2">
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
        <Reveal x={-32} y={0} delay={0.1} className="md:order-1">
          <p className="whitespace-pre-line text-base leading-relaxed text-stone sm:text-lg">
            {site.about.text}
          </p>
        </Reveal>
      </div>

      {site.team.length > 0 && (
        <div className="mt-20">
          <SectionHeading title="Meet the Team" />
          <RevealGroup
            className={`mt-12 grid gap-6 ${
              site.team.length === 1
                ? "mx-auto sm:max-w-sm"
                : site.team.length === 2
                  ? "mx-auto sm:max-w-3xl sm:grid-cols-2"
                  : "sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {site.team.map((member, index) => (
              <RevealItem key={index}>
                <TeamMemberCard {...member} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      )}
    </div>
  );
}
