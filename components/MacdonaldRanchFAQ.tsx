'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in MacDonald Ranch?",
    "a": "The MacDonald Ranch area spans an extraordinary range from approximately $300,000 in Sun City MacDonald Ranch (55+) to over $15 million in MacDonald Highlands' most exclusive enclaves like Dragon Rock."
  },
  {
    "q": "What communities are part of MacDonald Ranch?",
    "a": "The MacDonald Ranch area includes Sun City MacDonald Ranch (55+), The Foothills at MacDonald Ranch (guard-gated luxury), Sunridge at MacDonald Ranch (family), and MacDonald Highlands (ultra-luxury with DragonRidge Country Club)."
  },
  {
    "q": "Is MacDonald Ranch in Henderson or Las Vegas?",
    "a": "MacDonald Ranch is located in Henderson, Nevada — the second-largest city in the Las Vegas metro area. Henderson is consistently ranked among the safest and most livable cities in America."
  },
  {
    "q": "What golf courses are in MacDonald Ranch?",
    "a": "DragonRidge Country Club (Tom Fazio/Jay Morrish design) is located within MacDonald Highlands. Sun City MacDonald Ranch features two additional golf courses available to its 55+ residents."
  },
  {
    "q": "Is there a 55+ community in MacDonald Ranch?",
    "a": "Yes. Sun City MacDonald Ranch by Del Webb is one of Henderson's premier 55+ communities, offering over 2,800 homes with two golf courses, recreation centers, pools, fitness facilities, and more than 80 organized clubs."
  },
  {
    "q": "What are guard-gated options in MacDonald Ranch?",
    "a": "MacDonald Highlands and The Foothills at MacDonald Ranch are both guard-gated communities. MacDonald Highlands' Dragon Rock enclave is double guard-gated for maximum privacy and exclusivity."
  },
  {
    "q": "What schools serve MacDonald Ranch?",
    "a": "The area is served by CCSD schools including Vanderburg Elementary (8/10), Del E. Webb Middle School (7/10), and Coronado High School (7/10). Henderson International School and Bishop Gorman are nearby private options."
  },
  {
    "q": "What ZIP codes cover MacDonald Ranch?",
    "a": "MacDonald Ranch spans ZIP codes 89012 and 89052 in the southeastern Henderson foothills."
  }
]

export default function MacdonaldRanchFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About MacDonald Ranch</h2>
          <p>The questions buyers ask most when exploring MacDonald Ranch.</p>
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
