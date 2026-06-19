# Project Context: ADB Events Photography Website

A Next.js photography portfolio site for **ADB Events**, deployed on Railway
at the custom domain **adbevents.in**. No database — content lives in JSON
files + images on disk, edited via `/admin` (no login, by design — see
README.md for the content-editing model).

## Live deployment

- Primary URL: https://www.adbevents.in (custom domain, SSL valid & verified)
- Railway-provided URL: https://photography-website-production-42c9.up.railway.app
- GitHub: https://github.com/medipelliabhishek/photography-website (branch `main`)
- Domain registrar: Namecheap (adbevents.in)
- Client: non-technical photographer/event business owner — explain things
  in plain terms, avoid jargon when summarizing for them.

## Railway project details

- Project ID: `512e072a-41b5-4654-94eb-d5ad58ef44b1`
- Service: `photography-website` (id `ef46383c-f783-4866-8bd5-2e209e852db7`)
- Environment: `production` (id `9c8b49b4-8623-4039-9cdb-cf8602626ea4`)
- Volume: `photography-website-volume-xusr`
  (id `8e0631c1-b660-4a8e-92b7-b572b70626e9`), mounted at **`/data`**
  (1 volume per service on the free plan — don't try to add a second one)
- Custom domain: `www.adbevents.in`
  (id `02351ec5-1f0a-4822-938d-19d979512533`) — verified, cert valid

### Querying the Railway API

The `railway` CLI's auth is unreliable in this environment. Instead, read the
access token directly and call the GraphQL API:

```bash
node -e "console.log(require('/Users/abhishek/.railway/config.json').user.accessToken)"
# POST to https://backboard.railway.com/graphql/v2 with Authorization: Bearer <token>
```

The token rotates/expires — if a query returns "Not Authorized", re-read it
from `config.json`. Avoid running `railway whoami` or other commands that
trigger an interactive auth refresh unless the user asks for it.

## Persistence architecture (don't "simplify" this without re-reading why)

Railway's filesystem is ephemeral except for the one volume mounted at
`/data`. Two problems this solves:

1. **`/admin` edits reverting on redeploy** — `site.json` / `contact.json`
   now live inside `public/gallery` (the volume-backed dir), with the
   originals in `content/` kept only as defaults/fallback. See
   `src/lib/content.ts` (`SITE_FILE`/`CONTACT_FILE` vs
   `DEFAULT_SITE_FILE`/`DEFAULT_CONTACT_FILE`).

2. **Gallery photos 404ing, or new uploads invisible without a redeploy** —
   this Next.js build (see AGENTS.md — it's a customized sandbox version)
   scans `public/` **once at server boot** to build its static file list.
   Files that appear later (volume mounted after the scan, or `/admin`
   uploads after boot) 404 with no live fallback. Fixed two ways:
   - `scripts/start.sh` (invoked via `npm start`) seeds `/data/gallery` from
     the bundled `public/gallery` on first boot, then symlinks
     `public/gallery -> /data/gallery` **before** `next start` runs, so the
     boot-time scan sees the persisted files.
   - `src/app/gallery/[filename]/route.ts` is a dynamic fallback route that
     serves any file from `public/gallery` straight off disk — covers photos
     uploaded via `/admin` *after* boot, which the static scan never learns
     about.

If gallery storage or content-file storage locations change, both pieces
above need to stay in sync or images/edits will silently break again on the
next redeploy.

## DNS records on Namecheap (adbevents.in)

- URL Redirect Record: `@` → `https://www.adbevents.in`
- CNAME: `www` → Railway-provided target (for the custom domain)
- TXT: `_railway-verify.www` = `railway-verify=74451cac13db1911e791de827c6aa2fdb71aaf907bb031b05ed63c9e5633dcf4`
  (Railway domain-ownership verification, required for SSL issuance)
- TXT (in progress): `@` = `google-site-verification=...` — for Google
  Search Console "Domain" property verification of `adbevents.in`. Value
  comes from Search Console when the user adds the property; ask them for it
  before assuming it's set.

## SEO status

- Page title/branding already reads "ADB EVENTS" (matches the domain/business
  name being searched for).
- `/sitemap.xml` and `/robots.txt` exist and point at the right domain
  (`src/app/sitemap.ts`, `src/app/robots.ts`).
- Next steps: verify `adbevents.in` in Google Search Console (DNS TXT above)
  + submit the sitemap; set up a Google Business Profile for "ADB Events" for
  local/maps visibility.

## Deploying

```bash
git add -A && git commit -m "..."
git push
npx @railway/cli@latest up --detach
```
