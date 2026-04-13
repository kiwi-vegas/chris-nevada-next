'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Aliante?",
    "a": "Homes in Aliante range from approximately $300,000 for well-maintained resale properties to $650,000 for newer construction and premium golf-course-adjacent lots. Most homes fall in the $350K to $500K range."
  },
  {
    "q": "Is Aliante in Las Vegas or North Las Vegas?",
    "a": "Aliante is located in North Las Vegas, which is a separately incorporated city from Las Vegas. It is in the northernmost part of the Las Vegas Valley, accessible via I-15 and the 215 beltway."
  },
  {
    "q": "What golf course is in Aliante?",
    "a": "The Aliante Golf Club is an 18-hole championship course designed by Gary Panks. It winds through the community's residential neighborhoods and offers public play with preferred rates for Aliante residents."
  },
  {
    "q": "What ZIP codes are in Aliante?",
    "a": "Aliante is located in ZIP codes 89084 and 89085 in North Las Vegas. Home prices range from $300K–$650K."
  },
  {
    "q": "What is the Aliante Casino?",
    "a": "The Aliante Casino + Hotel + Spa is a full-service resort casino located within the Aliante master-planned community. It offers dining, entertainment, gaming, hotel accommodations, and spa services — all within walking distance of many Aliante neighborhoods."
  },
  {
    "q": "Is there a 55+ community in Aliante?",
    "a": "Yes. Sun City Aliante is a Del Webb 55+ active adult community within Aliante. It features single-story homes, a recreation center, pools, fitness facilities, and organized social activities for active adults."
  },
  {
    "q": "What are HOA fees in Aliante?",
    "a": "HOA fees in Aliante typically range from $50 to $175 per month, depending on the specific neighborhood. Fees cover common area maintenance, parks, trails, and community amenities. Club Aliante and Sun City Aliante have separate fee structures."
  },
  {
    "q": "How does Aliante compare to Summerlin?",
    "a": "Aliante offers a similar master-planned community experience to Summerlin — with golf, parks, trails, and commercial amenities — at price points typically 20–30% lower. The trade-off is a longer commute to the Strip and a North Las Vegas address."
  },
  {
    "q": "What are the best sub-neighborhoods within Aliante?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Aliante can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Aliante?",
    "a": "New construction availability varies by season and builder phase. Some sections of Aliante have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function AlianteFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Aliante</h2>
          <p>The questions buyers ask most when exploring Aliante.</p>
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
