# Chris Nevada — Blog Pipeline

> **Global pipeline architecture, thumbnail psychology system, image models, and setup instructions** are documented in the shared source of truth:
> `/Users/kiwi/Desktop/Cowork/Branded Sites/KEY MD FILES/BLOG_PIPELINE_GLOBAL.md`
>
> This file contains only Chris Nevada–specific configuration.

---

## Market

Las Vegas, Henderson, Summerlin, North Las Vegas, Reno, and greater Nevada

**Sanity project ID:** `r3saenct`
**Production URL:** `https://chris-nevada-next.vercel.app`

---

## Research Priorities

Articles are scored 1–10. Claude gives extra weight to these high-value topics:

### 1. Las Vegas / Reno Property Values & Investment
- Home price forecasts and appreciation trends
- Rental market returns and investment property outlook
- Henderson, Summerlin, North Las Vegas, Lake Las Vegas neighborhood comparisons
- Reno market trends and Northern Nevada appreciation
- What market conditions mean for current homeowners and buyers

### 2. Nevada Law Changes Affecting Homeowners
- Property tax changes and exemptions
- HOA regulation updates
- Zoning and land use changes
- Tenant/landlord law updates
- Any Nevada legislation affecting real estate transactions

### 3. Major Development Projects (Economic Growth Signals)
- Billion-dollar stadium, arena, or entertainment district developments
- Tech campuses, data centers, corporate HQ relocations to Nevada
- New master-planned communities (Summerlin expansions, Henderson growth)
- Infrastructure projects that increase neighborhood desirability
- Job-creating projects signaling long-term housing demand

### 4. Celebrity & High-Profile Moves to Las Vegas / Nevada
- Celebrities, athletes, or executives buying Las Vegas or Reno real estate
- High-profile relocations signaling lifestyle appeal and tax advantages
- Luxury real estate transactions that reflect market confidence

### 5. Major Corporate Investments
- Large employers building facilities in Nevada (Tesla Gigafactory-scale news)
- Fortune 500 companies relocating to Las Vegas or Reno
- Manufacturing, logistics, or tech companies expanding in Clark or Washoe County
- Any investment that signals economic growth and housing demand

---

## Image Visual Anchors (Las Vegas / Nevada)

Used in `lib/image-gen-gemini.ts` when Claude builds the image prompt:

- Summerlin neighborhoods at golden hour — warmth, master-planned community, aspiration
- Red Rock Canyon escarpment as backdrop — drama, natural beauty, premium Las Vegas
- Henderson luxury homes with mountain views — family stability, affluence, growth
- Las Vegas Strip silhouette at dusk — economic energy, ambition, urban momentum
- Lake Las Vegas waterfront — leisure, waterfront lifestyle, high-end investment
- Aerial of expanding master-planned communities — scale, growth, opportunity
- Desert landscape with a dramatic Nevada sky — wide open, distinct, unlike anywhere else
- Reno neighborhoods with Sierra Nevada peaks — Northern Nevada beauty, outdoor lifestyle

---

## Blog Post Persona

Each post is written by Claude Sonnet 4.6 in the voice of **Chris Nevada**, top real estate agent at **Nevada Real Estate Group** in Las Vegas and Reno. Voice is:
- Knowledgeable, approachable, direct — written in first person as Chris
- Ties national or Nevada news back to the local Las Vegas / Summerlin / Henderson / Reno market
- Always includes a "## What This Means For You" section with 3–4 bullet points

---

## Manual Testing

### Trigger research manually (POST):
```bash
curl -X POST https://chris-nevada-next.vercel.app/api/cron/research \
  -H "Content-Type: application/json" \
  -d '{"secret": "YOUR_ADMIN_SECRET"}'
```

### Access article list for a date:
```
GET /api/articles/2026-03-24?secret=YOUR_ADMIN_SECRET
```

---

## Key Files

| File | Purpose |
|---|---|
| `lib/research.ts` | Tavily searches + Claude scoring, Las Vegas/Reno queries |
| `lib/writer.ts` | Claude writes blog post as Chris Nevada |
| `lib/image-gen-gemini.ts` | Gemini image generation (Nevada visual anchors) |
| `lib/image-gen.ts` | DALL-E 3 fallback |
| `lib/images.ts` | Orchestrates image fallback chain |
| `lib/email.ts` | Digest email HTML + Resend delivery |
| `lib/store.ts` | Upstash Redis read/write |
| `lib/sanity-write.ts` | Publishes post to Sanity CMS |
| `app/api/cron/research/route.ts` | Cron endpoint |
| `app/api/blog/publish/route.ts` | Publish endpoint (1–5 articles) |
| `app/admin/blog-picker/[date]/page.tsx` | Operator selection UI |
| `vercel.json` | Cron schedule (6:00 AM PT daily) |
