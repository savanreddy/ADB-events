#!/bin/sh
set -e

# On Railway, a persistent volume is mounted at /data so admin edits and
# gallery uploads survive restarts/redeploys. We move public/gallery onto
# that volume (seeding it from the image on first run) before starting the
# server, so Next's startup scan of public/ sees the persisted files.
# Falls back to the bundled gallery as-is when /data isn't available
# (e.g. local dev/build).
DATA_DIR="${DATA_DIR:-/data}"
GALLERY_DIR="public/gallery"

if mkdir -p "$DATA_DIR/gallery" 2>/dev/null; then
  if [ -z "$(ls -A "$DATA_DIR/gallery" 2>/dev/null)" ]; then
    cp -a "$GALLERY_DIR/." "$DATA_DIR/gallery/" 2>/dev/null || true
  fi
  rm -rf "$GALLERY_DIR"
  ln -s "$DATA_DIR/gallery" "$GALLERY_DIR"
fi

exec next start -p "${PORT:-3000}"
