import "server-only";
import type { Room } from "@/types/content";
import { createClient } from "@/lib/supabase/server";
import { defaultRooms } from "@/lib/defaults";

const isSupabaseConfigured = () =>
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  if (!isSupabaseConfigured()) {
    return defaultRooms.find((r) => r.slug === slug) ?? null;
  }
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("rooms")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle<Room>();
    return data ?? defaultRooms.find((r) => r.slug === slug) ?? null;
  } catch {
    return defaultRooms.find((r) => r.slug === slug) ?? null;
  }
}

export async function getAllRoomSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured()) return defaultRooms.map((r) => r.slug);
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("rooms")
      .select("slug")
      .eq("status", "published");
    return data?.map((r) => r.slug) ?? defaultRooms.map((r) => r.slug);
  } catch {
    return defaultRooms.map((r) => r.slug);
  }
}

export async function getAllPublishedRooms(): Promise<Room[]> {
  if (!isSupabaseConfigured()) return defaultRooms;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("rooms")
      .select("*")
      .eq("status", "published")
      .order("display_order", { ascending: true });
    return (data as Room[] | null) ?? defaultRooms;
  } catch {
    return defaultRooms;
  }
}
