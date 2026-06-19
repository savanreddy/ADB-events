import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getContactContent, getSiteContent } from "@/lib/content";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = getSiteContent();
  return {
    title: {
      default: site.siteTitle,
      template: `%s | ${site.siteTitle}`,
    },
    description: site.siteDescription,
    openGraph: {
      title: site.siteTitle,
      description: site.siteDescription,
      type: "website",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = getSiteContent();
  const contact = getContactContent();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink text-cream">
        <Navbar logo={site.logo} photographerName={site.photographerName} />
        <main className="flex-1">{children}</main>
        <Footer photographerName={site.photographerName} contact={contact} />
        <WhatsAppButton whatsapp={contact.whatsapp} />
      </body>
    </html>
  );
}
