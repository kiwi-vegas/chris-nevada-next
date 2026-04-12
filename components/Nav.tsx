'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleGroup = (key: string) =>
    setOpenGroups(prev => ({ ...prev, [key]: !prev[key] }))

  const closeMobile = () => {
    setMobileOpen(false)
    setOpenGroups({})
  }

  return (
    <>
      <nav id="nav" className={scrolled ? 'scrolled' : ''}>
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <Image src="/logo.png" alt="Nevada Real Estate Group" width={160} height={40} priority />
          </Link>

          <ul className="nav-links">
            <li className="nav-item">
              <button className="nav-trigger">
                Buyers
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              <div className="nav-dropdown">
                <Link href="/buyers/">Work With a Realtor</Link>
                <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV" target="_blank" rel="noopener noreferrer">Browse Homes for Sale</a>
                <Link href="/buyers/personalized-home-search/">Get Listing Alerts</Link>
                <hr />
                <Link href="/buyers/#resources">Resources for Buyers</Link>
                <Link href="/buyers/first-time-buyers/">First Time Buyers</Link>
                <Link href="/buyers/mortgage-calculator/">Mortgage Calculator</Link>
                <Link href="/buyers/mortgage-pre-approval/">Mortgage Pre-Approval</Link>
                <hr />
                <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[yearMin]=2025" target="_blank" rel="noopener noreferrer">New Construction</a>
              </div>
            </li>
            <li className="nav-item">
              <button className="nav-trigger">
                Sell Your Home
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              <div className="nav-dropdown">
                <Link href="/sellers/">Work With a Realtor</Link>
                <a href="https://nevadarealestategroup.hifello.com/lp/63ef80d5109ae10018e62028" target="_blank" rel="noopener noreferrer">Free Market Analysis</a>
                <Link href="/sellers/7-day-listing-agreement/">7-Day Listing Agreement</Link>
                <hr />
                <Link href="/sellers/#resources">Resources for Sellers</Link>
              </div>
            </li>
            <li className="nav-item communities-trigger">
              <button className="nav-trigger">
                Communities
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              <div className="communities-panel-nav">
                <div>
                  <div className="comm-col-label">Las Vegas</div>
                  <Link href="/enterprise/">Enterprise</Link>
                  <Link href="/spring-valley/">Spring Valley</Link>
                  <Link href="/paradise/">Paradise</Link>
                  <Link href="/southern-highlands/">Southern Highlands</Link>
                  <Link href="/mountains-edge/">Mountains Edge</Link>
                  <Link href="/the-lakes/">The Lakes</Link>
                  <Link href="/desert-shores/">Desert Shores</Link>
                  <Link href="/rhodes-ranch/">Rhodes Ranch</Link>
                </div>
                <div>
                  <div className="comm-col-label">Henderson</div>
                  <Link href="/henderson/">Henderson / Anthem</Link>
                  <Link href="/anthem/">Anthem</Link>
                  <Link href="/cadence/">Cadence</Link>
                  <Link href="/inspirada/">Inspirada</Link>
                  <Link href="/green-valley-ranch/">Green Valley Ranch</Link>
                  <Link href="/seven-hills/">Seven Hills</Link>
                  <Link href="/lake-las-vegas/">Lake Las Vegas</Link>
                  <Link href="/macdonald-highlands/">MacDonald Highlands</Link>
                  <Link href="/whitney-ranch/">Whitney Ranch</Link>
                  <Link href="/tuscany-village/">Tuscany Village</Link>
                  <Link href="/silverado-ranch/">Silverado Ranch</Link>
                </div>
                <div>
                  <div className="comm-col-label">North Las Vegas</div>
                  <Link href="/north-las-vegas/">North Las Vegas</Link>
                  <Link href="/aliante/">Aliante</Link>
                  <Link href="/skye-canyon/">Skye Canyon</Link>
                  <Link href="/centennial-hills/">Centennial Hills</Link>
                  <Link href="/lone-mountain/">Lone Mountain</Link>
                  <Link href="/providence/">Providence</Link>
                </div>
                <div>
                  <div className="comm-col-label">Summerlin</div>
                  <Link href="/summerlin/">Summerlin</Link>
                  <Link href="/summerlin-west/">Summerlin West</Link>
                  <Link href="/red-rock-country-club/">Red Rock Country Club</Link>
                </div>
                <div>
                  <div className="comm-col-label">Boulder City</div>
                  <Link href="/boulder-city/">Boulder City</Link>
                </div>
              </div>
            </li>
            <li className="nav-item"><Link href="/blog" className="nav-link">Blog</Link></li>
            <li className="nav-item"><a href="https://www.nevadarealestategroup.com/about/" className="nav-link">About Us</a></li>
          </ul>

          <div className="nav-cta">
            <a href="tel:+17252399950" className="btn-nav">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 01.12 2.74 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.46-.46a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>
              725.239.9950
            </a>
          </div>

          <button className="nav-hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div className={`nav-mobile${mobileOpen ? ' open' : ''}`}>
        {['Buyers','Sell Your Home','Communities'].map(group => (
          <div key={group}>
            <button className={`mob-group-toggle${openGroups[group] ? ' open' : ''}`} onClick={() => toggleGroup(group)}>
              {group}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div className={`mob-submenu${openGroups[group] ? ' open' : ''}`}>
              {group === 'Buyers' && <>
                <Link href="/buyers/" className="mobile-nav-link" onClick={closeMobile}>Work With a Realtor</Link>
                <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV" target="_blank" rel="noopener noreferrer" className="mobile-nav-link" onClick={closeMobile}>Browse Homes</a>
                <Link href="/buyers/personalized-home-search/" className="mobile-nav-link" onClick={closeMobile}>Get Listing Alerts</Link>
                <Link href="/buyers/first-time-buyers/" className="mobile-nav-link" onClick={closeMobile}>First Time Buyers</Link>
                <Link href="/buyers/mortgage-calculator/" className="mobile-nav-link" onClick={closeMobile}>Mortgage Calculator</Link>
                <Link href="/buyers/mortgage-pre-approval/" className="mobile-nav-link" onClick={closeMobile}>Mortgage Pre-Approval</Link>
                <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[yearMin]=2025" target="_blank" rel="noopener noreferrer" className="mobile-nav-link" onClick={closeMobile}>New Construction</a>
              </>}
              {group === 'Sell Your Home' && <>
                <Link href="/sellers/" className="mobile-nav-link" onClick={closeMobile}>Work With a Realtor</Link>
                <a href="https://nevadarealestategroup.hifello.com/lp/63ef80d5109ae10018e62028" target="_blank" rel="noopener noreferrer" className="mobile-nav-link" onClick={closeMobile}>Free Market Analysis</a>
                <Link href="/sellers/7-day-listing-agreement/" className="mobile-nav-link" onClick={closeMobile}>7-Day Listing Agreement</Link>
                <Link href="/sellers/#resources" className="mobile-nav-link" onClick={closeMobile}>Resources for Sellers</Link>
              </>}
              {group === 'Communities' && <>
                <div className="mob-city-label">Las Vegas</div>
                <Link href="/enterprise/" className="mobile-nav-link" onClick={closeMobile}>Enterprise</Link>
                <Link href="/spring-valley/" className="mobile-nav-link" onClick={closeMobile}>Spring Valley</Link>
                <Link href="/paradise/" className="mobile-nav-link" onClick={closeMobile}>Paradise</Link>
                <Link href="/southern-highlands/" className="mobile-nav-link" onClick={closeMobile}>Southern Highlands</Link>
                <Link href="/mountains-edge/" className="mobile-nav-link" onClick={closeMobile}>Mountains Edge</Link>
                <Link href="/the-lakes/" className="mobile-nav-link" onClick={closeMobile}>The Lakes</Link>
                <Link href="/desert-shores/" className="mobile-nav-link" onClick={closeMobile}>Desert Shores</Link>
                <Link href="/rhodes-ranch/" className="mobile-nav-link" onClick={closeMobile}>Rhodes Ranch</Link>
                <div className="mob-city-label" style={{marginTop:'8px'}}>Henderson</div>
                <Link href="/henderson/" className="mobile-nav-link" onClick={closeMobile}>Henderson / Anthem</Link>
                <Link href="/anthem/" className="mobile-nav-link" onClick={closeMobile}>Anthem</Link>
                <Link href="/cadence/" className="mobile-nav-link" onClick={closeMobile}>Cadence</Link>
                <Link href="/inspirada/" className="mobile-nav-link" onClick={closeMobile}>Inspirada</Link>
                <Link href="/green-valley-ranch/" className="mobile-nav-link" onClick={closeMobile}>Green Valley Ranch</Link>
                <Link href="/seven-hills/" className="mobile-nav-link" onClick={closeMobile}>Seven Hills</Link>
                <Link href="/lake-las-vegas/" className="mobile-nav-link" onClick={closeMobile}>Lake Las Vegas</Link>
                <Link href="/macdonald-highlands/" className="mobile-nav-link" onClick={closeMobile}>MacDonald Highlands</Link>
                <Link href="/whitney-ranch/" className="mobile-nav-link" onClick={closeMobile}>Whitney Ranch</Link>
                <Link href="/tuscany-village/" className="mobile-nav-link" onClick={closeMobile}>Tuscany Village</Link>
                <Link href="/silverado-ranch/" className="mobile-nav-link" onClick={closeMobile}>Silverado Ranch</Link>
                <div className="mob-city-label" style={{marginTop:'8px'}}>North Las Vegas</div>
                <Link href="/north-las-vegas/" className="mobile-nav-link" onClick={closeMobile}>North Las Vegas</Link>
                <Link href="/aliante/" className="mobile-nav-link" onClick={closeMobile}>Aliante</Link>
                <Link href="/skye-canyon/" className="mobile-nav-link" onClick={closeMobile}>Skye Canyon</Link>
                <Link href="/centennial-hills/" className="mobile-nav-link" onClick={closeMobile}>Centennial Hills</Link>
                <Link href="/lone-mountain/" className="mobile-nav-link" onClick={closeMobile}>Lone Mountain</Link>
                <Link href="/providence/" className="mobile-nav-link" onClick={closeMobile}>Providence</Link>
                <div className="mob-city-label" style={{marginTop:'8px'}}>Summerlin</div>
                <Link href="/summerlin/" className="mobile-nav-link" onClick={closeMobile}>Summerlin</Link>
                <Link href="/summerlin-west/" className="mobile-nav-link" onClick={closeMobile}>Summerlin West</Link>
                <Link href="/red-rock-country-club/" className="mobile-nav-link" onClick={closeMobile}>Red Rock Country Club</Link>
                <div className="mob-city-label" style={{marginTop:'8px'}}>Boulder City</div>
                <Link href="/boulder-city/" className="mobile-nav-link" onClick={closeMobile}>Boulder City</Link>
              </>}
            </div>
          </div>
        ))}
        <Link href="/blog" className="mobile-nav-link" onClick={closeMobile}>Blog</Link>
        <a href="https://www.nevadarealestategroup.com/about/" className="mobile-nav-link" onClick={closeMobile}>About Us</a>
        <div className="mob-cta">
          <a href="tel:+17252399950" className="btn-nav">Call 725.239.9950</a>
        </div>
      </div>
    </>
  )
}
