'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in East Las Vegas?",
    "a": "Homes in East Las Vegas start in the low $200,000s for smaller homes and condos, reaching up to $500,000 for larger homes in newer subdivisions. The median home price is typically $300K–$350K."
  },
  {
    "q": "Is East Las Vegas a good area to invest?",
    "a": "East Las Vegas offers some of the strongest rental yields in the valley due to low purchase prices and steady demand from Nellis AFB military families, Strip workers, and medical professionals. Cap rates are among the highest in the metro."
  },
  {
    "q": "What ZIP codes are in East Las Vegas?",
    "a": "East Las Vegas spans multiple ZIP codes including 89101, 89104, 89110, 89115, 89121, 89122, 89142, and 89156."
  },
  {
    "q": "Is East Las Vegas safe?",
    "a": "Safety varies significantly by neighborhood. Newer subdivisions near Lamb Boulevard and sections adjacent to Henderson are generally safe and well-maintained. As with any urban area, researching specific blocks and neighborhoods is important."
  },
  {
    "q": "How close is East Las Vegas to the Strip?",
    "a": "East Las Vegas is approximately 15 minutes from the Strip via Flamingo Road, Tropicana Avenue, or Boulder Highway. Some east-side locations are closer to the Strip than many west-side communities."
  },
  {
    "q": "What schools serve East Las Vegas?",
    "a": "The area is served by multiple CCSD campuses. Southeast Career Technical Academy (8/10) is the top-rated public option. Charter schools including Coral Academy of Science provide alternatives. Bishop Gorman (A+) is the premier private option."
  },
  {
    "q": "Is East Las Vegas being redeveloped?",
    "a": "Yes. Significant redevelopment is underway along Boulder Highway, the former Sam Boyd Stadium site, and several commercial corridors. New investment is transforming the east side's character and driving appreciation."
  },
  {
    "q": "What is Sunrise Manor?",
    "a": "Sunrise Manor is a large census-designated place on the east side, essentially the core of East Las Vegas. It encompasses a wide area from Charleston Boulevard south to Tropicana Avenue, east of the Strip corridor to Nellis AFB."
  }
]

export default function EastLasVegasFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About East Las Vegas</h2>
          <p>The questions buyers ask most when exploring East Las Vegas.</p>
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
