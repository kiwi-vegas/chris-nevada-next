# Chris Nevada — Blog Pipeline

## Overview

A fully automated daily blog pipeline that researches Las Vegas and Reno real estate news, lets the operator pick articles to publish, then writes full posts with AI-generated cover images and publishes them to Sanity CMS.

**Market:** Las Vegas, Henderson, Summerlin, North Las Vegas, Reno, and greater Nevada

---

## Daily Flow

```
6:00 AM PT (Vercel Cron)
  └─ /api/cron/research
       ├─ Tavily searches 8 rotating queries (Las Vegas / Reno focused)
       ├─ Claude Opus scores & categorizes top 10 articles
       ├─ Stores results in Upstash Redis (48hr TTL)
       └─ Sends digest email to operator

Operator opens email
  └─ Clicks "Pick Articles to Publish →"
       └─ /admin/blog-picker/[date]?secret=ADMIN_SECRET
            ├─ Shows up to 10 articles with scores and summaries
            ├─ Operator selects 1–5 articles (flexible)
            └─ Clicks "Publish X Posts →"

                 └─ /api/blog/publish (POST)
                      ├─ For each selected article (in parallel):
                      │    ├─ Claude Sonnet writes full blog post as Chris Nevada
                      │    └─ DALL-E 3 generates cover image
                      │         (fallback: OG image → Unsplash → pool)
                      ├─ Images uploaded to Sanity CDN
                      ├─ Posts published to Sanity CMS
                      └─ Live at /blog within 60 seconds (ISR revalidation)
```

---

## Research Priorities

Articles are scored 1–10. Claude gives extra weight to these high-value topics for the Las Vegas / Reno market:

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

## Image Generation Pipeline

### Primary: DALL-E 3 (requires `OPENAI_API_KEY`)

1. **Claude builds the prompt** — Analyzes the article's headline, `whyItMatters`, and category. Writes a hyper-specific, cinematic image prompt with Las Vegas / Nevada context (desert light, Red Rock Canyon, Summerlin neighborhoods, Strip skyline silhouette, mountain backdrops, blue Nevada sky).

2. **DALL-E 3 generates the image** — 1792×1024 HD quality.

3. **Upload to Sanity CDN** — Downloaded immediately (DALL-E URLs expire in ~1hr), uploaded as PNG.

### Fallback Chain (if DALL-E fails)

4. **OG image** from the source article URL (scraped via cheerio).
5. **Unsplash API** (requires `UNSPLASH_ACCESS_KEY`) — Category-matched query.
6. **Fallback image pool** — Pre-curated Unsplash URLs per category, deterministically picked by article URL hash.

---

## Article Selection Rules

- **Volume**: Research fetches up to 30 articles per day, scores top 10 for display.
- **Flexibility**: Operator can select 1–5 articles per day.
- **No repeats**: Articles skipped twice without being selected are permanently filtered out of future research results.
- **Rotation**: 8 queries run per day, rotating through 26 topic queries so all priority areas get covered regularly.

---

## Article Categories

| Category | Label | Color |
|---|---|---|
| `market-update` | Market Update | Gold `#C9A84C` |
| `buying-tips` | Buying Tips | Green `#4CAF50` |
| `selling-tips` | Selling Tips | Sky `#0ea5e9` |
| `community-spotlight` | Community Spotlight | Purple `#9C27B0` |
| `investment` | Investment | Orange `#FF9800` |
| `news` | News | Slate `#607D8B` |

---

## Blog Post Writing

Each post is written by Claude Sonnet 4.6 in the voice of **Chris Nevada**, top real estate agent at Nevada Real Estate Group in Las Vegas and Reno. Voice is:
- Knowledgeable, approachable, direct — written in first person as Chris
- Ties national or Nevada news back to the local Las Vegas / Summerlin / Henderson / Reno market
- Always includes a "## What This Means For You" section with 3–4 bullet points

Post structure:
1. Rewritten engaging headline
2. Intro paragraph
3. 2–3 body sections with `##` headings
4. `## What This Means For You` (3–4 bullet points)
5. Closing paragraph
6. Source credit (linked)

---

## Environment Variables Required

| Variable | Purpose |
|---|---|
| `ANTHROPIC_API_KEY` | Claude Sonnet (writing) + Claude Opus (scoring) |
| `OPENAI_API_KEY` | DALL-E 3 image generation |
| `TAVILY_API_KEY` | Article research searches |
| `UPSTASH_REDIS_REST_URL` | Article storage (48hr TTL) |
| `UPSTASH_REDIS_REST_TOKEN` | Redis auth |
| `RESEND_API_KEY` | Digest email delivery |
| `FROM_EMAIL` | Sender address |
| `OPERATOR_EMAIL` | Digest recipient |
| `ADMIN_SECRET` | Auth for blog picker and publish API |
| `CRON_SECRET` | Auth for Vercel cron job |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `r3saenct` |
| `NEXT_PUBLIC_APP_URL` | Production URL (for picker link in email) |
| `UNSPLASH_ACCESS_KEY` | Optional — Unsplash fallback images |

**IMPORTANT:** Always use `printf` (not `echo`) when setting env vars via Vercel CLI — `echo` adds a trailing newline that corrupts the value and causes Unauthorized errors.

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
| `lib/image-gen.ts` | DALL-E 3 image generation |
| `lib/images.ts` | Orchestrates image fallback chain |
| `lib/email.ts` | Digest email HTML + Resend delivery |
| `lib/store.ts` | Upstash Redis read/write |
| `lib/sanity-write.ts` | Publishes post to Sanity CMS |
| `app/api/cron/research/route.ts` | Cron endpoint |
| `app/api/blog/publish/route.ts` | Publish endpoint (1–5 articles) |
| `app/admin/blog-picker/[date]/page.tsx` | Operator selection UI |
| `vercel.json` | Cron schedule (6:00 AM PT daily) |
