# Hotel A-Wise — Public Site

The marketing & booking website for Hotel A-Wise.

## Stack

- **Next.js 16** (App Router, React 19) on Vercel
- **TypeScript** end-to-end
- **Tailwind CSS v4** with a custom design system (`globals.css`)
- **Supabase** (Postgres + Storage) for editable content via the companion CMS

## Local development

```bash
npm install
cp .env.example .env.local   # fill in Supabase URL + anon key + revalidation secret
npm run dev
```

The site renders defaults from `src/lib/defaults.ts` when Supabase is unreachable,
so you can develop without a database connected.

## Project structure

```
src/
├─ app/
│  ├─ api/revalidate/   On-demand ISR revalidation (called by CMS)
│  ├─ globals.css       Design tokens (@theme inline)
│  ├─ layout.tsx        Root layout, fonts, metadata
│  └─ page.tsx          Landing page composition
├─ components/
│  ├─ sections/         Hero, Welcome, Amenities, Rooms, Reception, Coming Soon
│  ├─ ui/               Button + small primitives
│  ├─ header.tsx
│  └─ footer.tsx
├─ lib/
│  ├─ supabase/         Browser + server client factories (@supabase/ssr)
│  ├─ defaults.ts       Fallback content matching the prototype
│  ├─ content.ts        getLandingContent() — single fetch entry point
│  └─ cn.ts             Lightweight className utility
└─ types/
   └─ content.ts        Domain types shared across components
```

## Editing content

All site content is managed through the companion CMS at
[hotel-a-wise-cms.vercel.app](https://hotel-a-wise-cms.vercel.app/).
After saving in the CMS, the **Revalidate** button triggers `/api/revalidate`
to purge ISR caches and push the change live.
