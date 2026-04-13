'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Northwest Las Vegas?",
    "a": "Homes in Northwest Las Vegas range from approximately $350,000 for entry-level homes to $800,000 or more for premium lots with mountain views and custom finishes in communities like Lone Mountain and Skye Canyon."
  },
  {
    "q": "What communities are in Northwest Las Vegas?",
    "a": "Major communities include Centennial Hills, Skye Canyon, Providence, Lone Mountain, Aliante (in North Las Vegas), and Tule Springs. Each offers a distinct character and price point within the broader northwest corridor."
  },
  {
    "q": "Is Northwest Las Vegas a good area for families?",
    "a": "Yes. Northwest Las Vegas is one of the most family-friendly areas in the valley, with newer schools, extensive park systems, master-planned community amenities, and a growing base of family-oriented retail and dining."
  },
  {
    "q": "What ZIP codes are in Northwest Las Vegas?",
    "a": "Northwest Las Vegas spans numerous ZIP codes including 89129, 89130, 89131, 89134, 89138, 89143, 89149, and 89166."
  },
  {
    "q": "How does Northwest Las Vegas compare to Summerlin?",
    "a": "Northwest Las Vegas offers comparable new-construction quality at prices typically 15–25% below Summerlin. The tradeoff is that Summerlin has a stronger brand, more established amenities, and higher-end luxury options."
  },
  {
    "q": "Is Northwest Las Vegas still growing?",
    "a": "Yes. Northwest Las Vegas is the fastest-growing residential area in the valley. Active builders deliver thousands of new homes annually, and commercial infrastructure continues to expand to serve the growing population."
  },
  {
    "q": "What are HOA fees in Northwest Las Vegas?",
    "a": "HOA fees vary widely depending on the specific community, typically ranging from $30 to $250 per month. Master-planned communities with resort amenities tend to be on the higher end."
  },
  {
    "q": "What's the commute like from Northwest Las Vegas?",
    "a": "US-95 and the I-215 Beltway provide efficient commute routes. The Strip and downtown are approximately 20 minutes via US-95. Summerlin is 15 minutes via I-215. Harry Reid Airport is about 30 minutes."
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

export default function NorthwestLasVegasFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Northwest Las Vegas</h2>
          <p>The questions buyers ask most when exploring Northwest Las Vegas.</p>
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
