import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

/**
 * POST /api/revalidate
 *
 * Called by the CMS after a content edit to purge ISR caches.
 * Authenticated via shared secret — header `x-revalidate-secret`.
 *
 * Body (optional): { paths?: string[]; tags?: string[] }
 */
export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret");
  const expected = process.env.REVALIDATION_SECRET;

  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "Revalidation secret not configured." },
      { status: 500 }
    );
  }
  if (secret !== expected) {
    return NextResponse.json({ ok: false, error: "Unauthorised" }, { status: 401 });
  }

  let body: { paths?: string[]; tags?: string[] } = {};
  try {
    body = await req.json();
  } catch {
    // empty body is fine — default to the home page
  }

  const paths = body.paths?.length ? body.paths : ["/"];
  const tags = body.tags ?? [];

  for (const p of paths) revalidatePath(p);
  for (const t of tags) revalidateTag(t);

  return NextResponse.json({ ok: true, revalidated: { paths, tags } });
}

export async function GET() {
  return NextResponse.json({ ok: true, message: "Use POST with x-revalidate-secret header." });
}
