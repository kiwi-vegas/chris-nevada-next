# Las Vegas Metro Community Taxonomy
## lasvegashomesearchexperts.com — Nevada Real Estate Group (Chris Nevada)
### Site-Specific URL Taxonomy, Build Plan & Complete Community Inventory

**Document Purpose:** Full site architecture, URL taxonomy, BreadcrumbList JSON-LD schema, complete community build list, sitemap template, and implementation guide for all Las Vegas metro real estate community pages on lasvegashomesearchexperts.com.

**Version:** Version 3.0 — Site-Specific Build Plan for lasvegashomesearchexperts.com
**Date:** April 2026
**Platform:** Sierra Interactive (Next.js)
**Domain:** https://www.lasvegashomesearchexperts.com
**Team:** Nevada Real Estate Group — Chris Nevada, 150+ agent luxury team
**Source:** Adapted from v2.0 Cross-Referenced & Verified Taxonomy (253 communities)

---

## TABLE OF CONTENTS

1. [Section 1: Site Architecture Recommendation](#section-1)
2. [Section 2: URL Taxonomy — Complete Build List](#section-2)
3. [Section 3: URL Slug Conventions](#section-3)
4. [Section 4: BreadcrumbList JSON-LD Examples](#section-4)
5. [Section 5: Phase 1 Priority Build Order (40 Pages)](#section-5)
6. [Section 6: Existing Page Expansion Notes](#section-6)
7. [Section 7: Sitemap.xml Template](#section-7)
8. [Section 8: Appendix — Complete URL Master List](#section-8)

---

<a name="section-1"></a>
## SECTION 1: SITE ARCHITECTURE RECOMMENDATION

### Current State

lasvegashomesearchexperts.com currently operates 34 live community pages using a **flat URL structure**: community pages live directly off the root domain with no prefix. Examples:

- https://www.lasvegashomesearchexperts.com/anthem
- https://www.lasvegashomesearchexperts.com/henderson
- https://www.lasvegashomesearchexperts.com/southern-highlands

The site has **no** `/communities/` hub page (returns 404), **no** lifestyle category pages (`/luxury`, `/55-plus`, etc.), and **no** sitemap.xml. Breadcrumbs on existing pages link to `/#communities` (a homepage anchor).

---

### The Three Options

#### Option A — Keep Flat URLs for ALL Pages
Every page, including new builds, uses the flat pattern: `/community-name`

**Pros:**
- Zero migration risk — all 34 existing pages remain unchanged
- Shortest possible URLs (Google marginally prefers shorter URLs for primary pages)
- Matches Sierra Interactive's confirmed routing behavior
- No 301 redirect mapping required
- Consistent with existing breadcrumb pattern (`/#communities`)

**Cons:**
- No structural hierarchy communicated to Google via URL
- Sub-community pages create potential slug conflicts (e.g., `/the-estates` could be ambiguous — which community?)
- Lifestyle collection pages (`/guard-gated`, `/55-plus`) can look thin without context
- Cannot create a `/communities/` hub index page without breaking the pattern

#### Option B — Introduce /communities/ Prefix for All Pages
Migrate all 34 existing pages to `/communities/community-name` and build all new pages under `/communities/`

**Pros:**
- Clean hierarchy; `/communities/` hub page becomes possible
- Breadcrumbs can link to a real hub page (not just an anchor)
- URL path signals topical authority to Google

**Cons:**
- Requires 34 immediate 301 redirects from old flat URLs
- Sierra Interactive routing may not support nested path prefixes natively — requires developer confirmation before proceeding
- Risk of redirect chains if not executed correctly
- Any existing backlinks, GMB links, or syndicated URLs pointing to flat pages lose direct equity during redirect period

#### Option C — Hybrid Approach (RECOMMENDED)
**Keep all 34 existing pages at their flat URLs. Add a `/communities` hub page as the new index. Build all new sub-community pages using a flat slug directly off root.**

For sub-communities with potential naming conflicts, use the parent community as a prefix in the slug (e.g., `/anthem-country-club`, `/southern-highlands-the-estates`). For lifestyle collection pages, use descriptive flat slugs (`/guard-gated-communities`, `/55-plus-communities`).

**Pros:**
- Zero disruption to 34 existing live pages
- `/communities` hub page resolves the 404 gap and gives breadcrumbs a real landing point
- Flat sub-community slugs are Sierra Interactive-safe
- Prefixed slugs disambiguate potential conflicts without introducing `/communities/anthem/anthem-country-club/` three-level nesting
- Lifestyle pages get descriptive, bookmarkable URLs

**Cons:**
- URLs are slightly longer than pure flat (e.g., `/anthem-country-club` vs `/anthem/anthem-country-club`)
- Requires a deliberate naming convention to prevent collisions (documented in Section 3)
- Google does not receive explicit hierarchy signals from URL path alone (mitigated by BreadcrumbList JSON-LD)

---

### FINAL RECOMMENDATION: Option C — Hybrid Flat

**Recommended approach for lasvegashomesearchexperts.com:**

1. **Keep all 34 existing pages exactly as-is.** No redirects, no URL changes.
2. **Build `/communities` as a new hub index page** — this resolves the 404 and gives breadcrumbs a real destination.
3. **All new community pages use flat slugs directly off root.** Where a sub-community slug would be ambiguous, prefix it with the parent community name:
   - `/anthem-country-club` (not `/anthem/anthem-country-club`)
   - `/southern-highlands-the-estates` (not `/southern-highlands/the-estates`)
   - `/summerlin-the-ridges` (not `/summerlin/the-ridges`)
4. **Lifestyle pages use flat descriptive slugs:**
   - `/guard-gated-communities`
   - `/55-plus-communities`
   - `/luxury-communities`
   - `/new-construction`
   - `/high-rise-condos`
   - `/golf-communities`
   - `/vintage-historic-neighborhoods`
5. **BreadcrumbList JSON-LD communicates the hierarchy to Google** even though the URL is flat. This is the correct implementation pattern — Google's structured data guidelines explicitly support this.
6. **Sierra Interactive routing**: All slugs are single-level paths compatible with Next.js dynamic routing. No nested path segments required.

> **Implementation note for developer:** All new pages are single-segment paths (e.g., `/anthem-country-club`). No nested routing is required. The `/communities` hub page is the only new "category" page. Sierra Interactive handles single-level dynamic routes natively.

---

<a name="section-2"></a>
## SECTION 2: URL TAXONOMY — COMPLETE BUILD LIST

**Legend:**
- ✅ LIVE — Page already exists on the site
- 🔨 BUILD — New page to create
- 📝 EXPAND — Page exists but needs sub-community pages created under it
- Tags: [master-planned] [guard-gated] [55+] [luxury] [new-construction] [high-rise] [vintage] [golf]

---

### 2.1 — HUB PAGES

| # | Page Name | Full URL | Status | Priority | Tags |
|---|-----------|----------|--------|----------|------|
| 1 | Communities Hub | https://www.lasvegashomesearchexperts.com/communities | 🔨 BUILD | Phase 1 #1 | — |
| 2 | Las Vegas Hub | https://www.lasvegashomesearchexperts.com/las-vegas | 🔨 BUILD | Phase 1 | — |
| 3 | Henderson Hub | https://www.lasvegashomesearchexperts.com/henderson | ✅ LIVE | — | [master-planned] |
| 4 | North Las Vegas Hub | https://www.lasvegashomesearchexperts.com/north-las-vegas | ✅ LIVE | — | — |
| 5 | Summerlin Hub | https://www.lasvegashomesearchexperts.com/summerlin | ✅ LIVE | — | [master-planned] |
| 6 | Downtown Las Vegas Hub | https://www.lasvegashomesearchexperts.com/downtown-las-vegas | 🔨 BUILD | Phase 2 | — |
| 7 | Boulder City Hub | https://www.lasvegashomesearchexperts.com/boulder-city | ✅ LIVE | — | — |

---

### 2.2 — SUMMERLIN VILLAGES & SUB-COMMUNITIES

**Parent Hub:** https://www.lasvegashomesearchexperts.com/summerlin (✅ LIVE — needs expansion)

#### Summerlin North Association Villages

| # | Community | Full URL | Status | Priority | Price Range | Tags |
|---|-----------|----------|--------|----------|-------------|------|
| 8 | The Arbors | https://www.lasvegashomesearchexperts.com/summerlin-the-arbors | 🔨 BUILD | Phase 1 | $450K–$800K | [master-planned] |
| 9 | The Canyons | https://www.lasvegashomesearchexperts.com/summerlin-the-canyons | 🔨 BUILD | Phase 1 | $500K–$4M+ | [master-planned] [guard-gated] |
| 10 | The Crossing | https://www.lasvegashomesearchexperts.com/summerlin-the-crossing | 🔨 BUILD | Phase 2 | $400K–$700K | [master-planned] |
| 11 | Discovery | https://www.lasvegashomesearchexperts.com/summerlin-discovery | 🔨 BUILD | Phase 2 | $450K–$750K | [master-planned] [new-construction] |
| 12 | The Hills | https://www.lasvegashomesearchexperts.com/summerlin-the-hills | 🔨 BUILD | Phase 1 | $500K–$900K | [master-planned] [guard-gated] |
| 13 | The Hills South | https://www.lasvegashomesearchexperts.com/summerlin-the-hills-south | 🔨 BUILD | Phase 1 | $600K–$3M+ | [master-planned] [guard-gated] [luxury] |
| 14 | The Trails | https://www.lasvegashomesearchexperts.com/summerlin-the-trails | 🔨 BUILD | Phase 2 | $500K–$2M+ | [master-planned] [guard-gated] |
| 15 | The Vistas | https://www.lasvegashomesearchexperts.com/summerlin-the-vistas | 🔨 BUILD | Phase 2 | $450K–$1.5M+ | [master-planned] [guard-gated] |
| 16 | The Willows | https://www.lasvegashomesearchexperts.com/summerlin-the-willows | 🔨 BUILD | Phase 2 | $450K–$750K | [master-planned] |

#### Summerlin South Association Villages

| # | Community | Full URL | Status | Priority | Price Range | Tags |
|---|-----------|----------|--------|----------|-------------|------|
| 17 | The Cliffs | https://www.lasvegashomesearchexperts.com/summerlin-the-cliffs | 🔨 BUILD | Phase 2 | $600K–$1.2M | [master-planned] |
| 18 | The Gardens | https://www.lasvegashomesearchexperts.com/summerlin-the-gardens | 🔨 BUILD | Phase 2 | $450K–$750K | [master-planned] |
| 19 | The Mesa | https://www.lasvegashomesearchexperts.com/summerlin-the-mesa | 🔨 BUILD | Phase 2 | $600K–$1M | [master-planned] [new-construction] |
| 20 | The Paseos | https://www.lasvegashomesearchexperts.com/summerlin-the-paseos | 🔨 BUILD | Phase 1 | $550K–$1.2M | [master-planned] |
| 21 | The Peaks | https://www.lasvegashomesearchexperts.com/summerlin-the-peaks | 🔨 BUILD | Phase 1 | $1M–$4M+ | [master-planned] [guard-gated] [luxury] [new-construction] |
| 22 | The Pueblo | https://www.lasvegashomesearchexperts.com/summerlin-the-pueblo | 🔨 BUILD | Phase 2 | $400K–$650K | [master-planned] |
| 23 | Ridgebrook | https://www.lasvegashomesearchexperts.com/summerlin-ridgebrook | 🔨 BUILD | Phase 2 | $600K–$900K | [master-planned] [new-construction] |
| 24 | The Ridges | https://www.lasvegashomesearchexperts.com/summerlin-the-ridges | 🔨 BUILD | Phase 1 | $2M–$20M+ | [master-planned] [guard-gated] [luxury] [golf] |
| 25 | Siena | https://www.lasvegashomesearchexperts.com/summerlin-siena | 🔨 BUILD | Phase 1 | $400K–$900K | [master-planned] [guard-gated] [55+] |
| 26 | South Square | https://www.lasvegashomesearchexperts.com/summerlin-south-square | 🔨 BUILD | Phase 2 | $400K–$750K | [master-planned] [55+] |
| 27 | Stonebridge | https://www.lasvegashomesearchexperts.com/summerlin-stonebridge | 🔨 BUILD | Phase 2 | $550K–$1M | [master-planned] [55+] [new-construction] |
| 28 | Summerlin Centre | https://www.lasvegashomesearchexperts.com/summerlin-centre | 🔨 BUILD | Phase 2 | $450K–$800K | [master-planned] |

#### Summerlin West Association Villages (Newest)

| # | Community | Full URL | Status | Priority | Price Range | Tags |
|---|-----------|----------|--------|----------|-------------|------|
| 29 | Grand Park | https://www.lasvegashomesearchexperts.com/summerlin-grand-park | 🔨 BUILD | Phase 1 | $400K–$3M+ | [master-planned] [guard-gated] [luxury] [new-construction] |
| 30 | Kestrel | https://www.lasvegashomesearchexperts.com/summerlin-kestrel | 🔨 BUILD | Phase 2 | $500K–$800K | [master-planned] [new-construction] |
| 31 | Kestrel Commons | https://www.lasvegashomesearchexperts.com/summerlin-kestrel-commons | 🔨 BUILD | Phase 2 | $450K–$900K | [master-planned] [new-construction] |
| 32 | La Madre Peaks | https://www.lasvegashomesearchexperts.com/summerlin-la-madre-peaks | 🔨 BUILD | Phase 1 | $800K–$5M+ | [master-planned] [luxury] [new-construction] |
| 33 | Redpoint | https://www.lasvegashomesearchexperts.com/summerlin-redpoint | 🔨 BUILD | Phase 2 | $650K–$2M+ | [master-planned] [new-construction] |
| 34 | Redpoint Square | https://www.lasvegashomesearchexperts.com/summerlin-redpoint-square | 🔨 BUILD | Phase 2 | $450K–$1.5M+ | [master-planned] [new-construction] |
| 35 | Reverence | https://www.lasvegashomesearchexperts.com/summerlin-reverence | 🔨 BUILD | Phase 2 | $600K–$1.5M | [master-planned] [new-construction] |

#### Summerlin Special / Standalone Communities

| # | Community | Full URL | Status | Priority | Price Range | Tags |
|---|-----------|----------|--------|----------|-------------|------|
| 36 | Sun City Summerlin | https://www.lasvegashomesearchexperts.com/sun-city-summerlin | 🔨 BUILD | Phase 1 | $300K–$700K | [55+] [golf] [master-planned] |
| 37 | Red Rock Country Club | https://www.lasvegashomesearchexperts.com/red-rock-country-club | ✅ LIVE | 📝 EXPAND | $800K–$3M+ | [guard-gated] [golf] [luxury] |
| 38 | The Summit Club | https://www.lasvegashomesearchexperts.com/the-summit-club | 🔨 BUILD | Phase 1 | $5M–$30M+ | [guard-gated] [luxury] [golf] |
| 39 | Mesa Ridge | https://www.lasvegashomesearchexperts.com/mesa-ridge | 🔨 BUILD | Phase 2 | $1M–$3M+ | [guard-gated] [luxury] |
| 40 | Regency at Summerlin | https://www.lasvegashomesearchexperts.com/regency-at-summerlin | 🔨 BUILD | Phase 2 | $500K–$800K+ | [55+] [guard-gated] |
| 41 | Heritage at Stonebridge | https://www.lasvegashomesearchexperts.com/heritage-at-stonebridge | 🔨 BUILD | Phase 2 | $500K–$700K | [55+] [guard-gated] [new-construction] |
| 42 | Trilogy at Summerlin | https://www.lasvegashomesearchexperts.com/trilogy-at-summerlin | 🔨 BUILD | Phase 2 | $500K–$800K | [55+] [guard-gated] |
| 43 | Sun Colony at Siena | https://www.lasvegashomesearchexperts.com/sun-colony-at-siena | 🔨 BUILD | Phase 2 | $700K–$1.3M+ | [55+] [guard-gated] |
| 44 | One Queensridge Place | https://www.lasvegashomesearchexperts.com/one-queensridge-place | 🔨 BUILD | Phase 2 | $500K–$5M+ | [high-rise] [guard-gated] [luxury] |
| 45 | Mira Villa | https://www.lasvegashomesearchexperts.com/mira-villa | 🔨 BUILD | Phase 2 | $1M–$2.2M | [luxury] [new-construction] [guard-gated] |
| 46 | SHAWOOD at Arcadia | https://www.lasvegashomesearchexperts.com/shawood-at-arcadia | 🔨 BUILD | Phase 2 | $1.56M+ | [luxury] [new-construction] [guard-gated] |
| 47 | The Loughton | https://www.lasvegashomesearchexperts.com/the-loughton | 🔨 BUILD | Phase 2 | $500K+ | [luxury] [new-construction] |

#### Summerlin Guard-Gated Sub-Communities (Under Villages)

| # | Community | Full URL | Status | Priority | Price Range | Tags | Parent Village |
|---|-----------|----------|--------|----------|-------------|------|----------------|
| 48 | Aventura | https://www.lasvegashomesearchexperts.com/aventura-summerlin | 🔨 BUILD | Phase 2 | $800K–$3M+ | [guard-gated] [luxury] | The Canyons |
| 49 | Bellacere | https://www.lasvegashomesearchexperts.com/bellacere | 🔨 BUILD | Phase 1 | $1.5M–$5M+ | [guard-gated] [luxury] | The Canyons |
| 50 | Canyon Fairways | https://www.lasvegashomesearchexperts.com/canyon-fairways | 🔨 BUILD | Phase 2 | $800K–$3M | [guard-gated] [golf] [luxury] | The Canyons |
| 51 | Eagle Rock | https://www.lasvegashomesearchexperts.com/eagle-rock-summerlin | 🔨 BUILD | Phase 2 | $1M–$4M+ | [guard-gated] [luxury] | The Canyons |
| 52 | The Palisades | https://www.lasvegashomesearchexperts.com/the-palisades-summerlin | 🔨 BUILD | Phase 2 | $1M–$4M | [guard-gated] [luxury] | The Canyons |
| 53 | Mountain Trails | https://www.lasvegashomesearchexperts.com/mountain-trails-summerlin | 🔨 BUILD | Phase 2 | $1M–$5M+ | [guard-gated] [luxury] | The Hills |
| 54 | Corte Bella | https://www.lasvegashomesearchexperts.com/corte-bella-summerlin | 🔨 BUILD | Phase 2 | $600K–$1.5M | [guard-gated] | The Hills South |
| 55 | Country Club Hills | https://www.lasvegashomesearchexperts.com/country-club-hills-summerlin | 🔨 BUILD | Phase 2 | $900K–$3M+ | [guard-gated] [luxury] [golf] | The Hills South |
| 56 | Eagle Hills | https://www.lasvegashomesearchexperts.com/eagle-hills-summerlin | 🔨 BUILD | Phase 2 | $800K–$2.5M | [guard-gated] [luxury] | The Hills South |
| 57 | Tournament Hills | https://www.lasvegashomesearchexperts.com/tournament-hills | 🔨 BUILD | Phase 2 | $800K–$2M+ | [guard-gated] [luxury] [golf] | The Hills South |
| 58 | Ascension at The Peaks | https://www.lasvegashomesearchexperts.com/ascension-at-the-peaks | 🔨 BUILD | Phase 1 | $1M–$4M+ | [guard-gated] [luxury] [new-construction] | The Peaks |
| 59 | The Pointe at The Ridges | https://www.lasvegashomesearchexperts.com/the-pointe-summerlin | 🔨 BUILD | Phase 2 | $1.5M–$5M+ | [guard-gated] [luxury] | The Ridges |
| 60 | Country Rose Estates | https://www.lasvegashomesearchexperts.com/country-rose-estates | 🔨 BUILD | Phase 2 | $800K+ | [guard-gated] | The Trails |
| 61 | The Vineyards | https://www.lasvegashomesearchexperts.com/the-vineyards-summerlin | 🔨 BUILD | Phase 2 | $900K–$3M+ | [guard-gated] [luxury] | The Vistas |
| 62 | Carlisle Peak | https://www.lasvegashomesearchexperts.com/carlisle-peak | 🔨 BUILD | Phase 1 | $1.55M–$2M+ | [guard-gated] [luxury] [new-construction] | Grand Park |
| 63 | Glenrock | https://www.lasvegashomesearchexperts.com/glenrock | 🔨 BUILD | Phase 1 | $1.58M–$2M+ | [guard-gated] [luxury] [new-construction] | Grand Park |
| 64 | Astra at La Madre Peaks | https://www.lasvegashomesearchexperts.com/astra-at-la-madre-peaks | 🔨 BUILD | Phase 1 | $2M+ (lots) | [guard-gated] [luxury] [new-construction] | La Madre Peaks |

---

### 2.3 — HENDERSON COMMUNITIES & SUB-COMMUNITIES

**Parent Hub:** https://www.lasvegashomesearchexperts.com/henderson (✅ LIVE — needs expansion)

#### Henderson Master-Planned Communities

| # | Community | Full URL | Status | Priority | Price Range | Tags |
|---|-----------|----------|--------|----------|-------------|------|
| 65 | Anthem | https://www.lasvegashomesearchexperts.com/anthem | ✅ LIVE | 📝 EXPAND | $400K–$8M+ | [master-planned] [guard-gated] [golf] |
| 66 | Green Valley | https://www.lasvegashomesearchexperts.com/green-valley | 🔨 BUILD | Phase 1 | $350K–$3M+ | [master-planned] |
| 67 | Green Valley Ranch | https://www.lasvegashomesearchexperts.com/green-valley-ranch | ✅ LIVE | 📝 EXPAND | $400K–$900K | [master-planned] |
| 68 | Seven Hills | https://www.lasvegashomesearchexperts.com/seven-hills | ✅ LIVE | 📝 EXPAND | $500K–$7M+ | [master-planned] [golf] [luxury] |
| 69 | Inspirada | https://www.lasvegashomesearchexperts.com/inspirada | ✅ LIVE | 📝 EXPAND | $420K–$1.1M+ | [master-planned] [new-construction] |
| 70 | Cadence | https://www.lasvegashomesearchexperts.com/cadence | ✅ LIVE | 📝 EXPAND | $350K–$800K | [master-planned] [new-construction] |
| 71 | MacDonald Ranch | https://www.lasvegashomesearchexperts.com/macdonald-ranch | 🔨 BUILD | Phase 1 | $300K–$15M+ | [master-planned] [golf] |
| 72 | MacDonald Highlands | https://www.lasvegashomesearchexperts.com/macdonald-highlands | ✅ LIVE | 📝 EXPAND | $800K–$28.95M+ | [guard-gated] [luxury] [golf] |
| 73 | Lake Las Vegas | https://www.lasvegashomesearchexperts.com/lake-las-vegas | ✅ LIVE | 📝 EXPAND | $400K–$5M+ | [master-planned] [luxury] [new-construction] [golf] |
| 74 | Ascaya | https://www.lasvegashomesearchexperts.com/ascaya | 🔨 BUILD | Phase 1 | $3M–$20M+ | [guard-gated] [luxury] |
| 75 | Madeira Canyon | https://www.lasvegashomesearchexperts.com/madeira-canyon | 🔨 BUILD | Phase 2 | $400K–$1.5M+ | [master-planned] [guard-gated] |
| 76 | Tuscany Village | https://www.lasvegashomesearchexperts.com/tuscany-village | ✅ LIVE | 📝 EXPAND | $400K–$700K | [guard-gated] [golf] |
| 77 | Roma Hills | https://www.lasvegashomesearchexperts.com/roma-hills | 🔨 BUILD | Phase 2 | $600K–$15M+ | [guard-gated] [luxury] |
| 78 | Silverado Ranch | https://www.lasvegashomesearchexperts.com/silverado-ranch | ✅ LIVE | 📝 EXPAND | $350K–$600K | [master-planned] |
| 79 | Coronado Ranch | https://www.lasvegashomesearchexperts.com/coronado-ranch | 🔨 BUILD | Phase 2 | $400K–$650K | — |
| 80 | Calico Ridge | https://www.lasvegashomesearchexperts.com/calico-ridge | 🔨 BUILD | Phase 2 | $500K–$1.2M | — |
| 81 | Whitney Ranch | https://www.lasvegashomesearchexperts.com/whitney-ranch | ✅ LIVE | 📝 EXPAND | $350K–$600K | — |
| 82 | Black Mountain Ranch | https://www.lasvegashomesearchexperts.com/black-mountain-ranch | 🔨 BUILD | Phase 2 | $400K–$800K | — |

#### Anthem Sub-Communities

| # | Community | Full URL | Status | Priority | Price Range | Tags |
|---|-----------|----------|--------|----------|-------------|------|
| 83 | Anthem Coventry | https://www.lasvegashomesearchexperts.com/anthem-coventry | 🔨 BUILD | Phase 2 | $500K–$900K | [master-planned] |
| 84 | Anthem Country Club | https://www.lasvegashomesearchexperts.com/anthem-country-club | 🔨 BUILD | Phase 1 | $1.2M–$8M+ | [guard-gated] [golf] [luxury] |
| 85 | Anthem Highlands | https://www.lasvegashomesearchexperts.com/anthem-highlands | 🔨 BUILD | Phase 2 | $500K–$800K | [master-planned] |
| 86 | Sun City Anthem | https://www.lasvegashomesearchexperts.com/sun-city-anthem | 🔨 BUILD | Phase 1 | $350K–$700K | [55+] [master-planned] |
| 87 | Solera at Anthem | https://www.lasvegashomesearchexperts.com/solera-at-anthem | 🔨 BUILD | Phase 2 | $350K–$650K | [55+] [guard-gated] |
| 88 | Terra Bella | https://www.lasvegashomesearchexperts.com/terra-bella | 🔨 BUILD | Phase 2 | $300K–$600K+ | [55+] |

#### Green Valley Sub-Communities

| # | Community | Full URL | Status | Priority | Price Range | Tags |
|---|-----------|----------|--------|----------|-------------|------|
| 89 | Green Valley North | https://www.lasvegashomesearchexperts.com/green-valley-north | 🔨 BUILD | Phase 2 | $400K–$1.5M | [master-planned] [golf] |
| 90 | Green Valley South | https://www.lasvegashomesearchexperts.com/green-valley-south | 🔨 BUILD | Phase 2 | $350K–$3M+ | [master-planned] |
| 91 | Legacy at Green Valley | https://www.lasvegashomesearchexperts.com/legacy-green-valley | 🔨 BUILD | Phase 2 | $700K–$2.5M | [golf] [guard-gated] [luxury] |
| 92 | The Fountains | https://www.lasvegashomesearchexperts.com/the-fountains | 🔨 BUILD | Phase 2 | $800K–$3M | [guard-gated] [luxury] |
| 93 | Southfork Henderson | https://www.lasvegashomesearchexperts.com/southfork-henderson | 🔨 BUILD | Phase 2 | $450K–$750K | [guard-gated] |
| 94 | Quail Ridge Estates | https://www.lasvegashomesearchexperts.com/quail-ridge-estates | 🔨 BUILD | Phase 2 | $1M–$3M+ | [guard-gated] [luxury] |

#### MacDonald Ranch Sub-Communities

| # | Community | Full URL | Status | Priority | Price Range | Tags |
|---|-----------|----------|--------|----------|-------------|------|
| 95 | Sun City MacDonald Ranch | https://www.lasvegashomesearchexperts.com/sun-city-macdonald-ranch | 🔨 BUILD | Phase 2 | $300K–$600K | [55+] [golf] |
| 96 | Foothills at MacDonald Ranch | https://www.lasvegashomesearchexperts.com/foothills-at-macdonald-ranch | 🔨 BUILD | Phase 2 | $1M–$4M+ | [guard-gated] [golf] [luxury] |
| 97 | Sunridge at MacDonald Ranch | https://www.lasvegashomesearchexperts.com/sunridge-at-macdonald-ranch | 🔨 BUILD | Phase 2 | $600K–$1.5M | [golf] |

#### MacDonald Highlands Sub-Communities

| # | Community | Full URL | Status | Priority | Price Range | Tags |
|---|-----------|----------|--------|----------|-------------|------|
| 98 | Dragon Rock | https://www.lasvegashomesearchexperts.com/dragon-rock | 🔨 BUILD | Phase 1 | $5M–$15M+ | [guard-gated] [luxury] |
| 99 | SkyVu | https://www.lasvegashomesearchexperts.com/skyvu | 🔨 BUILD | Phase 2 | $800K–$2M+ | [luxury] |
| 100 | Vu Residences | https://www.lasvegashomesearchexperts.com/vu-residences | 🔨 BUILD | Phase 2 | $1M–$3M+ | [luxury] |
| 101 | Four Seasons Private Residences | https://www.lasvegashomesearchexperts.com/four-seasons-private-residences | 🔨 BUILD | Phase 1 | $3.67M–$28.95M+ | [luxury] [high-rise] [new-construction] |
| 102 | Cresta Rosa | https://www.lasvegashomesearchexperts.com/cresta-rosa | 🔨 BUILD | Phase 2 | $2.83M–$3.95M | [luxury] [new-construction] |
| 103 | Neo | https://www.lasvegashomesearchexperts.com/neo-macdonald-highlands | 🔨 BUILD | Phase 2 | $2.34M–$4.97M | [luxury] [new-construction] |

#### Lake Las Vegas Sub-Communities

| # | Community | Full URL | Status | Priority | Price Range | Tags |
|---|-----------|----------|--------|----------|-------------|------|
| 104 | South Shore Lake Las Vegas | https://www.lasvegashomesearchexperts.com/south-shore-lake-las-vegas | 🔨 BUILD | Phase 2 | $800K–$5M+ | [guard-gated] [luxury] |
| 105 | Salerno Summit | https://www.lasvegashomesearchexperts.com/salerno-summit | 🔨 BUILD | Phase 2 | $2.06M–$3.15M | [luxury] [new-construction] |
| 106 | Del Webb at Lake Las Vegas | https://www.lasvegashomesearchexperts.com/del-webb-lake-las-vegas | 🔨 BUILD | Phase 2 | $400K–$700K | [55+] |
| 107 | Incanta Lago | https://www.lasvegashomesearchexperts.com/incanta-lago | 🔨 BUILD | Phase 2 | $1.89M–$2.09M+ | [luxury] [new-construction] [guard-gated] |
| 108 | La Cova | https://www.lasvegashomesearchexperts.com/la-cova | 🔨 BUILD | Phase 2 | $434K–$999K | [new-construction] |
| 109 | Lago Del Sol Hills | https://www.lasvegashomesearchexperts.com/lago-del-sol-hills | 🔨 BUILD | Phase 2 | $1.14M–$1.76M | [luxury] [new-construction] |
| 110 | Marbella Lake Las Vegas | https://www.lasvegashomesearchexperts.com/marbella-lake-las-vegas | 🔨 BUILD | Phase 2 | $712K–$808K | [new-construction] |
| 111 | Piazza Paradiso | https://www.lasvegashomesearchexperts.com/piazza-paradiso | 🔨 BUILD | Phase 2 | $989K–$1.48M+ | [luxury] [new-construction] |
| 112 | Portofino Lake Las Vegas | https://www.lasvegashomesearchexperts.com/portofino-lake-las-vegas | 🔨 BUILD | Phase 2 | $924K–$1.06M | [new-construction] |
| 113 | Riviera Vista | https://www.lasvegashomesearchexperts.com/riviera-vista | 🔨 BUILD | Phase 2 | TBD | [new-construction] |
| 114 | Shoreline Lake Las Vegas | https://www.lasvegashomesearchexperts.com/shoreline-lake-las-vegas | 🔨 BUILD | Phase 2 | $749K–$799K | [new-construction] |
| 115 | Velaris | https://www.lasvegashomesearchexperts.com/velaris | 🔨 BUILD | Phase 2 | $929K–$1.24M | [luxury] [new-construction] |
| 116 | Verona Lake Las Vegas | https://www.lasvegashomesearchexperts.com/verona-lake-las-vegas | 🔨 BUILD | Phase 2 | $479K–$505K | [new-construction] |

#### Cadence Sub-Communities

| # | Community | Full URL | Status | Priority | Price Range | Tags |
|---|-----------|----------|--------|----------|-------------|------|
| 117 | Heritage at Cadence | https://www.lasvegashomesearchexperts.com/heritage-at-cadence | 🔨 BUILD | Phase 2 | $350K–$550K | [55+] [guard-gated] |
| 118 | Libretto at Cadence | https://www.lasvegashomesearchexperts.com/libretto-at-cadence | 🔨 BUILD | Phase 2 | $393K–$450K | [new-construction] |
| 119 | Midtown at Cadence | https://www.lasvegashomesearchexperts.com/midtown-at-cadence | 🔨 BUILD | Phase 2 | $415K+ | [new-construction] |
| 120 | Opus at Cadence | https://www.lasvegashomesearchexperts.com/opus-at-cadence | 🔨 BUILD | Phase 2 | TBD | [new-construction] |
| 121 | Serenade at Cadence | https://www.lasvegashomesearchexperts.com/serenade-at-cadence | 🔨 BUILD | Phase 2 | $465K–$520K | [new-construction] |
| 122 | Serenata at Cadence | https://www.lasvegashomesearchexperts.com/serenata-at-cadence | 🔨 BUILD | Phase 2 | $518K+ | [new-construction] |
| 123 | Symmetry Summit at Cadence | https://www.lasvegashomesearchexperts.com/symmetry-summit-at-cadence | 🔨 BUILD | Phase 2 | $724K–$808K | [new-construction] |

#### Ascaya Sub-Communities

| # | Community | Full URL | Status | Priority | Price Range | Tags |
|---|-----------|----------|--------|----------|-------------|------|
| 124 | The Canyon at Ascaya | https://www.lasvegashomesearchexperts.com/the-canyon-at-ascaya | 🔨 BUILD | Phase 2 | $2M–$5M+ | [luxury] |

#### Madeira Canyon Sub-Communities

| # | Community | Full URL | Status | Priority | Price Range | Tags |
|---|-----------|----------|--------|----------|-------------|------|
| 125 | Club M (The Club at Madeira Canyon) | https://www.lasvegashomesearchexperts.com/club-m-madeira-canyon | 🔨 BUILD | Phase 2 | $400K–$900K | [55+] [guard-gated] |

#### Roma Hills Sub-Communities

| # | Community | Full URL | Status | Priority | Price Range | Tags |
|---|-----------|----------|--------|----------|-------------|------|
| 126 | Obsidian at Roma Hills | https://www.lasvegashomesearchexperts.com/obsidian-at-roma-hills | 🔨 BUILD | Phase 2 | $5M–$15M+ | [guard-gated] [luxury] |

#### Seven Hills Sub-Communities

| # | Community | Full URL | Status | Priority | Price Range | Tags |
|---|-----------|----------|--------|----------|-------------|------|
| 127 | Terracina | https://www.lasvegashomesearchexperts.com/terracina | 🔨 BUILD | Phase 2 | $2M–$7M | [guard-gated] [luxury] |

#### Inspirada Sub-Communities

| # | Community | Full URL | Status | Priority | Price Range | Tags |
|---|-----------|----------|--------|----------|-------------|------|
| 128 | Lucere at Inspirada | https://www.lasvegashomesearchexperts.com/lucere-at-inspirada | 🔨 BUILD | Phase 2 | TBD | [new-construction] |

#### Henderson Additional Neighborhoods

| # | Community | Full URL | Status | Priority | Price Range | Tags |
|---|-----------|----------|--------|----------|-------------|------|
| 129 | Cordera Ranch | https://www.lasvegashomesearchexperts.com/cordera-ranch | 🔨 BUILD | Phase 2 | $400K–$600K | [55+] |
| 130 | McCullough Hills | https://www.lasvegashomesearchexperts.com/mccullough-hills | 🔨 BUILD | Phase 2 | $600K–$2M+ | [luxury] |
| 131 | Mission Hills Henderson | https://www.lasvegashomesearchexperts.com/mission-hills-henderson | 🔨 BUILD | Phase 2 | $350K–$1.5M+ | [master-planned] |
| 132 | Paradise Hills Henderson | https://www.lasvegashomesearchexperts.com/paradise-hills-henderson | 🔨 BUILD | Phase 2 | $350K–$1M+ | [master-planned] [new-construction] |
| 133 | South Valley Ranch | https://www.lasvegashomesearchexperts.com/south-valley-ranch | 🔨 BUILD | Phase 2 | $300K–$700K | — |
| 134 | The Bluffs Henderson | https://www.lasvegashomesearchexperts.com/the-bluffs-henderson | 🔨 BUILD | Phase 2 | $450K–$750K | — |
| 135 | Talesera Hills | https://www.lasvegashomesearchexperts.com/talesera-hills | 🔨 BUILD | Phase 2 | $400K–$700K | [new-construction] |
| 136 | Heritage at Black Mountain Ranch | https://www.lasvegashomesearchexperts.com/heritage-at-black-mountain-ranch | 🔨 BUILD | Phase 2 | $300K–$500K | [55+] |
| 137 | Black Mountain Vistas | https://www.lasvegashomesearchexperts.com/black-mountain-vistas | 🔨 BUILD | Phase 2 | $350K–$700K | — |
| 138 | Downtown Henderson | https://www.lasvegashomesearchexperts.com/downtown-henderson | 🔨 BUILD | Phase 2 | $250K–$600K | — |

---

### 2.4 — NORTHWEST LAS VEGAS

**Parent Hub:** https://www.lasvegashomesearchexperts.com/north-las-vegas (✅ LIVE — partial coverage)

#### Northwest Las Vegas Master-Planned Communities

| # | Community | Full URL | Status | Priority | Price Range | Tags |
|---|-----------|----------|--------|----------|-------------|------|
| 139 | Skye Canyon | https://www.lasvegashomesearchexperts.com/skye-canyon | ✅ LIVE | 📝 EXPAND | $450K–$800K+ | [master-planned] [new-construction] |
| 140 | Centennial Hills | https://www.lasvegashomesearchexperts.com/centennial-hills | ✅ LIVE | 📝 EXPAND | $400K–$800K | — |
| 141 | Lone Mountain | https://www.lasvegashomesearchexperts.com/lone-mountain | ✅ LIVE | 📝 EXPAND | $500K–$2M+ | [luxury] |
| 142 | Sunstone | https://www.lasvegashomesearchexperts.com/sunstone | 🔨 BUILD | Phase 1 | $380K–$700K+ | [master-planned] [new-construction] |
| 143 | Skye Summit | https://www.lasvegashomesearchexperts.com/skye-summit | 🔨 BUILD | Phase 2 | TBD | [master-planned] [new-construction] |
| 144 | Providence | https://www.lasvegashomesearchexperts.com/providence | ✅ LIVE | 📝 EXPAND | $450K–$700K | [master-planned] |
| 145 | Peccole Ranch | https://www.lasvegashomesearchexperts.com/peccole-ranch | 🔨 BUILD | Phase 1 | $250K–$3M+ | [master-planned] [guard-gated] |
| 146 | Queensridge | https://www.lasvegashomesearchexperts.com/queensridge | 🔨 BUILD | Phase 1 | $600K–$3M+ | [guard-gated] [luxury] |

#### Sunstone Sub-Communities

| # | Community | Full URL | Status | Priority | Price Range | Tags |
|---|-----------|----------|--------|----------|-------------|------|
| 147 | Capella at Sunstone | https://www.lasvegashomesearchexperts.com/capella-at-sunstone | 🔨 BUILD | Phase 2 | $500K–$650K | [new-construction] [guard-gated] |
| 148 | Estrella at Sunstone | https://www.lasvegashomesearchexperts.com/estrella-at-sunstone | 🔨 BUILD | Phase 2 | $475K–$550K | [new-construction] [guard-gated] |
| 149 | Trilogy Sunstone | https://www.lasvegashomesearchexperts.com/trilogy-sunstone | 🔨 BUILD | Phase 2 | $400K–$700K | [55+] [guard-gated] [new-construction] |

#### Northwest Las Vegas Other Communities

| # | Community | Full URL | Status | Priority | Price Range | Tags |
|---|-----------|----------|--------|----------|-------------|------|
| 150 | Desert Shores | https://www.lasvegashomesearchexperts.com/desert-shores | ✅ LIVE | 📝 EXPAND | $350K–$600K | — |
| 151 | The Lakes | https://www.lasvegashomesearchexperts.com/the-lakes | ✅ LIVE | 📝 EXPAND | $350K–$1M | — |
| 152 | Silverstone Ranch | https://www.lasvegashomesearchexperts.com/silverstone-ranch | 🔨 BUILD | Phase 2 | $400K–$650K | [golf] |
| 153 | Painted Desert | https://www.lasvegashomesearchexperts.com/painted-desert | 🔨 BUILD | Phase 2 | $350K–$650K | [golf] |
| 154 | Iron Mountain Ranch | https://www.lasvegashomesearchexperts.com/iron-mountain-ranch | 🔨 BUILD | Phase 2 | $400K–$650K | — |
| 155 | Los Prados | https://www.lasvegashomesearchexperts.com/los-prados | 🔨 BUILD | Phase 2 | $250K–$500K | [golf] [55+] |
| 156 | Kyle Canyon Gateway | https://www.lasvegashomesearchexperts.com/kyle-canyon | 🔨 BUILD | Phase 2 | $400K–$700K | — |
| 157 | Elkhorn Springs | https://www.lasvegashomesearchexperts.com/elkhorn-springs | 🔨 BUILD | Phase 2 | $400K–$600K | [new-construction] |
| 158 | Skye Hills | https://www.lasvegashomesearchexperts.com/skye-hills | 🔨 BUILD | Phase 2 | $400K–$700K | [master-planned] [new-construction] |
| 159 | Kyle Pointe | https://www.lasvegashomesearchexperts.com/kyle-pointe | 🔨 BUILD | Phase 2 | $500K–$700K+ | [new-construction] |
| 160 | Homestead Ranch | https://www.lasvegashomesearchexperts.com/homestead-ranch | 🔨 BUILD | Phase 2 | $500K–$700K | [new-construction] |
| 161 | Elkhorn Grove | https://www.lasvegashomesearchexperts.com/elkhorn-grove | 🔨 BUILD | Phase 2 | $600K–$1M+ | [new-construction] [guard-gated] |
| 162 | Lynbrook | https://www.lasvegashomesearchexperts.com/lynbrook | 🔨 BUILD | Phase 2 | $400K–$700K | [guard-gated] |
| 163 | North Shores | https://www.lasvegashomesearchexperts.com/north-shores | 🔨 BUILD | Phase 2 | $350K–$600K | — |
| 164 | South Shores | https://www.lasvegashomesearchexperts.com/south-shores | 🔨 BUILD | Phase 2 | $300K–$550K | — |
| 165 | Alta Mira | https://www.lasvegashomesearchexperts.com/alta-mira | 🔨 BUILD | Phase 2 | $300K–$500K | — |

---

### 2.5 — SOUTHWEST LAS VEGAS

**Parent Hub:** https://www.lasvegashomesearchexperts.com/las-vegas (🔨 BUILD — needed)

#### Southern Highlands & Sub-Communities

| # | Community | Full URL | Status | Priority | Price Range | Tags |
|---|-----------|----------|--------|----------|-------------|------|
| 166 | Southern Highlands | https://www.lasvegashomesearchexperts.com/southern-highlands | ✅ LIVE | 📝 EXPAND | $400K–$10M+ | [master-planned] [guard-gated] [golf] [luxury] |
| 167 | Southern Highlands — The Estates | https://www.lasvegashomesearchexperts.com/southern-highlands-the-estates | 🔨 BUILD | Phase 1 | $2M–$10M+ | [guard-gated] [luxury] |
| 168 | Tuscan Cliffs | https://www.lasvegashomesearchexperts.com/tuscan-cliffs | 🔨 BUILD | Phase 1 | $800K–$3M | [guard-gated] [luxury] |
| 169 | The Foothills at Southern Highlands | https://www.lasvegashomesearchexperts.com/southern-highlands-the-foothills | 🔨 BUILD | Phase 2 | $700K–$2M | [guard-gated] |
| 170 | Royal Highlands | https://www.lasvegashomesearchexperts.com/royal-highlands | 🔨 BUILD | Phase 2 | $700K–$1.5M | [guard-gated] |
| 171 | The Enclave at Southern Highlands | https://www.lasvegashomesearchexperts.com/southern-highlands-the-enclave | 🔨 BUILD | Phase 2 | $600K–$1.5M | [guard-gated] [new-construction] |
| 172 | Vintage Canyon | https://www.lasvegashomesearchexperts.com/vintage-canyon | 🔨 BUILD | Phase 2 | $800K–$2M+ | [guard-gated] |
| 173 | Olympia Ridge | https://www.lasvegashomesearchexperts.com/olympia-ridge | 🔨 BUILD | Phase 1 | $1.5M–$5M+ | [guard-gated] [luxury] [golf] |
| 174 | Olympia Ridge Estates | https://www.lasvegashomesearchexperts.com/olympia-ridge-estates | 🔨 BUILD | Phase 2 | $2M–$10M+ | [guard-gated] [luxury] |
| 175 | The Bluffs at Southern Highlands | https://www.lasvegashomesearchexperts.com/southern-highlands-the-bluffs | 🔨 BUILD | Phase 2 | $3M–$10M+ | [guard-gated] [luxury] |
| 176 | Promontory Ridge | https://www.lasvegashomesearchexperts.com/promontory-ridge | 🔨 BUILD | Phase 2 | $800K–$1.5M | [guard-gated] |

#### Southwest Las Vegas Other Communities

| # | Community | Full URL | Status | Priority | Price Range | Tags |
|---|-----------|----------|--------|----------|-------------|------|
| 177 | Mountains Edge | https://www.lasvegashomesearchexperts.com/mountains-edge | ✅ LIVE | 📝 EXPAND | $350K–$600K | [master-planned] |
| 178 | Rhodes Ranch | https://www.lasvegashomesearchexperts.com/rhodes-ranch | ✅ LIVE | 📝 EXPAND | $350K–$700K | [guard-gated] [golf] |
| 179 | Spanish Trail | https://www.lasvegashomesearchexperts.com/spanish-trail | 🔨 BUILD | Phase 2 | $500K–$2M+ | [guard-gated] [golf] [luxury] |
| 180 | Spanish Hills | https://www.lasvegashomesearchexperts.com/spanish-hills | 🔨 BUILD | Phase 2 | $900K–$3M+ | [guard-gated] [luxury] |
| 181 | Nevada Trails | https://www.lasvegashomesearchexperts.com/nevada-trails | 🔨 BUILD | Phase 2 | $350K–$600K | [master-planned] |
| 182 | Southern Terrace | https://www.lasvegashomesearchexperts.com/southern-terrace | 🔨 BUILD | Phase 2 | $400K–$700K | [guard-gated] |
| 183 | Southwest Ranch | https://www.lasvegashomesearchexperts.com/southwest-ranch | 🔨 BUILD | Phase 2 | $350K–$600K | [master-planned] |
| 184 | Canyon Estates | https://www.lasvegashomesearchexperts.com/canyon-estates | 🔨 BUILD | Phase 2 | $600K–$1.2M+ | [guard-gated] [luxury] |
| 185 | Highlands Ranch LV | https://www.lasvegashomesearchexperts.com/highlands-ranch-las-vegas | 🔨 BUILD | Phase 2 | $350K–$600K | [master-planned] |
| 186 | Arlington Ranch | https://www.lasvegashomesearchexperts.com/arlington-ranch | 🔨 BUILD | Phase 2 | $300K–$600K | [master-planned] |
| 187 | Coronado Ranch SW | https://www.lasvegashomesearchexperts.com/coronado-ranch-sw | 🔨 BUILD | Phase 2 | $350K–$550K | — |
| 188 | Spring Mountain Ranch | https://www.lasvegashomesearchexperts.com/spring-mountain-ranch | 🔨 BUILD | Phase 2 | $350K–$600K | — |

---

### 2.6 — CENTRAL / EAST LAS VEGAS

| # | Community | Full URL | Status | Priority | Price Range | Tags |
|---|-----------|----------|--------|----------|-------------|------|
| 189 | Enterprise | https://www.lasvegashomesearchexperts.com/enterprise | ✅ LIVE | 📝 EXPAND | $350K–$700K | — |
| 190 | Spring Valley | https://www.lasvegashomesearchexperts.com/spring-valley | ✅ LIVE | 📝 EXPAND | $300K–$600K | — |
| 191 | Paradise | https://www.lasvegashomesearchexperts.com/paradise | ✅ LIVE | 📝 EXPAND | $250K–$600K | — |
| 192 | Canyon Gate | https://www.lasvegashomesearchexperts.com/canyon-gate | 🔨 BUILD | Phase 1 | $700K–$2M+ | [guard-gated] [golf] [luxury] |
| 193 | Las Vegas Country Club | https://www.lasvegashomesearchexperts.com/las-vegas-country-club | 🔨 BUILD | Phase 2 | $300K–$3M+ | [guard-gated] [golf] |
| 194 | Stallion Mountain | https://www.lasvegashomesearchexperts.com/stallion-mountain | 🔨 BUILD | Phase 2 | $250K–$700K | [golf] |
| 195 | Solera at Stallion Mountain | https://www.lasvegashomesearchexperts.com/solera-at-stallion-mountain | 🔨 BUILD | Phase 2 | $200K–$400K | [55+] [guard-gated] |
| 196 | Section 10 | https://www.lasvegashomesearchexperts.com/section-10 | 🔨 BUILD | Phase 2 | $700K–$5M+ | [luxury] |
| 197 | Sunrise Manor | https://www.lasvegashomesearchexperts.com/sunrise-manor | 🔨 BUILD | Phase 2 | $200K–$400K | — |
| 198 | Whitney | https://www.lasvegashomesearchexperts.com/whitney | 🔨 BUILD | Phase 2 | $250K–$400K | — |
| 199 | Winchester | https://www.lasvegashomesearchexperts.com/winchester | 🔨 BUILD | Phase 2 | $250K–$500K | — |

---

### 2.7 — DOWNTOWN LAS VEGAS

| # | Community | Full URL | Status | Priority | Price Range | Tags |
|---|-----------|----------|--------|----------|-------------|------|
| 200 | Downtown Las Vegas Hub | https://www.lasvegashomesearchexperts.com/downtown-las-vegas | 🔨 BUILD | Phase 2 | — | — |
| 201 | Arts District / 18b | https://www.lasvegashomesearchexperts.com/arts-district-las-vegas | 🔨 BUILD | Phase 2 | $200K–$600K | [vintage] |
| 202 | Fremont East | https://www.lasvegashomesearchexperts.com/fremont-east | 🔨 BUILD | Phase 2 | $200K–$500K | — |
| 203 | Huntridge | https://www.lasvegashomesearchexperts.com/huntridge | 🔨 BUILD | Phase 2 | $300K–$600K | [vintage] |
| 204 | John S. Park | https://www.lasvegashomesearchexperts.com/john-s-park | 🔨 BUILD | Phase 2 | $350K–$700K | [vintage] |
| 205 | Scotch 80s | https://www.lasvegashomesearchexperts.com/scotch-80s | 🔨 BUILD | Phase 2 | $800K–$3M+ | [vintage] [luxury] [guard-gated] |

---

### 2.8 — NORTH LAS VEGAS

**Parent Hub:** https://www.lasvegashomesearchexperts.com/north-las-vegas (✅ LIVE — needs expansion)

| # | Community | Full URL | Status | Priority | Price Range | Tags |
|---|-----------|----------|--------|----------|-------------|------|
| 206 | Aliante | https://www.lasvegashomesearchexperts.com/aliante | ✅ LIVE | 📝 EXPAND | $350K–$600K | [master-planned] |
| 207 | Club Aliante | https://www.lasvegashomesearchexperts.com/club-aliante | 🔨 BUILD | Phase 2 | $475K–$600K | [guard-gated] [golf] |
| 208 | Sun City Aliante | https://www.lasvegashomesearchexperts.com/sun-city-aliante | 🔨 BUILD | Phase 2 | $300K–$500K | [55+] |
| 209 | Heartland at Tule Springs | https://www.lasvegashomesearchexperts.com/heartland-tule-springs | 🔨 BUILD | Phase 1 | $350K–$550K | [master-planned] [new-construction] |
| 210 | The Villages at Tule Springs | https://www.lasvegashomesearchexperts.com/villages-at-tule-springs | 🔨 BUILD | Phase 2 | $340K–$550K | [master-planned] [new-construction] |
| 211 | Craig Ranch NLV | https://www.lasvegashomesearchexperts.com/craig-ranch | 🔨 BUILD | Phase 2 | $350K–$550K | [new-construction] |
| 212 | Eldorado NLV | https://www.lasvegashomesearchexperts.com/eldorado-north-las-vegas | 🔨 BUILD | Phase 2 | $250K–$400K | — |
| 213 | Valley Vista | https://www.lasvegashomesearchexperts.com/valley-vista | 🔨 BUILD | Phase 2 | $300K–$500K | — |
| 214 | Ardiente | https://www.lasvegashomesearchexperts.com/ardiente | 🔨 BUILD | Phase 2 | $300K–$500K | [55+] [new-construction] |
| 215 | Del Webb at North Ranch | https://www.lasvegashomesearchexperts.com/del-webb-north-ranch | 🔨 BUILD | Phase 2 | $350K–$550K | [55+] [new-construction] |
| 216 | Sandstone NLV | https://www.lasvegashomesearchexperts.com/sandstone-north-las-vegas | 🔨 BUILD | Phase 2 | TBD | [master-planned] [new-construction] |
| 217 | Hylo Park | https://www.lasvegashomesearchexperts.com/hylo-park | 🔨 BUILD | Phase 2 | TBD | [new-construction] |

---

### 2.9 — LIFESTYLE COLLECTION PAGES

> **Note on URL pattern:** Lifestyle collection pages use flat, descriptive slugs per the hybrid recommendation in Section 1. These pages aggregate communities by lifestyle characteristic and link out to individual community pages.

| # | Page | Full URL | Status | Priority | Tags |
|---|------|----------|--------|----------|------|
| 218 | Guard-Gated Communities | https://www.lasvegashomesearchexperts.com/guard-gated-communities | 🔨 BUILD | Phase 1 | [guard-gated] |
| 219 | 55+ Active Adult Communities | https://www.lasvegashomesearchexperts.com/55-plus-communities | 🔨 BUILD | Phase 1 | [55+] |
| 220 | Luxury Communities ($2M+) | https://www.lasvegashomesearchexperts.com/luxury-communities | 🔨 BUILD | Phase 1 | [luxury] |
| 221 | New Construction | https://www.lasvegashomesearchexperts.com/new-construction | 🔨 BUILD | Phase 1 | [new-construction] |
| 222 | High-Rise Condos | https://www.lasvegashomesearchexperts.com/high-rise-condos | 🔨 BUILD | Phase 1 | [high-rise] |
| 223 | Golf Communities | https://www.lasvegashomesearchexperts.com/golf-communities | 🔨 BUILD | Phase 2 | [golf] |
| 224 | Vintage & Historic Neighborhoods | https://www.lasvegashomesearchexperts.com/vintage-historic-neighborhoods | 🔨 BUILD | Phase 2 | [vintage] |

#### Vintage / Historic Sub-Pages

| # | Community | Full URL | Status | Priority | Price Range | Tags |
|---|-----------|----------|--------|----------|-------------|------|
| 225 | Rancho Circle | https://www.lasvegashomesearchexperts.com/rancho-circle | 🔨 BUILD | Phase 2 | $2M–$10M+ | [guard-gated] [luxury] [vintage] |
| 226 | Rancho Bel Air | https://www.lasvegashomesearchexperts.com/rancho-bel-air | 🔨 BUILD | Phase 2 | $1M–$5M+ | [guard-gated] [luxury] [vintage] |
| 227 | Rancho Springs | https://www.lasvegashomesearchexperts.com/rancho-springs | 🔨 BUILD | Phase 2 | $500K–$1.5M | [vintage] |
| 228 | Rancho Manor | https://www.lasvegashomesearchexperts.com/rancho-manor | 🔨 BUILD | Phase 2 | $400K–$1M | [vintage] |
| 229 | Spanish Oaks | https://www.lasvegashomesearchexperts.com/spanish-oaks | 🔨 BUILD | Phase 2 | $400K–$1.5M | [guard-gated] [vintage] |
| 230 | McNeil Estates | https://www.lasvegashomesearchexperts.com/mcneil-estates | 🔨 BUILD | Phase 2 | $400K–$2M+ | [vintage] |
| 231 | Glen Heather Estates | https://www.lasvegashomesearchexperts.com/glen-heather-estates | 🔨 BUILD | Phase 2 | $400K–$1.5M | [vintage] |
| 232 | Beverly Green | https://www.lasvegashomesearchexperts.com/beverly-green | 🔨 BUILD | Phase 2 | $400K–$1.5M | [vintage] |
| 233 | Paradise Palms | https://www.lasvegashomesearchexperts.com/paradise-palms | 🔨 BUILD | Phase 2 | $500K–$1.5M | [vintage] |

---

### 2.10 — HIGH-RISE INDIVIDUAL PAGES

**Collection Hub:** https://www.lasvegashomesearchexperts.com/high-rise-condos (🔨 BUILD — Phase 1)

#### On / Directly On The Strip

| # | Tower | Full URL | Status | Priority | Stories | Units | Price Range |
|---|-------|----------|--------|----------|---------|-------|-------------|
| 234 | Veer Towers | https://www.lasvegashomesearchexperts.com/veer-towers | 🔨 BUILD | Phase 2 | 37 (twin) | 670 | $400K–$5M+ |
| 235 | Sky Las Vegas | https://www.lasvegashomesearchexperts.com/sky-las-vegas | 🔨 BUILD | Phase 2 | 45 | 409 | $300K–$3M+ |
| 236 | Waldorf Astoria Las Vegas | https://www.lasvegashomesearchexperts.com/waldorf-astoria-las-vegas | 🔨 BUILD | Phase 2 | 47 | ~225 | $800K–$10M+ |
| 237 | Vdara | https://www.lasvegashomesearchexperts.com/vdara | 🔨 BUILD | Phase 2 | 57 | ~1,495 | $300K–$2M+ |
| 238 | Trump International Hotel | https://www.lasvegashomesearchexperts.com/trump-international-las-vegas | 🔨 BUILD | Phase 2 | 64 | ~1,282 | $300K–$3M+ |
| 239 | Signature at MGM Grand | https://www.lasvegashomesearchexperts.com/signature-mgm-grand | 🔨 BUILD | Phase 2 | 38 (3 towers) | 1,728 | $200K–$1M+ |
| 240 | Palms Place | https://www.lasvegashomesearchexperts.com/palms-place | 🔨 BUILD | Phase 2 | 47 | 599 | $250K–$1.5M+ |
| 241 | Jockey Club | https://www.lasvegashomesearchexperts.com/jockey-club | 🔨 BUILD | Phase 2 | 11 | 348 | $200K–$500K |

#### Strip-Adjacent

| # | Tower | Full URL | Status | Priority | Stories | Units | Price Range |
|---|-------|----------|--------|----------|---------|-------|-------------|
| 242 | Panorama Towers | https://www.lasvegashomesearchexperts.com/panorama-towers | 🔨 BUILD | Phase 2 | 33 (twin) | 650 | $300K–$2M+ |
| 243 | The Martin | https://www.lasvegashomesearchexperts.com/the-martin | 🔨 BUILD | Phase 2 | 45 | 372 | $300K–$2M+ |
| 244 | Turnberry Place | https://www.lasvegashomesearchexperts.com/turnberry-place | 🔨 BUILD | Phase 2 | 36 (4 towers) | 720 | $400K–$5M+ |
| 245 | Turnberry Towers | https://www.lasvegashomesearchexperts.com/turnberry-towers | 🔨 BUILD | Phase 2 | 45 (twin) | 636 | $400K–$4M+ |
| 246 | Allure Las Vegas | https://www.lasvegashomesearchexperts.com/allure-las-vegas | 🔨 BUILD | Phase 2 | 41 | 428 | $250K–$2M+ |
| 247 | Park Towers | https://www.lasvegashomesearchexperts.com/park-towers | 🔨 BUILD | Phase 2 | 20 (twin) | 84 | $1M–$6M+ |
| 248 | Regency Towers | https://www.lasvegashomesearchexperts.com/regency-towers | 🔨 BUILD | Phase 2 | 27 | 218 | $300K–$2M+ |
| 249 | One Las Vegas | https://www.lasvegashomesearchexperts.com/one-las-vegas | 🔨 BUILD | Phase 2 | — | — | $250K–$1M+ |
| 250 | Platinum Las Vegas | https://www.lasvegashomesearchexperts.com/platinum-las-vegas | 🔨 BUILD | Phase 2 | — | — | $250K–$1.5M+ |
| 251 | Boca Raton Las Vegas | https://www.lasvegashomesearchexperts.com/boca-raton-las-vegas | 🔨 BUILD | Phase 2 | — | — | $300K–$1.5M+ |
| 252 | Metropolis | https://www.lasvegashomesearchexperts.com/metropolis-las-vegas | 🔨 BUILD | Phase 2 | 19 | 71 | $400K–$1.5M |
| 253 | Marie Antoinette | https://www.lasvegashomesearchexperts.com/marie-antoinette | 🔨 BUILD | Phase 2 | 10 | 140 | $150K–$500K |

#### Downtown Las Vegas High-Rises

| # | Tower | Full URL | Status | Priority | Price Range |
|---|-------|----------|--------|----------|-------------|
| 254 | Juhl | https://www.lasvegashomesearchexperts.com/juhl | 🔨 BUILD | Phase 2 | $200K–$600K+ |
| 255 | The Ogden | https://www.lasvegashomesearchexperts.com/the-ogden | 🔨 BUILD | Phase 2 | $200K–$700K+ |
| 256 | Newport Lofts | https://www.lasvegashomesearchexperts.com/newport-lofts | 🔨 BUILD | Phase 2 | $200K–$500K+ |
| 257 | Soho Lofts | https://www.lasvegashomesearchexperts.com/soho-lofts | 🔨 BUILD | Phase 2 | $250K–$600K+ |
| 258 | Loft 5 | https://www.lasvegashomesearchexperts.com/loft-5 | 🔨 BUILD | Phase 2 | $200K–$500K+ |
| 259 | Cello Tower | https://www.lasvegashomesearchexperts.com/cello-tower | 🔨 BUILD | Phase 1 | $700K–$4.5M+ |

---

### 2.11 — BOULDER CITY

| # | Community | Full URL | Status | Priority | Price Range |
|---|-----------|----------|--------|----------|-------------|
| 260 | Boulder City | https://www.lasvegashomesearchexperts.com/boulder-city | ✅ LIVE | 📝 EXPAND | $250K–$1.5M+ |

---

### 2.12 — RENO / NORTHERN NEVADA (Separate Market)

> **Note:** These 5 pages are already live. They represent a separate geographic market and should be maintained as a distinct section. Do NOT integrate into the Las Vegas community taxonomy. A separate Reno hub page and taxonomy document should be created if the team expands this market.

| # | Community | Full URL | Status | Notes |
|---|-----------|----------|--------|-------|
| 261 | Reno | https://www.lasvegashomesearchexperts.com/reno | ✅ LIVE | Reno city hub |
| 262 | Sparks | https://www.lasvegashomesearchexperts.com/sparks | ✅ LIVE | Sparks city hub |
| 263 | Spanish Springs | https://www.lasvegashomesearchexperts.com/spanish-springs | ✅ LIVE | NV suburban community |
| 264 | Sun Valley | https://www.lasvegashomesearchexperts.com/sun-valley | ✅ LIVE | Sun Valley NV |
| 265 | Incline Village | https://www.lasvegashomesearchexperts.com/incline-village | ✅ LIVE | Lake Tahoe luxury community |

---

## TOTAL PAGE COUNTS

| Category | Live | Build | Expand | Total |
|----------|------|-------|--------|-------|
| Hub Pages | 5 | 2 | — | 7 |
| Summerlin Villages (North + South + West) | 0 | 28 | — | 28 |
| Summerlin Guard-Gated Sub-Communities | 0 | 17 | — | 17 |
| Summerlin Special/Standalone | 1 (RRCC) | 12 | — | 13 |
| Henderson Master-Planned | 9 | 9 | — | 18 |
| Henderson Sub-Communities | 0 | 43 | — | 43 |
| Northwest Las Vegas | 5 | 18 | — | 23 |
| Southwest Las Vegas | 4 | 14 | — | 18 |
| Central / East Las Vegas | 3 | 8 | — | 11 |
| Downtown Las Vegas | 0 | 6 | — | 6 |
| North Las Vegas | 3 | 9 | — | 12 |
| Lifestyle Collections (hubs) | 0 | 7 | — | 7 |
| Vintage/Historic Sub-Pages | 0 | 9 | — | 9 |
| High-Rise Individual Pages | 0 | 26 | — | 26 |
| Boulder City | 1 | 0 | — | 1 |
| Reno / Northern Nevada | 5 | 0 | — | 5 |
| **TOTAL** | **36** | **208** | **15 (expand)** | **265** |

---

<a name="section-3"></a>
## SECTION 3: URL SLUG CONVENTIONS

These rules govern every URL on lasvegashomesearchexperts.com. Chris and his team should apply these rules consistently before requesting any new page from their Sierra Interactive developer.

### Core Rules

| Rule | Correct | Incorrect |
|------|---------|-----------|
| Lowercase only | `/southern-highlands` | `/Southern-Highlands` |
| Hyphens for spaces | `/green-valley-ranch` | `/green_valley_ranch` |
| No trailing slashes | `/anthem-country-club` | `/anthem-country-club/` |
| No special characters | `/55-plus-communities` | `/55+communities` |
| Articles ("the") retained when part of official name | `/the-ridges-summerlin` | `/ridges-summerlin` |
| Abbreviations spelled out | `/55-plus-communities` | `/55plus` |

### Handling Sub-Communities (The Key Decision)

The site uses **flat slugs** — no nested paths like `/summerlin/the-ridges`. For sub-communities, prefix the slug with the parent community name to avoid conflicts:

| Pattern | Example | Use When |
|---------|---------|----------|
| Direct name (no prefix) | `/bellacere` | Name is unique across entire site |
| Parent-prefixed | `/summerlin-the-ridges` | Two or more communities could share the same name |
| Parent-prefixed with "at" | `/anthem-country-club` | Natural English reads better with compound name |
| Directional/geographic qualifier | `/southfork-henderson` | Disambiguates from same name in another city |

**Decision tree for naming a new sub-community page:**
1. Is the community name globally unique across the entire site? → Use it directly: `/bellacere`
2. Does another community elsewhere share the same name? → Prefix with parent: `/summerlin-the-ridges`
3. Is the community known by a compound name that includes the parent? → Use compound: `/anthem-country-club`, `/sun-city-anthem`
4. Is the ambiguity geographic (same name, different city)? → Add city/area qualifier: `/southfork-henderson`, `/marbella-lake-las-vegas`

### Lifestyle Collection Page Slugs

| Page | Slug | Full URL |
|------|------|----------|
| Guard-Gated Communities | `/guard-gated-communities` | https://www.lasvegashomesearchexperts.com/guard-gated-communities |
| 55+ Active Adult | `/55-plus-communities` | https://www.lasvegashomesearchexperts.com/55-plus-communities |
| Luxury Communities | `/luxury-communities` | https://www.lasvegashomesearchexperts.com/luxury-communities |
| New Construction | `/new-construction` | https://www.lasvegashomesearchexperts.com/new-construction |
| High-Rise Condos | `/high-rise-condos` | https://www.lasvegashomesearchexperts.com/high-rise-condos |
| Golf Communities | `/golf-communities` | https://www.lasvegashomesearchexperts.com/golf-communities |
| Vintage / Historic | `/vintage-historic-neighborhoods` | https://www.lasvegashomesearchexperts.com/vintage-historic-neighborhoods |

### Handling Collisions — Named Communities Requiring Disambiguation

The following community names appear in multiple contexts and require prefixing. This list was compiled by scanning all 265 URLs in this taxonomy:

| Community Name | Slug | Reason |
|----------------|------|--------|
| The Estates (Southern Highlands) | `/southern-highlands-the-estates` | Generic name; avoid conflict |
| The Foothills (Southern Highlands) | `/southern-highlands-the-foothills` | "Foothills" exists in other contexts |
| The Enclave (Southern Highlands) | `/southern-highlands-the-enclave` | Generic name |
| The Bluffs (Southern Highlands) | `/southern-highlands-the-bluffs` | `/the-bluffs-henderson` also exists |
| The Bluffs (Henderson) | `/the-bluffs-henderson` | Separate from Southern Highlands enclave |
| Marbella (Lake Las Vegas) | `/marbella-lake-las-vegas` | "Marbella" is a sub-neighborhood in Summerlin's Arbors (content only, no page) |
| Portofino (Lake Las Vegas) | `/portofino-lake-las-vegas` | "Portofino" appears in Vistas village content |
| The Palisades (Summerlin) | `/the-palisades-summerlin` | Generic name |
| Avalon / Aventura (Summerlin) | `/aventura-summerlin` | Could conflict with common usage |
| Shoreline (Lake Las Vegas) | `/shoreline-lake-las-vegas` | Generic name |
| Verona (Lake Las Vegas) | `/verona-lake-las-vegas` | Generic name |
| Neo (MacDonald Highlands) | `/neo-macdonald-highlands` | Generic name |
| Mountain Trails (Summerlin) | `/mountain-trails-summerlin` | Generic name |
| Heritage at Stonebridge | `/heritage-at-stonebridge` | Distinct from Heritage at Cadence |
| Heritage at Cadence | `/heritage-at-cadence` | Distinct from Heritage at Stonebridge |
| Paradise Hills (Henderson) | `/paradise-hills-henderson` | Distinct from Paradise (Las Vegas city) |
| Mission Hills (Henderson) | `/mission-hills-henderson` | Generic name |
| Eagle Rock (Summerlin) | `/eagle-rock-summerlin` | Generic name |
| Eagle Hills (Summerlin) | `/eagle-hills-summerlin` | Distinct from Eagle Rock |
| Highlands Ranch (SW Las Vegas) | `/highlands-ranch-las-vegas` | Distinct from MacDonald Highlands |
| Sandstone (North LV) | `/sandstone-north-las-vegas` | Generic |
| Eldorado (North LV) | `/eldorado-north-las-vegas` | Generic |
| Craig Ranch (North LV) | `/craig-ranch` | No collision |
| Metropolis (Las Vegas) | `/metropolis-las-vegas` | Generic name |
| Arts District (Las Vegas) | `/arts-district-las-vegas` | Generic |
| Southfork (Henderson) | `/southfork-henderson` | Generic |

---

<a name="section-4"></a>
## SECTION 4: BREADCRUMBLIST JSON-LD EXAMPLES

**Site domain:** https://www.lasvegashomesearchexperts.com

**Key principle:** Even though URLs are flat (single-level slugs), BreadcrumbList JSON-LD communicates the logical hierarchy to Google Search. The `item` property in JSON-LD must be the actual canonical URL of each page, not a hypothetical nested path.

**Homepage anchor:** Until the `/communities` hub page is built, existing pages may use `https://www.lasvegashomesearchexperts.com/#communities` as the "Communities" breadcrumb item. Once `/communities` is live, update all existing pages to point to `https://www.lasvegashomesearchexperts.com/communities`.

---

### Example 1: Hub Page — Henderson

**Page:** https://www.lasvegashomesearchexperts.com/henderson
**Visible Breadcrumb:** Home › Communities › Henderson

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.lasvegashomesearchexperts.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Communities",
      "item": "https://www.lasvegashomesearchexperts.com/communities"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Henderson",
      "item": "https://www.lasvegashomesearchexperts.com/henderson"
    }
  ]
}
```

---

### Example 2: Community Hub Page — Summerlin

**Page:** https://www.lasvegashomesearchexperts.com/summerlin
**Visible Breadcrumb:** Home › Communities › Summerlin

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.lasvegashomesearchexperts.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Communities",
      "item": "https://www.lasvegashomesearchexperts.com/communities"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Summerlin",
      "item": "https://www.lasvegashomesearchexperts.com/summerlin"
    }
  ]
}
```

---

### Example 3: Community Page — Anthem (direct child of Henderson)

**Page:** https://www.lasvegashomesearchexperts.com/anthem
**Visible Breadcrumb:** Home › Communities › Henderson › Anthem

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.lasvegashomesearchexperts.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Communities",
      "item": "https://www.lasvegashomesearchexperts.com/communities"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Henderson",
      "item": "https://www.lasvegashomesearchexperts.com/henderson"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Anthem",
      "item": "https://www.lasvegashomesearchexperts.com/anthem"
    }
  ]
}
```

---

### Example 4: Sub-Community Page (flat URL) — Sun City Anthem

**Page:** https://www.lasvegashomesearchexperts.com/sun-city-anthem
**Visible Breadcrumb:** Home › Communities › Henderson › Anthem › Sun City Anthem
**Note:** URL is flat (`/sun-city-anthem`) but JSON-LD communicates full 5-level hierarchy.

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.lasvegashomesearchexperts.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Communities",
      "item": "https://www.lasvegashomesearchexperts.com/communities"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Henderson",
      "item": "https://www.lasvegashomesearchexperts.com/henderson"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Anthem",
      "item": "https://www.lasvegashomesearchexperts.com/anthem"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "Sun City Anthem",
      "item": "https://www.lasvegashomesearchexperts.com/sun-city-anthem"
    }
  ]
}
```

---

### Example 5: Lifestyle Collection Page — Guard-Gated Communities

**Page:** https://www.lasvegashomesearchexperts.com/guard-gated-communities
**Visible Breadcrumb:** Home › Communities › Guard-Gated Communities

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.lasvegashomesearchexperts.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Communities",
      "item": "https://www.lasvegashomesearchexperts.com/communities"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Guard-Gated Communities",
      "item": "https://www.lasvegashomesearchexperts.com/guard-gated-communities"
    }
  ]
}
```

---

### Example 6: High-Rise Page — Cello Tower

**Page:** https://www.lasvegashomesearchexperts.com/cello-tower
**Visible Breadcrumb:** Home › Communities › High-Rise Condos › Cello Tower

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.lasvegashomesearchexperts.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Communities",
      "item": "https://www.lasvegashomesearchexperts.com/communities"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "High-Rise Condos",
      "item": "https://www.lasvegashomesearchexperts.com/high-rise-condos"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Cello Tower",
      "item": "https://www.lasvegashomesearchexperts.com/cello-tower"
    }
  ]
}
```

---

### Example 7: Summerlin Village Page (flat URL with prefix) — The Ridges

**Page:** https://www.lasvegashomesearchexperts.com/summerlin-the-ridges
**Visible Breadcrumb:** Home › Communities › Summerlin › The Ridges

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.lasvegashomesearchexperts.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Communities",
      "item": "https://www.lasvegashomesearchexperts.com/communities"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Summerlin",
      "item": "https://www.lasvegashomesearchexperts.com/summerlin"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "The Ridges",
      "item": "https://www.lasvegashomesearchexperts.com/summerlin-the-ridges"
    }
  ]
}
```

---

### Example 8: Guard-Gated Sub-Community Within Summerlin Village — Bellacere

**Page:** https://www.lasvegashomesearchexperts.com/bellacere
**Visible Breadcrumb:** Home › Communities › Summerlin › The Canyons › Bellacere

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.lasvegashomesearchexperts.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Communities",
      "item": "https://www.lasvegashomesearchexperts.com/communities"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Summerlin",
      "item": "https://www.lasvegashomesearchexperts.com/summerlin"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "The Canyons",
      "item": "https://www.lasvegashomesearchexperts.com/summerlin-the-canyons"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "Bellacere",
      "item": "https://www.lasvegashomesearchexperts.com/bellacere"
    }
  ]
}
```

---

### Example 9: Boulder City Hub Page

**Page:** https://www.lasvegashomesearchexperts.com/boulder-city
**Visible Breadcrumb:** Home › Communities › Boulder City

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.lasvegashomesearchexperts.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Communities",
      "item": "https://www.lasvegashomesearchexperts.com/communities"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Boulder City",
      "item": "https://www.lasvegashomesearchexperts.com/boulder-city"
    }
  ]
}
```

---

### Example 10: Vintage Community Page — Rancho Circle

**Page:** https://www.lasvegashomesearchexperts.com/rancho-circle
**Visible Breadcrumb:** Home › Communities › Vintage & Historic Neighborhoods › Rancho Circle

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.lasvegashomesearchexperts.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Communities",
      "item": "https://www.lasvegashomesearchexperts.com/communities"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Vintage & Historic Neighborhoods",
      "item": "https://www.lasvegashomesearchexperts.com/vintage-historic-neighborhoods"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Rancho Circle",
      "item": "https://www.lasvegashomesearchexperts.com/rancho-circle"
    }
  ]
}
```

---

### Breadcrumb Depth Pattern Summary

| Page Type | Depth | Visible Breadcrumb Pattern |
|-----------|-------|---------------------------|
| Home | 1 | Home |
| Communities Hub | 2 | Home › Communities |
| City Hub (Henderson, Summerlin, NLV) | 3 | Home › Communities › [City] |
| Direct community (e.g., Southern Highlands) | 3 | Home › Communities › [City] › [Community] |
| Sub-community (e.g., Anthem) | 4 | Home › Communities › Henderson › Anthem |
| Sub-sub-community (e.g., Sun City Anthem) | 5 | Home › Communities › Henderson › Anthem › Sun City Anthem |
| Summerlin village | 4 | Home › Communities › Summerlin › The Ridges |
| Summerlin guard-gated sub | 5 | Home › Communities › Summerlin › The Canyons › Bellacere |
| Lifestyle collection | 3 | Home › Communities › Guard-Gated Communities |
| High-rise individual | 4 | Home › Communities › High-Rise Condos › [Tower] |
| Vintage individual | 4 | Home › Communities › Vintage & Historic Neighborhoods › Rancho Circle |

> **Implementation note:** Google's structured data guidelines allow the `item` property on the final breadcrumb to be omitted (it is the current page). However, including it is recommended for consistency and ensures Google can validate the full path. All URLs must be HTTPS with the `www` subdomain, matching the canonical domain.

---

<a name="section-5"></a>
## SECTION 5: PHASE 1 PRIORITY BUILD ORDER — 40 Pages

These 40 pages represent the highest-traffic, highest-intent, and highest-ROI pages. Build in the order listed. Pages already ✅ LIVE are noted — the remaining BUILD pages are re-ordered by priority.

### Tier 1 — Critical Infrastructure (Build First — 8 pages)

| # | Page | URL | Status | Rationale |
|---|------|-----|--------|-----------|
| 1 | Communities Hub | /communities | 🔨 BUILD | Resolves 404; enables breadcrumbs across all pages; foundation for everything else |
| 2 | Las Vegas Hub | /las-vegas | 🔨 BUILD | Parent hub for all Las Vegas city/unincorporated communities; required before sub-pages |
| 3 | Summerlin Hub | /summerlin | ✅ LIVE | Already live — update breadcrumb JSON-LD to point to /communities |
| 4 | Henderson Hub | /henderson | ✅ LIVE | Already live — update breadcrumb JSON-LD |
| 5 | North Las Vegas Hub | /north-las-vegas | ✅ LIVE | Already live — update breadcrumb JSON-LD |
| 6 | Guard-Gated Communities | /guard-gated-communities | 🔨 BUILD | Highest buyer intent; premium lead quality; no page currently exists |
| 7 | 55+ Active Adult | /55-plus-communities | 🔨 BUILD | Aging boomer demographic; high intent |
| 8 | Luxury Communities | /luxury-communities | 🔨 BUILD | Aligns with Nevada Real Estate Group's luxury team positioning |

### Tier 2 — Highest-Volume Community Pages (Build Next — 12 pages)

| # | Page | URL | Status | Rationale |
|---|------|-----|--------|-----------|
| 9 | The Ridges (Summerlin) | /summerlin-the-ridges | 🔨 BUILD | #1 luxury search term in Summerlin; $2M–$20M+; flagship ultra-luxury content |
| 10 | Southern Highlands | /southern-highlands | ✅ LIVE | Already live — update JSON-LD, add sub-community links |
| 11 | Green Valley | /green-valley | 🔨 BUILD | Original Henderson brand; high search volume; hub for North/Ranch/South sub-pages |
| 12 | MacDonald Highlands | /macdonald-highlands | ✅ LIVE | Already live — update JSON-LD; top luxury Henderson search |
| 13 | Ascaya | /ascaya | 🔨 BUILD | Ultra-luxury; $3M–$20M+; strong HNWI differentiation |
| 14 | Sun City Anthem | /sun-city-anthem | 🔨 BUILD | Largest 55+ community in Henderson; national brand |
| 15 | Anthem Country Club | /anthem-country-club | 🔨 BUILD | Guard-gated golf; $1.2M–$8M+; premium Henderson leads |
| 16 | The Paseos (Summerlin) | /summerlin-the-paseos | 🔨 BUILD | Top school district; family buyer high intent |
| 17 | The Peaks (Summerlin) | /summerlin-the-peaks | 🔨 BUILD | Guard-gated luxury village; active new construction |
| 18 | Sun City Summerlin | /sun-city-summerlin | 🔨 BUILD | Largest 55+ Summerlin; 7,779 homes; major search brand |
| 19 | Sunstone | /sunstone | 🔨 BUILD | 3,650-home independent master-plan; separate from Skye Canyon; active builders |
| 20 | New Construction Hub | /new-construction | 🔨 BUILD | Builder partnerships; urgent buyer intent; captures all active build communities |

### Tier 3 — Core Community Pages (Build in Order — 10 pages)

| # | Page | URL | Status | Rationale |
|---|------|-----|--------|-----------|
| 21 | The Summit Club | /the-summit-club | 🔨 BUILD | Trophy property; Tom Fazio golf; national HNWI audience |
| 22 | Anthem Country Club | /anthem-country-club | 🔨 BUILD | Guard-gated golf; premium Henderson leads (see Tier 2 #15) |
| 23 | Ascension at The Peaks | /ascension-at-the-peaks | 🔨 BUILD | Biggest new luxury guard-gated community in Summerlin; 561 homes; $1M–$4M+; heavy 2024–2026 press coverage |
| 24 | Grand Park (Summerlin) | /summerlin-grand-park | 🔨 BUILD | Summerlin's newest/largest active-construction village; 13 sub-communities; $400s–$3M+ |
| 25 | Peccole Ranch / Queensridge | /peccole-ranch | 🔨 BUILD | 640-acre master-plan; parent to Queensridge; 22 neighborhoods |
| 26 | Queensridge | /queensridge | 🔨 BUILD | 987-home guard-gated; strong independent search intent |
| 27 | MacDonald Ranch | /macdonald-ranch | 🔨 BUILD | Hub page for Sun City MDR, Foothills, Sunridge |
| 28 | High-Rise Condos Hub | /high-rise-condos | 🔨 BUILD | Unique niche; repeat relocating buyers; launch before individual tower pages |
| 29 | Heartland at Tule Springs | /heartland-tule-springs | 🔨 BUILD | Ranked #39 nationally; active new construction; NLV's top new community |
| 30 | Canyon Gate | /canyon-gate | 🔨 BUILD | Guard-gated golf; 330 acres; covered by 4 competitors; critical gap |

### Tier 4 — New v3.0 Critical Additions (10 pages)

| # | Page | URL | Status | Rationale |
|---|------|-----|--------|-----------|
| 31 | Four Seasons Private Residences | /four-seasons-private-residences | 🔨 BUILD | 171 ultra-luxury units; $3.67M–$28.95M+; 75% sold; massive press coverage; no current page |
| 32 | Cello Tower | /cello-tower | 🔨 BUILD | First new Downtown luxury high-rise in 15 years; 240 units; under construction; from ~$700K |
| 33 | Astra at La Madre Peaks | /astra-at-la-madre-peaks | 🔨 BUILD | 167 custom lots; $2M+; newest Summerlin ultra-luxury; competitors have full pages |
| 34 | Dragon Rock | /dragon-rock | 🔨 BUILD | Double guard-gated; Blue Heron custom; most exclusive Henderson enclave; $5M–$15M+ |
| 35 | Summerlin The Hills South | /summerlin-the-hills-south | 🔨 BUILD | Includes 4 guard-gated enclaves; $600K–$3M+; high-value village page |
| 36 | Southern Highlands The Estates | /southern-highlands-the-estates | 🔨 BUILD | Premier SH enclave; $2M–$10M+; custom homes adjacent to Nicklaus golf course |
| 37 | Olympia Ridge | /olympia-ridge | 🔨 BUILD | Ultra-luxury guard-gated golf enclave; $1.5M–$5M+; Nicklaus frontage |
| 38 | Tuscan Cliffs | /tuscan-cliffs | 🔨 BUILD | Popular SH guard-gated; Mediterranean architecture; $800K–$3M |
| 39 | Vintage & Historic Neighborhoods | /vintage-historic-neighborhoods | 🔨 BUILD | Covered by 3 competitors; differentiated lifestyle collection for architectural buyers |
| 40 | Carlisle Peak | /carlisle-peak | 🔨 BUILD | Guard-gated luxury new construction in Grand Park; $1.55M+; Tri Pointe |

### Summary — Phase 1 Status

| Count | Status |
|-------|--------|
| 9 | ✅ LIVE (already built) |
| 31 | 🔨 BUILD (new pages needed) |
| **40** | **Total Phase 1 pages** |

---

<a name="section-6"></a>
## SECTION 6: EXISTING PAGE EXPANSION NOTES

For the 29 Las Vegas metro pages that already exist, this section lists what sub-community pages should be created and what content additions are needed on the hub page itself.

---

### /summerlin ✅ LIVE
**Current state:** Hub page exists. No village sub-pages exist.
**Needs:**
- Update breadcrumb JSON-LD to link to `/communities`
- Add village navigation grid linking to all 28 village pages (to be built)
- Add separate sections for North, South, and West associations
- Featured sub-community listings for The Ridges, The Peaks, The Summit Club, Grand Park
**Sub-pages to create (28 village pages):**
- /summerlin-the-arbors, /summerlin-the-canyons, /summerlin-the-crossing, /summerlin-discovery, /summerlin-the-hills, /summerlin-the-hills-south, /summerlin-the-trails, /summerlin-the-vistas, /summerlin-the-willows (North)
- /summerlin-the-cliffs, /summerlin-the-gardens, /summerlin-the-mesa, /summerlin-the-paseos, /summerlin-the-peaks, /summerlin-the-pueblo, /summerlin-ridgebrook, /summerlin-the-ridges, /summerlin-siena, /summerlin-south-square, /summerlin-stonebridge, /summerlin-summerlin-centre (South)
- /summerlin-grand-park, /summerlin-kestrel, /summerlin-kestrel-commons, /summerlin-la-madre-peaks, /summerlin-redpoint, /summerlin-redpoint-square, /summerlin-reverence (West)
**Standalone/special pages:** /sun-city-summerlin, /the-summit-club, /mesa-ridge, /regency-at-summerlin, /heritage-at-stonebridge, /trilogy-at-summerlin, /sun-colony-at-siena, /one-queensridge-place, /mira-villa, /shawood-at-arcadia, /the-loughton

---

### /southern-highlands ✅ LIVE
**Current state:** Hub page exists. No guard-gated enclave sub-pages exist.
**Needs:**
- Update breadcrumb JSON-LD
- Add guard-gated enclave navigation with all 10 sub-pages listed
- Prominently feature the Southern Highlands Golf Club (Jack Nicklaus design)
- Add price range breakdowns by enclave tier
**Sub-pages to create (10 guard-gated enclaves):**
- /southern-highlands-the-estates, /tuscan-cliffs, /southern-highlands-the-foothills, /royal-highlands, /southern-highlands-the-enclave, /vintage-canyon, /olympia-ridge, /olympia-ridge-estates, /southern-highlands-the-bluffs, /promontory-ridge

---

### /mountains-edge ✅ LIVE
**Current state:** Hub page exists.
**Needs:**
- Update breadcrumb JSON-LD
- Add community overview content (3,000 acres; 500 acres open space; 12,500+ homes at buildout)
- Add nearby community cross-links (Rhodes Ranch, Southern Highlands, Nevada Trails)
- No dedicated sub-community pages needed (Mountains Edge is primarily a unified master plan)

---

### /rhodes-ranch ✅ LIVE
**Current state:** Hub page exists.
**Needs:**
- Update breadcrumb JSON-LD
- Add guard-gated resort amenity details (golf course, pools)
- Add cross-link to /guard-gated-communities collection

---

### /enterprise ✅ LIVE
**Current state:** Hub page exists.
**Needs:**
- Update breadcrumb JSON-LD (enterprise is in SW Las Vegas / unincorporated Clark County)
- Add cross-links to nearby /mountains-edge, /southern-highlands, /rhodes-ranch

---

### /spring-valley ✅ LIVE
**Current state:** Hub page exists.
**Needs:**
- Update breadcrumb JSON-LD
- Clarify geographic boundaries (Spring Valley is a large unincorporated area)
- Add nearby: /desert-shores, /the-lakes, /canyon-gate cross-links

---

### /paradise ✅ LIVE
**Current state:** Hub page exists.
**Needs:**
- Update breadcrumb JSON-LD
- Note proximity to the Strip; condo and SFR mix
- Cross-link to high-rise pages

---

### /the-lakes ✅ LIVE
**Current state:** Hub page exists.
**Needs:**
- Update breadcrumb JSON-LD
- Add waterfront lifestyle detail content (man-made lakes, water sports)
- Cross-link to /desert-shores (adjacent community)

---

### /desert-shores ✅ LIVE
**Current state:** Hub page exists.
**Needs:**
- Update breadcrumb JSON-LD
- Add man-made lake / resort-style community center detail
- Cross-link to /the-lakes

---

### /henderson ✅ LIVE
**Current state:** Hub page exists. Has limited sub-community navigation.
**Needs:**
- Update breadcrumb JSON-LD
- Add master-planned community navigation grid (Anthem, Green Valley, Cadence, etc.)
- Expand to list all 18 Henderson master-planned communities with links
**Key sub-pages to create:** /green-valley, /macdonald-ranch, /ascaya, /madeira-canyon, /roma-hills, /coronado-ranch, /calico-ridge, /black-mountain-ranch (additional master plans)

---

### /anthem ✅ LIVE
**Current state:** Hub page exists.
**Needs:**
- Update breadcrumb JSON-LD (parent = Henderson)
- Add navigation for 6 Anthem sub-communities
- Clearly distinguish Anthem Coventry, Anthem Country Club, Sun City Anthem, Solera, Terra Bella
**Sub-pages to create:** /anthem-coventry, /anthem-country-club, /anthem-highlands, /sun-city-anthem, /solera-at-anthem, /terra-bella

---

### /cadence ✅ LIVE
**Current state:** Hub page exists.
**Needs:**
- Update breadcrumb JSON-LD (parent = Henderson)
- Add builder info (7 active sub-communities)
- Add new construction CTA / lead capture
**Sub-pages to create:** /heritage-at-cadence, /libretto-at-cadence, /midtown-at-cadence, /opus-at-cadence, /serenade-at-cadence, /serenata-at-cadence, /symmetry-summit-at-cadence

---

### /inspirada ✅ LIVE
**Current state:** Hub page exists.
**Needs:**
- Update breadcrumb JSON-LD (parent = Henderson)
- Add village structure details (7 villages; 50+ acres of parks; 1,940 acres)
- Add /lucere-at-inspirada sub-page

---

### /green-valley-ranch ✅ LIVE
**Current state:** Hub page exists (note: this covers the Green Valley Ranch sub-area specifically).
**Needs:**
- Update breadcrumb JSON-LD (parent = Henderson → Green Valley)
- Consider redirecting or consolidating with /green-valley hub once that page is built
- Cross-link to /green-valley, /green-valley-north, /green-valley-south

---

### /seven-hills ✅ LIVE
**Current state:** Hub page exists.
**Needs:**
- Update breadcrumb JSON-LD (parent = Henderson)
- Add Rio Secco golf and 25-neighborhood details
- Add /terracina sub-page (guard-gated ultra-luxury enclave)

---

### /lake-las-vegas ✅ LIVE
**Current state:** Hub page exists.
**Needs:**
- Update breadcrumb JSON-LD (parent = Henderson)
- Add resort lifestyle content (320-acre private lake)
- Add navigation grid for 13 sub-communities
**Sub-pages to create (13):** /south-shore-lake-las-vegas, /salerno-summit, /del-webb-lake-las-vegas, /incanta-lago, /la-cova, /lago-del-sol-hills, /marbella-lake-las-vegas, /piazza-paradiso, /portofino-lake-las-vegas, /riviera-vista, /shoreline-lake-las-vegas, /velaris, /verona-lake-las-vegas

---

### /macdonald-highlands ✅ LIVE
**Current state:** Hub page exists.
**Needs:**
- Update breadcrumb JSON-LD (parent = Henderson)
- Add DragonRidge Country Club details
- Add Four Seasons Private Residences prominently (under construction; delivers Summer 2027)
**Sub-pages to create:** /dragon-rock, /skyvu, /vu-residences, /four-seasons-private-residences, /cresta-rosa, /neo-macdonald-highlands

---

### /tuscany-village ✅ LIVE
**Current state:** Hub page exists (note: URL is /tuscany-village; v2 taxonomy used /tuscany — keep as-is).
**Needs:**
- Update breadcrumb JSON-LD (parent = Henderson)
- Add Italian-themed community details and golf course info

---

### /silverado-ranch ✅ LIVE
**Current state:** Hub page exists.
**Needs:**
- Update breadcrumb JSON-LD (parent = Henderson)
- Add established family community content

---

### /whitney-ranch ✅ LIVE
**Current state:** Hub page exists.
**Needs:**
- Update breadcrumb JSON-LD (parent = Henderson)
- Add east Henderson family community details

---

### /north-las-vegas ✅ LIVE
**Current state:** Hub page exists.
**Needs:**
- Update breadcrumb JSON-LD
- Add navigation for all NLV communities (Aliante, Heartland, Ardiente, Valley Vista, Craig Ranch, Del Webb, Sandstone, Hylo Park)

---

### /aliante ✅ LIVE
**Current state:** Hub page exists.
**Needs:**
- Update breadcrumb JSON-LD (parent = North Las Vegas)
- Add 1,905 acres / 6,500 homes / master-plan details
**Sub-pages to create:** /club-aliante, /sun-city-aliante

---

### /skye-canyon ✅ LIVE
**Current state:** Hub page exists.
**Needs:**
- Update breadcrumb JSON-LD (parent = North Las Vegas / NW Las Vegas)
- Add note that Sunstone is a SEPARATE master plan (not a Skye Canyon sub-community)
- Add outdoor lifestyle / Red Rock proximity content

---

### /centennial-hills ✅ LIVE
**Current state:** Hub page exists.
**Needs:**
- Update breadcrumb JSON-LD (parent = North Las Vegas / NW Las Vegas area)
- Clarify this is a broad geographic area, not a single master plan
- Add links to /providence, /sunstone, /skye-canyon as neighboring communities

---

### /lone-mountain ✅ LIVE
**Current state:** Hub page exists.
**Needs:**
- Update breadcrumb JSON-LD (parent = Las Vegas / NW area)
- Add semi-rural luxury/ranch character details
- Note horse ranches, luxury mini-estates; Lone Mountain peak backdrop

---

### /providence ✅ LIVE
**Current state:** Hub page exists.
**Needs:**
- Update breadcrumb JSON-LD (parent = North Las Vegas / NW)
- Add 1,200 acres / ~30 neighborhoods / mostly built-out detail

---

### /summerlin-west ✅ LIVE
**Current state:** Hub page exists (at /summerlin-west).
**Needs:**
- Evaluate: This page may duplicate content with /summerlin hub. Consider whether to:
  - Keep as standalone area guide (West Summerlin — Grand Park, Kestrel, La Madre Peaks, Redpoint area) — RECOMMENDED
  - Or redirect to /summerlin with a West anchor
- If kept: Update breadcrumb JSON-LD; link to all West Association village pages when built

---

### /red-rock-country-club ✅ LIVE
**Current state:** Hub page exists.
**Needs:**
- Update breadcrumb JSON-LD (parent = Summerlin)
- Add Arnold Palmer dual-course detail; semi-custom and custom home types
- Add guard-gated and golf cross-links

---

### /boulder-city ✅ LIVE
**Current state:** Hub page exists.
**Needs:**
- Update breadcrumb JSON-LD
- Add no-gambling / growth-control unique market positioning
- Add Lake Mead / Hoover Dam / historic downtown content
- No sub-community pages needed for Boulder City at this time

---

<a name="section-7"></a>
## SECTION 7: SITEMAP.XML TEMPLATE

This sitemap covers all existing pages plus all planned Phase 1 and Phase 2 pages. Submit to Google Search Console at https://search.google.com/search-console after publishing the sitemap at https://www.lasvegashomesearchexperts.com/sitemap.xml

**Priority guidance:**
- 1.0 = Homepage
- 0.9 = Hub pages (Henderson, Summerlin, NLV, Communities)
- 0.8 = Major master-planned community hubs (Anthem, Green Valley, Cadence, etc.)
- 0.7 = Lifestyle collections, sub-community pages (first tier)
- 0.6 = Individual community and sub-community pages (second tier)
- 0.5 = Niche sub-communities, additional neighborhoods
- 0.4 = Supporting pages, small communities

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- HOMEPAGE -->
  <url>
    <loc>https://www.lasvegashomesearchexperts.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- HUB PAGES -->
  <url>
    <loc>https://www.lasvegashomesearchexperts.com/communities</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.lasvegashomesearchexperts.com/henderson</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.lasvegashomesearchexperts.com/summerlin</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.lasvegashomesearchexperts.com/north-las-vegas</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.lasvegashomesearchexperts.com/las-vegas</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.lasvegashomesearchexperts.com/boulder-city</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.lasvegashomesearchexperts.com/downtown-las-vegas</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- LIFESTYLE COLLECTION PAGES -->
  <url>
    <loc>https://www.lasvegashomesearchexperts.com/guard-gated-communities</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.lasvegashomesearchexperts.com/55-plus-communities</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.lasvegashomesearchexperts.com/luxury-communities</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.lasvegashomesearchexperts.com/new-construction</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.lasvegashomesearchexperts.com/high-rise-condos</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.lasvegashomesearchexperts.com/golf-communities</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.lasvegashomesearchexperts.com/vintage-historic-neighborhoods</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- SUMMERLIN — EXISTING -->
  <url>
    <loc>https://www.lasvegashomesearchexperts.com/summerlin-west</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.lasvegashomesearchexperts.com/red-rock-country-club</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- SUMMERLIN — VILLAGES (BUILD) -->
  <url><loc>https://www.lasvegashomesearchexperts.com/summerlin-the-ridges</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/summerlin-the-paseos</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/summerlin-the-peaks</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/summerlin-grand-park</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/summerlin-la-madre-peaks</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/summerlin-the-hills-south</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/summerlin-siena</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/summerlin-the-arbors</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/summerlin-the-canyons</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/summerlin-the-hills</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/summerlin-the-trails</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/summerlin-the-vistas</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/summerlin-the-willows</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/summerlin-the-cliffs</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/summerlin-the-gardens</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/summerlin-the-mesa</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/summerlin-the-pueblo</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/summerlin-ridgebrook</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/summerlin-south-square</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/summerlin-stonebridge</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/summerlin-summerlin-centre</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/summerlin-the-crossing</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/summerlin-discovery</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/summerlin-kestrel</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/summerlin-kestrel-commons</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/summerlin-redpoint</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/summerlin-redpoint-square</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/summerlin-reverence</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>

  <!-- SUMMERLIN — SPECIAL/STANDALONE -->
  <url><loc>https://www.lasvegashomesearchexperts.com/sun-city-summerlin</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/the-summit-club</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/mesa-ridge</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/regency-at-summerlin</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/heritage-at-stonebridge</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/trilogy-at-summerlin</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/sun-colony-at-siena</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/one-queensridge-place</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/mira-villa</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/shawood-at-arcadia</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/the-loughton</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>

  <!-- SUMMERLIN — GUARD-GATED SUB-COMMUNITIES -->
  <url><loc>https://www.lasvegashomesearchexperts.com/bellacere</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/ascension-at-the-peaks</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/astra-at-la-madre-peaks</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/carlisle-peak</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/glenrock</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/canyon-fairways</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/aventura-summerlin</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/eagle-rock-summerlin</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/the-palisades-summerlin</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/mountain-trails-summerlin</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/corte-bella-summerlin</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/country-club-hills-summerlin</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/eagle-hills-summerlin</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/tournament-hills</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/the-pointe-summerlin</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/country-rose-estates</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/the-vineyards-summerlin</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>

  <!-- HENDERSON — EXISTING HUBS -->
  <url><loc>https://www.lasvegashomesearchexperts.com/anthem</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/cadence</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/inspirada</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/green-valley-ranch</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/seven-hills</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/lake-las-vegas</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/macdonald-highlands</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/whitney-ranch</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/tuscany-village</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/silverado-ranch</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>

  <!-- HENDERSON — BUILD -->
  <url><loc>https://www.lasvegashomesearchexperts.com/green-valley</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/macdonald-ranch</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/ascaya</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/madeira-canyon</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/roma-hills</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/coronado-ranch</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/calico-ridge</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/black-mountain-ranch</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>

  <!-- ANTHEM SUB-COMMUNITIES -->
  <url><loc>https://www.lasvegashomesearchexperts.com/anthem-country-club</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/sun-city-anthem</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/anthem-coventry</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/anthem-highlands</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/solera-at-anthem</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/terra-bella</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>

  <!-- GREEN VALLEY SUB-COMMUNITIES -->
  <url><loc>https://www.lasvegashomesearchexperts.com/green-valley-north</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/green-valley-south</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/legacy-green-valley</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/the-fountains</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/southfork-henderson</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/quail-ridge-estates</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>

  <!-- MACDONALD RANCH SUB-COMMUNITIES -->
  <url><loc>https://www.lasvegashomesearchexperts.com/sun-city-macdonald-ranch</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/foothills-at-macdonald-ranch</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/sunridge-at-macdonald-ranch</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>

  <!-- MACDONALD HIGHLANDS SUB-COMMUNITIES -->
  <url><loc>https://www.lasvegashomesearchexperts.com/dragon-rock</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/four-seasons-private-residences</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/skyvu</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/vu-residences</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/cresta-rosa</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/neo-macdonald-highlands</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>

  <!-- LAKE LAS VEGAS SUB-COMMUNITIES -->
  <url><loc>https://www.lasvegashomesearchexperts.com/south-shore-lake-las-vegas</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/incanta-lago</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/salerno-summit</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/del-webb-lake-las-vegas</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/la-cova</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/lago-del-sol-hills</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/marbella-lake-las-vegas</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/piazza-paradiso</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/portofino-lake-las-vegas</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/riviera-vista</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/shoreline-lake-las-vegas</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/velaris</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/verona-lake-las-vegas</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>

  <!-- CADENCE SUB-COMMUNITIES -->
  <url><loc>https://www.lasvegashomesearchexperts.com/heritage-at-cadence</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/libretto-at-cadence</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/midtown-at-cadence</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/opus-at-cadence</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/serenade-at-cadence</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/serenata-at-cadence</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/symmetry-summit-at-cadence</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>

  <!-- OTHER HENDERSON -->
  <url><loc>https://www.lasvegashomesearchexperts.com/the-canyon-at-ascaya</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/club-m-madeira-canyon</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/obsidian-at-roma-hills</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/terracina</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/lucere-at-inspirada</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/cordera-ranch</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/mccullough-hills</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/mission-hills-henderson</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/paradise-hills-henderson</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/south-valley-ranch</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/the-bluffs-henderson</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/talesera-hills</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/heritage-at-black-mountain-ranch</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/black-mountain-vistas</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/downtown-henderson</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>

  <!-- NORTHWEST LAS VEGAS — EXISTING -->
  <url><loc>https://www.lasvegashomesearchexperts.com/skye-canyon</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/centennial-hills</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/lone-mountain</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/providence</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/desert-shores</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/the-lakes</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>

  <!-- NORTHWEST LAS VEGAS — BUILD -->
  <url><loc>https://www.lasvegashomesearchexperts.com/sunstone</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/skye-summit</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/peccole-ranch</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/queensridge</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/capella-at-sunstone</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/estrella-at-sunstone</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/trilogy-sunstone</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/silverstone-ranch</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/painted-desert</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/iron-mountain-ranch</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/los-prados</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/kyle-canyon</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/elkhorn-springs</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/skye-hills</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/kyle-pointe</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/homestead-ranch</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/elkhorn-grove</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/lynbrook</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/north-shores</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/south-shores</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/alta-mira</loc><changefreq>monthly</changefreq><priority>0.4</priority></url>

  <!-- SOUTHWEST LAS VEGAS — EXISTING -->
  <url><loc>https://www.lasvegashomesearchexperts.com/southern-highlands</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/mountains-edge</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/rhodes-ranch</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/enterprise</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>

  <!-- SOUTHERN HIGHLANDS SUB-COMMUNITIES -->
  <url><loc>https://www.lasvegashomesearchexperts.com/southern-highlands-the-estates</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/tuscan-cliffs</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/olympia-ridge</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/olympia-ridge-estates</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/southern-highlands-the-foothills</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/royal-highlands</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/southern-highlands-the-enclave</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/vintage-canyon</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/southern-highlands-the-bluffs</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/promontory-ridge</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>

  <!-- SOUTHWEST LAS VEGAS — BUILD -->
  <url><loc>https://www.lasvegashomesearchexperts.com/spanish-trail</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/spanish-hills</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/nevada-trails</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/southern-terrace</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/southwest-ranch</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/canyon-estates</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/highlands-ranch-las-vegas</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/arlington-ranch</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/coronado-ranch-sw</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/spring-mountain-ranch</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>

  <!-- CENTRAL / EAST LAS VEGAS — EXISTING -->
  <url><loc>https://www.lasvegashomesearchexperts.com/spring-valley</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/paradise</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>

  <!-- CENTRAL / EAST LAS VEGAS — BUILD -->
  <url><loc>https://www.lasvegashomesearchexperts.com/canyon-gate</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/las-vegas-country-club</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/stallion-mountain</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/solera-at-stallion-mountain</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/section-10</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/sunrise-manor</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/whitney</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/winchester</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>

  <!-- DOWNTOWN LAS VEGAS -->
  <url><loc>https://www.lasvegashomesearchexperts.com/downtown-las-vegas</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/arts-district-las-vegas</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/fremont-east</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/huntridge</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/john-s-park</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/scotch-80s</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>

  <!-- NORTH LAS VEGAS — EXISTING -->
  <url><loc>https://www.lasvegashomesearchexperts.com/aliante</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>

  <!-- NORTH LAS VEGAS — BUILD -->
  <url><loc>https://www.lasvegashomesearchexperts.com/club-aliante</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/sun-city-aliante</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/heartland-tule-springs</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/villages-at-tule-springs</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/craig-ranch</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/eldorado-north-las-vegas</loc><changefreq>monthly</changefreq><priority>0.4</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/valley-vista</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/ardiente</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/del-webb-north-ranch</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/sandstone-north-las-vegas</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/hylo-park</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>

  <!-- HIGH-RISE PAGES -->
  <url><loc>https://www.lasvegashomesearchexperts.com/cello-tower</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/veer-towers</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/sky-las-vegas</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/waldorf-astoria-las-vegas</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/vdara</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/trump-international-las-vegas</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/signature-mgm-grand</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/palms-place</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/jockey-club</loc><changefreq>monthly</changefreq><priority>0.4</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/panorama-towers</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/the-martin</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/turnberry-place</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/turnberry-towers</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/allure-las-vegas</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/park-towers</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/regency-towers</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/one-las-vegas</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/platinum-las-vegas</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/boca-raton-las-vegas</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/metropolis-las-vegas</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/marie-antoinette</loc><changefreq>monthly</changefreq><priority>0.4</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/juhl</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/the-ogden</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/newport-lofts</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/soho-lofts</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/loft-5</loc><changefreq>monthly</changefreq><priority>0.4</priority></url>

  <!-- VINTAGE / HISTORIC -->
  <url><loc>https://www.lasvegashomesearchexperts.com/rancho-circle</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/rancho-bel-air</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/rancho-springs</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/rancho-manor</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/spanish-oaks</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/mcneil-estates</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/glen-heather-estates</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/beverly-green</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/paradise-palms</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>

  <!-- RENO / NORTHERN NEVADA (separate market) -->
  <url><loc>https://www.lasvegashomesearchexperts.com/reno</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/sparks</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/spanish-springs</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/sun-valley</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://www.lasvegashomesearchexperts.com/incline-village</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>

</urlset>
```

---

<a name="section-8"></a>
## SECTION 8: APPENDIX — COMPLETE URL MASTER LIST

Alphabetical list of every URL — existing + planned. One per line with status indicator.

**Legend:** ✅ = Live | 🔨 = Build | 📝 = Expand (exists, needs sub-pages)

```
✅  https://www.lasvegashomesearchexperts.com/aliante
🔨  https://www.lasvegashomesearchexperts.com/allure-las-vegas
🔨  https://www.lasvegashomesearchexperts.com/alta-mira
🔨  https://www.lasvegashomesearchexperts.com/ardiente
🔨  https://www.lasvegashomesearchexperts.com/arlington-ranch
🔨  https://www.lasvegashomesearchexperts.com/arts-district-las-vegas
🔨  https://www.lasvegashomesearchexperts.com/ascaya
🔨  https://www.lasvegashomesearchexperts.com/ascension-at-the-peaks
🔨  https://www.lasvegashomesearchexperts.com/astra-at-la-madre-peaks
📝  https://www.lasvegashomesearchexperts.com/anthem
🔨  https://www.lasvegashomesearchexperts.com/anthem-country-club
🔨  https://www.lasvegashomesearchexperts.com/anthem-coventry
🔨  https://www.lasvegashomesearchexperts.com/anthem-highlands
🔨  https://www.lasvegashomesearchexperts.com/aventura-summerlin
🔨  https://www.lasvegashomesearchexperts.com/bellacere
🔨  https://www.lasvegashomesearchexperts.com/beverly-green
🔨  https://www.lasvegashomesearchexperts.com/black-mountain-ranch
🔨  https://www.lasvegashomesearchexperts.com/black-mountain-vistas
🔨  https://www.lasvegashomesearchexperts.com/boca-raton-las-vegas
✅  https://www.lasvegashomesearchexperts.com/boulder-city
📝  https://www.lasvegashomesearchexperts.com/cadence
🔨  https://www.lasvegashomesearchexperts.com/calico-ridge
🔨  https://www.lasvegashomesearchexperts.com/canyon-estates
🔨  https://www.lasvegashomesearchexperts.com/canyon-fairways
🔨  https://www.lasvegashomesearchexperts.com/canyon-gate
🔨  https://www.lasvegashomesearchexperts.com/capella-at-sunstone
🔨  https://www.lasvegashomesearchexperts.com/carlisle-peak
🔨  https://www.lasvegashomesearchexperts.com/cello-tower
✅  https://www.lasvegashomesearchexperts.com/centennial-hills
🔨  https://www.lasvegashomesearchexperts.com/club-aliante
🔨  https://www.lasvegashomesearchexperts.com/club-m-madeira-canyon
🔨  https://www.lasvegashomesearchexperts.com/communities
🔨  https://www.lasvegashomesearchexperts.com/cordera-ranch
🔨  https://www.lasvegashomesearchexperts.com/coronado-ranch
🔨  https://www.lasvegashomesearchexperts.com/coronado-ranch-sw
🔨  https://www.lasvegashomesearchexperts.com/corte-bella-summerlin
🔨  https://www.lasvegashomesearchexperts.com/country-club-hills-summerlin
🔨  https://www.lasvegashomesearchexperts.com/country-rose-estates
🔨  https://www.lasvegashomesearchexperts.com/craig-ranch
🔨  https://www.lasvegashomesearchexperts.com/cresta-rosa
🔨  https://www.lasvegashomesearchexperts.com/del-webb-lake-las-vegas
🔨  https://www.lasvegashomesearchexperts.com/del-webb-north-ranch
✅  https://www.lasvegashomesearchexperts.com/desert-shores
🔨  https://www.lasvegashomesearchexperts.com/downtown-henderson
🔨  https://www.lasvegashomesearchexperts.com/downtown-las-vegas
🔨  https://www.lasvegashomesearchexperts.com/dragon-rock
🔨  https://www.lasvegashomesearchexperts.com/eagle-hills-summerlin
🔨  https://www.lasvegashomesearchexperts.com/eagle-rock-summerlin
🔨  https://www.lasvegashomesearchexperts.com/eldorado-north-las-vegas
🔨  https://www.lasvegashomesearchexperts.com/elkhorn-grove
🔨  https://www.lasvegashomesearchexperts.com/elkhorn-springs
✅  https://www.lasvegashomesearchexperts.com/enterprise
🔨  https://www.lasvegashomesearchexperts.com/estrella-at-sunstone
🔨  https://www.lasvegashomesearchexperts.com/foothills-at-macdonald-ranch
🔨  https://www.lasvegashomesearchexperts.com/four-seasons-private-residences
🔨  https://www.lasvegashomesearchexperts.com/fremont-east
🔨  https://www.lasvegashomesearchexperts.com/glen-heather-estates
🔨  https://www.lasvegashomesearchexperts.com/glenrock
🔨  https://www.lasvegashomesearchexperts.com/golf-communities
🔨  https://www.lasvegashomesearchexperts.com/green-valley
🔨  https://www.lasvegashomesearchexperts.com/green-valley-north
✅  https://www.lasvegashomesearchexperts.com/green-valley-ranch
🔨  https://www.lasvegashomesearchexperts.com/green-valley-south
🔨  https://www.lasvegashomesearchexperts.com/guard-gated-communities
🔨  https://www.lasvegashomesearchexperts.com/heartland-tule-springs
🔨  https://www.lasvegashomesearchexperts.com/heritage-at-black-mountain-ranch
🔨  https://www.lasvegashomesearchexperts.com/heritage-at-cadence
🔨  https://www.lasvegashomesearchexperts.com/heritage-at-stonebridge
✅  https://www.lasvegashomesearchexperts.com/henderson
🔨  https://www.lasvegashomesearchexperts.com/high-rise-condos
🔨  https://www.lasvegashomesearchexperts.com/highlands-ranch-las-vegas
🔨  https://www.lasvegashomesearchexperts.com/homestead-ranch
🔨  https://www.lasvegashomesearchexperts.com/huntridge
🔨  https://www.lasvegashomesearchexperts.com/hylo-park
✅  https://www.lasvegashomesearchexperts.com/incline-village
🔨  https://www.lasvegashomesearchexperts.com/incanta-lago
📝  https://www.lasvegashomesearchexperts.com/inspirada
🔨  https://www.lasvegashomesearchexperts.com/iron-mountain-ranch
🔨  https://www.lasvegashomesearchexperts.com/jockey-club
🔨  https://www.lasvegashomesearchexperts.com/john-s-park
🔨  https://www.lasvegashomesearchexperts.com/juhl
🔨  https://www.lasvegashomesearchexperts.com/kyle-canyon
🔨  https://www.lasvegashomesearchexperts.com/kyle-pointe
🔨  https://www.lasvegashomesearchexperts.com/la-cova
🔨  https://www.lasvegashomesearchexperts.com/la-madre-peaks
🔨  https://www.lasvegashomesearchexperts.com/lago-del-sol-hills
📝  https://www.lasvegashomesearchexperts.com/lake-las-vegas
🔨  https://www.lasvegashomesearchexperts.com/las-vegas-country-club
🔨  https://www.lasvegashomesearchexperts.com/legacy-green-valley
🔨  https://www.lasvegashomesearchexperts.com/loft-5
✅  https://www.lasvegashomesearchexperts.com/lone-mountain
🔨  https://www.lasvegashomesearchexperts.com/los-prados
🔨  https://www.lasvegashomesearchexperts.com/loughton-summerlin
🔨  https://www.lasvegashomesearchexperts.com/lucere-at-inspirada
🔨  https://www.lasvegashomesearchexperts.com/luxury-estates
🔨  https://www.lasvegashomesearchexperts.com/lynbrook
✅  https://www.lasvegashomesearchexperts.com/macdonald-highlands
🔨  https://www.lasvegashomesearchexperts.com/macdonald-ranch
🔨  https://www.lasvegashomesearchexperts.com/madeira-canyon
🔨  https://www.lasvegashomesearchexperts.com/marie-antoinette
🔨  https://www.lasvegashomesearchexperts.com/marbella-lake-las-vegas
🔨  https://www.lasvegashomesearchexperts.com/martin-high-rise
🔨  https://www.lasvegashomesearchexperts.com/mcneil-estates
🔨  https://www.lasvegashomesearchexperts.com/mccullough-hills
🔨  https://www.lasvegashomesearchexperts.com/mesa-ridge-summerlin
🔨  https://www.lasvegashomesearchexperts.com/metropolis-high-rise
🔨  https://www.lasvegashomesearchexperts.com/mira-villa-summerlin
🔨  https://www.lasvegashomesearchexperts.com/mission-hills-henderson
🔨  https://www.lasvegashomesearchexperts.com/mountain-trails-summerlin
✅  https://www.lasvegashomesearchexperts.com/mountains-edge
🔨  https://www.lasvegashomesearchexperts.com/neo-macdonald-highlands
🔨  https://www.lasvegashomesearchexperts.com/nevada-trails
🔨  https://www.lasvegashomesearchexperts.com/new-construction
🔨  https://www.lasvegashomesearchexperts.com/newport-lofts
🔨  https://www.lasvegashomesearchexperts.com/north-shores-las-vegas
✅  https://www.lasvegashomesearchexperts.com/north-las-vegas
🔨  https://www.lasvegashomesearchexperts.com/obsidian-roma-hills
🔨  https://www.lasvegashomesearchexperts.com/ogden-downtown
🔨  https://www.lasvegashomesearchexperts.com/olympia-ridge
🔨  https://www.lasvegashomesearchexperts.com/olympia-ridge-estates
🔨  https://www.lasvegashomesearchexperts.com/one-las-vegas
🔨  https://www.lasvegashomesearchexperts.com/one-queensridge-place
🔨  https://www.lasvegashomesearchexperts.com/painted-desert
🔨  https://www.lasvegashomesearchexperts.com/palms-place
🔨  https://www.lasvegashomesearchexperts.com/panorama-towers
✅  https://www.lasvegashomesearchexperts.com/paradise
🔨  https://www.lasvegashomesearchexperts.com/paradise-hills-henderson
🔨  https://www.lasvegashomesearchexperts.com/paradise-palms
🔨  https://www.lasvegashomesearchexperts.com/park-towers
🔨  https://www.lasvegashomesearchexperts.com/peccole-ranch
🔨  https://www.lasvegashomesearchexperts.com/piazza-paradiso
🔨  https://www.lasvegashomesearchexperts.com/platinum-las-vegas
🔨  https://www.lasvegashomesearchexperts.com/portofino-lake-las-vegas
🔨  https://www.lasvegashomesearchexperts.com/promontory-ridge
✅  https://www.lasvegashomesearchexperts.com/providence
🔨  https://www.lasvegashomesearchexperts.com/quail-ridge-estates
🔨  https://www.lasvegashomesearchexperts.com/queensridge
🔨  https://www.lasvegashomesearchexperts.com/rancho-bel-air
🔨  https://www.lasvegashomesearchexperts.com/rancho-circle
🔨  https://www.lasvegashomesearchexperts.com/rancho-manor
🔨  https://www.lasvegashomesearchexperts.com/rancho-springs
✅  https://www.lasvegashomesearchexperts.com/red-rock-country-club
🔨  https://www.lasvegashomesearchexperts.com/redpoint-summerlin
🔨  https://www.lasvegashomesearchexperts.com/redpoint-square-summerlin
🔨  https://www.lasvegashomesearchexperts.com/regency-at-summerlin
🔨  https://www.lasvegashomesearchexperts.com/regency-towers
✅  https://www.lasvegashomesearchexperts.com/reno
🔨  https://www.lasvegashomesearchexperts.com/reverence-summerlin
🔨  https://www.lasvegashomesearchexperts.com/ridgebrook-summerlin
🔨  https://www.lasvegashomesearchexperts.com/riviera-vista
🔨  https://www.lasvegashomesearchexperts.com/rhodes-ranch
🔨  https://www.lasvegashomesearchexperts.com/roma-hills
🔨  https://www.lasvegashomesearchexperts.com/royal-highlands-southern-highlands
🔨  https://www.lasvegashomesearchexperts.com/salerno-summit
🔨  https://www.lasvegashomesearchexperts.com/sandstone-north-las-vegas
🔨  https://www.lasvegashomesearchexperts.com/scotch-80s
🔨  https://www.lasvegashomesearchexperts.com/section-10
🔨  https://www.lasvegashomesearchexperts.com/serenade-at-cadence
🔨  https://www.lasvegashomesearchexperts.com/serenata-at-cadence
✅  https://www.lasvegashomesearchexperts.com/seven-hills
🔨  https://www.lasvegashomesearchexperts.com/shawood-at-arcadia
🔨  https://www.lasvegashomesearchexperts.com/shoreline-lake-las-vegas
🔨  https://www.lasvegashomesearchexperts.com/siena-summerlin
✅  https://www.lasvegashomesearchexperts.com/silverado-ranch
🔨  https://www.lasvegashomesearchexperts.com/silverstone-ranch
🔨  https://www.lasvegashomesearchexperts.com/signature-mgm
🔨  https://www.lasvegashomesearchexperts.com/sky-las-vegas
🔨  https://www.lasvegashomesearchexperts.com/skye-hills
✅  https://www.lasvegashomesearchexperts.com/skye-canyon
🔨  https://www.lasvegashomesearchexperts.com/skye-summit
🔨  https://www.lasvegashomesearchexperts.com/skyvu-macdonald-highlands
🔨  https://www.lasvegashomesearchexperts.com/soho-lofts
🔨  https://www.lasvegashomesearchexperts.com/solera-at-anthem
🔨  https://www.lasvegashomesearchexperts.com/solera-at-stallion-mountain
🔨  https://www.lasvegashomesearchexperts.com/south-shore-lake-las-vegas
🔨  https://www.lasvegashomesearchexperts.com/south-valley-ranch-henderson
🔨  https://www.lasvegashomesearchexperts.com/south-square-summerlin
🔨  https://www.lasvegashomesearchexperts.com/south-shores-las-vegas
✅  https://www.lasvegashomesearchexperts.com/southern-highlands
📝  https://www.lasvegashomesearchexperts.com/southern-highlands (expand with 9 enclave sub-pages)
🔨  https://www.lasvegashomesearchexperts.com/southern-terrace
🔨  https://www.lasvegashomesearchexperts.com/southwest-ranch-las-vegas
✅  https://www.lasvegashomesearchexperts.com/spanish-springs
🔨  https://www.lasvegashomesearchexperts.com/spanish-hills
🔨  https://www.lasvegashomesearchexperts.com/spanish-oaks
🔨  https://www.lasvegashomesearchexperts.com/spanish-trail
✅  https://www.lasvegashomesearchexperts.com/sparks
🔨  https://www.lasvegashomesearchexperts.com/spring-mountain-ranch
✅  https://www.lasvegashomesearchexperts.com/spring-valley
🔨  https://www.lasvegashomesearchexperts.com/stallion-mountain
🔨  https://www.lasvegashomesearchexperts.com/stonebridge-summerlin
✅  https://www.lasvegashomesearchexperts.com/summerlin
📝  https://www.lasvegashomesearchexperts.com/summerlin (expand with 28+ village sub-pages)
🔨  https://www.lasvegashomesearchexperts.com/summerlin-centre
✅  https://www.lasvegashomesearchexperts.com/summerlin-west
🔨  https://www.lasvegashomesearchexperts.com/sun-city-aliante
🔨  https://www.lasvegashomesearchexperts.com/sun-city-anthem
🔨  https://www.lasvegashomesearchexperts.com/sun-city-macdonald-ranch
🔨  https://www.lasvegashomesearchexperts.com/sun-city-summerlin
🔨  https://www.lasvegashomesearchexperts.com/sun-colony-at-siena
✅  https://www.lasvegashomesearchexperts.com/sun-valley
🔨  https://www.lasvegashomesearchexperts.com/sunridge-at-macdonald-ranch
🔨  https://www.lasvegashomesearchexperts.com/sunstone
🔨  https://www.lasvegashomesearchexperts.com/symmetry-summit-at-cadence
🔨  https://www.lasvegashomesearchexperts.com/talesera-hills
🔨  https://www.lasvegashomesearchexperts.com/terra-bella-anthem
🔨  https://www.lasvegashomesearchexperts.com/terracina-seven-hills
🔨  https://www.lasvegashomesearchexperts.com/the-arbors-summerlin
🔨  https://www.lasvegashomesearchexperts.com/the-bluffs-henderson
🔨  https://www.lasvegashomesearchexperts.com/the-bluffs-southern-highlands
🔨  https://www.lasvegashomesearchexperts.com/the-canyons-summerlin
🔨  https://www.lasvegashomesearchexperts.com/the-canyon-at-ascaya
🔨  https://www.lasvegashomesearchexperts.com/the-cliffs-summerlin
🔨  https://www.lasvegashomesearchexperts.com/the-crossing-summerlin
🔨  https://www.lasvegashomesearchexperts.com/the-enclave-southern-highlands
🔨  https://www.lasvegashomesearchexperts.com/the-estates-southern-highlands
🔨  https://www.lasvegashomesearchexperts.com/the-foothills-southern-highlands
🔨  https://www.lasvegashomesearchexperts.com/the-fountains-green-valley
🔨  https://www.lasvegashomesearchexperts.com/the-gardens-summerlin
🔨  https://www.lasvegashomesearchexperts.com/the-hills-south-summerlin
🔨  https://www.lasvegashomesearchexperts.com/the-hills-summerlin
✅  https://www.lasvegashomesearchexperts.com/the-lakes
🔨  https://www.lasvegashomesearchexperts.com/the-martin
🔨  https://www.lasvegashomesearchexperts.com/the-mesa-summerlin
🔨  https://www.lasvegashomesearchexperts.com/the-palisades-summerlin
🔨  https://www.lasvegashomesearchexperts.com/the-paseos-summerlin
🔨  https://www.lasvegashomesearchexperts.com/the-peaks-summerlin
🔨  https://www.lasvegashomesearchexperts.com/the-pointe-summerlin
🔨  https://www.lasvegashomesearchexperts.com/the-pueblo-summerlin
🔨  https://www.lasvegashomesearchexperts.com/the-ridges-summerlin
🔨  https://www.lasvegashomesearchexperts.com/the-summit-club
🔨  https://www.lasvegashomesearchexperts.com/the-trails-summerlin
🔨  https://www.lasvegashomesearchexperts.com/the-vineyards-summerlin
🔨  https://www.lasvegashomesearchexperts.com/the-vistas-summerlin
🔨  https://www.lasvegashomesearchexperts.com/the-willows-summerlin
🔨  https://www.lasvegashomesearchexperts.com/tournament-hills-summerlin
🔨  https://www.lasvegashomesearchexperts.com/trilogy-at-summerlin
🔨  https://www.lasvegashomesearchexperts.com/trilogy-sunstone
🔨  https://www.lasvegashomesearchexperts.com/trump-international
🔨  https://www.lasvegashomesearchexperts.com/turnberry-place
🔨  https://www.lasvegashomesearchexperts.com/turnberry-towers
✅  https://www.lasvegashomesearchexperts.com/tuscany-village
🔨  https://www.lasvegashomesearchexperts.com/tuscan-cliffs-southern-highlands
🔨  https://www.lasvegashomesearchexperts.com/valley-vista
🔨  https://www.lasvegashomesearchexperts.com/vdara
🔨  https://www.lasvegashomesearchexperts.com/veer-towers
🔨  https://www.lasvegashomesearchexperts.com/velaris-lake-las-vegas
🔨  https://www.lasvegashomesearchexperts.com/verona-lake-las-vegas
🔨  https://www.lasvegashomesearchexperts.com/vintage-canyon-southern-highlands
🔨  https://www.lasvegashomesearchexperts.com/vintage-historic-neighborhoods
🔨  https://www.lasvegashomesearchexperts.com/vu-residences-macdonald-highlands
🔨  https://www.lasvegashomesearchexperts.com/waldorf-astoria-las-vegas
🔨  https://www.lasvegashomesearchexperts.com/whitney
✅  https://www.lasvegashomesearchexperts.com/whitney-ranch
🔨  https://www.lasvegashomesearchexperts.com/winchester
🔨  https://www.lasvegashomesearchexperts.com/sunrise-manor
```

---

**Total URL Count:**
- ✅ LIVE: 34 pages (29 Las Vegas metro + 5 Reno/Northern Nevada)
- 📝 EXPAND: 11 pages (existing pages needing sub-page expansion)
- 🔨 BUILD: 208 pages (net new to build)
- **Grand Total: 253 unique community/sub-community pages + 8 lifestyle hub pages = ~261 total URLs**

---

*Document compiled: April 2026*
*Version 3.0 — Site-Specific Build Plan for lasvegashomesearchexperts.com*
*Nevada Real Estate Group (Chris Nevada) — 150+ Agent Luxury Team*
*Platform: Sierra Interactive (Next.js) | Flat URL Structure*
*Total communities inventoried: 253 unique pages | ~700+ named sub-neighborhoods documented as content*

---

## DATA SOURCES

This taxonomy Version 3.0 is adapted from Version 2.0 (Cross-Referenced & Verified), which was compiled from:

- [neighborhoodsinlasvegas.com](https://neighborhoodsinlasvegas.com) — Deepest competitor; primary source for Summerlin West new villages
- [lasvegashomesbyleslie.com](https://www.lasvegashomesbyleslie.com) — Summerlin, Henderson, NLV community data
- [thedhs.com](https://thedhs.com/communities) — Community data and new developments
- [isluxury.com](https://www.isluxury.com) — Guard-gated and luxury community data
- [rosehomeslv.com](https://www.rosehomeslv.com) — Southern Highlands and Summerlin village guides
- [55places.com](https://www.55places.com) — Active adult community details
- [Lake Las Vegas official site](https://lakelasvegas.com) — Sub-community data
- [Toll Brothers](https://www.tollbrothers.com) — New construction community data
- [Blue Heron](https://blueheron.com) — Ultra-luxury community details
- [Las Vegas Review-Journal](https://www.reviewjournal.com) — New development announcements
- [neighborhoodsinlasvegas.com — Grand Park Village](https://neighborhoodsinlasvegas.com/grand-park-village/)
- [neighborhoodsinlasvegas.com — La Madre Peaks Village](https://neighborhoodsinlasvegas.com/la-madre-peaks-village/)
- [neighborhoodsinlasvegas.com — The Peaks Village](https://neighborhoodsinlasvegas.com/the-peaks-village/)
