import type {
  Amenity,
  ContactInfo,
  Hero,
  Room,
  Testimonial,
} from "@/types/content";

/**
 * Fallback content used when Supabase is unreachable or unconfigured.
 * Mirrors the published prototype so the site looks complete on first deploy.
 */

export const defaultHero: Hero = {
  headline: "Your Gateway to Unforgettable Memories",
  subtext:
    "Experience exquisite accommodations, premium amenities and warm service tailored to exceed your expectations — all at a refreshingly affordable price.",
  cta_text: "View Rooms",
  cta_link: "#rooms",
  background_image_url:
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1920&q=80",
};

export const defaultAmenities: Amenity[] = [
  { id: "a1", name: "Luxurious Rooms",                  type: "feature", display_order: 1, status: "published" },
  { id: "a2", name: "Customised Sheets",                type: "feature", display_order: 2, status: "published" },
  { id: "a3", name: "Conference Room",                  type: "feature", display_order: 3, status: "published" },
  { id: "a4", name: "Porch for Outdoor Relaxation",     type: "feature", display_order: 4, status: "published" },
  { id: "a5", name: "Spacious Hallway",                 type: "feature", display_order: 5, status: "published" },
  { id: "a6", name: "Premium Bathrooms",                type: "feature", display_order: 6, status: "published" },
  { id: "a7", name: "Compound for Events",              type: "feature", display_order: 7, status: "published" },
];

export const defaultComingSoon: Amenity[] = [
  {
    id: "cs1",
    name: "Breakfast",
    type: "coming_soon",
    description: "A new all-day dining concept rooted in West African flavours.",
    image_url:
      "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=80",
    display_order: 1,
    status: "published",
  },
  {
    id: "cs2",
    name: "Summer Hut",
    type: "coming_soon",
    description: "An open-air lounge for sundowners, cocktails and slow afternoons.",
    image_url:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    display_order: 2,
    status: "published",
  },
];

export const defaultRooms: Room[] = [
  {
    id: "r1",
    name: "Royal Penthouse",
    slug: "royal-penthouse",
    description:
      "The pinnacle of our portfolio — a private floor of generous living, sweeping views and considered detailing.",
    bed_summary: "3 King Beds",
    capacity: 6,
    price_per_night: null,
    hero_image_url:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1600&q=80",
    gallery: null,
    display_order: 1,
    status: "published",
  },
  {
    id: "r2",
    name: "Presidential Suite",
    slug: "presidential-suite",
    description:
      "Quiet grandeur for the discerning traveller, with a separate lounge, oversized bath and bespoke amenities.",
    bed_summary: "2 King Beds",
    capacity: 4,
    price_per_night: null,
    hero_image_url:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80",
    gallery: null,
    display_order: 2,
    status: "published",
  },
];

export const defaultTestimonial: Testimonial = {
  id: "t1",
  quote:
    "Our stay at Hotel A-Wise was nothing short of extraordinary. From the moment we arrived, we were greeted with warmth and professionalism. The room was impeccably clean, the bed incredibly comfortable, and the view from our window breathtaking.",
  author: "John and Mary P.",
  location: "Achimota",
  rating: 5,
  featured: true,
  display_order: 1,
  status: "published",
};

export const defaultContact: ContactInfo = {
  phone: "+233 (0) 540 120 400",
  email: "info@hotelawise.com",
  address: "No. 1 Wisepak Lane, New Asofan — Accra",
  maps_link: "https://www.google.com/maps/search/?api=1&query=Hotel+A-Wise+Accra",
  copyright_text: "Hotel A-Wise | © 2025",
  footer_tagline: "Affordable luxury, made in Accra.",
};
