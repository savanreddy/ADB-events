import type { Metadata } from "next";
import AdminForm from "@/components/admin/AdminForm";
import Reveal from "@/components/motion/Reveal";
import { getContactContent, getGalleryImages, getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  const site = getSiteContent();
  const contact = getContactContent();
  const gallery = getGalleryImages();

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 md:px-10">
      <Reveal className="mb-10">
        <p className="text-sm tracking-[0.2em] text-gold uppercase">Site Admin</p>
        <h1 className="font-display text-3xl text-cream sm:text-4xl">Edit Website Content</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone">
          Update text, pricing, contact details and photos below. Click{" "}
          <span className="text-gold">&ldquo;Save Changes&rdquo;</span> when you&apos;re done —
          the website updates right away. No coding needed.
        </p>
      </Reveal>
      <AdminForm initialSite={site} initialContact={contact} initialGallery={gallery} />
    </div>
  );
}
