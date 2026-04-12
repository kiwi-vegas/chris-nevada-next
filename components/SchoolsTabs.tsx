'use client'
import { useState } from 'react'

const SCHOOLS = {
  Public: [
    ['John W. Bonner Elementary', 'K\u20135'],
    ['John & Judy Goolsby Elementary', 'K\u20135'],
    ['Linda Givens Elementary', 'K\u20135'],
    ['D\u2019vorre & Hall Ober Elementary', 'K\u20135'],
    ['Sig Rogich Middle School', '6\u20138'],
    ['Palo Verde High School', '9\u201312'],
    ['West Career & Technical Academy', '9\u201312'],
  ],
  Private: [
    ['Bishop Gorman High School', '9\u201312'],
    ['Faith Lutheran Middle & High', '6\u201312'],
    ['Faith Lutheran Academy', 'K\u20135'],
    ['St. Elizabeth Ann Seton', 'PreK\u20138'],
    ['The Meadows School', 'PreK\u201312'],
    ['Merryhill School', 'PreK\u20135'],
  ],
  Charter: [
    ['Doral Academy Red Rock', 'K\u201312'],
    ['Alexander Dawson School', 'K\u20138'],
    ['Adelson Educational Campus', 'PreK\u201312'],
    ['Pinecrest Academy Inspirada', 'K\u201312'],
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
        </div>
        {SCHOOLS[active].map(([name, grades]) => (
          <div className="schools-v2-row" key={name}>
            <span className="schools-v2-name">{name}</span>
            <span className="schools-v2-grades">{grades}</span>
          </div>
        ))}
      </div>
      <p className="schools-v2-note">Zoning varies by village. Always confirm your specific address with CCSD before purchasing.</p>
    </>
  )
}
