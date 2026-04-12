import TrustBar from '@/components/TrustBar'
import CommunityTabs from '@/components/CommunityTabs'
import HomepageListings from '@/components/HomepageListings'
import { getHomepage, getFeaturedReviews } from '@/sanity/queries'

export const revalidate = 60

export default async function HomePage() {
  const [cms, reviews] = await Promise.all([
    getHomepage(),
    getFeaturedReviews(),
  ])

  const heroHeadline = cms?.heroHeadline ?? "Nevada's Premier Real Estate Group"
  const heroSubheadline = cms?.heroSubheadline ?? 'Expert agents. Local knowledge.\nFrom luxury estates to first homes — we know every community.'
  const ctaHeadline = cms?.ctaStripHeadline ?? "Ready to Make Your Move?"
  const ctaBody = cms?.ctaStripBody ?? "Whether you're buying your first home or selling a luxury estate — our team of 150+ Nevada specialists is ready to deliver results."

  const googleReviews = reviews.filter(r => r.platform === 'google')
  const zillowReviews = reviews.filter(r => r.platform === 'zillow')

  // Fallback review content if Sanity has none yet
  const fallbackGoogle = [
    { reviewText: "Chris and his team went above and beyond from start to finish. We were relocating from California and they made the entire process seamless. Found our dream home in Summerlin in under two weeks.", reviewerName: "Sarah M. — Summerlin" },
    { reviewText: "Nevada Real Estate Group sold our Henderson home in 4 days, $22,000 over asking price. Their marketing strategy and negotiation skills are next level. Highly recommend.", reviewerName: "James & Lisa T. — Henderson" },
    { reviewText: "As a first-time buyer, I was nervous about the whole process. My agent walked me through every step and never made me feel pressured. Closed on a beautiful townhome in Green Valley Ranch.", reviewerName: "Marcus D. — Green Valley Ranch" },
    { reviewText: "We've worked with Chris Nevada's team twice now — once buying and once selling. Both experiences were exceptional. They know the Las Vegas market better than anyone.", reviewerName: "Patricia K. — Lake Las Vegas" },
  ]
  const fallbackZillow = [
    { reviewText: "Exceptional service from beginning to end. Our agent found us a home in Summerlin that wasn't even on the market yet. That kind of access and local knowledge is invaluable.", reviewerName: "Robert & Angela S. — Summerlin" },
    { reviewText: "The team's knowledge of the Reno market is unmatched. They helped us find a home in Damonte Ranch that checked every box and came in under budget.", reviewerName: "Kevin H. — Damonte Ranch, Reno" },
    { reviewText: "Sold my condo in 3 days. The professional photography and marketing package they put together was incredible. I've never seen a real estate team operate with this level of professionalism.", reviewerName: "Diana L. — Las Vegas" },
    { reviewText: "Chris Nevada's team handled our complex 1031 exchange with complete expertise. They coordinated everything across two states seamlessly. Outstanding professionals.", reviewerName: "Michael & Susan F. — Investor" },
  ]

  const displayGoogle = googleReviews.length ? googleReviews.map(r => ({ reviewText: r.reviewText, reviewerName: r.reviewerName })) : fallbackGoogle
  const displayZillow = zillowReviews.length ? zillowReviews.map(r => ({ reviewText: r.reviewText, reviewerName: r.reviewerName })) : fallbackZillow

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
              <span>Las Vegas</span>
            </div>
            <h1>{heroHeadline.includes("Premier") ? (
              <>Nevada&apos;s <em>Premier</em><br />Real Estate Group</>
            ) : heroHeadline}</h1>
            <p className="hero-sub">
              {heroSubheadline.split('\n').map((line, i) => (
                <span key={i}>{i === 0 ? <strong>{line}</strong> : line}{i === 0 && <br />}</span>
              ))}
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
      <TrustBar stats={cms?.trustStats} />

      {/* COMMUNITIES */}
      <CommunityTabs />

      {/* ALL LISTINGS */}
      <HomepageListings />

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
              <p>150+ agents across Las Vegas. Specialists in every price point, every neighborhood, and every type of transaction — from first homes to trophy estates.</p>
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
              {displayGoogle.map((r, i) => (
                <div className="review-card" key={i}>
                  <div className="review-card-stars">★★★★★</div>
                  <p className="review-card-text">&ldquo;{r.reviewText}&rdquo;</p>
                  <div className="review-card-author">— {r.reviewerName}</div>
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
              {displayZillow.map((r, i) => (
                <div className="review-card" key={i}>
                  <div className="review-card-stars">★★★★★</div>
                  <p className="review-card-text">&ldquo;{r.reviewText}&rdquo;</p>
                  <div className="review-card-author">— {r.reviewerName}</div>
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
          <h2>{ctaHeadline.includes("Move") ? <>Ready to Make <em>Your Move?</em></> : ctaHeadline}</h2>
          <p>{ctaBody}</p>
          <div className="cta-strip-buttons">
            <a href="tel:+17252399950" className="btn-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 01.12 2.74 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.46-.46a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>
              Call 725.239.9950
            </a>
            <a href="https://www.nevadarealestategroup.com/property-search/" className="btn-outline">Search Homes</a>
          </div>
          <p className="license-note">Nevada Lic. #S.0181401.LLC · Equal Housing Opportunity</p>
        </div>
      </section>
    </main>
  )
}
