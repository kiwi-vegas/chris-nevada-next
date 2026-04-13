'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Whitney?",
    "a": "Homes in Whitney range from approximately $200,000 for older properties to $400,000 or more for newer or renovated homes in desirable sections near Whitney Ranch Park."
  },
  {
    "q": "Is Whitney part of Las Vegas or Henderson?",
    "a": "Whitney is an unincorporated community in Clark County. It uses Las Vegas mailing addresses but is not part of the City of Las Vegas. It borders Henderson to the south."
  },
  {
    "q": "What ZIP codes are in Whitney?",
    "a": "Whitney spans ZIP codes 89122, 89121, and 89142 in the east-central Las Vegas Valley. Home prices range from $200K–$400K."
  },
  {
    "q": "Is Whitney a good area for investment?",
    "a": "Whitney offers affordable entry prices with proximity to Henderson, making it attractive for investors seeking positive cash flow and long-term appreciation. Rental demand is consistent."
  },
  {
    "q": "How far is Whitney from the Strip?",
    "a": "Whitney is approximately 15 minutes from the Las Vegas Strip via Tropicana Avenue or Flamingo Road heading west."
  },
  {
    "q": "What schools serve Whitney?",
    "a": "Whitney is served by CCSD schools including Silverado High School (5/10). Charter options include Mater Academy of Nevada (7/10). Private schools in Henderson are also accessible."
  },
  {
    "q": "What is near Whitney?",
    "a": "Whitney is near Sam's Town Casino, Sunset Park, Henderson, and the Boulder Highway corridor leading to Boulder City and Lake Mead. Major shopping is available along Tropicana and Flamingo."
  },
  {
    "q": "Are there HOAs in Whitney?",
    "a": "Many older homes in Whitney have no HOA. Newer subdivisions typically have modest HOA fees ranging from $25 to $75 per month covering basic common area maintenance."
  },
  {
    "q": "What are the best sub-neighborhoods within Whitney?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Whitney can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Whitney?",
    "a": "New construction availability varies by season and builder phase. Some sections of Whitney have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function LasVegasWhitneyFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Whitney</h2>
          <p>The questions buyers ask most when exploring Whitney.</p>
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
