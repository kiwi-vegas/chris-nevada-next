'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Ascaya?",
    "a": "Finished homes in Ascaya range from approximately $3 million to over $20 million. Vacant lots start around $1 million and can exceed $5 million for premium ridgeline positions. Buyers purchase a lot and build a custom home with an approved architect and builder."
  },
  {
    "q": "Is Ascaya guard-gated?",
    "a": "Yes. Ascaya is a fully guard-gated community with a 24-hour staffed gate and advanced security infrastructure. It is one of the most private residential enclaves in the Las Vegas Valley."
  },
  {
    "q": "What ZIP code is Ascaya in?",
    "a": "Ascaya is located in ZIP code 89012 in Henderson, Nevada."
  },
  {
    "q": "Who is the primary builder at Ascaya?",
    "a": "Blue Heron is the most prominent builder at Ascaya, known for award-winning desert-contemporary estates with disappearing glass walls, negative-edge pools, and smart-home technology. Other approved custom builders also construct homes in the community."
  },
  {
    "q": "How many lots are in Ascaya?",
    "a": "Ascaya has 313 custom home lots spread across 313 acres along the McCullough Range ridgeline. Lots range from approximately one-third of an acre to over one acre, all with engineered pad sites and underground utilities."
  },
  {
    "q": "What amenities does Ascaya offer?",
    "a": "The Ascaya Clubhouse features a resort-style infinity pool overlooking the Las Vegas Valley, a fitness center, private event space, outdoor lounge areas, and concierge services for residents."
  },
  {
    "q": "What are HOA fees at Ascaya?",
    "a": "HOA fees at Ascaya typically range from $600 to $1,500 per month, covering guard gate staffing, security patrols, common area maintenance, clubhouse operations, and community infrastructure."
  },
  {
    "q": "What views do Ascaya homes have?",
    "a": "Ascaya lots offer panoramic views of the Las Vegas Strip, the entire Las Vegas Valley, the Spring Mountains, and the surrounding McCullough Range. Every lot was specifically engineered for unobstructed views from its elevated ridgeline position."
  }
]

export default function AscayaFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Ascaya</h2>
          <p>The questions buyers ask most when exploring Ascaya.</p>
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
