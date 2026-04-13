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
  },
  {
    "q": "What are the best neighborhoods for families?",
    "a": "Family-oriented neighborhoods with top-rated schools, parks, and community amenities are found throughout the area. The best fit depends on budget, school preferences, and commute needs. Nevada Real Estate Group can provide neighborhood-specific guidance based on your family's priorities."
  },
  {
    "q": "How do property taxes compare to other areas?",
    "a": "Nevada has no state income tax, and property tax rates are among the lowest in the country. Clark County property taxes are typically 0.5-0.7% of assessed value (not market value). A ,000 home might pay ,500-,500 per year in property taxes."
  },
  {
    "q": "What is the rental market like for investors?",
    "a": "The Las Vegas metro area has a strong rental market driven by population growth, tourism industry employment, and relocation from higher-cost states. Rental yields vary by area and property type but typically range from 4-7% gross depending on location and price point."
  },
  {
    "q": "How has the market performed over the past year?",
    "a": "The Las Vegas housing market has shown steady appreciation with moderate inventory growth. Prices have increased year-over-year while days on market have normalized from pandemic-era lows. Contact Nevada Real Estate Group for the most current market data specific to this area."
  },
  {
    "q": "What should I know about buying in Nevada as an out-of-state buyer?",
    "a": "Nevada offers significant tax advantages including no state income tax, no inheritance tax, and relatively low property taxes. The buying process is similar to most states. Out-of-state buyers can complete most of the process remotely with the help of a local agent. Nevada Real Estate Group works with relocation buyers regularly."
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
