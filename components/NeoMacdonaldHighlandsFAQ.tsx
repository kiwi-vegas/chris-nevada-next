'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Neo at MacDonald Highlands?",
    "a": "Homes in Neo range from approximately $2.34 million to $4.97 million. These are brand-new contemporary desert residences with 3,500 to 6,000+ square feet, premium finishes, and panoramic Strip and valley views."
  },
  {
    "q": "Is Neo at MacDonald Highlands guard-gated?",
    "a": "Yes. Neo benefits from double-gated security — residents pass through the main MacDonald Highlands guard gate and then Neo's own controlled access point. Security is 24 hours with full staffing."
  },
  {
    "q": "What ZIP code is Neo in?",
    "a": "Neo is located in ZIP code 89012 in Henderson, Nevada, within the MacDonald Highlands master plan."
  },
  {
    "q": "Do Neo homeowners have access to DragonRidge Country Club?",
    "a": "Yes. As MacDonald Highlands residents, Neo homeowners are eligible for membership at DragonRidge Country Club, which includes the Tom Fazio-designed 18-hole championship course, fine dining, resort pool, tennis, and fitness center. Club membership is separate from homeownership."
  },
  {
    "q": "What are HOA fees in Neo?",
    "a": "HOA fees in Neo typically range from $400 to $900 per month, which includes the MacDonald Highlands master association fee and the Neo sub-association fee. Fees cover guard gate staffing, security, common area maintenance, and community landscaping."
  },
  {
    "q": "What schools serve Neo at MacDonald Highlands?",
    "a": "Neo is served by CCSD schools including John C. Vanderburg Elementary (8/10), Del E. Webb Middle School (7/10), and Coronado High School (6/10). Private options include Henderson International School (A) and Bishop Gorman High School (A+)."
  },
  {
    "q": "When were homes in Neo built?",
    "a": "Neo is one of the newest neighborhoods in MacDonald Highlands, with homes delivered beginning in 2023. Construction continues with new phases. All homes feature contemporary desert architecture with the latest building standards and technology."
  },
  {
    "q": "How does Neo compare to other MacDonald Highlands neighborhoods?",
    "a": "Neo is among the newest luxury enclaves in MacDonald Highlands, offering brand-new construction at the $2.34M–$4.97M price point. It sits between the entry-level SkyVu homes ($800K–$2M+) and the ultra-luxury Dragon Rock enclave ($5M–$15M+) in both price and elevation."
  }
]

export default function NeoMacdonaldHighlandsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Neo</h2>
          <p>The questions buyers ask most when exploring Neo.</p>
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
