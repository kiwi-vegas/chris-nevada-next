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
        <div style={{ display: activeTab === 'lv' ? 'block' : 'none' }} className="ylopo-wrap">
          <div className="YLOPO_resultsWidget" data-search='{"locations":[{"city":"Las Vegas","state":"NV"}],"propertyTypes":["house","condo"],"minPrice":400000}'></div>
        </div>
        <div style={{ display: activeTab === 'reno' ? 'block' : 'none' }} className="ylopo-wrap">
          <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo"],"minPrice":400000,"locations":[{"city":"Reno","state":"NV"}]}'></div>
        </div>
      </div>
    </section>
  )
}
