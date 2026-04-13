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
