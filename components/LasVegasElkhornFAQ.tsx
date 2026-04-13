'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in the Elkhorn area?",
    "a": "Homes in the Elkhorn area range from approximately $350,000 for established 1990s homes to $600,000 for larger or newer properties in the western sections near the foothills."
  },
  {
    "q": "What ZIP codes cover the Elkhorn area?",
    "a": "The Elkhorn area spans portions of ZIP codes 89129 and 89131 in the northwest Las Vegas Valley. Home prices range from $350K–$600K."
  },
  {
    "q": "What schools serve the Elkhorn area?",
    "a": "The Elkhorn area is served by CCSD schools including Shadow Ridge High School (6/10). Charter options like Doral Academy (9/10) and Pinecrest Academy (8/10) provide alternatives."
  },
  {
    "q": "How far is the Elkhorn area from the Strip?",
    "a": "The Elkhorn area is approximately 20 minutes from the Las Vegas Strip via US-95 South and I-15. Home prices range from $350K–$600K."
  },
  {
    "q": "Is the Elkhorn area near Summerlin?",
    "a": "Yes. The Elkhorn area's southern edge is adjacent to the Summerlin area, and Downtown Summerlin is approximately 10 minutes via the 215 Beltway."
  },
  {
    "q": "Are there HOAs in the Elkhorn area?",
    "a": "Most Elkhorn area subdivisions have HOA fees ranging from $25 to $125 per month, covering basic common area maintenance and community standards."
  },
  {
    "q": "Is the Elkhorn area good for families?",
    "a": "Yes. The Elkhorn area is popular with families due to safe suburban neighborhoods, school proximity, community parks, and a family-oriented character."
  },
  {
    "q": "What is near the Elkhorn area?",
    "a": "The Elkhorn area is near Lone Mountain, Centennial Hills, Summerlin, and Floyd Lamb Park at Tule Springs. Shopping and dining are available along Elkhorn Road and Cheyenne Avenue."
  },
  {
    "q": "What are the best sub-neighborhoods within Elkhorn?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Elkhorn can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Elkhorn?",
    "a": "New construction availability varies by season and builder phase. Some sections of Elkhorn have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function LasVegasElkhornFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Elkhorn</h2>
          <p>The questions buyers ask most when exploring Elkhorn.</p>
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
