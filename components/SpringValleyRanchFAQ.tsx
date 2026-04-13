'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Spring Valley Ranch?",
    "a": "Homes in Spring Valley Ranch range from approximately $350,000 for townhomes to $600,000 or more for larger single-family homes with upgraded features and premium lot positions."
  },
  {
    "q": "When was Spring Valley Ranch built?",
    "a": "Spring Valley Ranch was developed primarily in the 1990s and early 2000s. Most homes were built between 1992 and 2005, offering mature landscaping and established neighborhood character."
  },
  {
    "q": "What ZIP codes is Spring Valley Ranch in?",
    "a": "Spring Valley Ranch is located in ZIP codes 89147 and 89148 in the Spring Valley area of Las Vegas."
  },
  {
    "q": "Is Spring Valley Ranch a good area for families?",
    "a": "Yes. Spring Valley Ranch is a popular family neighborhood with established HOAs, community pools, pocket parks, and proximity to Desert Breeze Park. The central location provides convenient access to schools, shopping, and entertainment."
  },
  {
    "q": "What are HOA fees in Spring Valley Ranch?",
    "a": "HOA fees typically range from $40 to $150 per month, depending on the specific section and its amenities. This is significantly lower than comparable master-planned communities."
  },
  {
    "q": "How close is Spring Valley Ranch to the Strip?",
    "a": "Spring Valley Ranch is approximately 10 minutes from the Las Vegas Strip via Flamingo Road or Spring Mountain Road. The central location makes it one of the most conveniently located family neighborhoods in the valley."
  },
  {
    "q": "Is Spring Valley Ranch guard-gated?",
    "a": "No. Spring Valley Ranch is not guard-gated, though it has managed HOAs that maintain community standards. Nearby guard-gated options include Canyon Gate Country Club and Spanish Trail."
  },
  {
    "q": "What schools serve Spring Valley Ranch?",
    "a": "The area is served by CCSD schools including Spring Valley High School. Private options include The Meadows School (A+) and Bishop Gorman High School (A+). Doral Academy is the top charter option."
  }
]

export default function SpringValleyRanchFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Spring Valley Ranch</h2>
          <p>The questions buyers ask most when exploring Spring Valley Ranch.</p>
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
