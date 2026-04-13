'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is Paradise, Las Vegas?",
    "a": "Paradise is the largest unincorporated town in Clark County, covering approximately 46 square miles. It encompasses the Las Vegas Strip, UNLV, Harry Reid Airport, and Allegiant Stadium. Most of what visitors call 'Las Vegas' is technically within Paradise."
  },
  {
    "q": "What is the price range for homes in Paradise?",
    "a": "Paradise offers the widest price range of any Las Vegas community: from approximately $250,000 for modest single-family homes on the east side to over $2 million for luxury high-rise penthouses along the Strip corridor."
  },
  {
    "q": "Is Paradise a good area for real estate investment?",
    "a": "Paradise is one of the strongest investment markets in the valley. Proximity to the Strip, UNLV, the airport, and the convention center creates consistent rental demand. Short-term vacation rentals, student housing, and corporate rentals all perform well in various Paradise sub-markets."
  },
  {
    "q": "What ZIP codes are in Paradise?",
    "a": "Paradise includes ZIP codes 89109, 89119, 89120, 89121, and 89169, among others. The area is geographically large and spans many postal zones."
  },
  {
    "q": "What high-rise condos are in Paradise?",
    "a": "Major high-rises in Paradise include Turnberry Place (4 towers), Turnberry Towers (twin towers), Panorama Towers (twin towers), Park Towers, The Martin, Veer Towers, Sky Las Vegas, and Waldorf Astoria Las Vegas. Prices range from $300K to $10M+."
  },
  {
    "q": "Is Paradise safe?",
    "a": "Safety in Paradise varies significantly by neighborhood. The gated high-rise developments and western sections near the Strip are well-secured. Eastern neighborhoods vary. As with any large urban area, research specific blocks and subdivisions before buying."
  },
  {
    "q": "What is Paradise Palms?",
    "a": "Paradise Palms is one of Las Vegas' most architecturally significant vintage neighborhoods. Built in the 1960s with Palm Springs-inspired mid-century modern design, it has become highly sought after by design-conscious buyers. Homes range from $500K to $1.5M."
  },
  {
    "q": "How close is Paradise to the airport?",
    "a": "Paradise contains Harry Reid International Airport within its boundaries. Depending on the neighborhood, residents can be at the airport terminal in 5–15 minutes — the shortest airport commute of any community in the valley."
  }
]

export default function ParadiseFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Paradise</h2>
          <p>The questions buyers ask most when exploring Paradise.</p>
        </div>
        <div className="faq-list">
          {FAQS.map((faq: any, i: number) => (
            <div key={i} className={`faq-item${open === i ? ' open' : ''}`}>
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
