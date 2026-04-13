'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Black Mountain Ranch?",
    "a": "Homes in Black Mountain Ranch range from approximately $400,000 for smaller single-story homes to $800,000 for larger estate-style homes on premium lots with mountain and valley views."
  },
  {
    "q": "Is Black Mountain Ranch guard-gated?",
    "a": "No. Black Mountain Ranch is not a guard-gated community. It is an open community with HOA governance, maintained common areas, and the safety benefits of being in Henderson — one of America's safest large cities."
  },
  {
    "q": "What ZIP code is Black Mountain Ranch in?",
    "a": "Black Mountain Ranch spans ZIP codes 89002 and 89015 in Henderson, Nevada. Home prices range from $400K–$800K."
  },
  {
    "q": "Can you have horses in Black Mountain Ranch?",
    "a": "Select properties along the eastern edge of Black Mountain Ranch feature larger lots that are zoned for horses. These equestrian-friendly properties are one of the community's unique features within Henderson city limits."
  },
  {
    "q": "What are HOA fees in Black Mountain Ranch?",
    "a": "HOA fees in Black Mountain Ranch typically range from $60 to $150 per month, covering common area maintenance, community landscaping, and HOA governance. This is significantly lower than guard-gated Henderson communities."
  },
  {
    "q": "What schools serve Black Mountain Ranch?",
    "a": "Black Mountain Ranch is served by CCSD schools including McCaw STEAM Academy (7/10), Brown Junior High (6/10), and Basic High School (5/10). Charter options include Doral Academy (9/10) and Somerset Academy (8/10)."
  },
  {
    "q": "Is Black Mountain Ranch close to hiking trails?",
    "a": "Yes. Black Mountain Ranch has direct trailhead access to the Black Mountain Trail system, offering miles of hiking, mountain biking, and horseback riding trails. Sloan Canyon National Conservation Area is also nearby. Black Mountain Ranch is ~20 min to the Strip via I-215 → I-15."
  },
  {
    "q": "How far is Black Mountain Ranch from the Strip?",
    "a": "Black Mountain Ranch is approximately 20 minutes from the Las Vegas Strip via the I-215 beltway and I-15. Harry Reid International Airport is also about 20 minutes away."
  },
  {
    "q": "What are the best sub-neighborhoods within Black Mountain Ranch?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Black Mountain Ranch can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Black Mountain Ranch?",
    "a": "New construction availability varies by season and builder phase. Some sections of Black Mountain Ranch have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function BlackMountainRanchFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Black Mountain Ranch</h2>
          <p>The questions buyers ask most when exploring Black Mountain Ranch.</p>
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
