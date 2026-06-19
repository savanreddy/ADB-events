import Link from "next/link";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";
import type { ContactContent } from "@/types/content";

interface FooterProps {
  photographerName: string;
  contact: ContactContent;
}

const footerLinkClass =
  "relative inline-block text-stone transition-colors hover:text-gold after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full";

export default function Footer({ photographerName, contact }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-charcoal">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3 md:px-10">
        <div>
          <p className="font-display text-2xl tracking-[0.02em] text-cream">{photographerName}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone/80">
            Premium photography for weddings, portraits and events — crafted
            with care, delivered with love.
          </p>
        </div>

        <div>
          <p className="text-[0.7rem] tracking-[0.25em] text-gold uppercase">Explore</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link href="/portfolio" className={footerLinkClass}>
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/services" className={footerLinkClass}>
                Services
              </Link>
            </li>
            <li>
              <Link href="/about" className={footerLinkClass}>
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className={footerLinkClass}>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[0.7rem] tracking-[0.25em] text-gold uppercase">Get in touch</p>
          <ul className="mt-4 space-y-3 text-sm text-stone">
            {contact.phone && (
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-gold" />
                <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="transition-colors hover:text-gold">
                  {contact.phone}
                </a>
              </li>
            )}
            {contact.email && (
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-gold" />
                <a href={`mailto:${contact.email}`} className="transition-colors hover:text-gold">
                  {contact.email}
                </a>
              </li>
            )}
            {contact.address && (
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-gold" />
                <span>{contact.address}</span>
              </li>
            )}
            {contact.instagram && (
              <li className="flex items-center gap-2">
                <InstagramIcon size={16} className="text-gold" />
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold"
                >
                  Instagram
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 py-6 text-xs text-stone/70 md:flex-row md:justify-between md:px-10">
          <p>
            © {year} {photographerName}. All rights reserved.
          </p>
          <a
            href="#"
            aria-label="Back to top"
            className="flex items-center gap-1.5 transition-colors hover:text-gold"
          >
            Back to top
            <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
