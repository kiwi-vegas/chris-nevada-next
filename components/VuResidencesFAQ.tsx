'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Vu Residences?",
    "a": "Homes in Vu Residences range from approximately $1 million for smaller floor plans to over $3 million for premium view lots with extensive upgrades and custom finishing."
  },
  {
    "q": "How does Vu Residences compare to SkyVu?",
    "a": "Vu Residences is positioned above SkyVu in MacDonald Highlands' hierarchy — higher elevation, larger floor plans (3,000–6,000 vs 2,500–5,000 sq ft), more refined finishes, and higher pricing ($1M–$3M+ vs $800K–$2M+). Both feature modern desert contemporary architecture."
  },
  {
    "q": "Is Vu Residences guard-gated?",
    "a": "Vu Residences is within the MacDonald Highlands community, which has guard-gated access. Residents benefit from MacDonald Highlands' broader 24-hour security infrastructure."
  },
  {
    "q": "What ZIP code is Vu Residences in?",
    "a": "Vu Residences is located in ZIP code 89012 in Henderson, Nevada, within MacDonald Highlands."
  },
  {
    "q": "Can Vu Residences homeowners join DragonRidge Country Club?",
    "a": "Yes. As MacDonald Highlands residents, Vu Residences homeowners can apply for membership at DragonRidge Country Club. Membership includes championship golf, dining, fitness, pool, and social programming."
  },
  {
    "q": "What are HOA fees in Vu Residences?",
    "a": "HOA fees typically range from $250 to $500 per month, covering MacDonald Highlands master association fees, common area maintenance, and community infrastructure and security."
  },
  {
    "q": "Are Vu Residences homes custom built?",
    "a": "Vu Residences homes are semi-custom — built by Taylor Morrison (formerly William Lyon Homes) with multiple floor plan options and extensive customization packages. They are not fully custom like Dragon Rock estates, but offer more customization than typical production luxury."
  },
  {
    "q": "Is Vu Residences a good investment?",
    "a": "Vu Residences has appreciated strongly since its 2018 debut, benefiting from MacDonald Highlands' prestige, modern design that appeals to today's luxury buyers, and the scarcity of contemporary production luxury at this elevation in Henderson."
  }
]

export default function VuResidencesFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Vu Residences</h2>
          <p>The questions buyers ask most when exploring Vu Residences.</p>
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
