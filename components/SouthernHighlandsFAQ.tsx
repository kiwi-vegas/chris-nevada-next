'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Southern Highlands?",
    "a": "Southern Highlands offers an exceptional range from approximately $400,000 for non-gated family homes to over $10 million for custom estates in the guard-gated enclaves. Guard-gated homes typically start around $700K."
  },
  {
    "q": "Is Southern Highlands guard-gated?",
    "a": "Southern Highlands includes both guard-gated and non-gated sections. The guard-gated enclaves include The Estates, Tuscan Cliffs, Olympia Ridge, The Foothills, Royal Highlands, The Enclave, Vintage Canyon, and others. The broader community has non-gated sections as well."
  },
  {
    "q": "What golf course is in Southern Highlands?",
    "a": "The Southern Highlands Golf Club features an 18-hole Jack Nicklaus Signature course, consistently ranked among the best in Nevada. It is a private club with a Mediterranean clubhouse, fine dining, pools, tennis, spa, and fitness center."
  },
  {
    "q": "What ZIP codes are in Southern Highlands?",
    "a": "Southern Highlands spans ZIP codes 89141, 89139, and 89178 in southwest Las Vegas, within unincorporated Clark County."
  },
  {
    "q": "What are HOA fees in Southern Highlands?",
    "a": "HOA fees vary by section. Non-gated sections typically pay $150–$250 per month. Guard-gated enclaves range from $300 to $600+ per month, covering guard gate staffing, security, common area maintenance, and community amenities."
  },
  {
    "q": "How far is Southern Highlands from the Strip?",
    "a": "Southern Highlands is approximately 15 minutes from the Las Vegas Strip via I-15 North. Harry Reid International Airport is about 20 minutes away."
  },
  {
    "q": "What schools serve Southern Highlands?",
    "a": "Southern Highlands is served by CCSD schools including John R. Hummel Elementary (8/10) and Del E. Webb Middle School (7/10). Private options include Bishop Gorman High School (A+). Doral Academy Red Rock (9/10) is the top charter option."
  },
  {
    "q": "Who developed Southern Highlands?",
    "a": "Southern Highlands was developed by the Olympia Group beginning in 1997. The community spans approximately 2,200 acres in the southwestern foothills and has grown to include over 6,500 homes and multiple guard-gated enclaves."
  },
  {
    "q": "How does the guard gate entry process work?",
    "a": "Residents receive transponders or access codes for automatic entry. Guests must be called in by the homeowner or added to a pre-approved list. Delivery drivers and service providers follow the community's vendor access policy. Most guard-gated communities staff the gate 24 hours a day, 7 days a week."
  },
  {
    "q": "Can non-residents access the community for viewings?",
    "a": "Yes. Prospective buyers can access the community with a licensed real estate agent who coordinates entry with the guard gate in advance. Nevada Real Estate Group handles all gate access arrangements for property showings."
  },
  {
    "q": "What security features are included beyond the guard gate?",
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems."
  }
]

export default function SouthernHighlandsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Southern Highlands</h2>
          <p>The questions buyers ask most when exploring Southern Highlands.</p>
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
