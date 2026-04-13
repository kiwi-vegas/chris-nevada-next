'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Inspirada?",
    "a": "Homes in Inspirada range from approximately $420,000 for entry-level new construction to over $1.1 million for premium luxury homes by Toll Brothers and other top builders."
  },
  {
    "q": "Is Inspirada guard-gated?",
    "a": "No. Inspirada is not a guard-gated community. It is an open master-planned community with HOA governance, maintained common areas, and the safety benefits of Henderson — one of America's safest large cities."
  },
  {
    "q": "Is Inspirada still building new homes?",
    "a": "Yes. Inspirada continues to offer new construction from multiple national builders including Toll Brothers, Lennar, and Century Communities across several active neighborhoods."
  },
  {
    "q": "What ZIP code is Inspirada in?",
    "a": "Inspirada is located in ZIP code 89044 in Henderson, Nevada."
  },
  {
    "q": "What are HOA fees in Inspirada?",
    "a": "HOA fees in Inspirada typically range from $100 to $250 per month, covering access to community parks, pools, trails, gathering spaces, and common area maintenance."
  },
  {
    "q": "What schools serve Inspirada?",
    "a": "Inspirada is served by CCSD schools including Elise L. Wolff Elementary (6/10), Del E. Webb Middle School (7/10), and Liberty High School (6/10). Charter options include Doral Academy (9/10) and Somerset Academy (8/10)."
  },
  {
    "q": "What amenities does Inspirada offer?",
    "a": "Inspirada features over 600 acres of open space, resort-style pools, splash pads, landscaped plazas with fire features, sports courts, playgrounds, and miles of interconnected walking and biking trails connecting every neighborhood."
  },
  {
    "q": "How does Inspirada compare to Cadence?",
    "a": "Both are newer Henderson master plans with new construction. Inspirada emphasizes community design, gathering spaces, and open space (600+ acres). Cadence is newer and more centrally located with fiber internet and a sports complex. Inspirada's price range starts slightly higher ($420K vs $350K)."
  },
  {
    "q": "What are the best sub-neighborhoods within Inspirada?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Inspirada can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Inspirada?",
    "a": "New construction availability varies by season and builder phase. Some sections of Inspirada have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function InspiradaFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Inspirada</h2>
          <p>The questions buyers ask most when exploring Inspirada.</p>
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
