'use client'
import { useState, useEffect, useRef } from 'react'

const LV_COMMUNITIES = [
  { name: 'Summerlin', area: 'Las Vegas, NV', href: '/summerlin/', map: 'Summerlin+Las+Vegas+NV' },
  { name: 'Centennial Hills', area: 'Northwest Las Vegas', href: '#', map: 'Centennial+Hills+Las+Vegas+NV' },
  { name: 'Mountains Edge', area: 'Southwest Las Vegas', href: '#', map: 'Mountains+Edge+Las+Vegas+NV' },
  { name: 'Red Rock Country Club', area: 'Summerlin, Las Vegas', href: '#', map: 'Red+Rock+Country+Club+Las+Vegas+NV' },
  { name: 'The Lakes', area: 'Las Vegas, NV', href: '#', map: 'The+Lakes+Las+Vegas+NV' },
  { name: 'Southern Highlands', area: 'South Las Vegas', href: '#', map: 'Southern+Highlands+Las+Vegas+NV' },
  { name: 'Desert Shores', area: 'Northwest Las Vegas', href: '#', map: 'Desert+Shores+Las+Vegas+NV' },
  { name: 'Henderson / Anthem', area: 'Henderson, NV', href: '#', map: 'Anthem+Henderson+NV' },
  { name: 'Green Valley Ranch', area: 'Henderson, NV', href: '#', map: 'Green+Valley+Ranch+Henderson+NV' },
  { name: 'Lake Las Vegas', area: 'Henderson, NV', href: '#', map: 'Lake+Las+Vegas+Henderson+NV' },
  { name: 'MacDonald Highlands', area: 'Henderson, NV', href: '#', map: 'MacDonald+Highlands+Henderson+NV' },
  { name: 'North Las Vegas', area: 'North Las Vegas, NV', href: '#', map: 'North+Las+Vegas+NV' },
]

const RENO_COMMUNITIES = [
  { name: 'Damonte Ranch', area: 'South Reno, NV', href: '#', map: 'Damonte+Ranch+Reno+NV' },
  { name: 'Double Diamond', area: 'South Reno, NV', href: '#', map: 'Double+Diamond+Reno+NV' },
  { name: 'Somersett', area: 'West Reno, NV', href: '#', map: 'Somersett+Reno+NV' },
  { name: 'Caughlin Ranch', area: 'West Reno, NV', href: '#', map: 'Caughlin+Ranch+Reno+NV' },
  { name: 'ArrowCreek', area: 'South Reno, NV', href: '#', map: 'ArrowCreek+Reno+NV' },
  { name: 'Spanish Springs', area: 'Sparks, NV', href: '#', map: 'Spanish+Springs+Sparks+NV' },
  { name: 'Incline Village', area: 'Lake Tahoe, NV', href: '#', map: 'Incline+Village+Lake+Tahoe+NV' },
  { name: 'South Reno', area: 'Reno, NV', href: '#', map: 'South+Reno+NV' },
  { name: 'Midtown Reno', area: 'Reno, NV', href: '#', map: 'Midtown+Reno+NV' },
  { name: 'Carson City', area: 'Carson City, NV', href: '#', map: 'Carson+City+NV' },
]

function CommunityCard({ name, area, href, map }: typeof LV_COMMUNITIES[0]) {
  const [flipped, setFlipped] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)

  const loadMap = () => setMapLoaded(true)

  return (
    <div
      className={`community-card${flipped ? ' flipped' : ''}`}
      onMouseEnter={loadMap}
      onTouchStart={() => { loadMap(); setFlipped(f => !f) }}
    >
      <div className="card-inner">
        <div className="card-front">
          <span className="card-flip-hint">Hover to see map</span>
          <svg className="card-front-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <h3>{name}</h3>
          <span className="area">{area}</span>
        </div>
        <div className="card-back">
          {mapLoaded && (
            <iframe
              src={`https://maps.google.com/maps?q=${map}&output=embed&z=13`}
              title={`${name} map`}
              loading="lazy"
            />
          )}
          <a href={href} className="card-back-cta">View Homes <span>→</span></a>
        </div>
      </div>
    </div>
  )
}

export default function CommunityTabs() {
  const [activeTab, setActiveTab] = useState<'lv' | 'reno'>('lv')
  const communities = activeTab === 'lv' ? LV_COMMUNITIES : RENO_COMMUNITIES

  return (
    <section id="communities">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Explore</span>
          <h2>Find Your Community</h2>
          <p>We specialize in Nevada&apos;s most sought-after neighborhoods — from the Las Vegas Strip corridor to the Sierra Nevada foothills.</p>
        </div>
        <div className="market-tabs">
          <button className={`market-tab${activeTab === 'lv' ? ' active' : ''}`} onClick={() => setActiveTab('lv')}>Las Vegas</button>
          <button className={`market-tab${activeTab === 'reno' ? ' active' : ''}`} onClick={() => setActiveTab('reno')}>Reno</button>
        </div>
        <div className="communities-grid">
          {communities.map(c => <CommunityCard key={c.name} {...c} />)}
        </div>
      </div>
    </section>
  )
}
