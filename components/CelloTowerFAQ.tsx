'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for Cello Tower?",
    "a": "Residences in Cello Tower range from approximately $700,000 for entry-level units to over $4.5 million for the most exclusive penthouses with panoramic Strip and mountain views."
  },
  {
    "q": "When will Cello Tower be completed?",
    "a": "Cello Tower is currently under construction in Downtown Las Vegas. It is the first new luxury high-rise in downtown in over 15 years. Contact our team for the latest delivery timeline."
  },
  {
    "q": "How many units are in Cello Tower?",
    "a": "Cello Tower includes 240 residences across multiple floor plan types, from efficient city residences to expansive penthouses."
  },
  {
    "q": "Where is Cello Tower located?",
    "a": "Cello Tower is located in Downtown Las Vegas, near Symphony Park and the Arts District. It is steps from the Smith Center for the Performing Arts, Fremont East, and downtown's growing dining and entertainment corridor. Cello Tower is ~5 min to the Strip via Las Vegas Blvd."
  },
  {
    "q": "What amenities does Cello Tower offer?",
    "a": "The tower features a rooftop infinity pool and lounge, state-of-the-art fitness center, co-working spaces, private dining and entertainment rooms, concierge services, secure parking, and ground-floor retail."
  },
  {
    "q": "Is there parking at Cello Tower?",
    "a": "Yes. Cello Tower includes secure, dedicated parking for residents. Premium parking options may be available for larger residences and penthouses."
  },
  {
    "q": "What is the Arts District like?",
    "a": "The Las Vegas Arts District, located adjacent to Cello Tower, is a vibrant neighborhood of galleries, breweries, restaurants, vintage shops, and creative studios. Monthly First Friday events attract thousands of visitors."
  },
  {
    "q": "How does Cello Tower compare to Strip high-rises?",
    "a": "Cello Tower offers brand-new construction, modern design, and lower HOA fees compared to aging Strip high-rises like Veer, Panorama, or Waldorf Astoria. Its downtown location provides a more neighborhood-oriented, walkable lifestyle."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. Cello Tower features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
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

export default function CelloTowerFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Cello Tower</h2>
          <p>The questions buyers ask most when exploring Cello Tower.</p>
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
