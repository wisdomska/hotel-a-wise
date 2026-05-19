export type Hero = {
  headline: string;
  subtext: string;
  cta_text: string;
  cta_link: string;
  background_image_url: string;
};

export type Amenity = {
  id: string;
  name: string;
  type: "feature" | "coming_soon";
  description?: string | null;
  image_url?: string | null;
  display_order: number;
  status: "published" | "draft";
};

export type Room = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  bed_summary: string;
  capacity: number;
  price_per_night: number | null;
  hero_image_url: string;
  gallery: string[] | null;
  display_order: number;
  status: "published" | "draft";
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  location: string | null;
  rating: number | null;
  featured: boolean;
  display_order: number;
  status: "published" | "draft";
};

export type ContactInfo = {
  phone: string;
  email: string;
  address: string;
  maps_link: string | null;
  copyright_text: string;
  footer_tagline: string | null;
};

export type LandingContent = {
  hero: Hero;
  amenities: Amenity[];
  comingSoon: Amenity[];
  rooms: Room[];
  featuredTestimonial: Testimonial | null;
  contact: ContactInfo;
};
