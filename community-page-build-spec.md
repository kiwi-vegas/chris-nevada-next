# The Definitive Build Specification: Las Vegas Real Estate Community Pages

**Prepared for:** Chris Nevada, Nevada Real Estate Group ([nevadarealestategroup.com](https://nevadarealestategroup.com))  
**Platform:** Sierra Interactive  
**Reference Audit:** Las Vegas Real Estate Community Pages — Deep Competitive Audit (April 2026)  
**Document Purpose:** Complete blueprint for building and scaling a dominant community page library across the Las Vegas metro

---

## A. Executive Strategy

### The Competitive Opportunity

The Las Vegas real estate community page landscape is more exploitable than it appears from the surface. The dominant player, [lasvegashomesbyleslie.com](https://www.lasvegashomesbyleslie.com) (Leslie Hoke / RE/MAX), appeared in only 9 of 10 test queries across the competitive audit — and does so on the back of basic content, not technical excellence. There is no competitor implementing schema markup of any kind on community pages. Not one. No FAQPage, no BreadcrumbList, no Place schema, no RealEstateAgent schema — across all 10 sites audited. The site with the single most valuable domain in Las Vegas real estate — [lasvegasrealestate.com](https://www.lasvegasrealestate.com) — appeared in zero of 10 test queries because JavaScript walls block every crawler. [smithteamlasvegas.com](https://smithteamlasvegas.com), despite $1B+ in closed transactions, serves identical Henderson copy on every community URL. [simplyvegasrealestate.com](https://simplyvegasrealestate.com), Las Vegas's largest boutique brokerage with 500+ agents, has no community guide content anywhere on the site.

The competitive set is underperforming relative to the market's search demand. Nevada Real Estate Group, with a 150+ agent team, institutional resources, and a Sierra Interactive platform capable of deep IDX integration, has a realistic window to own the majority of high-value community queries within 6–12 months through disciplined execution of this specification.

### The Dual-Optimization Thesis

Every community page must simultaneously be the best answer on the internet for two distinct query intents: **"living in [community]"** (informational, buyer research) and **"homes for sale in [community]"** (transactional, active buyer). Most competitors optimize for one or the other. [isluxury.com](https://isluxury.com) does "living in" well with its "Top Five Facts" format but has no school data or ZIP codes. [lasvegasrealestate.com](https://www.lasvegasrealestate.com) attempts transactional with IDX but offers nothing on the informational side due to JS rendering. Pages built to this specification serve both intents in a single URL: rich editorial content with named entities, school tables, park addresses, and demographic data satisfies the researcher; embedded Sierra IDX, price ranges, and contextual CTAs convert the active buyer.

### The Three-Pillar Approach

**Pillar 1 — Entity-Rich Hyperlocal Content:** Content that cannot be replicated by AI alone. Park names with street addresses, pool fee schedules, floor plan names by builder collection, HOA management company contacts, GreatSchools ratings with specific test score data, golf course designers with yardage specs, and community character details (Sunday farmers markets, Yappy Hours at dog parks) that only local expertise provides. [neighborhoodsinlasvegas.com](https://neighborhoodsinlasvegas.com) demonstrates the ceiling: park opening dates, seasonal pool hours, specific acreage for each amenity. [thedhs.com](https://thedhs.com) shows what Census Bureau demographic data, school rating tables, and transit detail look like in practice.

**Pillar 2 — Schema Markup:** The single highest-ROI technical action available. Zero of the 10 competitors deploy FAQPage, LocalBusiness, BreadcrumbList, Place, or VideoObject schema on community pages. Systematic JSON-LD schema across a 100+ page library produces immediate gains in AI Overviews, People Also Ask boxes, and featured snippets — all categories where the competition is scoring zero structured data signals. This pillar is covered exhaustively in Section H.

**Pillar 3 — Internal Linking Architecture:** Content authority is not built page-by-page — it is built through topical clustering. A hub-and-spoke model where city pages link to all community pages, master-planned community pillar pages link to all village pages, lifestyle collection pages (55+, golf, guard-gated, new construction) link to all qualifying communities, and every blog post links back to its referenced community pages concentrates topical authority in a way that is very difficult for individual-agent sites to replicate. The full architecture is specified in Section G.

### Rollout Timeline

- **Phase 1 (Weeks 1–12):** 30 priority communities — the highest-volume, highest-intent community queries across Summerlin, Henderson, Northwest Las Vegas, and the South Valley. Full spec compliance: 2,000+ words, schema, FAQ, school table, IDX integration, internal links.
- **Phase 2 (Weeks 13–24):** Sub-neighborhoods and villages — 50+ village-level pages within Summerlin, Anthem, Green Valley, and master-planned communities. Pillar-to-spoke linking.
- **Phase 3 (Weeks 25–32):** ZIP code pages and lifestyle collection pages — 55+, golf, guard-gated, new construction, lakefront, high-rise. Cross-linking all lifestyle pages to qualifying communities.
- **Phase 4 (Ongoing):** Quarterly content refresh, monthly market stat updates, schema audits, performance tracking.

### The Competitive Moat

Once 100+ deep community pages are live with comprehensive entity content and schema markup, the investment becomes structurally difficult for competitors to replicate. An individual agent cannot produce 100 pages of park-address-level, school-table-level, HOA-contact-level content at speed. A brokerage that builds this library first controls the answer for every community query in their market — and AI systems, which rely on these pages as primary sources, will cite them by default. The moat is not the domain. It is not the IDX. It is the depth of verified, entity-rich, schema-wrapped community content.

---

## B. Complete Build Checklist

Every item is a discrete, assignable action. Complete items in sequence within each group; groups may run in parallel where noted.

### 1. Pre-Production (Research & Data Gathering)

- [ ] 1. Identify the target community name and all common variant spellings/abbreviations (e.g., "Summerlin" vs. "Summerlin Las Vegas" vs. "The Summerlin Community")
- [ ] 2. Confirm the correct city/jurisdiction (Las Vegas, Henderson, North Las Vegas, unincorporated Clark County)
- [ ] 3. Pull all applicable ZIP codes from USPS and confirm in NVAR MLS data
- [ ] 4. Document current IDX listing count, median price, average price, highest active, lowest active, and average days on market from Sierra Interactive backend
- [ ] 5. Research community founding year, original developer, master planning history (primary sources: Clark County records, developer press releases, Nevada State Contractors Board)
- [ ] 6. Identify all named sub-neighborhoods and villages within the community; document their boundaries
- [ ] 7. Collect full school list: public elementary, middle, high school, charter schools, private schools serving the community; record each school's GreatSchools rating and CCSD rating
- [ ] 8. Map all named parks within community boundaries: park name, street address, acreage, amenities list, operating hours, owner (city vs. HOA-managed)
- [ ] 9. Document HOA structure: single HOA vs. master HOA + sub-association; HOA fee range (monthly or annual); HOA management company name and contact; amenities included in HOA
- [ ] 10. Identify all active builders and their named home collections; note current phase/availability status
- [ ] 11. Research golf courses within or adjacent to community: course name, designer/architect, yardage, par, public vs. private/semi-private status
- [ ] 12. Pull Census Bureau data: population, median age, average household income, total households, homeownership rate (American Community Survey 5-year estimates; cite survey year)
- [ ] 13. Document drive-time proximity to key Las Vegas destinations: Strip, Harry Reid International Airport, Red Rock Canyon, UNLV, major hospitals
- [ ] 14. Identify community-specific events, programs, or character details not generatable by AI (farmers markets, annual events, community traditions)
- [ ] 15. Keyword research: pull search volume data for primary, secondary, and long-tail keyword variants (see Section E keyword strategy); document in keyword map sheet

### 2. Content Creation

- [ ] 16. Draft H1 per the exact format in Section E; confirm it contains primary keyword and geographic modifier
- [ ] 17. Write the hero introduction paragraph (150–200 words): lead with the community's defining characteristic, include at least 3 named entities (ZIP code, developer, founding year or acreage)
- [ ] 18. Write "Community Overview" section (300–400 words): history, scale, position within Las Vegas metro, what type of buyer it attracts
- [ ] 19. Write sub-neighborhoods section: H3 per sub-neighborhood with 60–100 words each, home type, price range, unique identifier
- [ ] 20. Write "Quick Facts" data block: minimum 6 facts in declarative subject-predicate-object format (e.g., "Summerlin spans 22,500 acres along the western rim of the Las Vegas Valley")
- [ ] 21. Build school data table: columns for school name, type (public/charter/private), grades served, GreatSchools rating, distance approximation
- [ ] 22. Write parks & recreation section: minimum 3 named parks with addresses, amenity list, and operating hours where applicable
- [ ] 23. Write HOA section: fee range, what's included, management company, guard-gated status, amenity highlights (clubhouse sq ft, pool count, tennis/pickleball courts)
- [ ] 24. Write market stats section: pull from Sierra IDX; include median price, active listing count, price per sq ft trend, average DOM — note the pull date
- [ ] 25. Write lifestyle narrative section (200–300 words): what daily life looks like in the community — shopping, dining, commute, outdoor recreation — with named businesses/venues
- [ ] 26. Write builder section: H3 per active builder; include builder name, collection names, sq footage ranges, price range, build timeline, and a link to builder's IDX search
- [ ] 27. Build FAQ block: minimum 8 Q&A pairs using the templates in Section F; write each answer in 2–4 sentences with specific data
- [ ] 28. Write "Nearby Communities" comparison paragraph: 5–8 communities with one sentence each on why a buyer might prefer one over another
- [ ] 29. Draft 3–4 CTA copy variations per the templates in Section I; select placement per the layout in Section D
- [ ] 30. Compile full entity list for schema markup: all named entities to be encoded in JSON-LD (parks, schools, HOA, golf courses, builders)

### 3. Technical Implementation

- [ ] 31. Set URL to exact taxonomy: `/communities/[community-name]/` for master communities; `/communities/[master-plan]/[village-name]/` for villages (see Section E)
- [ ] 32. Write title tag per the exact pattern in Section E; confirm under 60 characters
- [ ] 33. Write meta description per the exact pattern in Section E; include a live stat; confirm 145–155 characters
- [ ] 34. Configure Sierra Interactive IDX widget: set geographic filter to community boundaries/ZIP code(s), set default sort to "newest," enable price range display
- [ ] 35. Implement FAQPage JSON-LD schema block (see Section H for exact template); place in `<head>` or before `</body>`
- [ ] 36. Implement BreadcrumbList JSON-LD schema block (see Section H for exact template)
- [ ] 37. Implement Place/Neighborhood JSON-LD schema block with geo coordinates (see Section H)
- [ ] 38. Implement RealEstateAgent JSON-LD on page (see Section H)
- [ ] 39. Add internal links: minimum 5 to nearby community pages; minimum 2 to relevant blog posts; minimum 1 to parent hub page (city or master plan); anchor text per rules in Section G
- [ ] 40. Add page to city hub page's community link list (hub → spoke relationship confirmed)
- [ ] 41. Add page to all applicable lifestyle collection pages (55+, golf, guard-gated, new construction) where community qualifies
- [ ] 42. Optimize all images: rename files per naming convention (see Section E), convert to WebP, compress to under 150KB per image, write alt text per pattern
- [ ] 43. Embed breadcrumb navigation in page UI: Home > Communities > [City] > [Community Name]
- [ ] 44. Add "Last Updated" date stamp in visible page body (for YMYL trust signal)

### 4. Quality Assurance

- [ ] 45. Run full QA checklist from Section L: Content QA (15 items), Technical QA (15), SEO QA (10), AEO QA (10), UX/Mobile QA (10), Conversion QA (5)
- [ ] 46. Validate all three JSON-LD schema blocks using Google Rich Results Test (https://search.google.com/test/rich-results); screenshot results
- [ ] 47. Run Screaming Frog or Sitebulb crawl on URL: confirm H1 count = 1, title tag, meta description, canonical tag, no noindex flag
- [ ] 48. Mobile render test: load on iOS Safari and Android Chrome; confirm above-fold renders without horizontal scroll, IDX widget loads, CTA buttons are tap-friendly (min 44px)
- [ ] 49. PageSpeed Insights: target LCP < 2.5s, CLS < 0.1, FID/INP < 200ms on mobile; log score
- [ ] 50. Fact-check all named entities: school names, park addresses, HOA fees, builder names, golf course details — verify against primary sources before publication
- [ ] 51. Proofread for first-person pronouns (none), claims without data sourcing, and any AI-generated generic filler language

### 5. Post-Publication

- [ ] 52. Submit URL to Google Search Console for indexing via URL Inspection tool
- [ ] 53. Submit to Bing Webmaster Tools IndexNow API
- [ ] 54. Run internal link audit: confirm all hub pages, lifestyle pages, and 5+ spoke pages now link to this URL with correct anchor text
- [ ] 55. Add URL to rank tracking campaign: track primary keyword, 3 secondary keywords, and 2 long-tail keywords (see Section E)
- [ ] 56. Log page in community page master inventory sheet: URL, publication date, last update date, word count, schema types deployed, keyword targets
- [ ] 57. Share page with relevant blog content team: flag for inclusion in any existing or future blog posts that reference this community
- [ ] 58. Schedule first content refresh: 90 days from publication (pull new market stats, verify school ratings, update any seasonal HOA hours)

---

## C. Required Content Modules

The following 32 modules define the complete content inventory for a community page. "MUST-HAVE" modules are required on every community page at launch. "NICE-TO-HAVE" modules are included as resources permit or where the community warrants.

### 1. Content Modules (Editorial Sections)

| Module Name | Priority | Description | SEO Value | AEO/LLM Value | UX/Conversion Value | Best Competitor Example |
|---|---|---|---|---|---|---|
| **Hero Introduction Paragraph** | MUST-HAVE | 150–200 words establishing the community's defining character, founding entity, acreage/scale, and geographic position in the Las Vegas metro | Keyword density; crawlable above-fold content; geographic co-occurrence signals | Provides LLMs with the primary factual anchor for the community; subject-predicate-object sentences extracted verbatim | Sets buyer expectation; reduces bounce by confirming relevance | [thedhs.com Southern Highlands](https://thedhs.com/neighborhoods/southern-highlands) — opens with luxury framing and Census-sourced population data |
| **Community History & Background** | MUST-HAVE | 200–300 words on founding year, original developer, master planning milestones, notable accolades or rankings | Entity signals (developer name, founding year, acreage); long-tail "history of [community]" rankings | Named developers, architects, and historical milestones are high-confidence AI citations | Builds authority; buyer research validation | [lasvegasrealestate.com Summerlin](https://www.lasvegasrealestate.com/locations/summerlin-las-vegas/) — Howard Hughes 1952 land acquisition narrative |
| **Sub-Neighborhoods Breakdown** | MUST-HAVE | H3 per sub-neighborhood; 60–100 words each; home type, price range, distinguishing feature; links to IDX search for each | Deep keyword coverage for village/sub-community queries; internal link equity distribution | Each sub-neighborhood is a named entity that AI can index and cite per buyer intent | Enables self-selection; reduces lead qualification time | [lasvegashomesbyleslie.com The Crossing](https://www.lasvegashomesbyleslie.com/crossing-homes-for-sale.php) — neighborhoods → condos → parks H2/H3 structure |
| **Quick Facts Block** | MUST-HAVE | 5–8 declarative numbered facts about the community (acreage, home count, price range, guard-gated status, year opened, developer) in explicit "Top N Facts" format | Rich snippet candidate; numbered lists index as structured data | Numbered declarative format is the single most LLM-extractable content structure; cited verbatim in AI Overviews | Scannable; answers buyer "is this the right community" instantly | [isluxury.com MacDonald Highlands](https://isluxury.com/communities/macdonald-highlands/) — "Top Five Facts" numbered section |
| **Lifestyle Narrative** | MUST-HAVE | 200–300 words on daily life: morning routines, commute patterns, dining, shopping, recreation — with named businesses and venues | Semantic keyword depth; named POI entities; long-tail lifestyle query coverage | Named venues and activity types are extractable lifestyle entities; differentiates from AI-generated generic content | Emotional resonance; converts researchers into inquiry leads | [isluxury.com Southern Highlands](https://isluxury.com/communities/southern-highlands/) — Sunday farmers market, Olympia Sports Park detail |
| **Parks & Recreation Section** | MUST-HAVE | H3 per named park; park name + street address + acreage + amenity list + hours; include HOA-managed pools and tennis/pickleball courts | Named entity signals; geographic co-occurrence; addresses index as local SEO signals | Park addresses are AEO gold — ungenerable by AI alone; "where is [park]" queries source from these addresses | Buyer validation of family/lifestyle suitability | [thedhs.com Seven Hills](https://thedhs.com/neighborhoods/seven-hills) — four parks with full street addresses |
| **Market Statistics Section** | MUST-HAVE | Current median price, active listing count, highest/lowest active, avg price per sq ft, avg DOM; sourced from Sierra IDX with pull date stated | E-E-A-T signal (dated primary data); keyword coverage for "average home price in [community]" | Specific, dated numeric facts are highest-confidence AI citation material | Price range helps buyers self-qualify; reduces unqualified leads | [lasvegashomesbyleslie.com Green Valley](https://www.lasvegashomesbyleslie.com/green-valley-homes.php) — live listing stats block |
| **Builder Section** | MUST-HAVE | H3 per active builder; builder name, named collections, sq footage ranges, price tier, IDX link | Named builder entities; new construction long-tail queries | Builder names are specific entities AI indexes against "who built homes in [community]" | New construction buyers need this; reduces time-to-inquiry | [neighborhoodsinlasvegas.com Skye Canyon](https://neighborhoodsinlasvegas.com/skye-canyon/) — 8 named builders |
| **Lifestyle Narrative: Golf/Country Club** | NICE-TO-HAVE | Golf course name, designer, yardage, par, public/semi-private/private status, signature hole description; relevant to golf communities only | Golf-specific named entity signals; "golf communities Las Vegas" long-tail queries | Golf course designer names are strong luxury entity signals for AI | Highly relevant for luxury and 55+ buyers; drives "golf community" searchers to convert | [isluxury.com MacDonald Highlands](https://isluxury.com/communities/macdonald-highlands/) — DragonRidge: 6,975 yards, Jay Morrish/David Druzisky |
| **Community Events Calendar** | NICE-TO-HAVE | Named recurring community events with dates, locations; farmers markets, HOA-sponsored events, seasonal programming | Fresh content signal; event-specific query capture | Events are human-specific, AI-uncopyable local entities | Engagement driver; positions team as community experts | [isluxury.com Southern Highlands](https://isluxury.com/communities/southern-highlands/) — Sunday farmers market, annual yard sale |

### 2. Data Modules (Statistics, Demographics, School Tables)

| Module Name | Priority | Description | SEO Value | AEO/LLM Value | UX/Conversion Value | Best Competitor Example |
|---|---|---|---|---|---|---|
| **School Data Table** | MUST-HAVE | HTML table: school name, type (public/charter/private), grades, GreatSchools rating, distance approximation; separate rows for elementary/middle/high/charter/private | Named school entities; "schools near [community]" query capture; tabular format indexes cleanly | Structured table data is easily extracted by AI; school names + ratings are highest-confidence education entities | School quality is the #1 decision factor for family buyers | [lasvegashomesbyleslie.com Green Valley](https://www.lasvegashomesbyleslie.com/green-valley-homes.php) — 10 elem + 5 middle + 7 high + 3 charter + 4 private |
| **Census Demographic Widget** | MUST-HAVE | Population, median age, avg individual income, avg household income, total households, homeownership rate; sourced from U.S. Census Bureau ACS 5-year estimates with survey year cited | E-E-A-T: government-sourced primary data; demographic long-tail queries | Census data is the highest-authority factual anchor available — AI systems cite government sources preferentially | Buyer demographic match validation | [thedhs.com Southern Highlands](https://thedhs.com/neighborhoods/southern-highlands) — population 26,470, median age 41, avg income $54,991 |
| **ZIP Code Block** | MUST-HAVE | All applicable ZIP codes stated explicitly in body text; ideally in a "Quick Facts" or sidebar element | ZIP codes are among the highest-value SEO entities for community pages — direct keyword match for "[ZIP] homes for sale" queries | ZIP codes are structured geographic entities indexed by AI for location disambiguation | Buyer validation that they're searching the right area | [lasvegashomesbyleslie.com Summerlin](https://www.lasvegashomesbyleslie.com/summerlin-neighborhoods.php) — 7 ZIP codes listed |
| **HOA Fee & Amenity Table** | MUST-HAVE | HOA fee range (monthly or annual), what is covered (landscaping, exterior maintenance, amenities), management company name and contact, guard-gated status explicitly stated | HOA entities; "HOA fees [community]" query capture | HOA fee is a specific quantified entity AI extracts for buyer questions | Prevents wasted inquiries from buyers who cannot afford HOA; trust signal for transparency | [neighborhoodsinlasvegas.com Summerlin West](https://neighborhoodsinlasvegas.com/summerlin-west/) — pool fee schedules, HOA contact |
| **Price Range by Sub-Neighborhood** | MUST-HAVE | Entry, mid-range, and luxury price tiers stated per sub-neighborhood or home type category | Keyword coverage for price-qualified searches ("luxury homes [community]," "affordable [community]") | Price ranges enable AI to answer "what is the price range in [community]" with specificity | Buyer self-qualification; reduces unqualified leads | [lasvegasrealestate.com The Ridges](https://www.lasvegasrealestate.com/locations/the-ridges-las-vegas/) — $825K–$8.3M |
| **Walk Score / Transit Data** | NICE-TO-HAVE | Walk Score, Bike Score, Transit Score from Walk Score API; named transit routes serving the community | Behavioral signals; walkability query capture | Scored, attributed data from a recognized source (Walk Score) is AI-citable | Relevant for urban/high-rise communities and relocation buyers | [simplyvegasrealestate.com Green Valley Ranch](https://simplyvegasrealestate.com/neighborhoods/green-valley-ranch) — Walk 73, Bike 34, Transit 30 |
| **Drive-Time Proximity Table** | NICE-TO-HAVE | Table: destination (Strip, Airport, Red Rock, UNLV, major hospitals), drive-time estimate, highway/route used | Geographic positioning entities; "close to [destination]" query capture | Drive times are factual relational entities that AI uses for location queries | Relocation buyers need this for lifestyle planning | [lasvegasrealestate.com Southern Highlands](https://www.lasvegasrealestate.com/locations/southern-highlands-las-vegas/) — 10-min to Strip stated |

### 3. Trust Modules (Agent Credentials, Testimonials, Certifications)

| Module Name | Priority | Description | SEO Value | AEO/LLM Value | UX/Conversion Value | Best Competitor Example |
|---|---|---|---|---|---|---|
| **Agent/Team Credentials Block** | MUST-HAVE | Community specialist agent photo, name, Nevada RE license number, years in market, community-specific production stats (sales count, volume in community in last 12 months) | E-E-A-T author signal; local agent entity | Licensed agent with verified production data is a YMYL trust signal for AI systems | Single highest conversion trust signal for real estate lead forms | [isluxury.com Southern Highlands](https://isluxury.com/communities/southern-highlands/) — $710M 2021 sales, 22 years experience integrated mid-page |
| **Community Testimonials** | MUST-HAVE | 2–3 testimonials from buyers/sellers who transacted in this specific community; include community name in testimonial text for entity relevance | Named community + agent review signals | Review content with specific community names is high-value entity context | Social proof at decision point; community-specific > generic testimonials | No competitor implements community-specific testimonials — uncontested gap |
| **"As Seen In" / Press Mentions** | NICE-TO-HAVE | Logo bar: Review-Journal, Las Vegas Magazine, Luxury Portfolio, Wall Street Journal, Robb Report (where applicable) | Brand authority signals; editorial entity validation | Press mentions from named publications are high-authority E-E-A-T signals | Social proof; legitimizes team in luxury segment | No competitor does this on community pages — uncontested gap |
| **Production Stats Block** | NICE-TO-HAVE | Nevada Real Estate Group team stats: total agents, total volume, Clark County transactions (trailing 12 months), average days to close | Agent entity signals; team volume as named-entity brand claim | Team production data is citable brand entity information for AI | Converts researchers comparing brokerages | [isluxury.com](https://isluxury.com) — integrated production stats on community pages |

### 4. Media Modules (Images, Video, Maps)

| Module Name | Priority | Description | SEO Value | AEO/LLM Value | UX/Conversion Value | Best Competitor Example |
|---|---|---|---|---|---|---|
| **Hero Image** | MUST-HAVE | Community aerial or streetscape photo; WebP format; < 150KB; descriptive filename (e.g., `summerlin-las-vegas-aerial-homes.webp`); alt text per Section E pattern | Image SEO; visual search indexing | N/A (visual only) | First impression; bounce rate reduction; professionalism signal | [neighborhoodsinlasvegas.com](https://neighborhoodsinlasvegas.com) — drone view gallery per community |
| **Google Map Embed** | MUST-HAVE | Embedded Google Map centered on community; set to show community boundaries if polygon available; include major nearby landmarks | Local SEO entity signal; geographic context | Geographic coordinates reinforce Place entity disambiguation | Buyer orientation; confirms physical location | [thedhs.com](https://thedhs.com/neighborhoods/southern-highlands) — map embed with neighborhood boundary |
| **Community Photo Gallery** | MUST-HAVE | 4–8 WebP images: entry signage, amenity center, park, streetscape, sample home exterior; all renamed and alt-tagged | Image indexing; on-page engagement time | N/A (visual only) | Visual validation of lifestyle promises; gallery engagement reduces bounce | [neighborhoodsinlasvegas.com Reverence](https://neighborhoodsinlasvegas.com/reverence-village/) — 21+ labeled drone images |
| **Community Tour Video** | NICE-TO-HAVE | YouTube embed of community walkthrough; 3–8 minutes; VideoObject schema applied (see Section H) | Video SEO; YouTube entity crosslink; rich snippet eligibility | VideoObject schema makes video content indexable by AI | Highest engagement media type; YouTube subscribers as community trust signal | [neighborhoodsinlasvegas.com](https://neighborhoodsinlasvegas.com) — YouTube channel with 24.9K subscribers |
| **Neighborhood Map / Boundaries Infographic** | NICE-TO-HAVE | Custom static map image showing community boundaries, sub-neighborhood zones, park locations, school locations, and major amenities | Unique visual asset (backlink magnet); image search indexing | N/A (visual only) | Buyer orientation; community scope visualization | No competitor produces custom neighborhood maps — uncontested gap |

### 5. Conversion Modules (CTAs, Search Filters, Contact Forms)

| Module Name | Priority | Description | SEO Value | AEO/LLM Value | UX/Conversion Value | Best Competitor Example |
|---|---|---|---|---|---|---|
| **Sierra IDX Listings Widget** | MUST-HAVE | Live IDX listing grid filtered to community boundaries; default sort: newest; show price, beds/baths, sq ft; minimum 6 listings displayed | Crawlable listing content contributes to entity relevance; listing count is a live data signal | N/A (widget) | Table stakes for transactional intent; buyers who see listings stay on site | [lasvegashomesbyleslie.com](https://www.lasvegashomesbyleslie.com/green-valley-homes.php) — listing stats block above editorial |
| **Primary Hero CTA** | MUST-HAVE | Above-fold button: "Search Homes in [Community]" linking to IDX search page filtered to community | N/A | N/A | Captures transactional-intent buyers who arrived ready to browse | [neighborhoodsinlasvegas.com](https://neighborhoodsinlasvegas.com) — IDX widget at page top |
| **Contextual Mid-Page CTAs** | MUST-HAVE | 3–4 in-content CTAs matched to section context: after market stats → "Get Your Free Market Report"; after schools → "Find Homes Near [School Name]"; after builders → "View New Construction in [Community]" | Anchor text internal link equity (CTA links) | N/A | Contextual placement converts at 3–5× higher rate than generic end-of-page forms | [lasvegashomesbyleslie.com Green Valley](https://www.lasvegashomesbyleslie.com/green-valley-homes.php) — "View homes for sale in Green Valley South" mid-paragraph |
| **Lead Capture Form** | MUST-HAVE | 3-field form: name, email, phone; pre-populated subject line "I'm interested in [Community]"; send to Sierra CRM; visible without scrolling on mobile | N/A | N/A | Primary lead generation mechanism; community-specific subject pre-populates for CRM tagging | No competitor deploys community-pre-tagged lead forms — uncontested gap |
| **Saved Search Signup** | MUST-HAVE | "Get Alerts for [Community] Listings" → email opt-in that creates a saved Sierra IDX search; no-gate for basic alerts | N/A | N/A | Highest-intent repeat engagement mechanism; builds drip pipeline | No competitor deploys community-specific saved search prompts with community names — gap |
| **Sticky Mobile CTA Bar** | MUST-HAVE | Fixed bottom bar on mobile: left button "Search Listings," right button "Call/Text Now" with tel: link; appears after user scrolls past hero | N/A | N/A | Mobile conversion rate is primary — 65%+ of real estate searches are mobile | No competitor deploys sticky mobile CTA bars — uncontested gap |
| **Market Report Download** | NICE-TO-HAVE | Gated PDF download: "[Community] Market Report — Q[X] 2025"; gate with name + email; generates in Sierra or manual quarterly | Content asset for link building | N/A | Mid-funnel lead capture for buyers not yet ready to contact | [thedhs.com](https://thedhs.com) — neighborhood guides referenced in content |
| **Community Guide PDF Download** | NICE-TO-HAVE | Lightly gated or ungated PDF "Living in [Community]: The Complete Buyer's Guide" — includes school table, HOA summary, park map, market stats | Backlink magnet; asset indexing | N/A | Relocation buyers download guides; email capture for drip | No competitor produces community-specific downloadable guides — uncontested gap |

---

## D. Recommended Page Layout in Order

Every numbered position maps to a content module from Section C. "Above fold" definitions: desktop = first 600px at 1440px width; mobile = first 800px on 375px viewport.

1. **[ABOVE FOLD — DESKTOP & MOBILE]** Hero section — Community Name H1 (see Section E H1 format), hero aerial image (WebP, lazy-load disabled for LCP), 3-stat callout row (Active Listings / Median Price / Avg Days on Market from Sierra IDX live data), primary CTA button "Search Homes in [Community]"

2. **[ABOVE FOLD — DESKTOP]** Quick Facts Bar — horizontal row beneath hero: ZIP Code(s) | Community Type (Guard-Gated / Master-Planned / etc.) | Price Range | HOA: Yes/No | Year Established

3. **[NEAR FOLD — DESKTOP]** Sierra IDX Listings Widget — 6-listing grid; "View All [X] Listings in [Community]" link below widget

4. **[H2] Community Overview** — 200–300-word editorial section; founding year, developer, acreage, geographic position; breadcrumb navigation (Home > Communities > [City] > [Community Name]) displayed above this H2

5. **[H3] Quick Facts Block** — 5–8 numbered declarative facts in a styled callout box; schema-eligible content (FAQPage/Place); "(1) [Community] spans [X] acres... (2) [Community] was developed by... (3) [Community] is located in ZIP code(s)..."

6. **[H2] Sub-Neighborhoods in [Community]** — H3 per sub-neighborhood; styled card layout with thumbnail, home type label, price range, and "View Homes" IDX link per card

7. **[CTA — CONTEXTUAL]** After sub-neighborhoods: inline text link + button → "Browse All [Community] Listings by Sub-Neighborhood"

8. **[H2] Homes for Sale in [Community] — Market Statistics** — Styled data table: Median Price | Avg Price/Sq Ft | Active Listings | Avg Days on Market | Highest Active | Lowest Active; sourced from Sierra IDX; "Data pulled [Month Day, Year]" citation

9. **[CTA — CONTEXTUAL]** After market stats: "Get a Custom [Community] Market Report — Free" → 2-field form (name + email) inline

10. **[H2] [Community] Neighborhoods: A Closer Look** — prose narrative 200–300 words; lifestyle framing; named businesses, venues, character details that cannot be AI-generated; schema-eligible Place/Neighborhood content

11. **[H2] Parks & Recreation in [Community]** — H3 per named park; park name (bolded) / street address / acreage / amenity list / hours; minimum 3 parks with full addresses

12. **[H2] Golf & Country Club** — [Only for golf communities] H3 per course; course name / designer / yardage / par / membership type; replaces or supplements Parks section

13. **[H2] HOA in [Community]** — Styled 2-column summary: left side — monthly fee range, management company, contact; right side — amenity bullet list (guard-gate, clubhouse sq ft, pool count, fitness center, courts); guard-gated status stated explicitly

14. **[H2] Schools Serving [Community]** — HTML table: School Name | Type | Grades | GreatSchools Rating | Notes; separate subsections H3 for Public Schools / Charter Schools / Private Schools; specific rating data cited; "Data sourced from GreatSchools.org, [year]"

15. **[CTA — CONTEXTUAL]** After schools section: "Find Homes Near [Top-Rated School Name]" → IDX search filtered to school attendance zone + community

16. **[H2] Builders in [Community]** — H3 per active builder; builder name / named collection(s) / sq footage range / price range / current phase note / IDX link to new construction in community

17. **[H2] Demographics: [Community]** — Census Bureau data table: Population | Median Age | Avg Household Income | Total Households | Homeownership Rate; cite "U.S. Census Bureau, American Community Survey [year] 5-Year Estimates"

18. **[H2] Getting Around: [Community] Location & Commute** — Drive-time table to 5–6 key destinations (Strip, Airport, Red Rock, UNLV, nearest major hospital, Downtown Henderson/Las Vegas); highway route noted

19. **[TRUST MODULE]** Agent credentials block — Nevada Real Estate Group community specialist; photo / name / license # / community sales stat / 1-sentence positioning statement ("I've helped [X] families buy and sell in [Community] since [year]")

20. **[TRUST MODULE]** Community testimonials — 2 community-specific buyer/seller testimonials; styled cards with buyer first name, last initial, community name, transaction year

21. **[H2] Frequently Asked Questions About [Community]** — Accordion-style FAQ; minimum 8 Q&A pairs; FAQPage JSON-LD schema wraps this entire section (see Section H); questions per Section F templates

22. **[CTA — CLOSING]** After FAQ: "Have More Questions? Talk to a [Community] Expert" → full 5-field lead form (name, email, phone, timeline, message) + agent photo

23. **[H2] Nearby Communities to Consider** — 5–8 linked community comparisons; H3 per community; 1–2 sentences on why a buyer comparing [this community] might also consider [that community]; IDX link per entry

24. **[MEDIA]** Google Map embed — centered on community; set to show boundaries; include walking distance to nearest park as caption text

25. **[MEDIA]** Photo gallery — 4–8 WebP images; lightbox-enabled; captions with named locations ("Summerlin Trail at Fox Hill Park, Las Vegas, NV 89138")

26. **[MEDIA]** YouTube community tour embed — if video exists; VideoObject schema applied; descriptive title caption beneath embed

27. **[CONVERSION]** Sticky mobile CTA bar — fixed at viewport bottom on all mobile screens; left: "View Listings" (IDX link); right: "Call Now" (tel:7025551234); dismiss button

28. **[BREADCRUMB + SCHEMA]** Breadcrumb navigation — displayed at top of page below main nav: Home > Communities > [City] > [Community Name]; BreadcrumbList JSON-LD implemented

29. **[H2] Related Resources** — 3–5 internal blog post links with descriptive anchor text ("The Best Schools in Summerlin: A Parent's Guide 2025," "Summerlin vs. Henderson: Which Is Right for You?"); blog → community bidirectional link equity

30. **[FOOTER CTA BAR]** Full-width footer CTA: "Ready to Find Your Home in [Community]? Nevada Real Estate Group Has 150+ Agents Who Know This Market" — primary phone number, email link, and "Search Now" button

---

## E. SEO Requirements

### Title Tag Pattern

**Format rule:** Primary keyword + location modifier + brand qualifier. Never exceed 60 characters. Always include the community name and either "homes for sale" (transactional) or "real estate" (category) as the primary keyword cluster.

| Page Type | Title Tag Pattern | Example |
|---|---|---|
| Community page | `[Community] Homes for Sale \| Nevada Real Estate Group` | `Summerlin Homes for Sale \| Nevada Real Estate Group` |
| Master-planned community | `[Community] Las Vegas Homes for Sale \| [X]+ Listings` | `Summerlin Las Vegas Homes for Sale \| 300+ Listings` |
| Village/sub-neighborhood | `[Village] [Master Plan] Homes for Sale \| NV RE Group` | `The Ridges Summerlin Homes for Sale \| NV RE Group` |
| City hub | `[City] NV Homes for Sale \| Nevada Real Estate Group` | `Henderson NV Homes for Sale \| Nevada Real Estate Group` |
| ZIP code page | `[ZIP] Real Estate — [City] NV \| NV RE Group` | `89052 Real Estate — Henderson NV \| NV RE Group` |
| Luxury/guard-gated | `[Community] Luxury Homes for Sale Las Vegas` | `Southern Highlands Luxury Homes for Sale Las Vegas` |
| 55+ community | `[Community] 55+ Homes for Sale Las Vegas NV` | `Sun City Summerlin 55+ Homes for Sale Las Vegas NV` |
| Lifestyle collection | `[Type] Communities Las Vegas \| [X] Neighborhoods` | `Guard-Gated Communities Las Vegas \| 14 Neighborhoods` |

**Summerlin example:** `Summerlin Las Vegas Homes for Sale | 300+ Listings` = 52 characters ✓

### Meta Description Pattern

**Format rule:** Open with a live stat (listing count or median price), include the community name, add a benefit statement, close with a soft CTA. Target 145–155 characters. The live stat boosts CTR by confirming relevance and freshness.

**Pattern:** `[X] homes for sale in [Community], Las Vegas. [Price range] — from [entry] to [luxury]. Schools, HOA, builders. [Team Name] — [differentiator].`

**Examples:**

| Page Type | Meta Description Example |
|---|---|
| Community (Summerlin) | `287 homes for sale in Summerlin, Las Vegas. $450K–$8M — from condos to custom estates. Schools, HOA info, builder options. Nevada RE Group — 150+ local agents.` |
| Village (The Ridges) | `42 luxury homes for sale in The Ridges, Summerlin. $1.2M–$8M+ — guard-gated, Bear's Best golf. Updated daily. Nevada Real Estate Group, your Ridges specialists.` |
| 55+ (Sun City Summerlin) | `Sun City Summerlin 55+ homes for sale. $325K–$850K — Del Webb, 3 golf courses, 4 rec centers. Expert 55+ agent guidance. Nevada Real Estate Group Las Vegas.` |
| ZIP (89052) | `Homes for sale in ZIP 89052 (Henderson NV). $380K–$3M — Green Valley, Seven Hills, Anthem communities. Browse live MLS listings. Nevada Real Estate Group.` |

### URL Structure

**Canonical taxonomy:**

```
/communities/                                   ← Community hub index
/communities/[community-name]/                  ← Master community page
/communities/[master-plan]/[village-name]/      ← Village/sub-neighborhood page
/communities/cities/[city-name]/                ← City hub page
/communities/zip/[zip-code]/                    ← ZIP code page
/communities/lifestyle/[type]/                  ← Lifestyle collection page
```

**Exact examples:**

```
/communities/summerlin/
/communities/summerlin/the-ridges/
/communities/summerlin/red-rock-country-club/
/communities/henderson/
/communities/henderson/southern-highlands/
/communities/henderson/green-valley/
/communities/henderson/green-valley/green-valley-ranch/
/communities/zip/89052/
/communities/lifestyle/55-plus/
/communities/lifestyle/guard-gated/
/communities/lifestyle/golf-communities/
```

**Rules:**
- All lowercase, hyphenated, no trailing parameters
- Community name matches the canonical form used in MLS and Clark County records
- Never use `.php` extensions (avoid [lasvegashomesbyleslie.com](https://www.lasvegashomesbyleslie.com)'s legacy pattern)
- Never use `/locations/[community]-[city]/` (avoid [lasvegasrealestate.com](https://www.lasvegasrealestate.com)'s redundant city suffix pattern)
- Sub-neighborhood URL must be nested under parent master plan URL

### H1 Rules

**One H1 per page. No exceptions.**

**Format:** `[Community Name] Homes for Sale in [City/Area], Nevada`

**Examples:**

| Page Type | H1 |
|---|---|
| Master community | `Summerlin Homes for Sale in Las Vegas, Nevada` |
| Village | `The Ridges Homes for Sale — Summerlin, Las Vegas` |
| Guard-gated luxury | `Southern Highlands Luxury Homes for Sale, Las Vegas Nevada` |
| 55+ | `Sun City Summerlin 55+ Homes for Sale, Las Vegas NV` |
| ZIP code | `Homes for Sale in ZIP Code 89052 — Henderson, Nevada` |
| City hub | `Henderson NV Homes for Sale — All Neighborhoods & Communities` |

**Rules:**
- H1 contains primary keyword (community name + "homes for sale")
- H1 is the only H1; confirmed by Screaming Frog crawl pre-launch
- H1 appears in the visible page body (not hidden or CSS-suppressed)
- Do not repeat H1 text verbatim in the title tag — use variants

### H2/H3 Rules

**H2 minimum:** 6 H2 sections per community page (Overview, Sub-Neighborhoods, Market Stats, Schools, HOA, FAQ). Aim for 8–10 H2 sections on full-depth pages.

**H2 naming convention:** Include the community name in at least 3 of the H2 headings to reinforce topical relevance (e.g., "Schools Serving Summerlin," "HOA Fees in Summerlin," "Frequently Asked Questions About Summerlin").

**H3 usage:** Use H3 for items within an H2 section: each sub-neighborhood, each school tier (Public / Charter / Private), each builder, each park, each FAQ question.

**H4 usage:** Reserve for granular breakdowns within H3 sections — e.g., individual park amenities listed under the park's H3; individual floor plan collections listed under a builder's H3. Do not use H4 as a substitute for H3.

**Never use bold text (`**`) in place of heading tags.** This is the exact failure pattern on [lasvegasrealestate.com](https://www.lasvegasrealestate.com) — bold text provides zero heading hierarchy signals to search engines or AI systems.

### Keyword Strategy

**Three-tier keyword map for every page:**

| Tier | Type | Volume Target | Example (Summerlin) |
|---|---|---|---|
| Primary | Community + "homes for sale" | 1,000–10,000/mo | "summerlin homes for sale" |
| Secondary | Community + "real estate" / "neighborhood" / "living in" | 200–1,000/mo | "summerlin las vegas real estate," "living in summerlin," "summerlin neighborhoods" |
| Long-tail | Specific queries about community attributes | 50–500/mo | "summerlin schools," "summerlin hoa fees," "summerlin zip code," "who built homes in summerlin," "summerlin guard gated communities" |

**Complete Summerlin keyword map:**

| Keyword | Monthly Volume (est.) | Intent | Target Position |
|---|---|---|---|
| summerlin homes for sale | 5,400 | Transactional | #1–3 |
| summerlin las vegas real estate | 1,900 | Transactional | #1–3 |
| summerlin neighborhoods | 880 | Informational | #1–5 |
| living in summerlin las vegas | 480 | Informational | #1–3 (featured snippet) |
| summerlin las vegas zip code | 320 | Informational | #1 (People Also Ask) |
| summerlin hoa fees | 210 | Informational | #1 (People Also Ask) |
| summerlin master planned community | 170 | Informational | #1–3 |
| summerlin golf communities | 140 | Transactional | #1–5 |
| summerlin 55+ communities | 110 | Transactional | #1–5 |
| new construction homes summerlin | 590 | Transactional | #1–5 |

### Internal Linking Rules

**Minimum link requirements per community page:**

| Link Direction | Minimum Count | Anchor Text Rules |
|---|---|---|
| Community page → nearby community pages | 5 | "[Community Name] homes for sale" or "homes in [Community Name]" or "[Community Name] real estate" |
| Community page → parent hub (city or master plan) | 1 | "[City] NV homes for sale" or "[Master Plan] communities" |
| Community page → relevant blog posts | 2 | Descriptive: "Best schools in Summerlin" not "click here" |
| Community page → lifestyle collection pages | 1–3 (where applicable) | "Las Vegas guard-gated communities," "Las Vegas 55+ communities" |
| Blog post → community pages | All mentions | Descriptive anchor matching community name: "Summerlin real estate market," "homes for sale in Summerlin" |
| Hub page → community pages | All communities in hub | "[Community Name]" (short anchor acceptable in hub navigation context) |
| Lifestyle page → qualifying communities | All qualifying | "[Community Name]" + brief qualifier |

**Anchor text rules:**
- Primary pattern: "[Community Name] homes for sale" — use once per page
- Secondary pattern: "[Community Name] real estate" — use once per page
- Natural language: "homes in [Community Name]," "the [Community Name] community," "[Community Name] neighborhood" — use for remaining links
- Never use: "click here," "learn more," "view listings" as standalone anchor text
- Exact-match anchor: no more than 20% of total anchor text across site (per Penguin risk management)
- Match anchor text to the target page's primary keyword

### Image Optimization

**File naming convention:** `[community-name]-[descriptor]-las-vegas-nv.[ext]`

**Examples:**
- `summerlin-aerial-view-las-vegas-nv.webp`
- `the-ridges-guard-gate-entrance-summerlin-nv.webp`
- `southern-highlands-golf-club-las-vegas-nv.webp`
- `skye-canyon-park-northwest-las-vegas-nv.webp`

**Alt text pattern:** `[Descriptor] in [Community Name], [City], Nevada`

**Examples:**
- `alt="Aerial view of Summerlin Las Vegas master-planned community, Nevada"`
- `alt="Guard gate entrance to The Ridges luxury community, Summerlin NV"`

**Format:** WebP for all images (convert from JPG/PNG at upload)  
**Compression target:** < 150KB per image; hero image < 200KB  
**Dimensions:** Hero image 1440×600px; gallery images 800×600px; thumbnail 400×300px  
**Lazy loading:** Enable on all images except the hero (hero loads eagerly for LCP)

### Content Freshness

**Update cadence:**

| Update Type | Frequency | Trigger |
|---|---|---|
| Market stats (median price, active count, DOM) | Monthly | First Monday of each month; pull from Sierra IDX |
| School ratings | Annually | August (new school year); verify GreatSchools ratings |
| HOA fees and management | Semi-annually | January and July; verify with HOA management company |
| Builder availability | Quarterly | Q1, Q2, Q3, Q4; confirm active phases with builder sales offices |
| New parks / amenities opened | As announced | Monitor community HOA newsletters and city parks announcements |
| Major refresh (rewrite) | Annually | Full content audit each October; update all stats, remove stale facts |

**Surface "Last Updated" date:** Display visibly at the top of the market stats section: *"Market data last updated: [Month Year] — sourced from Sierra Interactive / Nevada MLS"*. This is a YMYL trust signal and an AEO freshness signal. [thedhs.com](https://thedhs.com/neighborhoods/southern-highlands) and [neighborhoodsinlasvegas.com](https://neighborhoodsinlasvegas.com/summerlin-west/) demonstrate the competitive advantage of dated-content maintenance.

### Technical Requirements

**Core Web Vitals targets (Google PageSpeed Insights, mobile):**

| Metric | Target | Fail Threshold |
|---|---|---|
| Largest Contentful Paint (LCP) | < 2.5s | > 4.0s |
| Cumulative Layout Shift (CLS) | < 0.1 | > 0.25 |
| Interaction to Next Paint (INP) | < 200ms | > 500ms |
| Total Blocking Time (TBT proxy for FID) | < 200ms | > 600ms |

**Mobile requirements:**
- All tap targets minimum 44×44px
- No horizontal scroll at 375px viewport width
- IDX widget loads and filters on mobile without redirect
- Sticky CTA bar present and dismissable on mobile
- Phone numbers use `tel:` href for one-tap calling

**Crawlability rules:**
- No `noindex` on any community page (confirm in Sierra settings)
- No `disallow` in robots.txt for `/communities/` path
- Canonical tag self-referencing on each community page
- XML sitemap updated within 24 hours of new community page publication
- No JavaScript rendering required for editorial content (IDX widget may be JS; editorial text must be in raw HTML)

**No-follow rules:**
- External links to school websites, Census Bureau, GreatSchools: `rel="nofollow"` (outbound; acceptable to follow for trust signals)
- External links to builder websites, city parks pages: standard `nofollow` per SEO convention
- All internal links: dofollow (no `nofollow` on internal links)

---

## F. AEO / LLM Requirements

### Content Structure for LLM Extraction

LLMs and AI Overviews extract content that is syntactically simple, factually specific, and structurally discrete. The following writing rules maximize the probability that sentences are quoted verbatim by AI systems.

**Rule 1 — Subject-Predicate-Object format:**
Write declarative statements with an explicit subject, a precise verb, and a specific object. Avoid subordinate clauses and hedging language.

- **Do:** "Summerlin spans 22,500 acres along the western rim of the Las Vegas Valley."
- **Avoid:** "There are many aspects of Summerlin that make it a great place, including its size which is quite large."

**Rule 2 — Quantify everything quantifiable:**
Every claim that can include a number must include a number. Year founded, acreage, price range, school rating, HOA fee, golf course yardage, park acreage, pool dimensions, unit count, drive time. Numbers are the single most reliable LLM extraction trigger.

**Rule 3 — Name every named thing:**
Never use "a local school" — name the school. Never "a nearby park" — name the park and give its address. Never "a golf course designed by a famous architect" — name the architect. Named entities are the currency of AEO.

**Rule 4 — "Top N Facts" numbered lists:**
Every community page must include at minimum one section formatted as a numbered list of discrete factual statements. The [isluxury.com](https://isluxury.com) "Top Five Facts" format is the proven model. Label these sections explicitly as "Top [N] Facts About [Community]" or "[Community] by the Numbers" to trigger AI extraction.

**Rule 5 — One claim per sentence:**
Do not stack multiple facts in a single sentence when they are independently citable. "Summerlin has 150+ miles of trails, 200+ parks, 9 golf courses, and 3 shopping centers" is harder for AI to extract cleanly than four separate declarative sentences.

**Rule 6 — Use FAQ structure:**
The FAQ section is not just a UX feature — it is the primary AEO mechanism. Questions must be phrased exactly as users type them into Google, ChatGPT, or Perplexity. Answers must begin with the direct answer in the first sentence.

### FAQ Block Specification

**Minimum 8 FAQ pairs per community page.** All questions in the FAQ section are wrapped in FAQPage JSON-LD schema (see Section H). The accordion/collapsible UI is acceptable; ensure the answer text is in the raw HTML (not JS-rendered after click).

**Standard questions for all Las Vegas community pages:**

| # | Question Template | Answer Format |
|---|---|---|
| Q1 | "What is the average home price in [Community]?" | Lead with median/average price; include price range (entry to luxury); cite Sierra IDX data with month/year |
| Q2 | "What ZIP code is [Community] in?" | State all applicable ZIP codes; if multiple, note which ZIP covers which sub-area |
| Q3 | "What schools serve [Community]?" | Name top 3 public schools (elem/middle/high); include GreatSchools rating for each; note district (CCSD) |
| Q4 | "Is [Community] guard-gated?" | Direct yes/no; if yes, name guard gate locations; if partially gated (some sub-neighborhoods), specify which |
| Q5 | "What are the HOA fees in [Community]?" | State monthly fee range; note master HOA vs. sub-association if applicable; list top 3 amenities included |
| Q6 | "Who built homes in [Community]?" | Name all active and legacy builders; note current availability status; link to IDX new construction search |
| Q7 | "Is [Community] in Las Vegas or Henderson?" | State exact city/jurisdiction; note the distinction between incorporated and unincorporated Clark County areas where applicable |
| Q8 | "What amenities does [Community] offer?" | Structured answer: clubhouse (sq ft), pools (count), courts (tennis/pickleball), trails (mileage), golf (yes/no), fitness center (yes/no) |

**Community-specific additional questions (2–4 per page):**

| Community | Example Additional Question |
|---|---|
| Summerlin | "What are the Summerlin villages?" / "Is Summerlin a good place to live?" |
| Southern Highlands | "Is Southern Highlands guard-gated?" / "What golf course is in Southern Highlands?" |
| The Ridges | "What makes The Ridges so exclusive?" / "Does The Ridges have Bear's Best golf access?" |
| MacDonald Highlands | "What is the DragonRidge Country Club membership cost?" / "What are the custom home sites in MacDonald Highlands?" |
| Skye Canyon | "Is Skye Canyon family-friendly?" / "What builders are building in Skye Canyon?" |
| Sun City Summerlin | "What is the age requirement for Sun City Summerlin?" / "How many golf courses does Sun City Summerlin have?" |
| Lake Las Vegas | "What water activities are available at Lake Las Vegas?" / "Is Lake Las Vegas gated?" |

### Entity Requirements

Every community page must contain a minimum of 40 named entities across the following categories. Entities should appear in body text, not only in structured data.

**Geographic entities (minimum: 5)**
- Community name (all variant forms)
- City (Las Vegas / Henderson / North Las Vegas)
- County (Clark County)
- State (Nevada / NV)
- All applicable ZIP codes
- Adjacent communities (named, for co-location signals)

**Education entities (minimum: 5)**
- Every named public school (elementary, middle, high)
- Every named charter school
- Every named private school
- School district (Clark County School District / CCSD)
- GreatSchools rating (numeric) per school

**Developer/Builder entities (minimum: 3)**
- Original master developer (Howard Hughes Corporation, Del Webb, Century Communities, etc.)
- All active builders by full company name (not abbreviation)
- Architect/planner name where documented

**Amenity entities (minimum: 5)**
- Every named park with full street address
- Every named golf course with designer and yardage
- Clubhouse/recreation center with square footage
- Named pools with seasonal hours/fees
- Named courts (tennis, pickleball) with count

**Demographic entities (minimum: 4)**
- Population (Census ACS, cite year)
- Median age
- Average/median household income
- Total households
- Homeownership rate

**Market entities (minimum: 4)**
- Median list price (current; cite pull date)
- Average price per square foot
- Average days on market
- Active listing count
- Price range (lowest to highest active)

**HOA entities (minimum: 3)**
- HOA name (formal legal name)
- HOA management company name
- Monthly fee (or annual)
- Guard-gated status (explicit yes/no)

### Schema Requirements for AEO

See Section H for exact JSON-LD code templates.

**Schema type → page type mapping:**

| Schema Type | Community Page | Village Page | City Hub | ZIP Page | Lifestyle Page | Blog Post |
|---|---|---|---|---|---|---|
| FAQPage | ✓ REQUIRED | ✓ REQUIRED | ✓ | ✓ | ✓ | ✗ |
| BreadcrumbList | ✓ REQUIRED | ✓ REQUIRED | ✓ REQUIRED | ✓ REQUIRED | ✓ REQUIRED | ✓ REQUIRED |
| Place / Neighborhood | ✓ REQUIRED | ✓ REQUIRED | ✓ | ✓ | ✗ | ✗ |
| RealEstateAgent | ✓ REQUIRED | ✓ REQUIRED | ✓ REQUIRED | ✓ | ✓ | ✓ |
| VideoObject | ✓ (if video) | ✓ (if video) | ✓ (if video) | ✗ | ✓ (if video) | ✓ (if video) |
| Article | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ REQUIRED |

### YMYL Compliance

Community pages are Your Money or Your Life content: a buyer may make a $500,000+ decision based on information on these pages. Google's quality raters hold YMYL pages to a higher E-E-A-T standard.

**Required YMYL disclosures and practices:**

- [ ] All market statistics cite their source (Sierra IDX / Nevada MLS) and pull date
- [ ] School ratings cite GreatSchools.org and the data year
- [ ] Census data cites the U.S. Census Bureau and the specific ACS survey year
- [ ] HOA fees include a disclaimer: *"HOA fees are subject to change. Verify current fees with the HOA management company before purchase."*
- [ ] Price ranges include a disclaimer: *"Market data is for informational purposes and does not constitute a guarantee of value. Contact a licensed Nevada REALTOR® for a current market analysis."*
- [ ] Every page displays the listing agent's name and Nevada RE license number
- [ ] No unverifiable superlatives ("the best neighborhood," "the safest community") without a cited, dated source
- [ ] School quality language: use GreatSchools numerical ratings, not editorial claims like "excellent schools" without data support
- [ ] Include a footer disclosure: *"Nevada Real Estate Group is licensed in the State of Nevada. Information is deemed reliable but not guaranteed."*

---

## G. Internal Linking Architecture

### Hub-and-Spoke Model

The site's internal link architecture operates on four hub levels, each linking downward to spokes, and every spoke linking upward to its hub(s) and laterally to peer spokes.

**Level 1 Hub — City Pages** (`/communities/las-vegas/`, `/communities/henderson/`, `/communities/north-las-vegas/`):
- Each city hub links to every community page within that city (40–80 communities per city hub)
- City hub pages contain 500+ words of crawlable editorial content (not JS-only pagination)
- City hub receives links from: homepage, site-wide nav, and every community page within its jurisdiction

**Level 2 Hub — Master-Planned Community Pillars** (`/communities/summerlin/`, `/communities/inspirada/`):
- Each MPC pillar links to all village/sub-neighborhood pages within that MPC
- Summerlin pillar → all 22+ village pages
- Receives links from: city hub (Las Vegas → Summerlin), and all village pages linking up

**Level 3 Hub — Lifestyle Collection Pages** (`/communities/lifestyle/guard-gated/`, `/communities/lifestyle/golf-communities/`):
- Each lifestyle page links to all qualifying community pages (e.g., guard-gated lifestyle page → 14+ guard-gated communities)
- Every qualifying community page links back to its applicable lifestyle collection page(s)

**Level 4 Spoke — Individual Community Pages:**
- Links up: to city hub, to MPC pillar (if applicable), to lifestyle pages (if applicable)
- Links laterally: to 5–8 nearby/comparable community pages
- Links down: to any village pages nested under it
- Links outward: to 2–3 relevant blog posts

**Level 5 Spoke — Blog Posts:**
- Every blog post that mentions a community by name must contain at least one hyperlinked anchor to that community's page
- Blog posts receive links from: community pages' "Related Resources" sections

### Anchor Text Rules

| Link Direction | Preferred Anchor Text | Avoid |
|---|---|---|
| Community → city hub | "[City] NV homes for sale" | "click here," "view more" |
| Community → MPC pillar | "[Master Plan] communities" | Bare URLs |
| Community → nearby community | "[Community Name] homes for sale" | Duplicate exact-match anchors on same page |
| Community → lifestyle page | "Las Vegas [type] communities" | Generic phrases |
| Community → blog | Descriptive title fragment | "read more," "blog post" |
| Blog → community | "[Community Name] real estate" / "homes in [Community Name]" | Exact-match primary keyword overuse |
| Hub → all spokes | "[Community Name]" (short form acceptable in nav lists) | Generic "neighborhoods" |

**Exact-match usage cap:** No more than 1 exact-match primary keyword anchor (e.g., "Summerlin homes for sale") per linking page. Use natural variants for all other occurrences.

### Breadcrumb Navigation

**Desktop breadcrumb position:** Below primary navigation, above H1.

**City-level community:**
> Home > Communities > Las Vegas > Summerlin

**Village/sub-neighborhood:**
> Home > Communities > Summerlin > The Ridges

**ZIP code page:**
> Home > Communities > ZIP Codes > 89052

**Lifestyle collection page:**
> Home > Communities > Guard-Gated Communities

**All breadcrumbs must be implemented in both visible UI and BreadcrumbList JSON-LD schema** (see Section H). The UI breadcrumb and the JSON-LD breadcrumb must match exactly.

### Cross-Community Navigation

Every community page includes a "Nearby Communities" or "People Who Also Explore" section near the bottom (layout position 23). This section must:

- Include 5–8 community links
- Provide a 1-sentence comparison framing for each link (why a buyer considering [this community] might also consider [that community])
- Group by similarity: price tier, geography, community type

**Summerlin example — Nearby Communities framing:**

> **The Ridges** — For Summerlin buyers seeking a luxury guard-gated enclave with Bear's Best golf, The Ridges offers estate-scale custom homes from $1.2M+. [View The Ridges homes →]
>
> **Red Rock Country Club** — A guard-gated golf community with Arnold Palmer-designed courses and a strong 55+ presence, sharing Summerlin's western location. [View Red Rock CC homes →]
>
> **Skye Canyon** — For buyers who want Summerlin's master-plan feel in the northwest corridor with newer construction and lower entry prices. [View Skye Canyon homes →]

### Blog-to-Community Linking Protocol

Every blog post published on nevadarealestategroup.com that mentions a community name must follow this protocol:

- [ ] First mention of community name: hyperlink to community page with anchor "[Community Name] homes for sale" or "[Community Name] real estate"
- [ ] If blog post covers 3+ communities: each community name hyperlinked on first mention in the post
- [ ] Blog posts covering neighborhood guides, school rankings, market trends, or new construction: mandatory link to all relevant community pages
- [ ] Blog post is retroactively updated when a new community page launches (add link to community in any existing relevant posts)
- [ ] Community pages' "Related Resources" section is updated when a new relevant blog post is published

**Blog content categories requiring community links:**

| Blog Category | Required Community Links |
|---|---|
| Market report (monthly/quarterly) | All communities mentioned in data |
| New construction updates | All communities with new builds |
| School guides | All communities where schools are located |
| Neighborhood comparison ("X vs. Y") | Both communities compared |
| Relocation guide | All communities recommended |
| Lifestyle posts (golf, 55+, luxury) | All communities matching lifestyle tag |

---

## H. Schema Recommendations

**Critical note:** Zero of the 10 audited competitors implement any schema on community pages. Deploying these templates is the single highest-ROI technical action available — it provides immediate AI Overview eligibility and People Also Ask eligibility with no competitive interference.

All JSON-LD goes in a `<script type="application/ld+json">` block in the `<head>` section or immediately before `</body>`. Sierra Interactive allows custom code injection — use this for all schema.

### 1. FAQPage Schema

**Applies to:** All community pages, village pages, city hub pages, lifestyle collection pages, ZIP code pages  
**Placement:** `<head>` — linked to the FAQ section in the page body  
**Validation:** [Google Rich Results Test](https://search.google.com/test/rich-results) → select "FAQ" result type  
**Expected impact:** People Also Ask box appearances, AI Overview sourcing, featured snippet eligibility

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the average home price in Summerlin?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The median home price in Summerlin, Las Vegas is approximately $645,000 as of Q1 2026, based on active MLS listings. Prices range from approximately $350,000 for condominiums and townhomes to over $8 million for custom estate homes in guard-gated villages such as The Ridges and Red Rock Country Club."
      }
    },
    {
      "@type": "Question",
      "name": "What ZIP code is Summerlin in?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Summerlin encompasses multiple ZIP codes including 89134, 89135, 89138, 89144, 89145, 89117, and 89148, depending on the specific village or sub-neighborhood. Summerlin North primarily uses 89134 and 89144; Summerlin South uses 89135 and 89148; Summerlin West uses 89138."
      }
    },
    {
      "@type": "Question",
      "name": "What schools serve Summerlin?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Summerlin is served by the Clark County School District (CCSD). Top-rated public schools include Doral Academy Red Rock (charter, K-12, GreatSchools rating 9/10), Sig Rogich Middle School (6-8), and Palo Verde High School (9-12). Private schools serving Summerlin include The Alexander Dawson School and Faith Lutheran Middle School and High School."
      }
    },
    {
      "@type": "Question",
      "name": "Is Summerlin guard-gated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Summerlin is a master-planned community, not a single guard-gated development. However, several villages within Summerlin are guard-gated, including The Ridges, Red Rock Country Club, The Pueblo, and Siena. The majority of Summerlin's villages are gated (key-fob or access code) without a staffed guard gate."
      }
    },
    {
      "@type": "Question",
      "name": "What are the HOA fees in Summerlin?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Summerlin HOA fees vary by village and sub-association. The master Summerlin HOA (The Summerlin Community Association) charges approximately $60–$80 per month. Individual village HOAs add $100–$600 per month depending on amenities. Guard-gated luxury villages such as The Ridges typically carry combined fees of $500–$1,200 per month."
      }
    },
    {
      "@type": "Question",
      "name": "Who built homes in Summerlin?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Summerlin was master-developed by the Howard Hughes Corporation, which began sales in 1990. Builders who have built or are currently building in Summerlin include Toll Brothers, Pulte Homes, KB Home, Taylor Morrison, Tri Pointe Homes, Richmond American Homes, Lennar, and William Lyon Homes. Custom home builders operate in luxury villages including The Ridges and The Summit Club."
      }
    },
    {
      "@type": "Question",
      "name": "Is Summerlin in Las Vegas or Henderson?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Summerlin is located within the City of Las Vegas and unincorporated Clark County — it is not part of Henderson. The community sits along the western edge of the Las Vegas Valley, adjacent to the Red Rock Canyon National Conservation Area."
      }
    },
    {
      "@type": "Question",
      "name": "What amenities does Summerlin offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Summerlin features over 200 parks, 150+ miles of trails, 9 golf courses (including Bear's Best Las Vegas, Red Rock Country Club, and The Arroyo Golf Club), multiple community recreation centers, and Downtown Summerlin — a 1.6 million square foot retail and entertainment destination. Each village has its own HOA-managed amenities including pools, tennis courts, and clubhouses."
      }
    }
  ]
}
```

### 2. RealEstateAgent Schema

**Applies to:** All community pages, city hubs, lifestyle pages, blog posts  
**Placement:** `<head>`  
**Validation:** Google Rich Results Test → Organization/LocalBusiness  
**Expected impact:** Knowledge panel data, entity disambiguation, E-E-A-T signals for YMYL pages

```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Nevada Real Estate Group",
  "url": "https://nevadarealestategroup.com",
  "logo": "https://nevadarealestategroup.com/assets/images/nevada-real-estate-group-logo.png",
  "image": "https://nevadarealestategroup.com/assets/images/nevada-real-estate-group-team.jpg",
  "description": "Nevada Real Estate Group is a 150+ agent luxury real estate team serving the Las Vegas metro area, including Summerlin, Henderson, Southern Highlands, and all major Las Vegas communities.",
  "telephone": "+17025551234",
  "email": "info@nevadarealestategroup.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Street Address]",
    "addressLocality": "Las Vegas",
    "addressRegion": "NV",
    "postalCode": "[ZIP]",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 36.1699,
    "longitude": -115.1398
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Las Vegas",
      "sameAs": "https://en.wikipedia.org/wiki/Las_Vegas"
    },
    {
      "@type": "City",
      "name": "Henderson",
      "sameAs": "https://en.wikipedia.org/wiki/Henderson,_Nevada"
    },
    {
      "@type": "City",
      "name": "North Las Vegas",
      "sameAs": "https://en.wikipedia.org/wiki/North_Las_Vegas,_Nevada"
    }
  ],
  "priceRange": "$$$",
  "openingHours": "Mo-Su 08:00-20:00",
  "sameAs": [
    "https://www.facebook.com/nevadarealestategroup",
    "https://www.instagram.com/nevadarealestategroup",
    "https://www.linkedin.com/company/nevadarealestategroup"
  ]
}
```

### 3. BreadcrumbList Schema

**Applies to:** Every page on the site  
**Placement:** `<head>` — dynamically generated to match page URL  
**Validation:** Google Rich Results Test → Breadcrumb  
**Expected impact:** Breadcrumb display in SERPs (replaces URL display); cleaner SERP CTR

**Community page (Summerlin example):**

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://nevadarealestategroup.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Communities",
      "item": "https://nevadarealestategroup.com/communities/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Las Vegas",
      "item": "https://nevadarealestategroup.com/communities/las-vegas/"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Summerlin",
      "item": "https://nevadarealestategroup.com/communities/summerlin/"
    }
  ]
}
```

**Village page (The Ridges example):**

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://nevadarealestategroup.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Communities",
      "item": "https://nevadarealestategroup.com/communities/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Summerlin",
      "item": "https://nevadarealestategroup.com/communities/summerlin/"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "The Ridges",
      "item": "https://nevadarealestategroup.com/communities/summerlin/the-ridges/"
    }
  ]
}
```

### 4. Place / Neighborhood Schema

**Applies to:** All community pages and village pages  
**Placement:** `<head>`  
**Validation:** Google Rich Results Test → Place  
**Expected impact:** Local Knowledge Panel contribution; geographic entity disambiguation; AI Overview sourcing for location queries

```json
{
  "@context": "https://schema.org",
  "@type": "Place",
  "name": "Summerlin",
  "description": "Summerlin is a 22,500-acre master-planned community in Las Vegas, Nevada, developed by the Howard Hughes Corporation beginning in 1990. It is located along the western rim of the Las Vegas Valley, adjacent to the Red Rock Canyon National Conservation Area.",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 36.1566,
    "longitude": -115.3264
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Las Vegas",
    "addressRegion": "NV",
    "postalCode": "89135",
    "addressCountry": "US"
  },
  "url": "https://nevadarealestategroup.com/communities/summerlin/",
  "containedInPlace": {
    "@type": "City",
    "name": "Las Vegas",
    "sameAs": "https://en.wikipedia.org/wiki/Las_Vegas"
  },
  "hasMap": "https://maps.google.com/?q=Summerlin,+Las+Vegas,+NV",
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "Golf Courses",
      "value": "9"
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Parks",
      "value": "200+"
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Trails (miles)",
      "value": "150+"
    }
  ]
}
```

### 5. VideoObject Schema

**Applies to:** All community pages with an embedded community tour video  
**Placement:** `<head>` or inline adjacent to video embed  
**Validation:** Google Rich Results Test → Video  
**Expected impact:** Video rich snippets in SERPs; YouTube carousel eligibility; AI Overview video sourcing

```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Summerlin Las Vegas Community Tour — Nevada Real Estate Group",
  "description": "Take a video tour of Summerlin, Las Vegas's premier master-planned community. Explore parks, amenities, villages, and homes for sale in Summerlin with Nevada Real Estate Group.",
  "thumbnailUrl": "https://img.youtube.com/vi/[YOUTUBE_VIDEO_ID]/maxresdefault.jpg",
  "uploadDate": "2025-10-01",
  "duration": "PT5M30S",
  "contentUrl": "https://www.youtube.com/watch?v=[YOUTUBE_VIDEO_ID]",
  "embedUrl": "https://www.youtube.com/embed/[YOUTUBE_VIDEO_ID]",
  "publisher": {
    "@type": "Organization",
    "name": "Nevada Real Estate Group",
    "url": "https://nevadarealestategroup.com"
  }
}
```

### 6. Article Schema (for Blog Posts)

**Applies to:** All blog posts  
**Placement:** `<head>`  
**Validation:** Google Rich Results Test → Article  
**Expected impact:** Article rich results; E-E-A-T author entity signals; AI content attribution

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The Best Schools in Summerlin, Las Vegas: A 2026 Parent's Guide",
  "description": "A complete guide to public, charter, and private schools serving Summerlin, Las Vegas — with GreatSchools ratings, grade levels, and enrollment information.",
  "image": "https://nevadarealestategroup.com/assets/blog/summerlin-schools-guide-2026.webp",
  "author": {
    "@type": "Person",
    "name": "Chris Nevada",
    "url": "https://nevadarealestategroup.com/team/chris-nevada/",
    "jobTitle": "Broker / Team Leader",
    "worksFor": {
      "@type": "Organization",
      "name": "Nevada Real Estate Group"
    }
  },
  "publisher": {
    "@type": "Organization",
    "name": "Nevada Real Estate Group",
    "logo": {
      "@type": "ImageObject",
      "url": "https://nevadarealestategroup.com/assets/images/nevada-real-estate-group-logo.png"
    }
  },
  "datePublished": "2026-01-15",
  "dateModified": "2026-04-01",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://nevadarealestategroup.com/blog/best-schools-summerlin-las-vegas/"
  }
}
```

---

## I. Conversion Architecture

### CTA Placement Strategy

Every community page has five distinct CTA placement zones, each matched to the buyer's mental state at that scroll position.

| CTA Zone | Scroll Position | Buyer State | CTA Function | Priority |
|---|---|---|---|---|
| Zone 1: Hero | Above fold | "Am I in the right place?" | Primary search / browse | REQUIRED |
| Zone 2: Market Stats | After data section | "Can I afford this area?" | Market report request | REQUIRED |
| Zone 3: Schools | After school table | "Is this right for my kids?" | School zone home search | REQUIRED |
| Zone 4: FAQ Close | After FAQ accordion | "I have a specific question" | Direct agent contact | REQUIRED |
| Zone 5: Mobile Sticky Bar | Always visible on mobile | Any scroll position | Search + Call | REQUIRED |
| Zone 6: Footer Bar | Page bottom | "I'm ready to act" | Primary contact | REQUIRED |
| Zone 7: Builder Section | After builder details | "I want new construction" | New construction IDX | RECOMMENDED |

### CTA Copy Templates

Use these exact copy variations — all tested for Las Vegas real estate conversion context.

| # | CTA Copy | Placement Zone | Button Style |
|---|---|---|---|
| 1 | "Search [X] Homes for Sale in [Community]" | Zone 1 (Hero) | Primary button, large |
| 2 | "Get Your Free [Community] Market Report" | Zone 2 (Stats) | Secondary button |
| 3 | "Find Homes Near [School Name]" | Zone 3 (Schools) | Text link + arrow |
| 4 | "Talk to a [Community] Specialist" | Zone 4 (FAQ close) | Primary button |
| 5 | "View Listings" | Zone 5 (Mobile sticky — left) | Full-width left half |
| 6 | "Call Now" | Zone 5 (Mobile sticky — right) | Full-width right half |
| 7 | "Ready to Find Your Home in [Community]?" | Zone 6 (Footer bar) | H3-level CTA headline |
| 8 | "View New Construction in [Community]" | Zone 7 (Builders) | Secondary button |
| 9 | "Compare [Community] to [Nearby Community]" | Nearby Communities section | Text link |
| 10 | "Get [Community] Listing Alerts — Free" | Saved search module | Secondary button |

### Lead Capture Forms

**Zone 1 (Hero) — Minimal friction:**
- Fields: Email only
- Subtext: "Get new listing alerts for [Community] — no spam, unsubscribe anytime"
- Submit: "Get Alerts"
- No gate; sends to Sierra CRM with tag "[Community]-saved-search"

**Zone 2 (Market Stats) — Low friction:**
- Fields: First Name + Email
- Subtext: "We'll email you a free [Community] market report this week"
- Submit: "Send My Report"
- Sends to Sierra CRM with tag "[Community]-market-report-request"

**Zone 4 (FAQ Close) — Full contact form:**
- Fields: First Name / Last Name / Email / Phone / "When are you looking to buy or sell?" (dropdown: 0–3 months / 3–6 months / 6–12 months / Just researching)
- Optional message field
- Submit: "Contact a [Community] Expert"
- Sends to Sierra CRM with all fields; community tag applied automatically

**Progressive profiling rule:** A user who fills Zone 1 (email only) and returns within 7 days sees Zone 2 pre-filled with their name; return within 30 days and Zone 4 is pre-filled. This reduces form friction for repeat visitors without requiring login.

**Gating rules:**
- Live listing access: never gated (IDX is open; gating listings kills organic SEO)
- Market report PDF: lightly gated (name + email)
- Community guide PDF: lightly gated (name + email + phone optional)
- Saved search alerts: name + email only (no phone at this stage)

### Trust Signals

Implement all five trust signals on every community page:

- [ ] **Agent photo + license number:** Community specialist agent photo (headshot, professional), Nevada RE license number (NV S.XXXXX), years in market, and specific community transaction count. License number is both a legal requirement and a YMYL E-E-A-T signal.
- [ ] **Team production stats:** "Nevada Real Estate Group — 150+ Agents | $[X]B+ Total Closed Volume | Clark County's Trusted Real Estate Team Since [Year]" — displayed in the agent credentials block
- [ ] **Community testimonials:** 2 testimonials specific to the community (buyer's first name, last initial, community name in testimonial text, transaction year)
- [ ] **"As seen in" logos:** Las Vegas Review-Journal, Las Vegas Magazine, Luxury Portfolio International, Wall Street Journal (where Nevada RE Group has been featured) — logo bar near agent block
- [ ] **Community specialist badge:** A visual badge element — "Certified [Community] Specialist — Nevada Real Estate Group" — adjacent to agent photo; signals topical expertise

### Engagement Hooks

| Hook | Mechanism | Value to User | Value to Team |
|---|---|---|---|
| Saved search signup | Sierra IDX saved search via email | Automatic new listing alerts for [Community] | Warm drip lead pipeline |
| Market report download | Quarterly PDF delivered by email | [Community] price trends, inventory, DOM data | Email list building; monthly market touch |
| Community guide PDF | Evergreen downloadable guide (schools, HOA, parks, market) | Single reference document for buyer research | Email capture; relocation buyer qualification |
| Relocation guide | Las Vegas metro relocation guide; gated by phone | Complete Las Vegas relocation resource | High-intent lead (relocation = motivated buyer) |

---

## J. What Competitors Usually Miss

Based on the competitive audit of all 10 Las Vegas real estate sites, the following gaps are universal or near-universal across the competitive set. Each represents a direct opportunity to outperform.

| # | What They Miss | Why It Matters | How to Capitalize | Worst Offenders |
|---|---|---|---|---|
| 1 | **Schema markup of any kind on community pages** | FAQPage, Place, BreadcrumbList, and RealEstateAgent schema produce rich results, AI Overview sourcing, and People Also Ask boxes — none are available without schema | Deploy all four schema types on every community page at launch (Section H); validate via Google Rich Results Test | All 10 competitors — 100% miss rate |
| 2 | **Park names with street addresses** | Street-addressed parks are ungenerable by AI content tools; they signal hyperlocal expertise and index as geographic entities | Gather full park address list (city parks database + HOA) for every community; include in body text and Place schema | Only [thedhs.com](https://thedhs.com/neighborhoods/seven-hills) and [neighborhoodsinlasvegas.com](https://neighborhoodsinlasvegas.com/summerlin-west/) do this consistently |
| 3 | **Proper H1/H2/H3 semantic heading structure** | Bold text used in place of heading tags (primary failure on [lasvegasrealestate.com](https://www.lasvegasrealestate.com)) prevents both search engines and AI systems from parsing topical sections | Use strict heading hierarchy per Section E; never substitute bold for heading tags | [lasvegasrealestate.com](https://www.lasvegasrealestate.com) (bold text only); [smithteamlasvegas.com](https://smithteamlasvegas.com) (minimal structure) |
| 4 | **FAQ sections with specific, local answers** | Generic FAQ ("What is a HOA?") provides no competitive advantage; specific FAQ ("What are the HOA fees in Southern Highlands?") captures People Also Ask real estate and positions for AI extraction | Write FAQ answers with specific dollar amounts, specific school names, specific park names — per Section F templates | Most sites — only [lasvegashomesbyleslie.com](https://www.lasvegashomesbyleslie.com/green-valley-homes.php) has functional FAQ; no site has FAQPage schema |
| 5 | **Census Bureau demographic data** | Government-sourced demographic data (population, median age, income, households) is the highest-authority factual anchor available; AI systems cite government data preferentially | Embed Census ACS data on every community page; cite survey year; use [thedhs.com](https://thedhs.com/neighborhoods/southern-highlands)'s implementation as the model | Only [thedhs.com](https://thedhs.com) and [simplyvegasrealestate.com](https://simplyvegasrealestate.com) include Census data |
| 6 | **Current market statistics with a pull date** | Undated market stats destroy YMYL trust; dated stats from a named source (MLS/IDX) are E-E-A-T signals | Pull market stats from Sierra IDX monthly; display pull date visibly; tie to a live IDX widget | Most sites display static price ranges with no date or source attribution |
| 7 | **GreatSchools ratings on school tables** | Ratings convert "schools in [community]" informational queries into leads; specific ratings (9/10 vs. 6/10) help buyers self-qualify by school quality | Add GreatSchools rating and GreatSchools.org citation to every school table; use [thedhs.com](https://thedhs.com/neighborhoods/southern-highlands)'s school table as the model | Only [thedhs.com](https://thedhs.com) includes GreatSchools ratings; [lasvegashomesbyleslie.com](https://www.lasvegashomesbyleslie.com/green-valley-homes.php) names schools without ratings |
| 8 | **Builder names with named home collections** | "Homes built by Pulte" is good; "Pulte Homes Collection V: 4,290–4,815 sq ft, from $850K" is lead-qualifying content that no AI generates | Name every active builder, their named collections, sq footage ranges, and current price tier; link each to an IDX new construction search | Only [neighborhoodsinlasvegas.com](https://neighborhoodsinlasvegas.com/reverence-village/) provides named collection data; most competitors name builders without detail |
| 9 | **Sticky mobile CTA bar** | 65%+ of real estate searches are mobile; a sticky bottom bar with "Search Listings" and "Call Now" is the single highest mobile conversion mechanism | Implement on every community page via Sierra's custom code injection; ensure minimum 44px tap targets | Zero competitors implement sticky mobile CTA bars |
| 10 | **Community-specific testimonials** | Generic "great agent!" testimonials have minimal conversion impact; "[Agent] helped us find the perfect home in Southern Highlands" is locally relevant social proof | Collect and display 2–3 community-specific testimonials per page; tag testimonials by community in CRM | No competitor deploys community-specific testimonials on individual community pages |
| 11 | **Contextual mid-page CTAs tied to content sections** | End-of-page forms capture only the minority who scroll to the bottom; mid-page CTAs tied to the section the buyer is reading convert at 3–5× higher rates | Place contextual CTAs after market stats, after schools, after builders, after HOA sections (per Section I placement strategy) | Only [lasvegashomesbyleslie.com](https://www.lasvegashomesbyleslie.com/green-valley-homes.php) does inline contextual CTAs — the rest use end-of-page forms only |
| 12 | **Properly crawlable hub pages (500+ words)** | JS-rendered or near-empty hub pages cannot be indexed for category-level keywords; a "Las Vegas neighborhoods" hub with 80 words of JS content ranks for nothing | Every hub page requires 500+ words of crawlable editorial content, not just a linked grid of pages | [vegashomesnv.com](https://vegashomesnv.com) Summerlin hub pages are ~80 words; [lasvegasrealestate.com](https://www.lasvegasrealestate.com) hubs are JS-gated |
| 13 | **ZIP code in body text (not just metadata)** | Search engines and AI systems index ZIP codes in body text as geographic entities; ZIP codes in meta tags alone are insufficient | State all applicable ZIP codes in the first two paragraphs of every community page; repeat in FAQ ("What ZIP code is [community] in?") | [greatlasvegashomes.com](https://www.greatlasvegashomes.com) is the only consistent ZIP-in-body site; most competitors omit ZIP codes from editorial content |
| 14 | **Unique, community-specific page templates** | [smithteamlasvegas.com](https://smithteamlasvegas.com)'s catastrophic duplicate content crisis (identical Henderson copy on Mountains Edge, Lake Las Vegas, Queensridge URLs) destroys both SEO and trust | Every community page must have a unique H1, unique meta description, unique editorial content; Sierra's template must inject community-specific variables, not share content blocks | [smithteamlasvegas.com](https://smithteamlasvegas.com) — worst offender; all community URLs serve same content |
| 15 | **Internal linking from community pages to blog posts** | Blog content about a community drives long-tail informational traffic; community pages without blog links lose the opportunity to funnel informational searchers into the transactional experience | Implement "Related Resources" section on every community page (layout position 29); update retroactively as new blog posts publish | No competitor maintains systematic community-page-to-blog linking |
| 16 | **Lifestyle collection pages (55+, golf, guard-gated, etc.)** | Buyers often search by lifestyle type before community name ("Las Vegas guard-gated communities," "Las Vegas 55+ retirement communities") | Build 6+ lifestyle collection pages; cross-link to all qualifying communities; this creates both ranking opportunities and hub-spoke link equity | Only [lasvegashomesbyleslie.com](https://www.lasvegashomesbyleslie.com/summerlin-gated-communities.php) attempts lifestyle collection pages; execution is thin |
| 17 | **"Last Updated" date on market data sections** | Undated content appears stale to both users and Google's freshness algorithm; Google rewards dated, maintained pages on YMYL topics | Display "Market data last updated: [Month Year]" visibly above every market stats section; update every month | [neighborhoodsinlasvegas.com](https://neighborhoodsinlasvegas.com/summerlin-west/) is the only site that dates its content visibly (January 2026 update) |
| 18 | **VideoObject schema on embedded YouTube videos** | YouTube embeds without schema are invisible to Google Rich Results for video; VideoObject schema produces video carousels and rich results in SERPs | Add VideoObject schema to all community tour video embeds (Section H template); link to YouTube channel | [neighborhoodsinlasvegas.com](https://neighborhoodsinlasvegas.com) embeds YouTube videos but deploys no VideoObject schema |
| 19 | **Sub-neighborhood comparison framing** | Buyers comparing nearby communities need explicit help understanding trade-offs; unframed lists of community names drive bounce | Write 1–2 sentences of comparison framing for each of the 5–8 nearby community links (Section G cross-community navigation) | [thedhs.com](https://thedhs.com)'s "More Neighborhoods" section links to 40+ communities but provides no comparison framing |
| 20 | **Relocation-specific content** | Las Vegas receives significant relocation buyer traffic (retirees, remote workers, out-of-state buyers); relocation queries ("best neighborhoods for families moving to Las Vegas") are high-intent | Add a relocation angle to lifestyle narrative sections; create community-specific relocation guide PDFs (Section I engagement hooks); write blog posts targeting "[community] vs. [out-of-state city]" queries | No competitor produces community-specific relocation content |

---

## K. Page-Type Variations

The standard community page template in Sections C, D, and E applies to mid-market master-planned community pages. The following matrix documents required modifications for each page type.

| Element | City Hub Page | Neighborhood (Standard) | Master-Planned Community | Luxury / Guard-Gated | High-Rise / Condo | 55+ Community | Lifestyle Collection | ZIP Code Page |
|---|---|---|---|---|---|---|---|---|
| **H1 Format** | `[City] NV Homes for Sale — All Communities` | `[Community] Homes for Sale in [City], NV` | `[Community] Las Vegas Homes for Sale — [X] Villages` | `[Community] Luxury Homes for Sale, [City] NV` | `[Building/Area] High-Rise Condos for Sale, Las Vegas` | `[Community] 55+ Homes for Sale, Las Vegas NV` | `[Type] Communities in Las Vegas — [X] Neighborhoods` | `Homes for Sale in ZIP Code [ZIP] — [City], NV` |
| **Word Count Target** | 1,200–1,800 | 2,000–3,500 | 2,500–4,000 | 2,500–3,500 | 1,500–2,500 | 2,000–3,000 | 1,800–2,500 | 1,500–2,000 |
| **Unique Sections to Add** | City-wide market overview; sub-region map; top 5 neighborhoods summary | Standard full template | Village navigation index (all sub-communities listed with H3 links); Summerlin Association history | Concierge lifestyle narrative; custom home builder section; developer/architect credits; price per sq ft history | Building-specific amenities (rooftop, concierge, valet, pool deck); floor plan types by view; HOA/condo fee breakdown | Age restriction details (55+? 55/45? 80/20 rule?); social clubs + activity calendar; healthcare proximity table | Qualifying community grid with thumbnail + one-sentence description; criteria explanation ("What makes a community guard-gated?") | Boundary map; community list within ZIP; school district map; average price by home type |
| **Sections to Remove/Shorten** | Remove sub-neighborhood detail (covered by spoke pages); shorten builder section | None; full template | Shorten lifestyle narrative (covered by village pages in depth) | Shorten builder section (custom homes only; less builder variety) | Remove parks section (urban condo buyers less park-focused); shorten HOA to condo fee detail | Shorten builder section if no new construction; expand amenity section for HOA lifestyle | Remove school table (collection page → link to individual community school data); remove individual park addresses | Remove sub-neighborhood section (ZIP may span multiple communities) |
| **Tone Adjustments** | Informational and broad; welcome to the city framing | Community expert; buyer advisory | Authoritative and encyclopedic; Summerlin is the brand | Aspirational and exclusive; Forbes/accolade framing appropriate | Urban and sophisticated; lifestyle-forward | Warm and active-adult-inclusive; social connection emphasis | Comparative and helpful; "find your match" framing | Geographic and data-forward; less editorial |
| **Entity Emphasis** | City entities (population, square miles, city government, major employers, hospitals) | All entity categories per Section F | All villages as named entities; Association governance entities; total trail mileage and park count | Named golf architect; Forbes/accolade citations; specific builder names (Custom, Toll Brothers, Blue Heron); private club membership entities | Building name; developer; year built; floor count; total units; specific amenities (sq ft of terrace/balcony) | Del Webb / builder entity; recreation center names; golf course names; age restriction citation (FHA/HUD housing classification) | Named qualifying communities within collection; criteria entities (guard-gate, age restriction) | ZIP code as primary entity; all contained community names; USPS service area note |
| **Schema Emphasis** | Place (city-level); RealEstateAgent; BreadcrumbList | FAQPage + Place + BreadcrumbList + RealEstateAgent | FAQPage + Place (large geo area) + BreadcrumbList + RealEstateAgent | FAQPage + Place + RealEstateAgent + VideoObject | FAQPage + Place (specific building) + BreadcrumbList | FAQPage + Place + BreadcrumbList; add senior housing disclaimer language in FAQPage answers | CollectionPage-adjacent structure; FAQPage for "What is a guard-gated community?" type queries; BreadcrumbList | Place (ZIP-level) + FAQPage + BreadcrumbList |
| **CTA Emphasis** | "Explore [City] Communities" → hub browse | Balanced: browse + contact | "Explore All [X] Villages" → village index; "Schedule a Summerlin Tour" | "View Private Listings" (exclusive/off-market framing); "Schedule a Private Showing" | "View Available Floors" / "Request Floor Plans" | "Talk to a 55+ Community Specialist" / "See All Active Adult Options" | "Find My Match" → qualification quiz or IDX filter | "Browse [ZIP] Listings" / "What's My [ZIP] Home Worth?" |
| **IDX Filter Defaults** | City/jurisdiction boundary; sort by newest | Community boundary/ZIP; sort by newest | Master plan boundary; all villages; sort by newest | Price min: $800K+; property type: Single Family; guard-gated filter ON | Property type: Condo/High-Rise; floor number filter if available | Property type: Any; 55+ community filter; age restriction verified | Lifestyle-specific filters (golf: course affiliation; guard-gated: HOA gate type) | ZIP code = [ZIP]; all property types; sort by newest |
| **Internal Linking Behavior** | Links DOWN to all community pages within city; links UP to site homepage | Links UP to city hub + MPC pillar; links LATERALLY to 5–8 nearby communities | Links DOWN to all village pages; links UP to city hub | Links UP to city hub + luxury lifestyle page; links LATERALLY to peer luxury communities | Links UP to city hub + high-rise lifestyle page; links to building-specific IDX search | Links UP to city hub + 55+ lifestyle page; links to Sun City, Trilogy, and all qualifying communities | Links DOWN to all qualifying community pages; links UP to site homepage | Links UP to city hub; links DOWN to communities within ZIP; links LATERALLY to adjacent ZIP pages |

---

## L. Publishing QA Checklist

Complete all 65 items before marking a community page as published. Assign a team member as QA owner; they sign off before page goes live.

### 1. Content QA (15 Items)

- [ ] C1. H1 is present, unique to this page, and contains primary keyword (community name + "homes for sale")
- [ ] C2. Word count exceeds 2,000 words (use browser word count tool or SEO plugin; exclude IDX widget text)
- [ ] C3. All named entities are verified: school names match CCSD directory; park names match city/county parks database; builder names match NVCID listings
- [ ] C4. All ZIP codes stated in body text are correct per USPS ZIP lookup for the community address
- [ ] C5. Market statistics include a pull date ("as of [Month Year]") and are sourced from Sierra IDX or Nevada MLS
- [ ] C6. School table is complete: every school within 5-mile radius or primary attendance zone is listed with type, grades, and GreatSchools rating
- [ ] C7. HOA section states guard-gated status explicitly (yes/no; if partial, specifies which sub-areas)
- [ ] C8. HOA fee range is stated with a disclaimer noting fees are subject to change
- [ ] C9. FAQ section has minimum 8 Q&A pairs; every answer leads with a direct, specific answer in the first sentence
- [ ] C10. No first-person pronouns used anywhere in editorial content
- [ ] C11. No unattributed superlatives ("best," "most exclusive") — all superlatives cite a source and date
- [ ] C12. "Last Updated" date is visible in the market stats section
- [ ] C13. Census Bureau data is cited with survey year ("U.S. Census Bureau, ACS 5-Year Estimates, [year]")
- [ ] C14. Nevada Real Estate Group agent license number is displayed on page
- [ ] C15. All price ranges include a YMYL disclaimer ("for informational purposes; contact a licensed Nevada REALTOR® for current market analysis")

### 2. Technical QA (15 Items)

- [ ] T1. URL follows exact taxonomy: `/communities/[community-name]/` or `/communities/[master-plan]/[village]/`
- [ ] T2. Screaming Frog confirms exactly one H1 on the page
- [ ] T3. Title tag is unique, under 60 characters, and contains primary keyword
- [ ] T4. Meta description is unique, 145–155 characters, includes a live stat and soft CTA
- [ ] T5. Canonical tag is self-referencing (`<link rel="canonical" href="https://nevadarealestategroup.com/communities/[community]/" />`)
- [ ] T6. No `noindex` directive in meta robots or X-Robots-Tag header
- [ ] T7. Sierra IDX widget loads and displays listings filtered to this community
- [ ] T8. All JSON-LD schema blocks validated via Google Rich Results Test — zero errors reported
- [ ] T9. FAQPage JSON-LD wraps all 8+ FAQ pairs with matching question/answer text
- [ ] T10. BreadcrumbList JSON-LD matches the visible UI breadcrumb path exactly
- [ ] T11. All images are WebP format, under 150KB, with descriptive filenames and alt text
- [ ] T12. Hero image loads eagerly (no `loading="lazy"` attribute); all other images are lazy-loaded
- [ ] T13. PageSpeed Insights mobile score: LCP < 2.5s, CLS < 0.1, INP < 200ms — screenshot saved
- [ ] T14. XML sitemap updated and includes new community page URL
- [ ] T15. Google Search Console URL Inspection confirms page is indexable and no crawl errors

### 3. SEO QA (10 Items)

- [ ] S1. Primary keyword appears in: H1, title tag, meta description, first paragraph, at least one H2
- [ ] S2. ZIP code appears in body text at least twice (not just metadata)
- [ ] S3. Community name appears in at least 3 H2 headings
- [ ] S4. Minimum 5 internal links to nearby community pages with correct anchor text per Section G rules
- [ ] S5. Minimum 2 internal links to relevant blog posts
- [ ] S6. Minimum 1 internal link to parent hub page (city or master plan)
- [ ] S7. All external links (GreatSchools, Census, city parks) use `rel="nofollow"` attribute
- [ ] S8. No duplicate content: H1, title tag, and meta description are all unique (not shared with any other page)
- [ ] S9. Community page is linked from: city hub page, applicable lifestyle collection pages, minimum 3 nearby community pages in their "Nearby Communities" sections
- [ ] S10. Page added to rank tracking campaign with primary keyword + 3 secondary keywords + 2 long-tails

### 4. AEO QA (10 Items)

- [ ] A1. FAQ section has minimum 8 Q&A pairs; all 8 standard questions from Section F are answered
- [ ] A2. FAQPage JSON-LD is valid and question text in schema exactly matches visible question text on page
- [ ] A3. "Quick Facts" or "Top N Facts" numbered block is present with minimum 5 declarative, quantified facts
- [ ] A4. Every named school has a GreatSchools rating number cited
- [ ] A5. Every named park has a street address
- [ ] A6. Demographic data (population, median age, household income) is present with Census source cited
- [ ] A7. Market stats (median price, DOM, listing count) are present with IDX source and pull date cited
- [ ] A8. All content is in raw HTML — no editorial content requires JavaScript execution to render
- [ ] A9. Subject-predicate-object sentence structure is used throughout (no subordinate-clause-heavy prose in key facts sections)
- [ ] A10. Builder names, HOA name, golf course designer names, and golf course yardage are all in body text

### 5. UX / Mobile QA (10 Items)

- [ ] U1. Page loads and renders correctly on iOS Safari 17+ (test on physical device or BrowserStack)
- [ ] U2. Page loads and renders correctly on Android Chrome (test on physical device or BrowserStack)
- [ ] U3. No horizontal scroll at 375px viewport width
- [ ] U4. All CTA buttons are minimum 44×44px tap target on mobile
- [ ] U5. Sticky mobile CTA bar is present, visible, and has working "View Listings" and "Call Now" links
- [ ] U6. Phone number in CTA uses `tel:` href and dials correctly on tap
- [ ] U7. IDX widget scrolls and filters correctly on mobile without page reload
- [ ] U8. Photo gallery opens in lightbox and swipes correctly on touch devices
- [ ] U9. Breadcrumb navigation is visible and tappable on mobile
- [ ] U10. Lead capture forms submit correctly on mobile and confirm submission with a visible success message

### 6. Conversion QA (5 Items)

- [ ] CV1. Primary hero CTA links to the correct IDX search page filtered to this community
- [ ] CV2. All lead capture forms route to Sierra CRM with the correct community tag applied
- [ ] CV3. Saved search email signup creates a Sierra saved search filtered to this community
- [ ] CV4. Market report download form sends the correct community report PDF (not a generic one)
- [ ] CV5. Google Analytics (or equivalent) event tracking confirms form submissions are firing as conversion events

---

## M. Portfolio-Scale Rollout Plan

### Phase 1: Priority 30 Communities (Weeks 1–12)

Build the 30 highest-search-volume, highest-intent community pages first. These communities represent the broadest SERP surface area and the highest-value buyer segments in the Las Vegas metro.

**Production cadence:** 3 pages per week (12 weeks × 3 = 36; 30 priority + 6 buffer for quality)

**Team required:**
- 1 SEO Strategist (keyword mapping, QA sign-off, schema validation)
- 2 Content Writers (community research, editorial writing, FAQ drafting)
- 1 Data Researcher (school data, park data, HOA data, Census data)
- 1 Web Developer / Sierra CMS Specialist (IDX widget config, schema injection, URL setup)
- 1 Photographer / Videographer (community photography, 1 video per priority community)

**The Priority 30:**

| # | Community Name | City | Search Volume Tier | Community Type |
|---|---|---|---|---|
| 1 | Summerlin | Las Vegas | HIGH | Master-Planned |
| 2 | Henderson (city hub) | Henderson | HIGH | City Hub |
| 3 | Southern Highlands | Las Vegas | HIGH | Luxury/Guard-Gated |
| 4 | Green Valley | Henderson | HIGH | Master-Planned |
| 5 | Summerlin North | Las Vegas | HIGH | MPC Sub-Region |
| 6 | Summerlin South | Las Vegas | HIGH | MPC Sub-Region |
| 7 | Skye Canyon | Las Vegas | HIGH | Master-Planned |
| 8 | Inspirada | Henderson | HIGH | Master-Planned |
| 9 | The Ridges | Las Vegas (Summerlin) | MEDIUM-HIGH | Luxury/Guard-Gated |
| 10 | MacDonald Highlands | Henderson | MEDIUM-HIGH | Luxury/Guard-Gated |
| 11 | Green Valley Ranch | Henderson | MEDIUM-HIGH | Master-Planned |
| 12 | Anthem | Henderson | MEDIUM-HIGH | Master-Planned |
| 13 | Mountain's Edge | Las Vegas | MEDIUM-HIGH | Master-Planned |
| 14 | Lake Las Vegas | Henderson | MEDIUM | Resort/Luxury |
| 15 | Seven Hills | Henderson | MEDIUM | Guard-Gated |
| 16 | Rhodes Ranch | Las Vegas | MEDIUM | Master-Planned/Golf |
| 17 | Red Rock Country Club | Las Vegas (Summerlin) | MEDIUM | Luxury/Golf |
| 18 | Summerlin West | Las Vegas | MEDIUM | MPC Sub-Region |
| 19 | Cadence | Henderson | MEDIUM | Master-Planned |
| 20 | Providence | Las Vegas (NW) | MEDIUM | Master-Planned |
| 21 | Sun City Summerlin | Las Vegas | MEDIUM | 55+ |
| 22 | Anthem Country Club | Henderson | MEDIUM | Luxury/Golf |
| 23 | Centennial Hills | Las Vegas (NW) | MEDIUM | Community Area |
| 24 | Queensridge | Las Vegas | MEDIUM | Luxury/Guard-Gated |
| 25 | Silverado Ranch | Henderson | MEDIUM | Master-Planned |
| 26 | Ascaya | Henderson | LOW-MEDIUM | Luxury/Custom |
| 27 | The Summit Club | Las Vegas (Summerlin) | LOW-MEDIUM | Ultra-Luxury |
| 28 | Reverence | Las Vegas (Summerlin) | LOW-MEDIUM | Guard-Gated |
| 29 | The Lakes | Las Vegas | LOW-MEDIUM | Established Community |
| 30 | Desert Shores | Las Vegas | LOW-MEDIUM | Master-Planned/Lakefront |

### Phase 2: Sub-Neighborhoods & Villages (Weeks 13–24)

**Target:** 50–70 village and sub-neighborhood pages nested under Phase 1 master communities.

**Summerlin villages (22 pages):**
The Arbors, The Canyons, The Cliffs, The Crossing, The Gardens, The Hills, The Hills South, Kestrel Village, The Mesa, The Paseos, The Pueblo, The Ridges (upgrade to full village spec), Siena, The Trails, The Vistas, The Willows, Stonebridge, Redpoint, Reverence (upgrade), Sun City Summerlin (upgrade to 55+ spec), Red Rock CC (upgrade), The Summit Club (upgrade)

**Henderson villages (20+ pages):**
Green Valley Ranch villages, Anthem Country Club, Sun City Anthem, Solera, Aidlin, Heritage, Green Valley South, Silverado Ranch sub-communities, MacDonald Highlands enclaves (Lairmont, Dragon Gate, Glenbrook, Palisades, Stone Mountain Ridge)

**Las Vegas northwest (10+ pages):**
Skye Canyon villages (Eaglepointe, Highpointe, Everton, Parkside), Centennial Hills sub-communities, Providence sub-communities

**Village-level template modifications (vs. standard community template):**
- H1: "[Village Name] Homes for Sale — [Master Plan], Las Vegas"
- Word count target: 1,200–2,000 words (village pages are more focused)
- Breadcrumb: Home > Communities > [Master Plan] > [Village Name]
- Remove demographics section (village-level Census data often unavailable)
- Expand builder section (village pages often have 1–2 builders only — go deep on floor plan names and collection details)
- Add "Back to [Master Plan] Overview" prominent link at top and bottom of page
- Reduce FAQ to 5–6 pairs (village-specific questions)

**Content sourcing strategy for 50+ village pages:**
- HOA management company as primary data source: request the community factsheet/welcome packet
- Builder design center: builder reps will provide named collection data, sq footage, and current pricing
- Clark County/City Parks: parks.clarkcountynv.gov for park addresses and amenities
- Nevada MLS: historical transaction data for price ranges by village
- [neighborhoodsinlasvegas.com](https://neighborhoodsinlasvegas.com/summerlin-west/) Summerlin West as a content quality reference — achieve or exceed this level of detail

### Phase 3: ZIP Codes & Lifestyle Pages (Weeks 25–32)

**ZIP code pages (target: 15–20 pages)**

Prioritize by transaction volume and search interest:

| ZIP Code | City | Communities Contained | Priority |
|---|---|---|---|
| 89135 | Las Vegas | Summerlin South, Downtown Summerlin | HIGH |
| 89052 | Henderson | Green Valley, Seven Hills, Anthem area | HIGH |
| 89138 | Las Vegas | Summerlin West | HIGH |
| 89141 | Las Vegas | Southern Highlands | HIGH |
| 89134 | Las Vegas | Summerlin North, Sun City Summerlin | MEDIUM |
| 89012 | Henderson | Green Valley North | MEDIUM |
| 89074 | Henderson | Green Valley Ranch, Cadence | MEDIUM |
| 89148 | Las Vegas | Summerlin South, Mountain's Edge | MEDIUM |
| 89166 | Las Vegas | Skye Canyon, Providence | MEDIUM |
| 89002 | Henderson | Cadence, Henderson outer areas | MEDIUM |
| 89144 | Las Vegas | Summerlin, Red Rock CC area | MEDIUM |
| 89011 | Henderson | Lake Las Vegas | LOW-MEDIUM |
| 89183 | Las Vegas | Silverado Ranch | LOW-MEDIUM |
| 89113 | Las Vegas | Southwest Las Vegas | LOW-MEDIUM |
| 89117 | Las Vegas | Peccole Ranch, The Lakes area | LOW-MEDIUM |

**Lifestyle collection pages (6 pages; target Weeks 25–28):**

| Page | URL | Communities Linked | Unique Angle |
|---|---|---|---|
| Guard-Gated Communities | `/communities/lifestyle/guard-gated/` | The Ridges, Southern Highlands, MacDonald Highlands, Queensridge, Ascaya, Anthem CC, Red Rock CC, Seven Hills, The Summit Club, Reverence (12–15 total) | Security features, guard staffing hours, HOA governance |
| Golf Communities | `/communities/lifestyle/golf-communities/` | Rhodes Ranch, Red Rock CC, Anthem CC, MacDonald Highlands, Southern Highlands, Seven Hills, Sun City Summerlin, Summerlin (9 courses) | Course designer credits, membership types, tee time access |
| 55+ Active Adult | `/communities/lifestyle/55-plus/` | Sun City Summerlin, Sun City Anthem, Trilogy Summerlin, Solera, Del Webb communities | Age restriction rules, FHA/HUD classification, activity calendars |
| New Construction | `/communities/lifestyle/new-construction/` | Skye Canyon, Inspirada, Cadence, Summerlin West (active phases), Providence, Mountain's Edge (active phases) | Builder incentives, construction timeline, customization options |
| Lakefront / Water Access | `/communities/lifestyle/lakefront/` | Lake Las Vegas, Desert Shores, The Lakes | Water activity types, community boating rules, lakefront premium |
| High-Rise / Condo | `/communities/lifestyle/high-rise/` | One Queensridge Place, Panorama Towers, Turnberry Towers, Veer Towers (near Strip), Martin (downtown) | Floor types, concierge, valet, rooftop amenities, HOA/condo fee structure |

**Cross-linking all lifestyle pages to qualifying communities:**
- Every lifestyle page links to all qualifying communities (already covered in their Pillar 3 hub spoke links)
- Every qualifying community page links back to its lifestyle page(s) (already included in Section G)
- Lifestyle pages appear in site-wide navigation under "Communities" → "Browse by Lifestyle"

### Phase 4: Optimization & Maintenance (Ongoing)

**Quarterly content refresh protocol:**
- [ ] Pull current market stats from Sierra IDX for every community page; update median price, listing count, DOM, price/sq ft
- [ ] Verify GreatSchools ratings (ratings update annually; verify each August)
- [ ] Verify HOA fees with management company or HOA disclosure documentation
- [ ] Check builder availability: confirm active builders, note phase completions, add newly entering builders
- [ ] Update "Last Updated" date on market stats section of every refreshed page
- [ ] Review FAQ answers for accuracy: HOA fees, school ratings, price ranges, builder details
- [ ] Add any new park openings or HOA amenity additions

**Monthly market stats update process:**
- First Monday of each month: SEO Specialist pulls Sierra IDX stats for all community pages
- Update the market stats table and "last updated" date on each page
- No full rewrite required for monthly update — stats section only
- Log update date in community page inventory sheet

**Schema audit cadence:**
- Monthly: Run Google Search Console "Rich Results" report; flag any FAQPage or BreadcrumbList errors
- Quarterly: Re-validate all JSON-LD blocks via Google Rich Results Test; update if Sierra CMS changes affect template output
- Annually: Full schema audit — add new schema types as Google announces new structured data support

**Performance tracking KPIs:**

| KPI | Tool | Tracking Cadence | Success Threshold |
|---|---|---|---|
| Organic rankings (primary keyword per page) | SEMrush / Ahrefs | Weekly | Top 5 for primary keyword within 6 months |
| Organic traffic to community pages | Google Analytics 4 | Monthly | 20%+ MoM growth in first 6 months |
| Lead form submissions per community page | Sierra CRM + GA4 | Monthly | > 5 form submissions per page per month |
| AI citation rate (Perplexity, ChatGPT, Gemini) | Manual spot-check + citation monitoring | Monthly | Community pages cited by name in ≥ 3 AI tools for target queries |
| Rich result appearances (FAQ, Breadcrumb) | Google Search Console Rich Results report | Monthly | FAQPage rich results within 60 days of schema deployment |
| Page speed (LCP, CLS, INP) | PageSpeed Insights | Quarterly | LCP < 2.5s, CLS < 0.1, INP < 200ms on mobile |
| Indexed page count | Google Search Console → Coverage | Weekly | All community pages confirmed indexed within 7 days of launch |
| Bounce rate by community page | GA4 | Monthly | < 55% bounce rate target |
| Scroll depth | GA4 (scroll depth event) | Monthly | ≥ 60% of sessions reach 50%+ scroll depth |

**Content gap identification process (quarterly):**
1. Pull "Queries" report from Google Search Console for each community page URL
2. Identify queries with impressions > 50 and page-position > 10 — these are ranking but not winning
3. Check whether those query topics are covered in the page's content
4. Add missing topics to the next quarterly content refresh queue
5. Check competitor rank changes: if a competitor has moved up for a target community query, audit their page for new content signals and respond

### Production Resources

**Team composition (full Phase 1–3 execution):**

| Role | FTE Equivalent | Responsibilities |
|---|---|---|
| SEO Strategist | 0.5 FTE | Keyword mapping, schema QA, rank tracking, audit reports |
| Community Content Writers | 2.0 FTE | Research, writing, FAQ drafting (3 pages/week rate) |
| Data Researcher | 0.5 FTE | School data, park addresses, HOA data, Census data, market stats |
| Sierra Developer | 0.5 FTE | IDX widget config, JSON-LD injection, URL setup, template modifications |
| Photographer / Videographer | Contract | 1 shoot per community (Phase 1: 30 shoots over 12 weeks) |
| QA Reviewer | 0.25 FTE | Section L checklist sign-off before every page launch |

**Content production timeline per page:**

| Task | Time Estimate |
|---|---|
| Data research (schools, parks, HOA, Census, builders) | 3–4 hours |
| Keyword mapping and content brief | 1 hour |
| First draft (all editorial sections) | 4–6 hours |
| FAQ drafting (8 Q&A pairs) | 1 hour |
| SEO review (title, meta, H-tags, keyword density) | 1 hour |
| Schema drafting (FAQPage, Place, BreadcrumbList) | 1 hour |
| Developer implementation (IDX, schema injection, URL) | 1–2 hours |
| QA checklist (all 65 items) | 1.5 hours |
| Photo selection and image optimization | 1 hour |
| **Total per page** | **~15–18 hours** |

**Tools required:**

| Tool Category | Recommended Tool | Purpose |
|---|---|---|
| CMS / IDX | Sierra Interactive | Content management, IDX widget, CRM integration |
| Keyword research | Ahrefs or SEMrush | Search volume, keyword difficulty, competitor gap analysis |
| Rank tracking | Ahrefs Rank Tracker or SEMrush Position Tracking | Weekly primary + secondary keyword ranking monitoring |
| Schema generation | Schema Markup Generator (technicalseo.com) or manual JSON-LD | Draft and validate JSON-LD before deployment |
| Schema validation | Google Rich Results Test | Post-deployment schema validation |
| Crawling & QA | Screaming Frog SEO Spider | H1/H2 audit, duplicate content check, meta tag audit |
| Page speed | Google PageSpeed Insights / Lighthouse | Core Web Vitals monitoring |
| Image optimization | Squoosh.app or Sharp CLI | WebP conversion, compression to < 150KB |
| Content performance | Google Analytics 4 + Google Search Console | Traffic, engagement, conversion, impression tracking |
| Citation monitoring | Mention.com or manual Perplexity/ChatGPT spot-checks | AI citation rate tracking |
| Photography | Professional real estate photographer | Community aerials, signage, amenities, streetscapes |

---

## Final Summary

### The Single Best Community Page Layout

Condensed reference version of Section D — the exact top-to-bottom layout for a standard community page:

1. Primary nav + breadcrumb (Home > Communities > [City] > [Community])
2. **[H1]** Community Name Homes for Sale in [City], Nevada
3. Hero image (aerial or entrance; WebP; eager load) + 3-stat callout row (Active Listings / Median Price / Avg DOM)
4. Primary CTA: "Search [X] Homes in [Community]" button
5. Quick Facts Bar: ZIP(s) | Type | Price Range | Guard-Gated Y/N | Est. Year
6. Sierra IDX listings widget (6 listing cards; "View All" link)
7. **[H2]** Community Overview — 200–300 words; founding year, developer, acreage, position
8. Quick Facts Block — 5–8 numbered declarative facts (schema-eligible)
9. **[H2]** Sub-Neighborhoods — H3 per sub-community; card layout; IDX links
10. Contextual CTA: "Browse All [Community] Sub-Neighborhoods"
11. **[H2]** Market Statistics — data table; median price, price/sqft, DOM, listing count; "Last Updated [Month Year]"
12. Contextual CTA: "Get Your Free [Community] Market Report"
13. **[H2]** Lifestyle in [Community] — 200–300 words; named venues, daily life framing
14. **[H2]** Parks & Recreation — H3 per park; name + address + amenities + hours
15. **[H2]** Golf & Country Club (golf communities only) — H3 per course; designer, yardage, membership
16. **[H2]** HOA in [Community] — 2-column: fees + included amenities; guard-gate status
17. **[H2]** Schools Serving [Community] — HTML table; name, type, grades, GreatSchools rating
18. Contextual CTA: "Find Homes Near [Top-Rated School Name]"
19. **[H2]** Builders in [Community] — H3 per builder; collections, sq ft, price range, IDX link
20. **[H2]** Demographics — Census ACS table; population, median age, income, households
21. **[H2]** Location & Commute — drive-time table to Strip, Airport, Red Rock, hospitals
22. Agent credentials block — photo, license #, community sales stat
23. Community testimonials — 2 community-specific testimonials
24. **[H2]** Frequently Asked Questions — 8+ Q&A pairs; FAQPage JSON-LD
25. Closing CTA: "Talk to a [Community] Specialist" — full 5-field lead form
26. **[H2]** Nearby Communities — 5–8 linked communities; comparison framing per link
27. Google Map embed — community-centered; boundary visible
28. Photo gallery — 4–8 WebP images; lightbox; captioned
29. YouTube community tour embed (if available) + VideoObject schema
30. **[H2]** Related Resources — 3–5 blog post links; descriptive anchor text
31. Footer CTA bar — team headline + phone + email + "Search Now" button
32. Sticky mobile CTA bar — "View Listings" left / "Call Now" right

---

### The 20 Most Important Must-Have Elements

1. **FAQPage JSON-LD schema** on every community page — zero competitors have it; deploys within hours; produces People Also Ask and AI Overview eligibility immediately.
2. **Place/Neighborhood JSON-LD schema** with geo coordinates — entity-disambiguates the community for AI systems and contributes to Google Knowledge Panel data.
3. **Street addresses for every named park** — ungenerable by AI content tools; the most powerful hyperlocal AEO signal available.
4. **GreatSchools ratings in the school table** — the specific numerical rating (not just school names) converts informational school queries into leads.
5. **Census Bureau demographic data with ACS survey year cited** — government-sourced primary data that AI systems cite preferentially; builds YMYL trust.
6. **Numbered "Quick Facts" block** with 5–8 declarative, quantified statements — the single most LLM-extractable content format per [isluxury.com](https://isluxury.com)'s proven "Top Five Facts" approach.
7. **Proper H1/H2/H3 semantic heading hierarchy** — never substitute bold text for heading tags; heading structure is how both search engines and AI systems parse topical sections.
8. **Minimum 8 FAQ pairs** with answers leading with specific data (dollar amounts, percentages, named entities, ZIP codes) — captures every "People Also Ask" real estate query variant.
9. **ZIP code(s) stated in body text** (not just metadata) — ZIP codes in editorial copy are geographic entity signals indexed by both Google and AI systems.
10. **Builder names with named home collections and sq footage ranges** — moves builder content from generic (builder names only) to lead-qualifying (Pulte Collection V: 4,290–4,815 sq ft).
11. **Sierra IDX widget filtered to community boundaries** — live listings are the #1 engagement signal and the primary transactional conversion mechanism.
12. **Sticky mobile CTA bar** with "View Listings" and "Call Now" — zero competitors have this; 65%+ of real estate searches are mobile; this is the highest-leverage mobile conversion mechanism available.
13. **Contextual mid-page CTAs** tied to content section (after market stats, after schools, after builders) — converts at 3–5× the rate of end-of-page forms.
14. **"Last Updated" date on market stats** — YMYL trust signal; Google freshness algorithm signal; differentiates from stale competitor content.
15. **BreadcrumbList JSON-LD** matching the visible breadcrumb UI — produces breadcrumb SERP display; contributes to topical hierarchy signals.
16. **Community-specific testimonials** (buyer's community name in testimonial text) — the only testimonials that convert at community pages; zero competitors use this approach.
17. **Unique editorial content per page** — never use shared template copy blocks across communities; duplicate content is catastrophic (see [smithteamlasvegas.com](https://smithteamlasvegas.com)'s 0/10 query performance).
18. **Hub page minimum 500 words of crawlable content** — city and master-plan hub pages must have substantive editorial content; JS-only grids do not rank.
19. **Internal links from every community page to 5+ nearby communities** — lateral linking concentrates topical authority in the community content silo; anchor text must follow Section G rules.
20. **RealEstateAgent JSON-LD on every page** — entity-establishes Nevada Real Estate Group as the author and local authority for every community page; E-E-A-T signal for YMYL pages.

---

### The 10 Biggest Mistakes to Avoid

1. **Using bold text instead of heading tags for section titles.**  
   *Consequence:* Search engines and AI systems cannot parse the page's topical structure; section keywords receive no heading hierarchy weight. *Demonstrated by:* [lasvegasrealestate.com](https://www.lasvegasrealestate.com), which uses bold text throughout and ranks for zero of 10 test queries despite holding the most valuable domain in Las Vegas real estate.

2. **Deploying duplicate content across multiple community URLs.**  
   *Consequence:* Google treats the duplicated pages as a single document; none ranks competitively; the brand loses trust with both search engines and users who notice identical content. *Demonstrated by:* [smithteamlasvegas.com](https://smithteamlasvegas.com), where Mountains Edge, Lake Las Vegas, Southern Highlands, and Queensridge URLs all render the same Henderson editorial block — producing 0/10 query appearances for a team with $1B+ in closed transactions.

3. **Rendering editorial content via JavaScript.**  
   *Consequence:* Googlebot may not execute JavaScript on all crawl passes; AI extractors cannot access JS-rendered text; content is effectively invisible to search and AI systems. *Demonstrated by:* [lasvegasrealestate.com](https://www.lasvegasrealestate.com) — the premium exact-match domain produces zero organic traffic for community queries.

4. **Publishing hub pages with fewer than 200 words of content.**  
   *Consequence:* Category-level keywords ("Las Vegas master planned communities," "Summerlin neighborhoods") are uncompetitive; the hub page cannot pass topical authority to its spokes. *Demonstrated by:* [vegashomesnv.com](https://vegashomesnv.com) Summerlin hub pages (~80 words); [simplyvegasrealestate.com](https://simplyvegasrealestate.com) hub with plain-text bullet list of neighborhoods.

5. **Omitting FAQ sections (or writing generic FAQ answers without specific data).**  
   *Consequence:* Missing People Also Ask appearances; missing AI Overview sourcing; the page cannot compete for informational "what is the HOA fee in..." query variants. *Demonstrated by:* [greatlasvegashomes.com](https://www.greatlasvegashomes.com), [vegashomesnv.com](https://vegashomesnv.com), [simplyvegasrealestate.com](https://simplyvegasrealestate.com) — none have FAQ sections despite content that is trivially FAQ-ready.

6. **Deploying no structured data (schema markup) on community pages.**  
   *Consequence:* Zero eligibility for rich results (FAQPage accordions, breadcrumbs, video carousels); zero AEO structured-data signals; the page relies entirely on crawled text for AI sourcing when schema-wrapped competitors (once they exist) will dominate every structured result type. *Demonstrated by:* All 10 audited competitors — 100% schema absence rate.

7. **Using undated or unsourced market statistics.**  
   *Consequence:* YMYL trust failure; Google's quality raters may downgrade pages with unsourced real estate claims; buyers distrust price ranges with no currency date; AI systems cannot cite data without a source. *Demonstrated by:* Most competitors state price ranges with no date or source, including [lasvegasrealestate.com](https://www.lasvegasrealestate.com) (Forbes citation from 2003) and [greatlasvegashomes.com](https://www.greatlasvegashomes.com).

8. **Naming schools without GreatSchools ratings or specific test score data.**  
   *Consequence:* The school section becomes a list that any AI can generate without local expertise; buyers cannot self-qualify by school quality; the page misses "People Also Ask" for "[school name] rating" queries. *Demonstrated by:* [lasvegashomesbyleslie.com](https://www.lasvegashomesbyleslie.com/green-valley-homes.php) names 29 schools on the Green Valley page but provides no ratings — significant missed AEO opportunity.

9. **Placing lead capture forms only at the bottom of the page.**  
   *Consequence:* Forms capture only the minority of users who scroll to the end; buyers at peak content engagement (mid-page, reading market stats or schools) have no conversion mechanism. *Demonstrated by:* [hendersonvegas.com](https://hendersonvegas.com), [greatlasvegashomes.com](https://www.greatlasvegashomes.com) — end-of-page form only, no mid-content CTAs.

10. **Building community pages without internal links from hub pages, lifestyle pages, and blog posts.**  
    *Consequence:* Orphaned or weakly linked pages accumulate no internal PageRank; topical authority cannot concentrate in the community content silo; the community page is indexed but not elevated. *Demonstrated by:* No competitor maintains a systematic community-page-to-blog and blog-to-community-page internal linking protocol — this is entirely uncontested territory.

---

*Document prepared for Nevada Real Estate Group ([nevadarealestategroup.com](https://nevadarealestategroup.com)). Competitive references sourced from the Las Vegas Real Estate Community Pages Competitive Audit (April 2026). All competitor URLs cited as found during the research window; rankings and content may change. This specification is the confidential strategic property of Nevada Real Estate Group.*
