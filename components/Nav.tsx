'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [commOpen, setCommOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMobile = () => {
    setMobileOpen(false)
    setCommOpen(false)
  }

  return (
    <>
      <nav id="nav" className={scrolled ? 'scrolled' : ''}>
        <div className="nav-inner">
          {/* LEFT LINKS */}
          <div className="nav-left">
            <Link href="/buyers/" className="nav-link">Buy a Home</Link>
            <Link href="/sellers/" className="nav-link">Sell a Home</Link>
            <a href="https://nevadarealestategroup.hifello.com/lp/63ef80d5109ae10018e62028" target="_blank" rel="noopener noreferrer" className="nav-link">Get a Cash Offer</a>
          </div>

          {/* CENTER LOGO */}
          <Link href="/" className="nav-logo">
            <Image src="/NREG-LOGO.png" alt="Nevada Real Estate Group" width={640} height={160} priority />
          </Link>

          {/* RIGHT LINKS */}
          <div className="nav-right">
            <div className="nav-item communities-trigger">
              <div className="nav-trigger">
                <a href="/communities/" className="nav-link" style={{ padding: 0 }}>Communities</a>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
              </div>
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
            </div>
            <a href="https://www.nevadarealestategroup.com/about/" className="nav-link">About Us</a>
            <Link href="/contact/" className="nav-link">Contact Us</Link>
          </div>

          {/* MOBILE HAMBURGER */}
          <button className="nav-hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`nav-mobile${mobileOpen ? ' open' : ''}`}>
        <Link href="/buyers/" className="mobile-nav-link" onClick={closeMobile}>Buy a Home</Link>
        <Link href="/sellers/" className="mobile-nav-link" onClick={closeMobile}>Sell a Home</Link>
        <a href="https://nevadarealestategroup.hifello.com/lp/63ef80d5109ae10018e62028" target="_blank" rel="noopener noreferrer" className="mobile-nav-link" onClick={closeMobile}>Get a Cash Offer</a>
        <button className={`mob-group-toggle${commOpen ? ' open' : ''}`} onClick={() => setCommOpen(!commOpen)}>
          Communities
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div className={`mob-submenu${commOpen ? ' open' : ''}`}>
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
        </div>
        <a href="https://www.nevadarealestategroup.com/about/" className="mobile-nav-link" onClick={closeMobile}>About Us</a>
        <Link href="/contact/" className="mobile-nav-link" onClick={closeMobile}>Contact Us</Link>
        <div className="mob-cta">
          <a href="tel:+17252399950" className="btn-nav">Call 725.239.9950</a>
        </div>
      </div>
    </>
  )
}
