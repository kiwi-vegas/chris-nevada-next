'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for Desert Shores Villas?",
    "a": "Desert Shores Villas range from approximately $200,000 for one-bedroom condos to $450,000 for larger waterfront townhomes with lake views and updated interiors. The most active price range is $250,000 to $375,000."
  },
  {
    "q": "Are Desert Shores Villas on the lake?",
    "a": "Some units have direct lakefront positions with water views, while others are lake-adjacent or on interior streets. Lakefront units command higher prices. All residents have access to the four community lakes and beaches."
  },
  {
    "q": "What activities are available on the Desert Shores lakes?",
    "a": "Residents can kayak, paddleboard, and fish (catch and release) on the four man-made lakes. Sandy beaches provide sunbathing and lakeside relaxation. Motorized boats are not permitted. Walking trails circle the lakes."
  },
  {
    "q": "What are HOA fees at Desert Shores Villas?",
    "a": "HOA fees for the Villas typically range from $250 to $450 per month, covering exterior maintenance, landscaping, common area upkeep, lake and beach maintenance, and community amenities. Fees vary by specific complex."
  },
  {
    "q": "Are Desert Shores Villas a good investment?",
    "a": "Desert Shores Villas offer strong rental demand due to their lakefront lifestyle and affordable pricing. The community attracts tenants seeking waterfront living at a fraction of Lake Las Vegas pricing. Verify rental restrictions in the specific HOA before purchasing for investment."
  },
  {
    "q": "What is the difference between Desert Shores and Desert Shores Villas?",
    "a": "Desert Shores is the larger master-planned community with single-family homes, custom homes, and lakefront estates. Desert Shores Villas specifically refers to the condominium and townhome complexes within the community, offering a lower price point and maintenance-free lifestyle."
  },
  {
    "q": "What ZIP code are Desert Shores Villas in?",
    "a": "Desert Shores Villas are located in ZIP code 89128 in northwest Las Vegas. Home prices range from $200K–$450K."
  },
  {
    "q": "Is Desert Shores guard-gated?",
    "a": "Desert Shores is not guard-gated, though some individual condo complexes within the Villas have their own controlled access gates. The community does have a community association that maintains the lakes, beaches, and common areas."
  }
]

export default function DesertShoresVillasFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Desert Shores Villas</h2>
          <p>The questions buyers ask most when exploring Desert Shores Villas.</p>
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
