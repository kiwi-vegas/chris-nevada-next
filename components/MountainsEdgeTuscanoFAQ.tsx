'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Tuscano at Mountains Edge?",
    "a": "Homes in Tuscano range from approximately $400,000 for smaller homes to $600,000 for larger premium homes on the best lots. The sweet spot for most buyers is $450K to $550K."
  },
  {
    "q": "Who built homes in Tuscano?",
    "a": "Tuscano was built primarily by Pardee Homes, one of Las Vegas's most respected builders known for quality construction and thoughtful floor plan design."
  },
  {
    "q": "Is Tuscano guard-gated?",
    "a": "No — Tuscano is not guard-gated. It is part of the broader Mountains Edge master-planned community, which is an open community with HOA governance and well-maintained common areas."
  },
  {
    "q": "What ZIP code is Tuscano in?",
    "a": "Tuscano at Mountains Edge is located in ZIP code 89178 in southwest Las Vegas. Home prices range from $400K–$600K."
  },
  {
    "q": "What are HOA fees in Tuscano?",
    "a": "HOA fees are relatively low, typically ranging from $60 to $140 per month. Fees cover common area maintenance, trails, parks, and landscaping of shared spaces."
  },
  {
    "q": "What schools serve Tuscano?",
    "a": "Tuscano is served by CCSD schools including Carolyn S. Reedom Elementary (8/10), Lawrence & Heidi Canarelli Middle School (7/10), and Sierra Vista High School. Doral Academy (9/10) is a popular charter option."
  },
  {
    "q": "Is Tuscano good for families?",
    "a": "Tuscano is one of the most family-friendly neighborhoods in Mountains Edge. The combination of quality Pardee construction, mature landscaping, trail connectivity, top-rated schools, and proximity to the Regional Park makes it ideal for families with children."
  },
  {
    "q": "How does Tuscano compare to other Mountains Edge neighborhoods?",
    "a": "Tuscano is one of the most established neighborhoods within Mountains Edge, offering mature landscaping and a settled community character that newer sections are still developing. Pricing is competitive with the broader community, with the added appeal of Pardee's build quality."
  }
]

export default function MountainsEdgeTuscanoFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Tuscano at Mountains Edge</h2>
          <p>The questions buyers ask most when exploring Tuscano at Mountains Edge.</p>
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
