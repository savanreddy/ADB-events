import fs from "fs";
import path from "path";
import { imageSize } from "image-size";
import type { ContactContent, GalleryImage, SiteContent } from "@/types/content";

function getReservedImagePaths(site: SiteContent): Set<string> {
  const reserved = new Set<string>();
  if (site.logo) reserved.add(site.logo);
  if (site.hero.image) reserved.add(site.hero.image);
  for (const image of site.hero.images) reserved.add(image);
  if (site.about.image) reserved.add(site.about.image);
  for (const member of site.team) {
    if (member.photo) reserved.add(member.photo);
  }
  return reserved;
}

// Default content bundled with the app (used the first time it runs, before
// any edits are made through /admin).
const DEFAULT_CONTENT_DIR = path.join(process.cwd(), "content");
const DEFAULT_SITE_FILE = path.join(DEFAULT_CONTENT_DIR, "site.json");
const DEFAULT_CONTACT_FILE = path.join(DEFAULT_CONTENT_DIR, "contact.json");

// Gallery + saved content both live on the persistent volume mounted at
// public/gallery, so a single volume covers everything /admin edits.
const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");
const SITE_FILE = path.join(GALLERY_DIR, "site.json");
const CONTACT_FILE = path.join(GALLERY_DIR, "contact.json");

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

export function getSiteContent(): SiteContent {
  const file = fs.existsSync(SITE_FILE) ? SITE_FILE : DEFAULT_SITE_FILE;
  const raw = fs.readFileSync(file, "utf-8");
  // `team` and `hero.images` were added after some sites already had a saved
  // site.json on disk without them, so default those for older files.
  const data = { team: [], ...JSON.parse(raw) } as SiteContent;
  data.hero.images = data.hero.images ?? [];
  return data;
}

export function getContactContent(): ContactContent {
  const file = fs.existsSync(CONTACT_FILE) ? CONTACT_FILE : DEFAULT_CONTACT_FILE;
  const raw = fs.readFileSync(file, "utf-8");
  return JSON.parse(raw) as ContactContent;
}

export function saveSiteContent(data: SiteContent): void {
  fs.mkdirSync(GALLERY_DIR, { recursive: true });
  fs.writeFileSync(SITE_FILE, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

export function saveContactContent(data: ContactContent): void {
  fs.mkdirSync(GALLERY_DIR, { recursive: true });
  fs.writeFileSync(CONTACT_FILE, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

export function getGalleryImages(): GalleryImage[] {
  if (!fs.existsSync(GALLERY_DIR)) return [];

  const files = fs
    .readdirSync(GALLERY_DIR)
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const images: GalleryImage[] = [];

  for (const file of files) {
    try {
      const filePath = path.join(GALLERY_DIR, file);
      const buffer = fs.readFileSync(filePath);
      const dimensions = imageSize(buffer);
      images.push({
        src: `/gallery/${file}`,
        name: file,
        width: dimensions.width,
        height: dimensions.height,
      });
    } catch {
      // Skip files that can't be read as images
    }
  }

  return images;
}

// The gallery folder also stores photos used for the logo, hero slideshow,
// about photo and team member headshots (selected via /admin). Those
// shouldn't appear again in the public portfolio / homepage gallery.
export function getPortfolioImages(): GalleryImage[] {
  const reserved = getReservedImagePaths(getSiteContent());
  return getGalleryImages().filter((image) => !reserved.has(image.src));
}
