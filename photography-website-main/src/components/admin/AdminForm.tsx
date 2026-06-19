"use client";

import { useState, type ChangeEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, Loader2, Plus, Trash2, Upload } from "lucide-react";
import type {
  ContactContent,
  GalleryImage,
  ServiceItem,
  SiteContent,
  TeamMember,
  TestimonialItem,
} from "@/types/content";

interface AdminFormProps {
  initialSite: SiteContent;
  initialContact: ContactContent;
  initialGallery: GalleryImage[];
}

const inputClass =
  "w-full rounded-md border border-white/10 bg-ink px-3 py-2 text-sm text-cream placeholder:text-stone/40 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30";
const labelClass = "mb-1.5 block text-xs font-medium tracking-widest text-gold uppercase";
const sectionClass = "rounded-lg border border-white/10 bg-charcoal p-6";
const sectionTitleClass = "font-display text-xl text-cream mb-5 border-b border-white/10 pb-3";
const removeButtonClass =
  "flex items-center gap-1 rounded-md border border-white/10 px-3 py-1.5 text-xs text-stone transition-colors hover:border-red-400/50 hover:text-red-400";
const addButtonClass =
  "flex items-center gap-2 rounded-md border border-gold/40 px-4 py-2 text-sm text-gold transition-colors hover:bg-gold hover:text-ink";

type Status = { type: "idle" | "saving" | "success" | "error"; message?: string };

export default function AdminForm({ initialSite, initialContact, initialGallery }: AdminFormProps) {
  const [site, setSite] = useState<SiteContent>(initialSite);
  const [contact, setContact] = useState<ContactContent>(initialContact);
  const [gallery, setGallery] = useState<GalleryImage[]>(initialGallery);
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [uploading, setUploading] = useState(false);

  const updateField = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) =>
    setSite((prev) => ({ ...prev, [key]: value }));

  const updateHero = (key: "title" | "subtitle", value: string) =>
    setSite((prev) => ({ ...prev, hero: { ...prev.hero, [key]: value } }));

  const addHeroImage = () =>
    setSite((prev) => ({ ...prev, hero: { ...prev.hero, images: [...prev.hero.images, ""] } }));

  const updateHeroImage = (index: number, value: string) =>
    setSite((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        images: prev.hero.images.map((image, i) => (i === index ? value : image)),
      },
    }));

  const removeHeroImage = (index: number) =>
    setSite((prev) => ({
      ...prev,
      hero: { ...prev.hero, images: prev.hero.images.filter((_, i) => i !== index) },
    }));

  const updateAbout = (key: keyof SiteContent["about"], value: string) =>
    setSite((prev) => ({ ...prev, about: { ...prev.about, [key]: value } }));

  const updateContactField = (key: keyof ContactContent, value: string) =>
    setContact((prev) => ({ ...prev, [key]: value }));

  const updateService = (index: number, key: keyof ServiceItem, value: string) =>
    setSite((prev) => ({
      ...prev,
      services: prev.services.map((service, i) =>
        i === index ? { ...service, [key]: value } : service
      ),
    }));

  const addService = () =>
    setSite((prev) => ({
      ...prev,
      services: [...prev.services, { title: "", description: "", price: "" }],
    }));

  const removeService = (index: number) =>
    setSite((prev) => ({ ...prev, services: prev.services.filter((_, i) => i !== index) }));

  const updateTestimonial = (index: number, key: keyof TestimonialItem, value: string) =>
    setSite((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((t, i) => (i === index ? { ...t, [key]: value } : t)),
    }));

  const addTestimonial = () =>
    setSite((prev) => ({
      ...prev,
      testimonials: [...prev.testimonials, { name: "", role: "", text: "", videoUrl: "" }],
    }));

  const removeTestimonial = (index: number) =>
    setSite((prev) => ({ ...prev, testimonials: prev.testimonials.filter((_, i) => i !== index) }));

  const updateTeamMember = (index: number, key: keyof TeamMember, value: string) =>
    setSite((prev) => ({
      ...prev,
      team: prev.team.map((member, i) => (i === index ? { ...member, [key]: value } : member)),
    }));

  const addTeamMember = () =>
    setSite((prev) => ({
      ...prev,
      team: [...prev.team, { name: "", role: "", bio: "", photo: "" }],
    }));

  const removeTeamMember = (index: number) =>
    setSite((prev) => ({ ...prev, team: prev.team.filter((_, i) => i !== index) }));

  const handleSave = async () => {
    setStatus({ type: "saving" });
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ site, contact }),
      });
      if (!res.ok) throw new Error("Save failed");
      setStatus({ type: "success", message: "Saved! Your changes are now live on the website." });
    } catch {
      setStatus({ type: "error", message: "Something went wrong while saving. Please try again." });
    }
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));

    try {
      const res = await fetch("/api/admin/gallery", { method: "POST", body: formData });
      const data = await res.json();
      if (data.images) setGallery(data.images);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDeleteImage = async (filename: string) => {
    if (!window.confirm(`Delete "${filename}" from the gallery? This cannot be undone.`)) return;

    const res = await fetch(`/api/admin/gallery?file=${encodeURIComponent(filename)}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.images) setGallery(data.images);
  };

  return (
    <div className="space-y-8 pb-16">
      <SaveBar status={status} onSave={handleSave} />

      {/* Site Basics */}
      <section className={sectionClass}>
        <h2 className={sectionTitleClass}>Site Basics</h2>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Website Title</label>
            <input
              type="text"
              value={site.siteTitle}
              onChange={(e) => updateField("siteTitle", e.target.value)}
              className={inputClass}
            />
            <p className="mt-1.5 text-xs text-stone/70">
              Shown in the browser tab and search engine results.
            </p>
          </div>
          <div>
            <label className={labelClass}>Website Description</label>
            <textarea
              value={site.siteDescription}
              onChange={(e) => updateField("siteDescription", e.target.value)}
              rows={2}
              className={inputClass}
            />
            <p className="mt-1.5 text-xs text-stone/70">
              A short summary used by search engines (Google, etc).
            </p>
          </div>
          <div>
            <label className={labelClass}>Photographer / Studio Name</label>
            <input
              type="text"
              value={site.photographerName}
              onChange={(e) => updateField("photographerName", e.target.value)}
              className={inputClass}
            />
            <p className="mt-1.5 text-xs text-stone/70">
              Shown in the navigation bar, footer and homepage banner.
            </p>
          </div>
          <ImagePathField
            label="Logo"
            value={site.logo}
            onChange={(value) => updateField("logo", value)}
            gallery={gallery}
            hint='Leave blank to show your studio name as text instead of a logo. To use a logo image, drop a file into "public" and enter its path here, e.g. /logo.png'
          />
        </div>
      </section>

      {/* Hero Section */}
      <section className={sectionClass}>
        <h2 className={sectionTitleClass}>Homepage Banner (Hero)</h2>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Hero Title</label>
            <input
              type="text"
              value={site.hero.title}
              onChange={(e) => updateHero("title", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Hero Subtitle</label>
            <input
              type="text"
              value={site.hero.subtitle}
              onChange={(e) => updateHero("subtitle", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Hero Background Photos</label>
            <p className="mb-3 text-xs text-stone/70">
              Add one or more photos for the homepage banner. With two or more, they
              automatically rotate in a slideshow. Leave empty to use the first photo from your
              gallery.
            </p>
            <div className="space-y-3">
              {site.hero.images.map((image, index) => (
                <div key={index} className="rounded-md border border-white/10 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs tracking-widest text-stone uppercase">
                      Photo {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeHeroImage(index)}
                      className={removeButtonClass}
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                  <ImagePathField
                    label="Image"
                    value={image}
                    onChange={(value) => updateHeroImage(index, value)}
                    gallery={gallery}
                  />
                </div>
              ))}
            </div>
            <button type="button" onClick={addHeroImage} className={`${addButtonClass} mt-3`}>
              <Plus size={16} /> Add Photo
            </button>
          </div>
        </div>
      </section>

      {/* Homepage Text */}
      <section className={sectionClass}>
        <h2 className={sectionTitleClass}>Homepage Introduction</h2>
        <div>
          <label className={labelClass}>Intro Text</label>
          <textarea
            value={site.homepageText}
            onChange={(e) => updateField("homepageText", e.target.value)}
            rows={4}
            className={inputClass}
          />
          <p className="mt-1.5 text-xs text-stone/70">
            A short welcome message shown near the top of the homepage.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className={sectionClass}>
        <h2 className={sectionTitleClass}>About Page</h2>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>About Title</label>
            <input
              type="text"
              value={site.about.title}
              onChange={(e) => updateAbout("title", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>About Text</label>
            <textarea
              value={site.about.text}
              onChange={(e) => updateAbout("text", e.target.value)}
              rows={6}
              className={inputClass}
            />
          </div>
          <ImagePathField
            label="About Photo"
            value={site.about.image}
            onChange={(value) => updateAbout("image", value)}
            gallery={gallery}
            hint="Shown next to the About text on the homepage and About page."
          />
        </div>
      </section>

      {/* Team / Staff */}
      <section className={sectionClass}>
        <h2 className={sectionTitleClass}>Team / Staff</h2>
        <p className="mb-4 text-sm leading-relaxed text-stone">
          Shown on the About page as &quot;Meet the Team&quot;. Add yourself, your partner and any
          staff &mdash; their photo, role and a short description of what they do.
        </p>
        <div className="space-y-4">
          {site.team.map((member, index) => (
            <div key={index} className="rounded-md border border-white/10 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs tracking-widest text-stone uppercase">
                  Team Member {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeTeamMember(index)}
                  className={removeButtonClass}
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
              <div className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Name</label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => updateTeamMember(index, "name", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Role</label>
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e) => updateTeamMember(index, "role", e.target.value)}
                      className={inputClass}
                      placeholder="e.g. Founder & Lead Photographer"
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>What they do</label>
                  <textarea
                    value={member.bio}
                    onChange={(e) => updateTeamMember(index, "bio", e.target.value)}
                    rows={3}
                    className={inputClass}
                  />
                </div>
                <ImagePathField
                  label="Photo"
                  value={member.photo}
                  onChange={(value) => updateTeamMember(index, "photo", value)}
                  gallery={gallery}
                />
              </div>
            </div>
          ))}
          <button type="button" onClick={addTeamMember} className={addButtonClass}>
            <Plus size={16} /> Add Team Member
          </button>
        </div>
      </section>

      {/* Services */}
      <section className={sectionClass}>
        <h2 className={sectionTitleClass}>Services</h2>
        <div className="space-y-4">
          {site.services.map((service, index) => (
            <div key={index} className="rounded-md border border-white/10 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs tracking-widest text-stone uppercase">
                  Service {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeService(index)}
                  className={removeButtonClass}
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className={labelClass}>Title</label>
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => updateService(index, "title", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Description</label>
                  <textarea
                    value={service.description}
                    onChange={(e) => updateService(index, "description", e.target.value)}
                    rows={2}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Price</label>
                  <input
                    type="text"
                    value={service.price}
                    onChange={(e) => updateService(index, "price", e.target.value)}
                    className={inputClass}
                    placeholder="Starting at ₹..."
                  />
                </div>
              </div>
            </div>
          ))}
          <button type="button" onClick={addService} className={addButtonClass}>
            <Plus size={16} /> Add Service
          </button>

          <div className="pt-2">
            <label className={labelClass}>Pricing Note (optional)</label>
            <textarea
              value={site.pricingText}
              onChange={(e) => updateField("pricingText", e.target.value)}
              rows={3}
              className={inputClass}
            />
            <p className="mt-1.5 text-xs text-stone/70">
              Shown below the service list on the Services page.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={sectionClass}>
        <h2 className={sectionTitleClass}>Testimonials</h2>
        <div className="space-y-4">
          {site.testimonials.map((testimonial, index) => (
            <div key={index} className="rounded-md border border-white/10 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs tracking-widest text-stone uppercase">
                  Testimonial {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeTestimonial(index)}
                  className={removeButtonClass}
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
              <div className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Name</label>
                    <input
                      type="text"
                      value={testimonial.name}
                      onChange={(e) => updateTestimonial(index, "name", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Role / Event</label>
                    <input
                      type="text"
                      value={testimonial.role}
                      onChange={(e) => updateTestimonial(index, "role", e.target.value)}
                      className={inputClass}
                      placeholder="e.g. Wedding, Goa"
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>YouTube Video Link</label>
                  <input
                    type="text"
                    value={testimonial.videoUrl ?? ""}
                    onChange={(e) => updateTestimonial(index, "videoUrl", e.target.value)}
                    className={inputClass}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  <p className="mt-1.5 text-xs text-stone/70">
                    Paste a YouTube link of the client&apos;s video review. It shows as a
                    thumbnail that plays when visitors hover over it.
                  </p>
                </div>
                <div>
                  <label className={labelClass}>Quote (used if no video is set)</label>
                  <textarea
                    value={testimonial.text}
                    onChange={(e) => updateTestimonial(index, "text", e.target.value)}
                    rows={3}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          ))}
          <button type="button" onClick={addTestimonial} className={addButtonClass}>
            <Plus size={16} /> Add Testimonial
          </button>
        </div>
      </section>

      {/* Contact Information */}
      <section className={sectionClass}>
        <h2 className={sectionTitleClass}>Contact Information</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Phone Number</label>
            <input
              type="text"
              value={contact.phone}
              onChange={(e) => updateContactField("phone", e.target.value)}
              className={inputClass}
              placeholder="+91 98765 43210"
            />
          </div>
          <div>
            <label className={labelClass}>WhatsApp Number</label>
            <input
              type="text"
              value={contact.whatsapp}
              onChange={(e) => updateContactField("whatsapp", e.target.value)}
              className={inputClass}
              placeholder="919876543210"
            />
            <p className="mt-1.5 text-xs text-stone/70">
              Country code + number, digits only, no spaces or symbols.
            </p>
          </div>
          <div>
            <label className={labelClass}>Email Address</label>
            <input
              type="email"
              value={contact.email}
              onChange={(e) => updateContactField("email", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Instagram Link</label>
            <input
              type="text"
              value={contact.instagram}
              onChange={(e) => updateContactField("instagram", e.target.value)}
              className={inputClass}
              placeholder="https://instagram.com/yourhandle"
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Address / Location</label>
            <input
              type="text"
              value={contact.address}
              onChange={(e) => updateContactField("address", e.target.value)}
              className={inputClass}
              placeholder="City, Country"
            />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className={sectionClass}>
        <h2 className={sectionTitleClass}>Gallery Photos</h2>
        <p className="mb-4 text-sm leading-relaxed text-stone">
          Upload photos below, or copy image files directly into the{" "}
          <code className="rounded bg-ink px-1.5 py-0.5 text-gold">public/gallery</code> folder on
          your computer — they&apos;ll appear here and on the website automatically. Supported
          formats: JPG, PNG, WEBP, GIF.
        </p>

        <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border border-gold/40 px-4 py-2 text-sm text-gold transition-colors hover:bg-gold hover:text-ink">
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          {uploading ? "Uploading…" : "Upload Photos"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>

        {gallery.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {gallery.map((image) => (
              <div
                key={image.src}
                className="group relative aspect-square overflow-hidden rounded-md bg-ink ring-1 ring-white/10 transition-colors group-hover:ring-gold/30"
              >
                <Image
                  src={image.src}
                  alt={image.name}
                  fill
                  sizes="200px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(image.name)}
                  aria-label={`Delete ${image.name}`}
                  className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-ink/80 text-cream opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-500"
                >
                  <Trash2 size={14} />
                </button>
                <p className="absolute inset-x-0 bottom-0 truncate bg-ink/80 px-2 py-1 text-[10px] text-stone">
                  {image.name}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-stone">
            No photos yet. Upload some above to get started.
          </p>
        )}
      </section>

      <SaveBar status={status} onSave={handleSave} />
    </div>
  );
}

function SaveBar({ status, onSave }: { status: Status; onSave: () => void }) {
  return (
    <div className="sticky top-[72px] z-30 flex flex-wrap items-center gap-4 rounded-lg border border-white/10 bg-charcoal/90 p-4 backdrop-blur-md">
      <motion.button
        type="button"
        onClick={onSave}
        disabled={status.type === "saving"}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-2 rounded-full bg-gold px-8 py-3 text-sm font-medium tracking-wide text-ink uppercase transition-colors hover:bg-gold-light disabled:opacity-60"
      >
        {status.type === "saving" && <Loader2 size={16} className="animate-spin" />}
        {status.type === "saving" ? "Saving…" : "Save Changes"}
      </motion.button>

      <AnimatePresence mode="wait">
        {status.type === "success" && (
          <motion.p
            key="success"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2 text-sm text-green-400"
          >
            <Check size={16} /> {status.message}
          </motion.p>
        )}
        {status.type === "error" && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2 text-sm text-red-400"
          >
            <AlertCircle size={16} /> {status.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function ImagePathField({
  label,
  value,
  onChange,
  gallery,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  gallery: GalleryImage[];
  hint?: string;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/gallery/your-photo.jpg"
          className={inputClass}
        />
        {gallery.length > 0 && (
          <select
            value=""
            onChange={(e) => {
              if (e.target.value) onChange(e.target.value);
            }}
            className={`${inputClass} sm:w-56`}
          >
            <option value="">Choose from gallery…</option>
            {gallery.map((image) => (
              <option key={image.src} value={image.src}>
                {image.name}
              </option>
            ))}
          </select>
        )}
      </div>
      {hint && <p className="mt-1.5 text-xs text-stone/70">{hint}</p>}
    </div>
  );
}
