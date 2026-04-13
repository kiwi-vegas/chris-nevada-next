'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Southwest Las Vegas?",
    "a": "Homes in Southwest Las Vegas range from approximately $300,000 for entry-level condos and townhomes to over $1 million for luxury homes in guard-gated communities like Southern Highlands and Spanish Trail."
  },
  {
    "q": "What ZIP codes are in Southwest Las Vegas?",
    "a": "Southwest Las Vegas spans several ZIP codes including 89113, 89139, 89141, 89148, 89178, and 89179. The area is large and covers multiple unincorporated Clark County census tracts."
  },
  {
    "q": "Is Southwest Las Vegas a good area to live?",
    "a": "Southwest Las Vegas is one of the fastest-growing and most desirable residential areas in the valley. Newer construction, above-average schools, strong retail infrastructure, and proximity to both the Strip and Red Rock Canyon make it popular with families and professionals."
  },
  {
    "q": "What schools serve Southwest Las Vegas?",
    "a": "The area is served by newer CCSD schools including Sierra Vista High School and Del E. Webb Middle School. Charter options like Pinecrest Academy and Doral Academy rate highly. Bishop Gorman High School (A+) is the top private option."
  },
  {
    "q": "How close is Southwest Las Vegas to the Strip?",
    "a": "Most of Southwest Las Vegas is 15–20 minutes from the Strip via I-15 North or Las Vegas Boulevard. The I-215 Beltway provides an alternate fast route."
  },
  {
    "q": "What communities are in Southwest Las Vegas?",
    "a": "Major communities include Southern Highlands (guard-gated golf), Mountains Edge (master-planned family), Rhodes Ranch (guard-gated golf), Coronado Ranch, Enterprise, and Silverado Ranch, among others."
  },
  {
    "q": "Is Southwest Las Vegas still growing?",
    "a": "Yes. Active new construction continues throughout Southwest Las Vegas with builders releasing new phases in Mountains Edge, Enterprise, and surrounding areas. Retail and commercial development follows the residential growth."
  },
  {
    "q": "Is Southwest Las Vegas good for investment?",
    "a": "Southwest Las Vegas offers strong investment fundamentals: newer construction, growing population, strong rental demand, and limited remaining developable land. Appreciation has been consistent across market cycles."
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

export default function SouthwestLasVegasFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Southwest Las Vegas</h2>
          <p>The questions buyers ask most when exploring Southwest Las Vegas.</p>
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
