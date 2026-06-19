import { NextResponse } from "next/server";
import {
  getContactContent,
  getSiteContent,
  saveContactContent,
  saveSiteContent,
} from "@/lib/content";
import type { ContactContent, SiteContent } from "@/types/content";

export async function GET() {
  return NextResponse.json({
    site: getSiteContent(),
    contact: getContactContent(),
  });
}

export async function POST(request: Request) {
  const body = (await request.json()) as { site?: SiteContent; contact?: ContactContent };

  if (!body.site || typeof body.site !== "object") {
    return NextResponse.json({ error: "Missing or invalid site data" }, { status: 400 });
  }

  if (!body.contact || typeof body.contact !== "object") {
    return NextResponse.json({ error: "Missing or invalid contact data" }, { status: 400 });
  }

  saveSiteContent(body.site);
  saveContactContent(body.contact);

  return NextResponse.json({ success: true });
}
