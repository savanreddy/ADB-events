# Client Photography Website

A premium, fast-loading photography portfolio site built with **Next.js**,
**TypeScript** and **Tailwind CSS**. It includes a simple `/admin` page so a
non-technical photographer can update text, pricing, contact details and
gallery photos without touching any code.

There is **no database, no login, and no CMS** — everything is stored in
plain JSON files and image files on disk.

## 1. Running the site

You need [Node.js](https://nodejs.org) version 20.9 or newer installed.

```bash
npm install   # only needed the first time, or after pulling new code
npm run dev   # starts the site at http://localhost:3000
```

To run it in "production mode" (faster, used on a real server):

```bash
npm run build
npm run start
```

> Editing content through `/admin` writes to files on disk, so the admin
> page only works while the Node.js server (`npm run dev` or `npm run start`)
> is actually running — not on a fully static export.

## 2. Editing the website content

Go to **`/admin`** (e.g. `http://localhost:3000/admin`) in your browser.

From there you can edit:

- Logo, website title & description
- Photographer / studio name
- Homepage banner (hero) title, subtitle and background image
- Homepage introduction text
- About page title, text and photo
- Services and pricing
- Testimonials
- Contact details (phone, WhatsApp, email, Instagram, address)
- Gallery photos (upload or delete)

Click **"Save Changes"** at the top or bottom of the page — the live site
updates immediately, no rebuild needed.

> **Note:** `/admin` has **no password or login**, by design (this was a
> deliberate simplicity choice). Anyone who knows the URL can edit the site.
> Before sharing the live website link publicly, either:
> - keep the `/admin` URL private, or
> - add simple password protection at your hosting provider (most hosts,
>   including Vercel, offer this), or
> - ask for a proper login system to be added later.
>
> `/admin` is already excluded from search engines via `robots.txt`.

## 3. Adding / removing gallery photos

**Option A — through the admin page (easiest):**
Go to `/admin` → "Gallery Photos" → click "Upload Photos" and select one or
more images. To remove a photo, hover over it and click the trash icon.

**Option B — manually:**
Drop image files (JPG, PNG, WEBP or GIF) directly into the
`public/gallery` folder. They'll show up on the **Home** and **Portfolio**
pages automatically — no code changes needed. To remove a photo, just delete
the file from that folder.

## 4. How content is stored

```
content/
  site.json     ← logo, hero, about, services, testimonials, homepage text
  contact.json  ← phone, WhatsApp, email, Instagram, address

public/
  gallery/      ← all portfolio photos shown on the site
  logo.png      ← (optional) put your logo file here and set its path
                   in /admin → "Site Basics" → "Logo"
```

You (or a developer) can also edit these JSON files directly with any text
editor — the website reads them on every page load.

## 5. Pages

| Page | URL |
| --- | --- |
| Home | `/` |
| Portfolio (full gallery) | `/portfolio` |
| About | `/about` |
| Services & Pricing | `/services` |
| Contact | `/contact` |
| Admin (edit content) | `/admin` |

## 6. Tech stack

- [Next.js](https://nextjs.org) (App Router)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [lucide-react](https://lucide.dev) for icons
- [image-size](https://www.npmjs.com/package/image-size) to auto-detect
  gallery photo dimensions for the masonry layout

## 7. Live links

- **Live site (share this with the client):** https://photography-website-production-42c9.up.railway.app
- **Source code:**[ https://github.com/savanreddy/ADB-events]([url](https://github.com/savanreddy/ADB-events)
- )

### Publishing updates

The live site is deployed on [Railway](https://railway.app), which runs the
app exactly like `npm run build && npm run start` on your machine — so
`/admin` works fully on the live site too (edits and photo uploads persist).

To push a new version after making changes locally:

```bash
git add -A && git commit -m "describe your change"
git push                      # updates the GitHub repo
npx @railway/cli@latest up --detach   # deploys the update live
```

(First-time setup already linked this folder to the Railway project, so `up`
just redeploys the current code.)

## 8. Deploying later

This app is a standard Next.js app and can be deployed to any Node.js
hosting platform (e.g. Vercel, Railway, a VPS). Because `/admin` writes to
the local filesystem, make sure the hosting environment has a **persistent**
filesystem (not a read-only or ephemeral one) if you want the admin page to
keep working in production. Set the `NEXT_PUBLIC_SITE_URL` environment
variable to your real domain so the sitemap links are correct.
