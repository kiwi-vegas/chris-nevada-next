'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Green Valley Highlands?",
    "a": "Homes in Green Valley Highlands range from approximately $500,000 for single-story homes to over $1 million for larger homes on premium elevated lots with valley and mountain views."
  },
  {
    "q": "Is Green Valley Highlands guard-gated?",
    "a": "No. Green Valley Highlands is not guard-gated. It is part of the broader Green Valley master-planned community in Henderson with HOA governance."
  },
  {
    "q": "What views do Green Valley Highlands homes have?",
    "a": "Many homes in Green Valley Highlands enjoy elevated views of the Las Vegas Valley, the Strip skyline, and the surrounding mountain ranges. The higher elevation compared to valley-floor Green Valley neighborhoods creates panoramic view corridors."
  },
  {
    "q": "What ZIP codes is Green Valley Highlands in?",
    "a": "Green Valley Highlands spans ZIP codes 89052 and 89012 in Henderson, Nevada. Home prices range from $500K–$1M."
  },
  {
    "q": "What schools serve Green Valley Highlands?",
    "a": "Green Valley Highlands is served by CCSD schools including Vanderburg Elementary (8/10), Del E. Webb Middle School (7/10), and Coronado High School (7/10)."
  },
  {
    "q": "What are HOA fees in Green Valley Highlands?",
    "a": "HOA fees in Green Valley Highlands typically range from $75 to $200 per month, covering access to Green Valley's parks, trails, and common area maintenance."
  },
  {
    "q": "How does Green Valley Highlands compare to Seven Hills?",
    "a": "Green Valley Highlands offers elevated Henderson living within the established Green Valley master plan at price points generally below Seven Hills. Seven Hills is guard-gated with golf course access; Green Valley Highlands is open with the broader Green Valley amenity package."
  },
  {
    "q": "Is Green Valley Ranch Resort near Green Valley Highlands?",
    "a": "Yes. Green Valley Ranch Resort & Spa is approximately 5 minutes away, offering resort dining, entertainment, spa services, and casino gaming."
  },
  {
    "q": "What are the best sub-neighborhoods within Green Valley Highlands?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Green Valley Highlands can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Green Valley Highlands?",
    "a": "New construction availability varies by season and builder phase. Some sections of Green Valley Highlands have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function GreenValleyHighlandsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Green Valley Highlands</h2>
          <p>The questions buyers ask most when exploring Green Valley Highlands.</p>
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
