'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Downtown Las Vegas?",
    "a": "Downtown Las Vegas offers an extraordinary range: loft condos and mid-rise units start around $200,000, while historic estates in the Scotch 80s can exceed $5 million. High-rise condos at buildings like Juhl and The Ogden range from $200K to $700K+."
  },
  {
    "q": "Is Downtown Las Vegas a good investment?",
    "a": "Downtown Las Vegas is one of the most compelling investment markets in the valley. It remains undervalued compared to comparable urban cores in other major cities. Ongoing development, cultural momentum, and proximity to the Strip support strong appreciation potential."
  },
  {
    "q": "What ZIP codes cover Downtown Las Vegas?",
    "a": "Downtown Las Vegas primarily falls within ZIP codes 89101, 89104, and 89106. The Arts District and Fremont East are in 89101."
  },
  {
    "q": "What is the Arts District?",
    "a": "The Arts District, also known as 18b, is an 18-block creative corridor south of Fremont Street featuring galleries, breweries, restaurants, murals, and a monthly First Friday arts walk that draws thousands of visitors. It is the epicenter of downtown's revitalization."
  },
  {
    "q": "Are there high-rise condos in Downtown Las Vegas?",
    "a": "Yes. Downtown high-rises include The Ogden (21 stories), Juhl (16 stories), Newport Lofts (22 stories), Soho Lofts (18 stories), Loft 5, and the newer Cello Tower. Prices range from approximately $200K to over $4.5M."
  },
  {
    "q": "What is the Scotch 80s?",
    "a": "The Scotch 80s is Las Vegas' most prestigious vintage neighborhood, named for its location in Section 8, Township 21 South, Range 61 East. It features guard-gated estate lots up to half an acre with mature landscaping and celebrity provenance. Homes range from $800K to $3M+."
  },
  {
    "q": "Is Downtown Las Vegas walkable?",
    "a": "Yes. Downtown Las Vegas is one of the few truly walkable neighborhoods in the valley. Residents can walk to restaurants, galleries, bars, fitness studios, grocery stores, and entertainment without needing a car — unique for Las Vegas."
  },
  {
    "q": "What schools serve Downtown Las Vegas?",
    "a": "Las Vegas Academy of the Arts (9/10 GreatSchools) is the standout public school option. Private options include The Meadows School (A+) and Bishop Gorman High School (A+). Several charter schools also serve the area."
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

export default function DowntownLasVegasFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Downtown Las Vegas</h2>
          <p>The questions buyers ask most when exploring Downtown Las Vegas.</p>
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
