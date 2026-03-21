'use client'
import { useState } from 'react'

export default function HomepageListings() {
  const [activeTab, setActiveTab] = useState<'lv' | 'reno'>('lv')

  return (
    <section id="all-listings">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Browse</span>
          <h2>View All Homes For Sale</h2>
          <p>Live MLS listings updated daily across Las Vegas and Reno — houses and condos from $400K and up.</p>
        </div>
        <div className="market-tabs">
          <button
            className={`market-tab${activeTab === 'lv' ? ' active' : ''}`}
            onClick={() => setActiveTab('lv')}
          >
            Las Vegas
          </button>
          <button
            className={`market-tab${activeTab === 'reno' ? ' active' : ''}`}
            onClick={() => setActiveTab('reno')}
          >
            Reno
          </button>
        </div>
        <div style={{ display: activeTab === 'lv' ? 'block' : 'none' }}>
          <div className="ylopo-wrap">
            <div className="YLOPO_resultsWidget" data-search='{"locations":[{"city":"Las Vegas","state":"NV"}],"propertyTypes":["house","condo"],"minPrice":400000,"limit":12}'></div>
          </div>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las+Vegas&s[locations][0][state]=NV" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Las Vegas Homes →</a>
          </div>
        </div>
        <div style={{ display: activeTab === 'reno' ? 'block' : 'none' }}>
          <div className="ylopo-wrap">
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo"],"minPrice":400000,"locations":[{"city":"Reno","state":"NV"}],"limit":12}'></div>
          </div>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Reno&s[locations][0][state]=NV" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Reno Homes →</a>
          </div>
        </div>
      </div>
    </section>
  )
}
