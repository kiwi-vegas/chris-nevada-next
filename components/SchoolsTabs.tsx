'use client'
import { useState } from 'react'

const SCHOOLS = {
  Public: [
    ['John W. Bonner Elementary', 'K\u20135', '9/10'],
    ['John & Judy Goolsby Elementary', 'K\u20135', '7/10'],
    ['Linda Givens Elementary', 'K\u20135', '8/10'],
    ['D\u2019vorre & Hall Ober Elementary', 'K\u20135', '6/10'],
    ['Sig Rogich Middle School', '6\u20138', '10/10'],
    ['Palo Verde High School', '9\u201312', '8/10'],
    ['West Career & Technical Academy', '9\u201312', '7/10'],
  ],
  Private: [
    ['Bishop Gorman High School', '9\u201312', 'A+'],
    ['Faith Lutheran Middle & High', '6\u201312', 'A'],
    ['Faith Lutheran Academy', 'K\u20135', 'A'],
    ['St. Elizabeth Ann Seton', 'PreK\u20138', 'A-'],
    ['The Meadows School', 'PreK\u201312', 'A+'],
    ['Merryhill School', 'PreK\u20135', 'A-'],
  ],
  Charter: [
    ['Doral Academy Red Rock', 'K\u201312', '9/10'],
    ['Alexander Dawson School', 'K\u20138', 'A+'],
    ['Adelson Educational Campus', 'PreK\u201312', 'A'],
    ['Pinecrest Academy Inspirada', 'K\u201312', '8/10'],
  ],
}

type TabKey = keyof typeof SCHOOLS

export default function SchoolsTabs() {
  const [active, setActive] = useState<TabKey>('Public')

  return (
    <>
      <div className="schools-tabs-bar">
        {(Object.keys(SCHOOLS) as TabKey[]).map(tab => (
          <button
            key={tab}
            className={`schools-tab${active === tab ? ' active' : ''}`}
            onClick={() => setActive(tab)}
          >
            {tab} ({SCHOOLS[tab].length})
          </button>
        ))}
      </div>
      <div className="schools-v2-table">
        <div className="schools-v2-header">
          <span>School Name</span>
          <span>Grades</span>
          <span>Rating</span>
        </div>
        {SCHOOLS[active].map(([name, grades, rating]) => (
          <div className="schools-v2-row" key={name}>
            <span className="schools-v2-name">{name}</span>
            <span className="schools-v2-grades">{grades}</span>
            <span className={`schools-v2-rating${rating.includes('10') || rating === 'A+' ? ' top-rated' : ''}`}>{rating}</span>
          </div>
        ))}
      </div>
      <p className="schools-v2-note">Public/Charter ratings from GreatSchools.org (2025). Private school grades from Niche.com. Zoning varies by village — confirm with CCSD before purchasing.</p>
    </>
  )
}
