'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes on Mount Charleston?",
    "a": "Homes on Mount Charleston range from approximately $400,000 for rustic cabins to over $1.5 million for custom mountain estates with premium views and modern construction."
  },
  {
    "q": "Does it snow on Mount Charleston?",
    "a": "Yes. Mount Charleston receives significant snowfall each winter, typically from November through March. The Lee Canyon area at higher elevation receives the most snow, supporting the Lee Canyon Ski Resort."
  },
  {
    "q": "Can you live on Mount Charleston year-round?",
    "a": "Yes. Most Mount Charleston residents are full-time, year-round residents. The roads are maintained by NDOT through winter, though chains or 4WD may be advisable during heavy snowstorms."
  },
  {
    "q": "How far is Mount Charleston from Las Vegas?",
    "a": "Mount Charleston is approximately 35 minutes from the Las Vegas Strip via Kyle Canyon Road. Many residents commute daily to valley-floor jobs."
  },
  {
    "q": "What is the elevation of Mount Charleston?",
    "a": "Residential areas range from approximately 6,500 to 8,500 feet elevation. Charleston Peak, the highest point, reaches 11,916 feet — the tallest peak in the Spring Mountains."
  },
  {
    "q": "Is there a ski resort on Mount Charleston?",
    "a": "Yes. Lee Canyon Ski & Snowboard Resort offers 195 acres of skiable terrain with 3 chairlifts, night skiing, and a lodge. It is Nevada's only ski area."
  },
  {
    "q": "Are there stores and restaurants on Mount Charleston?",
    "a": "The Mount Charleston Lodge (rebuilt after the 2021 fire) provides dining and events. For full grocery and retail, residents drive to the Summerlin area, approximately 25 minutes downhill."
  },
  {
    "q": "How many homes are on Mount Charleston?",
    "a": "Mount Charleston has approximately 500 homes split between Kyle Canyon, Lee Canyon, and Rainbow Canyon. Development is constrained by National Forest boundaries, ensuring permanent scarcity."
  }
]

export default function MountCharlestonFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Mount Charleston</h2>
          <p>The questions buyers ask most when exploring Mount Charleston.</p>
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
