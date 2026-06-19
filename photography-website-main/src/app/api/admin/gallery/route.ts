import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { getGalleryImages } from "@/lib/content";

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");
const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

export async function GET() {
  return NextResponse.json({ images: getGalleryImages() });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const files = formData.getAll("files").filter((entry): entry is File => entry instanceof File);

  if (files.length === 0) {
    return NextResponse.json({ error: "No files received" }, { status: 400 });
  }

  if (!fs.existsSync(GALLERY_DIR)) {
    fs.mkdirSync(GALLERY_DIR, { recursive: true });
  }

  const saved: string[] = [];
  const skipped: string[] = [];

  for (const file of files) {
    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      skipped.push(file.name);
      continue;
    }

    const base = path.basename(file.name, ext).replace(/[^a-zA-Z0-9-_]/g, "-") || "photo";
    let filename = `${base}${ext}`;
    let counter = 1;
    while (fs.existsSync(path.join(GALLERY_DIR, filename))) {
      filename = `${base}-${counter}${ext}`;
      counter++;
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(path.join(GALLERY_DIR, filename), buffer);
    saved.push(filename);
  }

  return NextResponse.json({ success: true, saved, skipped, images: getGalleryImages() });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get("file");

  if (!file) {
    return NextResponse.json({ error: "Missing file parameter" }, { status: 400 });
  }

  const filename = path.basename(file);
  if (filename !== file || !ALLOWED_EXTENSIONS.has(path.extname(filename).toLowerCase())) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }

  const filePath = path.join(GALLERY_DIR, filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  return NextResponse.json({ success: true, images: getGalleryImages() });
}
