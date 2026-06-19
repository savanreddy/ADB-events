export interface ServiceItem {
  title: string;
  description: string;
  price: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  text: string;
  videoUrl?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string;
}

export interface SiteContent {
  siteTitle: string;
  siteDescription: string;
  logo: string;
  photographerName: string;
  hero: {
    title: string;
    subtitle: string;
    image: string;
    images: string[];
  };
  homepageText: string;
  about: {
    title: string;
    text: string;
    image: string;
  };
  services: ServiceItem[];
  pricingText: string;
  testimonials: TestimonialItem[];
  team: TeamMember[];
}

export interface ContactContent {
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  address: string;
}

export interface GalleryImage {
  src: string;
  name: string;
  width: number;
  height: number;
}
