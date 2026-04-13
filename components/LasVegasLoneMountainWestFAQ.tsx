'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Lone Mountain West?",
    "a": "Homes in Lone Mountain West range from approximately $500,000 for newer production homes to $1 million or more for semi-custom and custom homes on larger lots with mountain views."
  },
  {
    "q": "Is Lone Mountain West a good area for families?",
    "a": "Yes. Lone Mountain West is one of the best family-oriented areas in Las Vegas, with newer schools, modern parks, safe neighborhoods, and a growing retail corridor. The newer construction also means lower maintenance costs."
  },
  {
    "q": "What ZIP codes cover Lone Mountain West?",
    "a": "Lone Mountain West spans ZIP codes 89166 and 89149 in the northwest Las Vegas Valley. Home prices range from $500K–$1M."
  },
  {
    "q": "How far is Lone Mountain West from the Strip?",
    "a": "Lone Mountain West is approximately 25 minutes from the Las Vegas Strip via US-95 South to I-15. The 215 Beltway also provides access to Summerlin and the western valley."
  },
  {
    "q": "Is Lone Mountain West still growing?",
    "a": "Yes. Lone Mountain West remains one of the most active new construction corridors in the Las Vegas Valley. New communities, schools, and retail centers continue to be developed throughout the area."
  },
  {
    "q": "What schools serve Lone Mountain West?",
    "a": "Lone Mountain West is served by CCSD schools including Shadow Ridge High School (6/10) and several newer elementary and middle schools. Private and charter options include Doral Academy (9/10) and Pinecrest Academy (8/10)."
  },
  {
    "q": "Are there HOA fees in Lone Mountain West?",
    "a": "Most communities in Lone Mountain West have HOA fees ranging from $50 to $200 per month, covering common area maintenance, community amenities, and neighborhood landscaping."
  },
  {
    "q": "What is the elevation of Lone Mountain West?",
    "a": "Lone Mountain West sits at approximately 3,000 to 3,400 feet elevation, noticeably higher than the valley floor. This provides slightly cooler temperatures in summer and dramatic views of the surrounding mountain ranges."
  },
  {
    "q": "What are the best sub-neighborhoods within Lone Mountain West?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Lone Mountain West can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Lone Mountain West?",
    "a": "New construction availability varies by season and builder phase. Some sections of Lone Mountain West have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function LasVegasLoneMountainWestFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Lone Mountain West</h2>
          <p>The questions buyers ask most when exploring Lone Mountain West.</p>
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
