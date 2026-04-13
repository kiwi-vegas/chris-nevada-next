'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Sunridge at MacDonald Ranch?",
    "a": "Homes in Sunridge range from approximately $600,000 for updated resales to $1.5 million for larger homes on golf course or premium view lots."
  },
  {
    "q": "Is Sunridge at MacDonald Ranch guard-gated?",
    "a": "No. Sunridge is not guard-gated. For guard-gated living in the MacDonald Ranch area, see Foothills at MacDonald Ranch or MacDonald Highlands."
  },
  {
    "q": "What golf courses are near Sunridge?",
    "a": "The Revere Golf Club borders several Sunridge neighborhoods, featuring two championship 18-hole courses — the Lexington and the Concord. DragonRidge Country Club (private) is also nearby in MacDonald Highlands."
  },
  {
    "q": "What ZIP code is Sunridge in?",
    "a": "Sunridge at MacDonald Ranch is located in ZIP code 89012 in Henderson, Nevada. Home prices range from $600K–$1.5M."
  },
  {
    "q": "How does Sunridge compare to Foothills at MacDonald Ranch?",
    "a": "The Foothills is guard-gated with higher prices ($1M–$4M) and more dramatic elevated views. Sunridge offers similar golf and mountain views at more accessible prices ($600K–$1.5M) without a guard gate."
  },
  {
    "q": "What are HOA fees in Sunridge?",
    "a": "HOA fees in Sunridge typically range from $100 to $250 per month, covering common area maintenance, landscaping of shared spaces, and community infrastructure."
  },
  {
    "q": "What schools serve Sunridge?",
    "a": "Sunridge is served by CCSD schools including Coronado High School (8/10), Bob Miller Middle School (7/10), and Fay Herron Elementary (7/10). Private and charter options are nearby."
  },
  {
    "q": "Is Sunridge a good area for families?",
    "a": "Yes. Sunridge attracts families with its safe neighborhoods, parks, Henderson school zoning, and proximity to community amenities. The golf course setting and mountain views add a lifestyle dimension that most family-priced communities lack."
  }
]

export default function SunridgeAtMacdonaldRanchFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Sunridge at MacDonald Ranch</h2>
          <p>The questions buyers ask most when exploring Sunridge at MacDonald Ranch.</p>
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
