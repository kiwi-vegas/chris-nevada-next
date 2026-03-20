import TrustBar from '@/components/TrustBar'
import CommunityTabs from '@/components/CommunityTabs'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section id="hero">
        <div className="hero-video-wrapper">
          <iframe
            src="https://player.vimeo.com/video/1172292123?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&controls=0&dnt=1"
            frameBorder="0"
            allow="autoplay; fullscreen"
            title="Las Vegas aerial video background"
          />
        </div>
        <div className="hero-overlay-gradient" />
        <div className="hero-overlay-bottom" />
        <div className="container">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-line" />
              <span>Las Vegas and Reno</span>
            </div>
            <h1>Nevada&apos;s <em>Premier</em><br />Real Estate Group</h1>
            <p className="hero-sub">
              <strong>Expert agents. Local knowledge.</strong><br />
              From luxury estates to first homes — we know every community.
            </p>
            <div className="hero-ctas">
              <a href="#communities" className="btn-primary">
                Search Homes
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="tel:+17252399950" className="btn-outline">Free Consultation</a>
            </div>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </div>
      </section>

      {/* TRUST BAR */}
      <TrustBar />

      {/* COMMUNITIES */}
      <CommunityTabs />

      {/* RECENT SALES */}
      <section id="recent-sales">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Track Record</span>
            <h2>Recently Sold Properties</h2>
            <p>A snapshot of our recent closings across Las Vegas and Reno — representing buyers and sellers at every price point.</p>
          </div>
          <div className="property-grid">
            {[
              { price: '$1,240,000', addr: '2847 Quiet Sunrise Ct', city: 'Summerlin, Las Vegas NV', beds: 5, baths: 4, sqft: '4,280', days: '11 days', img: '1613977257363-707ba9348227' },
              { price: '$875,000', addr: '9134 Marble Canyon Dr', city: 'The Ridges, Las Vegas NV', beds: 4, baths: 3, sqft: '3,190', days: '8 days', img: '1600047509807-ba8f99d2cdde' },
              { price: '$649,000', addr: '5521 Eagle Talon Ct', city: 'Henderson / Anthem, NV', beds: 4, baths: 3, sqft: '2,640', days: '14 days', img: '1564013799019-4e83e912d666' },
              { price: '$525,000', addr: '3318 Quiet Brook Ave', city: 'Green Valley Ranch, NV', beds: 3, baths: 2, sqft: '2,150', days: '6 days', img: '1558618666-fcd25c85cd64' },
              { price: '$1,850,000', addr: '7742 Painted Feather Way', city: 'MacDonald Highlands, NV', beds: 6, baths: 5, sqft: '5,920', days: '19 days', img: '1512917774080-a3d80f5e9bc2' },
              { price: '$415,000', addr: '4409 Chaparral Ridge Pl', city: 'North Las Vegas, NV', beds: 3, baths: 2, sqft: '1,890', days: '4 days', img: '1570129477492-1f17d2b9e76f' },
              { price: '$780,000', addr: '1205 Alton Rd', city: 'Damonte Ranch, Reno NV', beds: 4, baths: 3, sqft: '3,020', days: '9 days', img: '1560518883-ce09059eeffa' },
              { price: '$595,000', addr: '889 Caughlin Creek Rd', city: 'Caughlin Ranch, Reno NV', beds: 3, baths: 3, sqft: '2,480', days: '12 days', img: '1448630483-2f0060fb9dc8' },
            ].map((p, i) => (
              <div className="property-card" key={i}>
                <div className="property-photo">
                  <img src={`https://images.unsplash.com/photo-${p.img}?auto=format&fit=crop&w=600&h=400&q=80`} alt={p.addr} />
                  <span className="sold-badge">Sold</span>
                  <span className="days-badge">{p.days}</span>
                </div>
                <div className="property-body">
                  <div className="property-price">{p.price}</div>
                  <div className="property-address">{p.addr}</div>
                  <div className="property-city">{p.city}</div>
                  <div className="property-specs">
                    <span className="property-spec">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
                      {p.beds} bd
                    </span>
                    <span className="property-spec">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h16M4 6h16M4 18h7"/></svg>
                      {p.baths} ba
                    </span>
                    <span className="property-spec">{p.sqft} sqft</span>
                  </div>
                  <span className="property-tag">Represented Client</span>
                </div>
              </div>
            ))}
          </div>
          <p className="sold-disclaimer">Recently sold properties shown for illustrative purposes. MLS data deemed reliable but not guaranteed. © 2025 Nevada Real Estate Group.</p>
        </div>
      </section>

      {/* CALLOUTS */}
      <section id="callouts">
        <div className="container">
          <div className="callouts-grid">
            <div className="callout-card">
              <div className="callout-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              </div>
              <h3>Search All Nevada Homes</h3>
              <p>Live MLS data updated daily. Search by city, neighborhood, price, bedrooms, and more. Set up instant alerts when new listings match your criteria.</p>
              <a href="https://www.nevadarealestategroup.com/property-search/" className="callout-btn">Start Searching →</a>
            </div>
            <div className="callout-card">
              <div className="callout-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
              </div>
              <h3>What&apos;s My Home Worth?</h3>
              <p>Get a free, no-obligation market analysis from our team. We track every sale in your neighborhood and will give you an honest assessment of your home&apos;s value.</p>
              <a href="https://www.nevadarealestategroup.com/free-market-analysis/" className="callout-btn">Get Free CMA →</a>
            </div>
            <div className="callout-card">
              <div className="callout-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
              </div>
              <h3>Meet the Team</h3>
              <p>150+ agents across Las Vegas and Reno. Specialists in every price point, every neighborhood, and every type of transaction — from first homes to trophy estates.</p>
              <a href="https://www.nevadarealestategroup.com/about/" className="callout-btn">Meet Our Agents →</a>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Social Proof</span>
            <h2>What Our Clients Say</h2>
            <p>5,770+ verified reviews across Google and Zillow. Here&apos;s what Nevada families are saying about working with our team.</p>
          </div>
          <div className="reviews-counts">
            <div className="reviews-count-card">
              <div className="rcc-platform google">G</div>
              <div className="rcc-count">2,560+</div>
              <div className="rcc-meta">
                <div className="rcc-stars">★★★★★</div>
                <div className="rcc-label">Google Reviews</div>
              </div>
              <a href="https://share.google/RndBhGHXBHjfihGd2" target="_blank" rel="noreferrer" className="rcc-link">View All →</a>
            </div>
            <div className="reviews-count-card">
              <div className="rcc-platform zillow">Z</div>
              <div className="rcc-count">3,210+</div>
              <div className="rcc-meta">
                <div className="rcc-stars">★★★★★</div>
                <div className="rcc-label">Zillow Reviews</div>
              </div>
              <a href="https://www.zillow.com/profile/NevadaGroup" target="_blank" rel="noreferrer" className="rcc-link">View All →</a>
            </div>
          </div>
          <div className="reviews-carousel-wrap">
            <div className="reviews-carousel-label">
              <span className="rcc-platform google" style={{fontSize:'22px', width:'auto'}}>G</span>
              <h3>Google Reviews</h3>
            </div>
            <div className="reviews-carousel" id="carousel-google">
              {[
                { text: "Chris and his team went above and beyond from start to finish. We were relocating from California and they made the entire process seamless. Found our dream home in Summerlin in under two weeks.", author: "Sarah M. — Summerlin" },
                { text: "Nevada Real Estate Group sold our Henderson home in 4 days, $22,000 over asking price. Their marketing strategy and negotiation skills are next level. Highly recommend.", author: "James & Lisa T. — Henderson" },
                { text: "As a first-time buyer, I was nervous about the whole process. My agent walked me through every step and never made me feel pressured. Closed on a beautiful townhome in Green Valley Ranch.", author: "Marcus D. — Green Valley Ranch" },
                { text: "We've worked with Chris Nevada's team twice now — once buying and once selling. Both experiences were exceptional. They know the Las Vegas market better than anyone.", author: "Patricia K. — Lake Las Vegas" },
              ].map((r, i) => (
                <div className="review-card" key={i}>
                  <div className="review-card-stars">★★★★★</div>
                  <p className="review-card-text">&ldquo;{r.text}&rdquo;</p>
                  <div className="review-card-author">— {r.author}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="reviews-carousel-wrap">
            <div className="reviews-carousel-label">
              <span className="rcc-platform zillow" style={{fontSize:'22px', width:'auto'}}>Z</span>
              <h3>Zillow Reviews</h3>
            </div>
            <div className="reviews-carousel" id="carousel-zillow">
              {[
                { text: "Exceptional service from beginning to end. Our agent found us a home in Summerlin that wasn't even on the market yet. That kind of access and local knowledge is invaluable.", author: "Robert & Angela S. — Summerlin" },
                { text: "The team's knowledge of the Reno market is unmatched. They helped us find a home in Damonte Ranch that checked every box and came in under budget.", author: "Kevin H. — Damonte Ranch, Reno" },
                { text: "Sold my condo in 3 days. The professional photography and marketing package they put together was incredible. I've never seen a real estate team operate with this level of professionalism.", author: "Diana L. — Las Vegas" },
                { text: "Chris Nevada's team handled our complex 1031 exchange with complete expertise. They coordinated everything across two states seamlessly. Outstanding professionals.", author: "Michael & Susan F. — Investor" },
              ].map((r, i) => (
                <div className="review-card" key={i}>
                  <div className="review-card-stars">★★★★★</div>
                  <p className="review-card-text">&ldquo;{r.text}&rdquo;</p>
                  <div className="review-card-author">— {r.author}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section id="cta-strip">
        <div className="container">
          <span className="gold-rule" />
          <h2>Ready to Make <em>Your Move?</em></h2>
          <p>Whether you&apos;re buying your first home or selling a luxury estate — our team of 150+ Nevada specialists is ready to deliver results.</p>
          <div className="cta-strip-buttons">
            <a href="tel:+17252399950" className="btn-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 01.12 2.74 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.46-.46a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>
              Call 725.239.9950
            </a>
            <a href="https://www.nevadarealestategroup.com/property-search/" className="btn-outline">Search Homes</a>
          </div>
          <p className="license-note">Nevada Lic. #S.0181401.LLC · lpt Realty · Equal Housing Opportunity</p>
        </div>
      </section>
    </main>
  )
}
