'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Iron Mountain Ranch?",
    "a": "Homes in Iron Mountain Ranch range from approximately $350,000 for smaller homes to $600,000 for premium homes on the best lots with mountain views."
  },
  {
    "q": "Is Iron Mountain Ranch guard-gated?",
    "a": "No — Iron Mountain Ranch is not guard-gated. It is an open community with HOA governance and well-maintained common areas."
  },
  {
    "q": "What ZIP code is Iron Mountain Ranch in?",
    "a": "Iron Mountain Ranch is located in ZIP code 89131 in northwest Las Vegas."
  },
  {
    "q": "What schools serve Iron Mountain Ranch?",
    "a": "Iron Mountain Ranch is served by CCSD schools including Shadow Ridge High School. Charter options like Doral Academy (9/10) provide school choice. Bishop Gorman (A+) is the top private option."
  },
  {
    "q": "What are HOA fees in Iron Mountain Ranch?",
    "a": "HOA fees are low, typically $50 to $150 per month, covering common area maintenance and community landscaping."
  },
  {
    "q": "How does Iron Mountain Ranch compare to Skye Canyon?",
    "a": "Iron Mountain Ranch offers more established neighborhoods with mature landscaping at lower price points. Skye Canyon is newer with more current architecture and the Skye Center amenity hub, but at higher prices."
  },
  {
    "q": "Who built homes in Iron Mountain Ranch?",
    "a": "Major builders include Richmond American, KB Home, and Beazer Homes. The variety of builders provides diverse floor plan options throughout the community."
  },
  {
    "q": "Is Iron Mountain Ranch a good investment?",
    "a": "Iron Mountain Ranch has shown strong long-term appreciation and the affordable price points create strong rental demand. The northwest valley's continued growth supports ongoing value."
  }
]

export default function IronMountainRanchFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Iron Mountain Ranch</h2>
          <p>The questions buyers ask most when exploring Iron Mountain Ranch.</p>
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
