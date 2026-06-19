import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

// Photos already present when the server started are served as static
// files from public/gallery directly. This route is the fallback for
// photos uploaded via /admin after startup, which Next's static file
// list (built once at boot) doesn't know about yet.
export async function GET(
  _request: Request,
  context: RouteContext<"/gallery/[filename]">,
) {
  const { filename } = await context.params;
  const contentType = CONTENT_TYPES[path.extname(filename).toLowerCase()];

  if (!contentType || path.basename(filename) !== filename) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const filePath = path.join(GALLERY_DIR, filename);
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return new NextResponse(fs.readFileSync(filePath), {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
