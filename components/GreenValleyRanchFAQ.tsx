'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Green Valley Ranch?",
    "a": "Homes in Green Valley Ranch range from approximately $400,000 for smaller resale homes to $900,000 for larger estate-style properties on premium lots. The community offers a well-defined mid-range that appeals to families and move-up buyers."
  },
  {
    "q": "Is Green Valley Ranch guard-gated?",
    "a": "No. Green Valley Ranch is not a guard-gated community. It is an open master-planned community with active HOA governance and the safety benefits of Henderson — one of America's safest large cities."
  },
  {
    "q": "What ZIP codes is Green Valley Ranch in?",
    "a": "Green Valley Ranch spans ZIP codes 89012, 89052, and 89074 in Henderson, Nevada. Home prices range from $400K–$900K."
  },
  {
    "q": "What are HOA fees in Green Valley Ranch?",
    "a": "HOA fees in Green Valley Ranch typically range from $60 to $180 per month, covering common area maintenance, community parks, landscaping, and HOA governance."
  },
  {
    "q": "What schools serve Green Valley Ranch?",
    "a": "Green Valley Ranch feeds into some of Henderson's top-rated schools including Nate Mack Elementary (8/10), Bob Miller Middle School (7/10), and Green Valley High School (7/10). Private and charter options are also available nearby."
  },
  {
    "q": "Is the Green Valley Ranch Resort part of the community?",
    "a": "Green Valley Ranch Resort Casino & Spa is located within the community and serves as a neighborhood amenity, but it is a separate commercial property — not a community amenity included in HOA fees. Residents enjoy the dining, spa, and entertainment as paying guests."
  },
  {
    "q": "When were homes in Green Valley Ranch built?",
    "a": "Green Valley Ranch was developed from the mid-1990s through the mid-2000s across multiple phases. The community features mature landscaping, tree-lined streets, and a settled character."
  },
  {
    "q": "How does Green Valley Ranch compare to Summerlin?",
    "a": "Both are premier master-planned communities. Summerlin is on the west side near Red Rock Canyon with a broader price range. Green Valley Ranch is in Henderson with a focus on family-friendly living, top schools, and central convenience. Both offer excellent quality of life at similar entry-level price points."
  },
  {
    "q": "What are the best sub-neighborhoods within Green Valley Ranch?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Green Valley Ranch can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Green Valley Ranch?",
    "a": "New construction availability varies by season and builder phase. Some sections of Green Valley Ranch have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function GreenValleyRanchFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Green Valley Ranch</h2>
          <p>The questions buyers ask most when exploring Green Valley Ranch.</p>
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
