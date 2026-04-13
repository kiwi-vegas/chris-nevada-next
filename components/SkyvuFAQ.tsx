'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in SkyVu?",
    "a": "Homes in SkyVu range from approximately $800,000 for smaller floor plans to over $2 million for premium view lots with extensive upgrades and rooftop decks."
  },
  {
    "q": "Is SkyVu guard-gated?",
    "a": "SkyVu is located within the MacDonald Highlands community, which has guard-gated access. SkyVu itself does not have a separate gate — it benefits from MacDonald Highlands' broader security infrastructure."
  },
  {
    "q": "What makes SkyVu different from other MacDonald Highlands communities?",
    "a": "SkyVu is the most accessible entry point into MacDonald Highlands, with production luxury homes starting at $800K versus the $2M–$15M+ required for custom communities like Dragon Rock. SkyVu is also architecturally distinct with its modern desert contemporary design and rooftop decks."
  },
  {
    "q": "What ZIP code is SkyVu in?",
    "a": "SkyVu is located in ZIP code 89012 in Henderson, Nevada, within the MacDonald Highlands community. Home prices range from $800K–$2M+."
  },
  {
    "q": "Can SkyVu residents join DragonRidge Country Club?",
    "a": "Yes. As MacDonald Highlands residents, SkyVu homeowners can apply for membership at DragonRidge Country Club, which offers championship golf, dining, fitness, and social programming. Membership is not mandatory."
  },
  {
    "q": "What are HOA fees in SkyVu?",
    "a": "HOA fees in SkyVu typically range from $200 to $400 per month, covering the MacDonald Highlands master community association fees, common area maintenance, and community infrastructure."
  },
  {
    "q": "Do SkyVu homes have rooftop decks?",
    "a": "Many SkyVu homes feature rooftop decks as an optional or included amenity, offering 360-degree panoramic views of the Las Vegas Valley, the Strip, and the surrounding mountains. It's one of the community's signature features."
  },
  {
    "q": "Is SkyVu a good investment?",
    "a": "SkyVu benefits from the MacDonald Highlands address, modern architecture that appeals to today's luxury buyers, and an accessible price point relative to the broader community. The combination of views, design, and location has driven strong appreciation since the community's 2016 debut."
  }
]

export default function SkyvuFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About SkyVu</h2>
          <p>The questions buyers ask most when exploring SkyVu.</p>
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
