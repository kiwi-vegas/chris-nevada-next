'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Rancho Circle?",
    "a": "Homes in Rancho Circle range from approximately $1 million for original mid-century properties requiring renovation to over $8 million for fully updated or rebuilt contemporary estates on premium multi-acre lots."
  },
  {
    "q": "Is Rancho Circle guard-gated?",
    "a": "Yes. Rancho Circle has been a guard-gated community since the 1950s, making it one of the oldest guard-gated residential enclaves in the American West. A 24-hour staffed guard gate controls entry."
  },
  {
    "q": "How big are the lots in Rancho Circle?",
    "a": "Lots in Rancho Circle range from approximately one acre to over five acres, making them the largest residential parcels in central Las Vegas. Many estates include guest houses, equestrian facilities, and resort-style grounds."
  },
  {
    "q": "What is the history of Rancho Circle?",
    "a": "Rancho Circle was established in the 1950s and has been home to Las Vegas casino pioneers, entertainers, business leaders, and prominent families for over seven decades. It is the most historically significant residential community in the city."
  },
  {
    "q": "Can you build a new home in Rancho Circle?",
    "a": "Yes. Many buyers purchase existing properties and do complete ground-up rebuilds on the original multi-acre lots. The community has seen impressive contemporary desert-modern estates built alongside preserved vintage homes."
  },
  {
    "q": "What are HOA fees in Rancho Circle?",
    "a": "HOA fees in Rancho Circle typically range from $250 to $600 per month. Fees cover guard gate staffing, 24-hour security, common area maintenance, and community infrastructure."
  },
  {
    "q": "What ZIP code is Rancho Circle in?",
    "a": "Rancho Circle is located in ZIP code 89107 in central-west Las Vegas, near the intersection of Rancho Drive and Alta Drive."
  },
  {
    "q": "How does Rancho Circle compare to The Ridges?",
    "a": "Rancho Circle offers multi-acre estate lots in a central Las Vegas location with seven decades of history, while The Ridges in Summerlin offers newer construction with Red Rock Canyon views. Rancho Circle provides larger lots and a more established, pastoral character; The Ridges offers a more cohesive contemporary design aesthetic."
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

export default function RanchoCircleFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Rancho Circle</h2>
          <p>The questions buyers ask most when exploring Rancho Circle.</p>
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
