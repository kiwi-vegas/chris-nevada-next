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
                <a href="/communities" className="nav-link" style={{ padding: 0 }}>Communities</a>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
              </div>
              <div className="communities-panel-nav">
                <div>
                  <div className="comm-col-label">Las Vegas</div>
                  <Link href="/summerlin/">Summerlin</Link>
                  <Link href="/southern-highlands/">Southern Highlands</Link>
                  <Link href="/mountains-edge/">Mountains Edge</Link>
                  <Link href="/enterprise/">Enterprise</Link>
                  <Link href="/spring-valley/">Spring Valley</Link>
                  <Link href="/rhodes-ranch/">Rhodes Ranch</Link>
                  <Link href="/skye-canyon/">Skye Canyon</Link>
                  <Link href="/downtown-las-vegas/">Downtown</Link>
                </div>
                <div>
                  <div className="comm-col-label">Henderson</div>
                  <Link href="/anthem/">Anthem</Link>
                  <Link href="/green-valley/">Green Valley</Link>
                  <Link href="/seven-hills/">Seven Hills</Link>
                  <Link href="/macdonald-highlands/">MacDonald Highlands</Link>
                  <Link href="/lake-las-vegas/">Lake Las Vegas</Link>
                  <Link href="/inspirada/">Inspirada</Link>
                  <Link href="/cadence/">Cadence</Link>
                  <Link href="/ascaya/">Ascaya</Link>
                </div>
                <div>
                  <div className="comm-col-label">Summerlin</div>
                  <Link href="/summerlin-the-ridges/">The Ridges</Link>
                  <Link href="/the-peaks/">The Peaks</Link>
                  <Link href="/summerlin-grand-park/">Grand Park</Link>
                  <Link href="/summerlin-stonebridge/">Stonebridge</Link>
                  <Link href="/sun-city-summerlin/">Sun City Summerlin</Link>
                  <Link href="/red-rock-country-club/">Red Rock CC</Link>
                  <Link href="/the-summit-club/">The Summit Club</Link>
                </div>
                <div>
                  <div className="comm-col-label">Browse by Type</div>
                  <Link href="/guard-gated-communities/">Guard-Gated</Link>
                  <Link href="/55-plus-communities/">55+ Communities</Link>
                  <Link href="/luxury-communities/">Luxury Estates</Link>
                  <Link href="/new-construction/">New Construction</Link>
                  <Link href="/golf-communities/">Golf Communities</Link>
                  <Link href="/high-rise-condos/">High-Rise Condos</Link>
                  <Link href="/communities" style={{ color: 'var(--gold)', fontWeight: 600 }}>All Communities &rarr;</Link>
                </div>
              </div>
            </div>
            <a href="/about" className="nav-link">About Us</a>
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
          <Link href="/summerlin/" className="mobile-nav-link" onClick={closeMobile}>Summerlin</Link>
          <Link href="/southern-highlands/" className="mobile-nav-link" onClick={closeMobile}>Southern Highlands</Link>
          <Link href="/mountains-edge/" className="mobile-nav-link" onClick={closeMobile}>Mountains Edge</Link>
          <Link href="/enterprise/" className="mobile-nav-link" onClick={closeMobile}>Enterprise</Link>
          <Link href="/spring-valley/" className="mobile-nav-link" onClick={closeMobile}>Spring Valley</Link>
          <Link href="/rhodes-ranch/" className="mobile-nav-link" onClick={closeMobile}>Rhodes Ranch</Link>
          <Link href="/skye-canyon/" className="mobile-nav-link" onClick={closeMobile}>Skye Canyon</Link>
          <Link href="/downtown-las-vegas/" className="mobile-nav-link" onClick={closeMobile}>Downtown</Link>
          <div className="mob-city-label" style={{marginTop:'8px'}}>Henderson</div>
          <Link href="/anthem/" className="mobile-nav-link" onClick={closeMobile}>Anthem</Link>
          <Link href="/green-valley/" className="mobile-nav-link" onClick={closeMobile}>Green Valley</Link>
          <Link href="/seven-hills/" className="mobile-nav-link" onClick={closeMobile}>Seven Hills</Link>
          <Link href="/macdonald-highlands/" className="mobile-nav-link" onClick={closeMobile}>MacDonald Highlands</Link>
          <Link href="/lake-las-vegas/" className="mobile-nav-link" onClick={closeMobile}>Lake Las Vegas</Link>
          <Link href="/inspirada/" className="mobile-nav-link" onClick={closeMobile}>Inspirada</Link>
          <Link href="/cadence/" className="mobile-nav-link" onClick={closeMobile}>Cadence</Link>
          <Link href="/ascaya/" className="mobile-nav-link" onClick={closeMobile}>Ascaya</Link>
          <div className="mob-city-label" style={{marginTop:'8px'}}>Summerlin Villages</div>
          <Link href="/summerlin-the-ridges/" className="mobile-nav-link" onClick={closeMobile}>The Ridges</Link>
          <Link href="/the-peaks/" className="mobile-nav-link" onClick={closeMobile}>The Peaks</Link>
          <Link href="/summerlin-grand-park/" className="mobile-nav-link" onClick={closeMobile}>Grand Park</Link>
          <Link href="/summerlin-stonebridge/" className="mobile-nav-link" onClick={closeMobile}>Stonebridge</Link>
          <Link href="/sun-city-summerlin/" className="mobile-nav-link" onClick={closeMobile}>Sun City Summerlin</Link>
          <Link href="/red-rock-country-club/" className="mobile-nav-link" onClick={closeMobile}>Red Rock CC</Link>
          <Link href="/the-summit-club/" className="mobile-nav-link" onClick={closeMobile}>The Summit Club</Link>
          <div className="mob-city-label" style={{marginTop:'8px'}}>Browse by Type</div>
          <Link href="/guard-gated-communities/" className="mobile-nav-link" onClick={closeMobile}>Guard-Gated</Link>
          <Link href="/55-plus-communities/" className="mobile-nav-link" onClick={closeMobile}>55+ Communities</Link>
          <Link href="/luxury-communities/" className="mobile-nav-link" onClick={closeMobile}>Luxury Estates</Link>
          <Link href="/new-construction/" className="mobile-nav-link" onClick={closeMobile}>New Construction</Link>
          <Link href="/golf-communities/" className="mobile-nav-link" onClick={closeMobile}>Golf Communities</Link>
          <Link href="/high-rise-condos/" className="mobile-nav-link" onClick={closeMobile}>High-Rise Condos</Link>
          <Link href="/communities" className="mobile-nav-link" onClick={closeMobile} style={{color:'var(--gold)',fontWeight:600}}>All Communities &rarr;</Link>
        </div>
        <a href="/about" className="mobile-nav-link" onClick={closeMobile}>About Us</a>
        <Link href="/contact/" className="mobile-nav-link" onClick={closeMobile}>Contact Us</Link>
        <div className="mob-cta">
          <a href="tel:+17252399950" className="btn-nav">Call 725.239.9950</a>
        </div>
      </div>
    </>
  )
}
