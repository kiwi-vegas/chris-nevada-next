'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Terracina?",
    "a": "Homes in Terracina range from approximately $1 million for semi-custom homes to over $3 million for fully custom estates on premium view lots with Strip and mountain panoramas."
  },
  {
    "q": "Is Terracina guard-gated?",
    "a": "Yes. Terracina is a fully guard-gated community with a 24-hour staffed guard gate and security patrols. It is the most exclusive guard-gated enclave within the Seven Hills master plan."
  },
  {
    "q": "What views do Terracina homes have?",
    "a": "Terracina occupies an elevated ridgeline within Seven Hills. North-facing properties enjoy panoramic Las Vegas Strip views, while south and east-facing homes overlook the McCullough Range and Sloan Canyon."
  },
  {
    "q": "What ZIP code is Terracina in?",
    "a": "Terracina is in ZIP code 89052 in Henderson, Nevada, within the Seven Hills master-planned community."
  },
  {
    "q": "How large are homes in Terracina?",
    "a": "Homes in Terracina range from approximately 3,500 to over 7,000 square feet on lots from 10,000 to 20,000+ square feet. Both original custom builds and fully renovated contemporary estates are available."
  },
  {
    "q": "What are HOA fees in Terracina?",
    "a": "HOA fees in Terracina typically range from $300 to $600 per month, covering the guard gate staffing, security patrols, Seven Hills master association fee, and sub-association common area maintenance."
  },
  {
    "q": "How does Terracina compare to MacDonald Highlands?",
    "a": "Terracina offers guard-gated luxury with custom homes and Strip views at roughly one-third to one-half the price of comparable MacDonald Highlands properties. MacDonald Highlands offers a higher elevation, DragonRidge golf, and more ultra-luxury options."
  },
  {
    "q": "What golf courses are near Terracina?",
    "a": "Rio Secco Golf Club, a Rees Jones-designed championship course, is minutes from Terracina. The course features dramatic canyon terrain and is home to the Butch Harmon School of Golf."
  },
  {
    "q": "How does the guard gate entry process work?",
    "a": "Residents receive transponders or access codes for automatic entry. Guests must be called in by the homeowner or added to a pre-approved list. Delivery drivers and service providers follow the community's vendor access policy. Most guard-gated communities staff the gate 24 hours a day, 7 days a week."
  },
  {
    "q": "Can non-residents access the community for viewings?",
    "a": "Yes. Prospective buyers can access the community with a licensed real estate agent who coordinates entry with the guard gate in advance. Nevada Real Estate Group handles all gate access arrangements for property showings."
  },
  {
    "q": "What security features are included beyond the guard gate?",
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems."
  },
  {
    "q": "Are there custom home lot opportunities?",
    "a": "Some luxury communities offer vacant lots for custom home construction. Lot sizes, architectural guidelines, and approved builders vary by community. Nevada Real Estate Group can help identify available custom lot inventory and connect you with approved builders."
  },
  {
    "q": "What is the resale value trend for luxury homes in this area?",
    "a": "Luxury properties in guard-gated and premium communities have historically outperformed the broader market in terms of value retention during downturns and appreciation during growth periods. Limited supply in guard-gated communities creates structural price support."
  }
]

export default function SevenHillsTerracinaFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Terracina</h2>
          <p>The questions buyers ask most when exploring Terracina.</p>
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
