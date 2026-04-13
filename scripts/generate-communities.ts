/**
 * Community Page Generator
 *
 * Reads community-data.json and generates:
 * - app/(site)/[slug]/page.tsx — full community page
 * - components/[Name]Map.tsx — Mapbox map component
 * - components/[Name]MapWrapper.tsx — SSR wrapper
 *
 * Uses the Summerlin page as the template.
 *
 * Usage: npx tsx scripts/generate-communities.ts
 *
 * Options:
 *   --slug=henderson  Generate only one community
 *   --dry-run         Show what would be generated without writing files
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

interface CommunityData {
  slug: string
  name: string
  parentCommunity?: string
  city: string
  state: string
  type: string
  zipCodes: string[]
  center: [number, number]
  heroEyebrow: string
  priceRange: string
  established: string
  developer: string
  acreage: string
  homeCount: string
  guardGated: boolean
  hoaRange: string
  overview: string[]
  highlights: Array<{ title: string; body: string; iconType: string }>
  neighborhoods: Array<{ name: string; type: string; desc: string; price: string }>
  parks: Array<{ name: string; address: string; acreage: string; amenities: string[] }>
  schools: {
    Public: Array<[string, string, string]>
    Private: Array<[string, string, string]>
    Charter: Array<[string, string, string]>
  }
  builders?: Array<{ name: string; collections: string[]; sqft: string; price: string; note: string }>
  demographics: { population: string; medianAge: string; avgIncome: string; households: string; homeownership: string }
  driveTimes: Array<{ time: string; destination: string; route: string }>
  faqs: Array<{ q: string; a: string }>
  nearby: Array<{ name: string; href: string; price: string; compare: string }>
  testimonials: Array<{ quote: string; name: string; detail: string }>
  ylopoCity: string
  ylopoKeywords: string
  ylopoMinPrice: number
  pageType?: 'community' | 'hub' | 'lifestyle'
}

const ICON_SVG: Record<string, string> = {
  mountain: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg>',
  school: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z"/></svg>',
  building: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg>',
  park: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg>',
  golf: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg>',
  trend: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
  shield: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  home: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
}

function pascalCase(str: string): string {
  return str.split(/[-\s]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')
}

function generatePageTsx(c: CommunityData): string {
  const componentName = pascalCase(c.slug) + 'Page'
  const faqComponent = pascalCase(c.slug) + 'FAQ'
  const mapWrapper = pascalCase(c.slug) + 'MapWrapper'
  const hasBuilders = c.builders && c.builders.length > 0

  return `import ${faqComponent} from '@/components/${faqComponent}'
import Link from 'next/link'
import type { Metadata } from 'next'
import ${mapWrapper} from '@/components/${mapWrapper}'
import PortableText from '@/components/PortableText'
import { getCommunityPage } from '@/sanity/queries'
import { mergeQuickStats, mergeDriveTimes, getSectionImageUrl } from '@/lib/community-utils'
import { getMarketStats } from '@/lib/market-stats'

export const revalidate = 60

const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.lasvegashomesearchexperts.com/' },
    { '@type': 'ListItem', position: 2, name: 'Communities', item: 'https://www.lasvegashomesearchexperts.com/communities' },
    { '@type': 'ListItem', position: 3, name: '${c.name}', item: 'https://www.lasvegashomesearchexperts.com/${c.slug}/' },
  ],
}

const FAQ_DATA = ${JSON.stringify(c.faqs, null, 2)}

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_DATA.map((faq: any) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
}

const PLACE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Place',
  name: '${c.name}',
  description: '${c.name} is a ${c.type.toLowerCase()} community in ${c.city}, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: ${c.center[1]}, longitude: ${c.center[0]} },
  address: { '@type': 'PostalAddress', addressLocality: '${c.city}', addressRegion: 'NV', postalCode: '${c.zipCodes[0]}', addressCountry: 'US' },
  containedInPlace: { '@type': 'City', name: '${c.city}' },
}

const AGENT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Nevada Real Estate Group',
  url: 'https://www.nevadarealestategroup.com',
  telephone: '+17252399950',
  email: 'info@nevadagroup.com',
  address: { '@type': 'PostalAddress', streetAddress: '8945 W Russell Rd #170', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89148', addressCountry: 'US' },
  priceRange: '$$$',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', bestRating: '5', worstRating: '1', ratingCount: '2560', reviewCount: '2560' },
}

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('${c.slug}')
  return {
    title: cms?.metaTitle ?? '${c.name} Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse ${c.name} homes for sale in ${c.city}, NV. ${c.priceRange}. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function ${componentName}() {
  const cms = await getCommunityPage('${c.slug}')
  const market = getMarketStats('${c.slug}')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? '${c.name}'
  const heroSubtitle = 'Homes for Sale in ${c.city}, Nevada'
  const overviewTitle = cms?.overviewTitle ?? '${c.name}: ${c.type.split(' \\u00B7 ')[0]} Living in ${c.city}'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '${c.established}'],
    ['Developer', '${c.developer}'],
    ['Total Acreage', '${c.acreage}'],
    ['Homes', '${c.homeCount}'],
    ['Median Home Price', ms?.medianSalePrice ?? '${c.priceRange.split('\\u2013')[0]}'],
    ['ZIP Codes', '${c.zipCodes.join(', ')}'],
    ['Guard-Gated', '${c.guardGated ? 'Yes' : 'No'}'],
    ['HOA', '${c.hoaRange}'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = ${JSON.stringify(c.driveTimes, null, 4)}
  const displayDriveTimes = mergeDriveTimes(HARDCODED_DRIVE_TIMES, cms?.quickStats)

  const qs = (key: string, fallback: string) =>
    cms?.quickStats?.find((s) => s.key.toLowerCase() === key.toLowerCase())?.value ?? fallback

  return (
    <main>
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">&rsaquo;</span>
          <a href="/communities/">Communities</a>
          <span className="breadcrumb-sep">&rsaquo;</span>
          <span>${c.name}</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-v2-content">
          <div className="container">
            <h1 className="hero-v2-h1">
              <span className="hero-v2-community">{heroHeadline}</span>
              <span className="hero-v2-subtitle">{heroSubtitle}</span>
            </h1>
            <div className="hero-v2-stats">
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.newListings ?? qs('Active Listings', '100+')}</span>
                <span className="hero-v2-stat-lbl">New Listings</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '${c.priceRange.split('\\u2013')[0]}')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in ${c.name}</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> ${c.zipCodes.join(', ')}</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> ${c.type}</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> ${c.priceRange}</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> ${c.hoaRange}</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. ${c.established}</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>${c.name} Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['${c.demographics.population}', 'Population'],
              ['${c.demographics.medianAge}', 'Median Age'],
              ['${c.demographics.avgIncome}', 'Avg Household Income'],
              ['${c.demographics.households}', 'Total Households'],
              ['${c.demographics.homeownership}', 'Homeownership Rate'],
            ].map(([value, label]) => (
              <div className="demo-stat" key={label}>
                <div className="demo-value">{value}</div>
                <div className="demo-label">{label}</div>
              </div>
            ))}
          </div>
          <p className="demo-citation">Source: U.S. Census Bureau, American Community Survey 2022 5-Year Estimates.</p>
        </div>
      </section>

      <section id="map" style={{ padding: '64px 0 0', background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="section-label">Location</span>
            <h2>Where is ${c.name}?</h2>
            <p>${c.heroEyebrow} &mdash; ${c.city}, Nevada.</p>
          </div>
          <div className="map-container">
            <${mapWrapper} />
          </div>
          <div className="drive-time-grid">
            {displayDriveTimes.map(({ time, destination, route }: any) => (
              <div key={destination} className="drive-time-card">
                <div className="drive-time-time">{time}</div>
                <div className="drive-time-label">{destination}</div>
                <div className="drive-time-route">{route}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="listings">
        <div className="container">
          <div className="section-header">
            <h2 className="listings-title">NEW ${c.name.toUpperCase()} LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='${JSON.stringify({ propertyTypes: ["house","condo","townhouse"], minPrice: c.ylopoMinPrice, locations: [{ city: c.ylopoCity, state: "NV" }], limit: 12, sortBy: "listDate", sortOrder: "desc", keywords: c.ylopoKeywords, zipCodes: c.zipCodes })}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=${encodeURIComponent(c.ylopoCity)}&s[locations][0][state]=NV&s[keywords]=${encodeURIComponent(c.ylopoKeywords)}" target="_blank" rel="noopener noreferrer" className="btn-gold">View All ${c.name} Listings &rarr;</a>
            <Link href="/communities/" className="btn-outline">&larr; Back to All Communities</Link>
          </div>
        </div>
      </section>

      <section id="overview">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-text">
              <span className="section-label">Community Overview</span>
              <div className="gold-rule" />
              <h2>{overviewTitle}</h2>
              {cms?.overviewBody?.length ? (
                <PortableText value={cms.overviewBody} />
              ) : (
                <>${c.overview.map((p, i) => `
                  <p>${p}</p>`).join('')}
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>${c.name} At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={\`fact-value\${cls ? ' ' + cls : ''}\`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore ${c.name}? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why ${c.name}</span>
            <h2>What Makes ${c.name} Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
${c.highlights.map(h => `              { title: '${h.title.replace(/'/g, "\\'")}', body: '${h.body.replace(/'/g, "\\'")}', icon: ${ICON_SVG[h.iconType] || ICON_SVG.home} },`).join('\n')}
            ].map((h: any) => (
              <div className="highlight-card" key={h.title}>
                <div className="highlight-icon">{h.icon}</div>
                <h3>{h.title}</h3>
                <p>{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <${faqComponent} />

      <section id="nearby" className="nearby-v2">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Comparisons</span>
            <h2>Nearby Communities to Consider</h2>
          </div>
          <div className="nearby-v2-table">
            <div className="nearby-v2-header">
              <span>Community</span>
              <span>Starting Price</span>
              <span>Why Consider</span>
              <span></span>
            </div>
            {[
${c.nearby.map(n => `              { name: '${n.name.replace(/'/g, "\\'")}', href: '${n.href}', price: '${n.price}', compare: '${n.compare.replace(/'/g, "\\'")}' },`).join('\n')}
            ].map((n: any) => (
              <a href={n.href} key={n.name} className="nearby-v2-row">
                <span className="nearby-v2-name">{n.name}</span>
                <span className="nearby-v2-price">{n.price}</span>
                <span className="nearby-v2-compare">{n.compare}</span>
                <span className="nearby-v2-arrow">&rarr;</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="cta-v2">
        <div className="container">
          <div className="cta-v2-inner">
            <div className="cta-v2-content">
              <h2>Ready to Find Your ${c.name} Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in ${c.name}, let&apos;s talk.</p>
              <div className="cta-v2-agent">
                Chris Nevada &middot; S.181401<br />
                Owner, Nevada Real Estate Group - LPT Realty<br />
                8945 W Russell Rd, Suite 170, Las Vegas, NV 89148<br />
                <a href="mailto:Info@NevadaGroup.com" className="cta-v2-agent-email">Info@NevadaGroup.com</a>
              </div>
              <div className="cta-v2-actions">
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
            <div className="cta-v2-form">
              <h3>Or Send Us a Message</h3>
              <form action="https://formsubmit.co/info@nevadagroup.com" method="POST">
                <input type="hidden" name="_subject" value="${c.name} Inquiry — LasVegasHomeSearchExperts.com" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="text" name="name" placeholder="Your Name" required className="cta-v2-input" />
                <input type="email" name="email" placeholder="Email Address" required className="cta-v2-input" />
                <input type="tel" name="phone" placeholder="Phone Number" className="cta-v2-input" />
                <textarea name="message" placeholder="Tell us what you&apos;re looking for" rows={3} className="cta-v2-input cta-v2-textarea" />
                <button type="submit" className="btn-gold cta-v2-submit">Get in Touch</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PLACE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(AGENT_SCHEMA) }} />
    </main>
  )
}
`
}

function generateFAQ(c: CommunityData): string {
  const componentName = pascalCase(c.slug) + 'FAQ'
  return `'use client'
import { useState } from 'react'

const FAQS = ${JSON.stringify(c.faqs, null, 2)}

export default function ${componentName}() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About ${c.name}</h2>
          <p>The questions buyers ask most when exploring ${c.name}.</p>
        </div>
        <div className="faq-list">
          {FAQS.map((faq: any, i: number) => (
            <div key={i} className={\`faq-item\${open === i ? ' open' : ''}\`}>
              <button className="faq-btn" onClick={() => setOpen(open === i ? null : i)}>
                <span className="faq-question">{faq.q}</span>
                <svg className="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </button>
              <div className="faq-answer">{faq.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
`
}

function generateMap(c: CommunityData): string {
  const componentName = pascalCase(c.slug) + 'Map'
  return `'use client'
import { useEffect, useRef } from 'react'

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ''
const CENTER: [number, number] = [${c.center[0]}, ${c.center[1]}]

export default function ${componentName}() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return
    let map: any
    const init = async () => {
      const mapboxgl = (await import('mapbox-gl')).default
      await import('mapbox-gl/dist/mapbox-gl.css')
      mapboxgl.accessToken = TOKEN
      map = new mapboxgl.Map({
        container: containerRef.current!,
        style: 'mapbox://styles/mapbox/light-v11',
        center: CENTER,
        zoom: 13,
        attributionControl: false,
        pitchWithRotate: false,
        dragRotate: false,
      })
      mapRef.current = map
      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')
      map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right')

      map.on('load', () => {
        map.addLayer({
          id: 'dim-overlay',
          type: 'background',
          paint: { 'background-color': '#1B2A4A', 'background-opacity': 0.25 },
        })
        const el = document.createElement('div')
        el.style.cssText = 'width: 14px; height: 14px; background: #C9A96E; border: 2px solid #fff; border-radius: 50%; box-shadow: 0 0 12px rgba(27,42,74,0.4);'
        new mapboxgl.Marker({ element: el })
          .setLngLat(CENTER)
          .setPopup(
            new mapboxgl.Popup({ offset: 16, className: 'summerlin-popup' })
              .setHTML('<div style="font-family:DM Sans,sans-serif;font-size:13px;font-weight:600;color:#0F0F0F;">${c.name}</div><div style="font-size:11px;color:#555;margin-top:2px;">${c.city}, NV</div>')
          )
          .addTo(map)
      })
    }
    init()
    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null } }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%', borderRadius: 'inherit' }} />
      <div style={{
        position: 'absolute', bottom: '40px', left: '16px',
        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)',
        border: '1px solid #EDE9E3', borderRadius: '4px', padding: '8px 12px', pointerEvents: 'none',
      }}>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1B2A4A', fontFamily: 'DM Sans,sans-serif' }}>
          ${c.name}
        </div>
        <div style={{ fontSize: '11px', color: '#6B6B6B', marginTop: '2px', fontFamily: 'DM Sans,sans-serif' }}>
          ${c.city}, Nevada${c.acreage ? ' · ' + c.acreage : ''}
        </div>
      </div>
    </div>
  )
}
`
}

function generateMapWrapper(c: CommunityData): string {
  const mapName = pascalCase(c.slug) + 'Map'
  const wrapperName = mapName + 'Wrapper'
  return `'use client'
import dynamic from 'next/dynamic'

const ${mapName} = dynamic(() => import('./${mapName}'), { ssr: false })

export default function ${wrapperName}() {
  return <${mapName} />
}
`
}

// ─── Main ────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2)
const slugFilter = args.find(a => a.startsWith('--slug='))?.split('=')[1]
const dryRun = args.includes('--dry-run')

const dataPath = join(process.cwd(), 'scripts', 'community-data.json')
if (!existsSync(dataPath)) {
  console.error('community-data.json not found. Create it first.')
  process.exit(1)
}

const communities: CommunityData[] = JSON.parse(readFileSync(dataPath, 'utf-8'))
const filtered = slugFilter ? communities.filter(c => c.slug === slugFilter) : communities

console.log(`Generating ${filtered.length} community pages...`)

for (const c of filtered) {
  if (c.pageType === 'hub' || c.pageType === 'lifestyle') {
    console.log(`  Skipping hub/lifestyle page: ${c.slug} (requires custom template)`)
    continue
  }

  const pageDir = join(process.cwd(), 'app', '(site)', c.slug)
  const pagePath = join(pageDir, 'page.tsx')
  const faqPath = join(process.cwd(), 'components', `${pascalCase(c.slug)}FAQ.tsx`)
  const mapPath = join(process.cwd(), 'components', `${pascalCase(c.slug)}Map.tsx`)
  const mapWrapperPath = join(process.cwd(), 'components', `${pascalCase(c.slug)}MapWrapper.tsx`)

  if (dryRun) {
    console.log(`  [DRY RUN] Would create: ${pagePath}`)
    console.log(`  [DRY RUN] Would create: ${faqPath}`)
    console.log(`  [DRY RUN] Would create: ${mapPath}`)
    console.log(`  [DRY RUN] Would create: ${mapWrapperPath}`)
    continue
  }

  mkdirSync(pageDir, { recursive: true })
  writeFileSync(pagePath, generatePageTsx(c))
  writeFileSync(faqPath, generateFAQ(c))
  writeFileSync(mapPath, generateMap(c))
  writeFileSync(mapWrapperPath, generateMapWrapper(c))

  console.log(`  ✓ ${c.slug} — page + FAQ + map`)
}

console.log(`\nDone! Generated ${filtered.length} community pages.`)
