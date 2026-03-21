# Chris Nevada — Next.js Site

## Project Overview
A modern luxury real estate website for **Nevada Real Estate Group** (Chris Nevada / lpt Realty), serving the Las Vegas and Reno markets. Built as a scalable multi-page Next.js app — the foundation for a broader platform that will eventually serve multiple real estate agents with community pages, MLS listing pages, and AI-generated blog posts.

**Live site:** https://chris-nevada-next.vercel.app
**Sanity Studio:** https://chris-nevada-next.vercel.app/studio
**GitHub repo:** `chris-nevada-next` (Aaron Franklin's account)
**Vercel project:** `aaron-franklins-projects-793027f8/chris-nevada-next`

---

## Tech Stack

| Layer | Tool | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router) | TypeScript, Turbopack |
| Language | TypeScript | Strict mode |
| Styling | Custom CSS | All design tokens in `app/globals.css` |
| Runtime | React 19 | Server + Client components |
| CMS | Sanity (next-sanity v12) | Studio at `/studio`, project `r3saenct` |
| Maps | Mapbox GL JS v3 | Dark luxury style, community boundaries |
| Fonts | Google Fonts CDN | Raleway 700/800/900 + Inter 300-700 |
| Listings | YLOPO widgets | Live MLS, only renders on registered domains |
| Video | Vimeo (background embed) | Homepage hero |
| Hosting | Vercel (Hobby tier) | Auto-deploys from GitHub `main` |
| Version control | GitHub | Source of truth |

---

## Design System

All tokens live in `app/globals.css` under `:root`. Never hardcode these values inline — always use the CSS variable.

```css
--gold: #C9A84C          /* Primary accent — headlines, borders, CTAs */
--gold-light: #E8C97A    /* Hover states */
--gold-dark: #A07830     /* Pressed states */
--charcoal: #0F0F0F      /* Page background */
--dark: #141414
--dark-2: #1A1A1A
--dark-3: #222222
--dark-4: #2A2A2A
--border: rgba(201,168,76,0.2)     /* Gold-tinted border */
--border-dim: rgba(255,255,255,0.08)
--white-90 / --white-70 / --white-50 / --white-40 / --white-30 / --white-15
--font-serif: 'Raleway', system-ui, sans-serif   /* Headings */
--font-sans: 'Inter', system-ui, sans-serif       /* Body */
--nav-h: 72px
--radius: 4px
--radius-lg: 12px
--container: 1240px
```

**Typography rules:**
- `h1`–`h3`: use `var(--font-serif)` (Raleway), weight 700–900
- Body copy, labels, UI: use `var(--font-sans)` (Inter)
- Section labels: 11px, weight 600, letter-spacing 0.2em, uppercase, gold
- Gold rule: `.gold-rule` class — 48px wide, 2px, gold, `margin-bottom: 16px`

**Dark luxury aesthetic:** every section uses dark backgrounds (`--charcoal`, `--dark`, `--dark-2`). Alternate sections to create depth. Gold accents are used sparingly for maximum impact.

---

## File Structure

```
app/
  globals.css              — All CSS: design tokens, global styles, all component styles
  layout.tsx               — Root layout: Google Fonts only (minimal — no Nav/Footer here)
  (site)/                  — Route group: all public pages, wraps in Nav + Footer
    layout.tsx             — Site layout: <Nav /> + {children} + <Footer />
    page.tsx               — Homepage (async Server Component, fetches from Sanity)
    summerlin/
      page.tsx             — Summerlin community page (async Server Component)
  studio/
    [[...tool]]/
      page.tsx             — Sanity Studio ('use client', NextStudio)
      layout.tsx           — Minimal layout — no Nav/Footer for Studio

components/
  Nav.tsx                  — 'use client' — sticky nav, scroll detection, mobile hamburger
  Footer.tsx               — Server Component — brand, links, contact, MLS disclaimer
  TrustBar.tsx             — 'use client' — animated stat counters, accepts stats prop
  CommunityTabs.tsx        — 'use client' — LV/Reno tab switcher with flip cards
  FAQAccordion.tsx         — 'use client' — accordion FAQ
  SummerlinMap.tsx         — 'use client' — Mapbox GL JS map with boundary polygon
  SummerlinMapWrapper.tsx  — 'use client' — dynamic() wrapper enabling ssr: false
  PortableText.tsx         — Server Component — renders Sanity block content

sanity/
  client.ts                — createClient with || fallbacks for env vars
  queries.ts               — All GROQ queries + TypeScript types
  schema/
    index.ts               — Exports all schema types
    siteSettings.ts        — Singleton: agentName, phone, email, etc.
    homepage.ts            — Singleton: heroHeadline, trustStats, etc.
    communityPage.ts       — Collection: name, slug, market, hero, overview, SEO
    review.ts              — Collection: platform, reviewerName, reviewText, featured
    blogPost.ts            — Collection: title, slug, body (blocks), SEO, aiGenerated

sanity.config.ts           — Studio config: basePath /studio, custom sidebar structure
public/
  logo.png                 — Nevada Real Estate Group logo
  red-rock-canyon.jpg      — Red Rock Canyon lifestyle photo (Summerlin page)
```

---

## Route Group Architecture

The app uses Next.js route groups to separate public pages from the Studio:

- `app/(site)/` — all public-facing pages, wrapped in Nav + Footer via `(site)/layout.tsx`
- `app/studio/` — Sanity Studio, minimal layout with no Nav/Footer

**IMPORTANT:** New community pages go in `app/(site)/[slug]/page.tsx`, NOT `app/[slug]/page.tsx`.

---

## Component Rules

### Server vs Client Components
- **Server Components** (default): all `page.tsx` files, `Footer.tsx`, `PortableText.tsx` — no `'use client'`, no hooks
- **Client Components** (require `'use client'`): anything with `useState`, `useEffect`, `useRef`, browser APIs, or Mapbox

### The ssr: false Pattern (Mapbox / browser-only libs)
When a library requires the browser, you CANNOT use `next/dynamic` with `ssr: false` directly in a Server Component. Use the two-file pattern:

1. **`ComponentName.tsx`** — actual implementation, `'use client'`
2. **`ComponentNameWrapper.tsx`** — thin `'use client'` wrapper:
```tsx
'use client'
import dynamic from 'next/dynamic'
const ComponentName = dynamic(() => import('./ComponentName'), { ssr: false })
export default function ComponentNameWrapper() {
  return <ComponentName />
}
```
Then import `ComponentNameWrapper` in the Server Component page.

### CSS Class Naming Conflict: `.communities-panel`
The nav flyout uses `.communities-panel-nav` (NOT `.communities-panel`) to avoid conflict with the homepage tab panel class.

---

## Client Details

- **Client:** Nevada Real Estate Group / Chris Nevada
- **Brokerage:** lpt Realty
- **License:** Nevada Lic. #S.0181401.LLC
- **Phone:** 725.239.9950
- **Address:** 8945 W Russell Rd #170, Las Vegas, NV 89148
- **Main website:** https://www.nevadarealestategroup.com
- **YLOPO domain:** `search.nevadarealestategroup.net`
- **Mapbox token:** `pk.eyJ1IjoidmVnYXMta2l3aSIsImEiOiJjbW15dTZqZHAwMWx0MnJxOXY2a3IwZW1mIn0.SY-_CDAwcvuhzQETeViOzg`
- **Google Reviews:** https://share.google/RndBhGHXBHjfihGd2
- **Zillow Profile:** https://www.zillow.com/profile/NevadaGroup

---

## Deployment Process

The site auto-deploys when you push to GitHub `main`. For manual production deploy:

```bash
cd "/Users/kiwi/Desktop/Cowork/chris-nevada-next"
npm run build    # Always verify locally first
npx vercel --prod
```

If Vercel CLI prompts for login, run `npx vercel login` first (browser OAuth flow).

**Vercel env vars set on the project:**
- `NEXT_PUBLIC_SANITY_PROJECT_ID` = `r3saenct`
- `NEXT_PUBLIC_SANITY_DATASET` = `production`
- `SANITY_API_TOKEN` = stored in Claude memory (sanity_credentials)

**IMPORTANT:** `sanity/client.ts` uses `||` fallbacks so the site deploys even without env vars. Always use `printf` (not `echo`) when setting env vars via Vercel CLI — `echo` adds a trailing newline that corrupts the value.

---

## Sanity CMS — Phase 1 Complete

**Project ID:** `r3saenct` | **Dataset:** `production` | **Studio:** `/studio`

### Schema types
- `siteSettings` — singleton (fixed `_id: "siteSettings"`): agentName, phone, email, licenseNumber, address, brokerage, tagline
- `homepage` — singleton (fixed `_id: "homepage"`): heroHeadline, heroSubheadline, ctaStripHeadline, ctaStripBody, trustStats[]
- `communityPage` — collection: name, slug, market (las-vegas/reno), heroHeadline, heroSubheadline, overviewTitle, overviewBody (blocks), metaTitle, metaDescription
- `review` — collection: platform (google/zillow), reviewerName, reviewText, featured (boolean), sortOrder
- `blogPost` — collection: title, slug, publishedAt, category, excerpt, coverImage, body (blocks + images), metaTitle, metaDescription, aiGenerated (boolean)

### Data fetching pattern
All pages are async Server Components. Fetch from Sanity with hardcoded fallbacks. The site is identical whether Sanity has content or not.
```ts
export const revalidate = 60  // ISR — rebuilds every 60s on content change

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('summerlin')
  return {
    title: cms?.metaTitle ?? 'Summerlin Homes For Sale | Nevada Real Estate Group',
  }
}

export default async function SummerlinPage() {
  const cms = await getCommunityPage('summerlin')
  const heroHeadline = cms?.heroHeadline ?? 'Summerlin Homes\nFor Sale'
  // ...
}
```

### PortableText rendering
Rich text (overviewBody) renders via `<PortableText value={cms.overviewBody} />` from `components/PortableText.tsx`. Always check `cms?.overviewBody?.length` before rendering — fall back to hardcoded paragraphs if empty.

### What Chris can edit in Studio
- Agent bio, phone, license number (Site Settings)
- Hero headlines and subheadlines (Homepage + Community Pages)
- Trust bar statistics with live animated count-up
- Community page overview text (rich text editor)
- Review quotes — Google + Zillow, toggle featured, set display order
- Blog posts — full rich text, SEO fields, publish date, category

---

## Community Page SOP — How to Build a New Community Page

Every community page lives at `app/(site)/[slug]/page.tsx` and follows the Summerlin page as a template.

### Step 1 — Create the page file
```
app/(site)/[community-slug]/page.tsx
```
Slug format: lowercased, hyphenated (e.g. `centennial-hills`, `green-valley-ranch`)

### Step 2 — Add Sanity wiring + dynamic Metadata
```tsx
import { getCommunityPage } from '@/sanity/queries'
import PortableText from '@/components/PortableText'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('[slug]')
  return {
    title: cms?.metaTitle ?? '[Community] Homes For Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse [Community] homes for sale...',
  }
}

export default async function [Community]Page() {
  const cms = await getCommunityPage('[slug]')
  const heroHeadline = cms?.heroHeadline ?? '[Community] Homes\nFor Sale'
  const heroSubheadline = cms?.heroSubheadline ?? '[Default subheadline]'
  const overviewTitle = cms?.overviewTitle ?? '[Default overview title]'
}
```

Overview body pattern:
```tsx
{cms?.overviewBody?.length ? (
  <PortableText value={cms.overviewBody} />
) : (
  <><p>Paragraph 1...</p><p>Paragraph 2...</p></>
)}
```

### Step 3 — Page sections (in order)

| # | Section | Notes |
|---|---|---|
| 1 | Breadcrumb | Home › Communities › [Community Name] |
| 2 | Hero | h1, eyebrow, 4 hero stats, subheadline |
| 3 | Map | `<[Community]MapWrapper />` |
| 4 | YLOPO Listings | searchWidget + resultsWidget |
| 5 | Overview | 4-para agent perspective + Quick Facts sidebar + CTA card |
| 6 | Highlights | 6-card grid of key selling points |
| 7 | Villages / Sub-neighborhoods | Grid of named areas within the community |
| 8 | Lifestyle | Split: lifestyle photo left + bullets right |
| 9 | Schools | 3-col: Public / Private & Catholic / Charter |
| 10 | Golf / Amenities | If applicable |
| 11 | FAQ | `<FAQAccordion />` |
| 12 | CTA | "Ready to Find Your [Community] Home?" + phone + listings |

### Step 4 — Map Component
Create `components/[Community]Map.tsx` (copy SummerlinMap.tsx, update CENTER, BOUNDARY, zoom, labels) and `components/[Community]MapWrapper.tsx` (copy SummerlinMapWrapper.tsx, update import name).

**Map coordinate reference (approximate centers):**
- Summerlin: `[-115.305, 36.178]`
- Centennial Hills: `[-115.268, 36.268]`
- Henderson/Anthem: `[-115.100, 36.000]`
- Green Valley Ranch: `[-115.085, 36.050]`
- Southern Highlands: `[-115.240, 36.020]`
- Lake Las Vegas: `[-114.930, 36.087]`
- MacDonald Highlands: `[-114.980, 36.015]`

### Step 5 — Update the Nav
In `components/Nav.tsx`, change `<a href="#">` to `<Link href="/[slug]/">` once the page is live.

### Step 6 — Build & deploy
```bash
npm run build   # Verify locally first
npx vercel --prod
```

---

## Las Vegas Communities

| Community | Slug | Status |
|---|---|---|
| Summerlin | `/summerlin/` | ✅ Live |
| Centennial Hills | `/centennial-hills/` | — |
| Henderson / Anthem | `/henderson-anthem/` | — |
| Southern Highlands | `/southern-highlands/` | — |
| Green Valley Ranch | `/green-valley-ranch/` | — |
| Lake Las Vegas | `/lake-las-vegas/` | — |
| MacDonald Highlands | `/macdonald-highlands/` | — |
| Mountains Edge | `/mountains-edge/` | — |
| Desert Shores | `/desert-shores/` | — |
| The Lakes | `/the-lakes/` | — |
| Red Rock Country Club | `/red-rock-country-club/` | — |
| North Las Vegas | `/north-las-vegas/` | — |

## Reno Communities

| Community | Slug | Status |
|---|---|---|
| Damonte Ranch | `/damonte-ranch/` | — |
| Double Diamond | `/double-diamond/` | — |
| Somersett | `/somersett/` | — |
| Caughlin Ranch | `/caughlin-ranch/` | — |
| ArrowCreek | `/arrowcreek/` | — |
| Spanish Springs | `/spanish-springs/` | — |
| Incline Village | `/incline-village/` | — |
| South Reno | `/south-reno/` | — |
| Midtown Reno | `/midtown-reno/` | — |
| Carson City | `/carson-city/` | — |

---

## Phase 2 — Automated Blog (Next to Build)

The goal is a fully automated blog that publishes fresh real estate content to the site daily with zero manual effort. Here is the full planned architecture:

### How It Works
1. A **GitHub Actions cron job** fires once daily
2. It calls the **Claude API** (claude-sonnet-4-6) with a prompt to write a blog post about a relevant Las Vegas or Reno real estate topic
3. Claude writes the post (title, body, excerpt, SEO fields, category)
4. The Action **publishes the post directly to Sanity** via Sanity's write API
5. Next.js ISR picks it up within 60 seconds — the post appears on the live site automatically

### Blog post route
```
app/(site)/blog/
  page.tsx          — Blog index (list of all posts, paginated)
  [slug]/
    page.tsx        — Individual post page
```

### Sanity blogPost schema (already exists)
Fields: `title`, `slug`, `publishedAt`, `category`, `excerpt`, `coverImage`, `body` (blocks), `metaTitle`, `metaDescription`, `aiGenerated` (boolean flag)

### GROQ queries needed (add to sanity/queries.ts)
```ts
// All published posts, newest first
export async function getBlogPosts(limit = 12): Promise<SanityBlogPost[]>

// Single post by slug
export async function getBlogPost(slug: string): Promise<SanityBlogPost | null>
```

### GitHub Actions workflow file
Location: `.github/workflows/blog-agent.yml`
```yaml
on:
  schedule:
    - cron: '0 14 * * *'   # 7am PST daily
  workflow_dispatch:         # Manual trigger for testing
```
Secrets needed in GitHub repo settings:
- `ANTHROPIC_API_KEY`
- `SANITY_API_TOKEN` (write token, same one already in Vercel)
- `NEXT_PUBLIC_SANITY_PROJECT_ID` = r3saenct
- `NEXT_PUBLIC_SANITY_DATASET` = production

### Blog post topics / prompt strategy
The agent should rotate through these content buckets:
- Market updates ("Las Vegas home prices in [month]")
- Neighborhood spotlights ("Why buyers are moving to Henderson")
- Buyer/seller guides ("How to make an offer in a hot market")
- Lifestyle content ("Best golf communities in Las Vegas")
- Investment angles ("Why Las Vegas makes sense for 1031 exchanges")

### Blog index page design
- Dark luxury aesthetic, same as rest of site
- Post cards with: cover image, category badge, title, excerpt, date, "Read More →"
- Sidebar or filter strip: filter by category
- SEO: `generateMetadata()` for index, dynamic metadata per post

---

## Phase 3 Roadmap (Future)

### MLS / IDX Listing Pages
- Each active listing gets its own page at `/listings/[mlsId]/`
- ISR with `revalidate: 3600`
- Data from YLOPO API or direct MLS feed

### Multi-Client Architecture
- One Next.js repo per client (current approach — keep for now)
- Future: monorepo with shared component library + per-client config
- Supabase for lead capture and CRM integration
- Clerk for agent login / client dashboard auth

### AI-Assisted Client Editing (Phase 3 of Sanity)
- Give Chris a Claude Code setup where he can speak or type natural language instructions
- Claude reads/writes directly to Sanity via API
- Changes appear on the live site within 60 seconds
- No Studio UI needed — pure conversational editing

---

## Content Standards

### Agent Voice
All body copy is written in first person from Chris Nevada's perspective — "I've been working real estate in Las Vegas for 35 years..." Maintain this across all community pages and blog posts.

### Content Depth
Community pages are intentionally comprehensive (2,000–4,000 words) for SEO and to demonstrate expert local knowledge. Don't summarize — go deep on schools, neighborhoods, lifestyle, golf, drive times.

### Data Sourcing
Community stats sourced from: city planning documents, Zillow/Redfin market data, CCSD school directories, Howard Hughes Corp. publications. Always round/approximate conservatively.

### Images
- Local photos go in `public/` and are referenced as `/filename.jpg`
- Stock photos use Unsplash CDN (configured in `next.config.ts` remotePatterns)
- Unsplash short IDs (e.g. `G48h926L2qo`) don't work directly — use the download redirect to get the real CDN ID: `curl -sI "https://unsplash.com/photos/{id}/download?force=true"` and read the `Location:` header
- When the client provides photos, save to `public/` and swap the src
