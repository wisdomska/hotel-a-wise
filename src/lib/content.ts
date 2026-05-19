import "server-only";
import type { LandingContent } from "@/types/content";
import {
  defaultAmenities,
  defaultComingSoon,
  defaultContact,
  defaultHero,
  defaultRooms,
  defaultTestimonial,
} from "@/lib/defaults";
import { createClient } from "@/lib/supabase/server";

const isSupabaseConfigured = () =>
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Fetches all landing-page content from Supabase, falling back to the defaults
 * if the project is unconfigured, the tables are empty, or the request fails.
 * The fallback ensures the site is always presentable.
 */
export async function getLandingContent(): Promise<LandingContent> {
  if (!isSupabaseConfigured()) {
    return fallback();
  }

  try {
    const supabase = await createClient();

    const [heroRes, amenitiesRes, roomsRes, testimonialRes, contactRes] =
      await Promise.all([
        supabase.from("hero").select("*").eq("id", "main").single(),
        supabase
          .from("amenities")
          .select("*")
          .eq("status", "published")
          .order("display_order", { ascending: true }),
        supabase
          .from("rooms")
          .select("*")
          .eq("status", "published")
          .order("display_order", { ascending: true }),
        supabase
          .from("testimonials")
          .select("*")
          .eq("status", "published")
          .eq("featured", true)
          .order("display_order", { ascending: true })
          .limit(1)
          .maybeSingle(),
        supabase.from("contact").select("*").eq("id", "main").single(),
      ]);

    const amenities = (amenitiesRes.data ?? []).filter((a) => a.type === "feature");
    const comingSoon = (amenitiesRes.data ?? []).filter((a) => a.type === "coming_soon");

    return {
      hero: heroRes.data ?? defaultHero,
      amenities: amenities.length ? amenities : defaultAmenities,
      comingSoon: comingSoon.length ? comingSoon : defaultComingSoon,
      rooms: roomsRes.data?.length ? roomsRes.data : defaultRooms,
      featuredTestimonial: testimonialRes.data ?? defaultTestimonial,
      contact: contactRes.data ?? defaultContact,
    };
  } catch (err) {
    console.warn("[content] Supabase fetch failed, using defaults:", err);
    return fallback();
  }
}

function fallback(): LandingContent {
  return {
    hero: defaultHero,
    amenities: defaultAmenities,
    comingSoon: defaultComingSoon,
    rooms: defaultRooms,
    featuredTestimonial: defaultTestimonial,
    contact: defaultContact,
  };
}

/**
 * Revalidation tag used by ISR so CMS edits can punch through caches.
 */
export const REVALIDATE_TAG = "landing-content";
