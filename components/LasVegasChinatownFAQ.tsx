'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in the Chinatown area?",
    "a": "Homes in the Las Vegas Chinatown area range from approximately $250,000 for condos and older homes to $600,000 for larger renovated single-family homes and newer townhomes."
  },
  {
    "q": "Where is Las Vegas Chinatown located?",
    "a": "Las Vegas Chinatown stretches along Spring Mountain Road between Valley View Boulevard and Rainbow Boulevard, approximately 2 miles west of the Las Vegas Strip."
  },
  {
    "q": "Is Las Vegas Chinatown a good area to live?",
    "a": "Yes, especially for buyers who value dining, cultural vibrancy, and central location. The area offers some of the shortest commute times in Las Vegas and walkable access to hundreds of restaurants. Ongoing revitalization is driving improvement and property values."
  },
  {
    "q": "What ZIP codes cover Chinatown?",
    "a": "The Chinatown area spans ZIP codes 89102, 89103, and 89146 in central Las Vegas."
  },
  {
    "q": "How far is Chinatown from the Strip?",
    "a": "Chinatown is approximately 5-10 minutes from the Las Vegas Strip via Spring Mountain Road. It is one of the closest residential areas to the resort corridor."
  },
  {
    "q": "Is Chinatown a good investment area?",
    "a": "Yes. Chinatown's proximity to the Strip, expanding restaurant scene, and ongoing commercial investment are driving property values. The area attracts strong rental demand from hospitality workers and UNLV students."
  },
  {
    "q": "What types of food are in Las Vegas Chinatown?",
    "a": "Las Vegas Chinatown features hundreds of restaurants spanning Chinese, Japanese, Korean, Vietnamese, Thai, Filipino, Taiwanese, and fusion cuisines. It is widely regarded as having the best Asian food scene west of New York outside San Francisco."
  },
  {
    "q": "Are there new construction options in Chinatown?",
    "a": "Yes. Several newer townhome developments from the 2010s-2020s offer modern design and low-maintenance living within the Chinatown corridor. New residential projects continue to be developed as the area grows."
  }
]

export default function LasVegasChinatownFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Chinatown</h2>
          <p>The questions buyers ask most when exploring Chinatown.</p>
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
