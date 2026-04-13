'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Lake Las Vegas?",
    "a": "Homes in Lake Las Vegas range from approximately $400,000 for condos and townhomes in The Village area to over $5 million for custom lakefront estates on South Shore. New construction from national builders is available across a wide price range."
  },
  {
    "q": "Is Lake Las Vegas guard-gated?",
    "a": "Parts of Lake Las Vegas are guard-gated. The South Shore section features 24-hour guard-gated entry for its luxury neighborhoods. The broader community has controlled access points and security patrols."
  },
  {
    "q": "Can you swim or boat in Lake Las Vegas?",
    "a": "The 320-acre lake is open for kayaking, paddleboarding, and non-motorized watercraft. Swimming is available at community and resort pools. The lake is also stocked for fishing."
  },
  {
    "q": "What golf courses are at Lake Las Vegas?",
    "a": "Lake Las Vegas features two championship courses: Reflection Bay Golf Club, a Jack Nicklaus-designed public course ranked among Nevada's best, and SouthShore Country Club, a private club with its own Mediterranean-style clubhouse."
  },
  {
    "q": "What ZIP code is Lake Las Vegas in?",
    "a": "Lake Las Vegas is located in ZIP code 89011 in Henderson, Nevada."
  },
  {
    "q": "Is Lake Las Vegas a good investment?",
    "a": "Lake Las Vegas has seen significant appreciation since its post-recession revival, with new construction fueling continued demand. The resort amenities, lakefront lifestyle, and Henderson location support strong long-term value. Short-term rental income is also available for some property types."
  },
  {
    "q": "How far is Lake Las Vegas from the Strip?",
    "a": "Lake Las Vegas is approximately 30 minutes from the Las Vegas Strip via Lake Mead Parkway and the I-215/I-15 corridor. Harry Reid International Airport is also about 30 minutes away."
  },
  {
    "q": "Is there a 55+ community at Lake Las Vegas?",
    "a": "Yes. Del Webb at Lake Las Vegas is a 55+ active adult community within the Lake Las Vegas master plan, offering single-story homes with a dedicated recreation center, resort-style pool, and access to all Lake Las Vegas amenities."
  }
]

export default function LakeLasVegasFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Lake Las Vegas</h2>
          <p>The questions buyers ask most when exploring Lake Las Vegas.</p>
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
