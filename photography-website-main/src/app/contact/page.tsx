import type { ComponentType } from "react";
import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { getContactContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch to book your wedding, portrait or event photography session.",
};

export default function ContactPage() {
  const contact = getContactContent();
  const whatsappDigits = contact.whatsapp.replace(/[^0-9]/g, "");

  const cards = [
    contact.phone && {
      icon: Phone,
      label: "Call Us",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s+/g, "")}`,
    },
    contact.whatsapp && {
      icon: MessageCircle,
      label: "WhatsApp",
      value: contact.phone || "Message us",
      href: `https://wa.me/${whatsappDigits}`,
    },
    contact.email && {
      icon: Mail,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    contact.instagram && {
      icon: InstagramIcon,
      label: "Instagram",
      value: "Follow us",
      href: contact.instagram,
    },
  ].filter(Boolean) as {
    icon: ComponentType<{ size?: number; className?: string }>;
    label: string;
    value: string;
    href: string;
  }[];

  return (
    <div className="mx-auto max-w-5xl px-6 py-20 md:px-10">
      <SectionHeading
        title="Let's Create Something Beautiful"
        subtitle="Tell us about your event, your vision and your dates — we'll get back to you as soon as we can."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {cards.map((card) => (
          <a
            key={card.label}
            href={card.href}
            target={card.href.startsWith("http") ? "_blank" : undefined}
            rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex items-center gap-4 rounded-lg border border-white/10 bg-charcoal p-6 transition-colors hover:border-gold/50"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
              <card.icon size={22} />
            </span>
            <span>
              <span className="block text-xs tracking-widest text-gold uppercase">
                {card.label}
              </span>
              <span className="mt-1 block text-base text-cream">{card.value}</span>
            </span>
          </a>
        ))}
      </div>

      {contact.address && (
        <div className="mt-10 flex items-center justify-center gap-3 text-center text-stone">
          <MapPin size={18} className="text-gold" />
          <span>{contact.address}</span>
        </div>
      )}
    </div>
  );
}
