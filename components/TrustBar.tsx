'use client'
import { useEffect, useRef } from 'react'

export default function TrustBar() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const DURATION = 2000
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

    const animate = (el: HTMLElement) => {
      if (el.dataset.animated) return
      el.dataset.animated = '1'
      if (el.dataset.countStatic !== undefined) return

      const target = parseFloat(el.dataset.countTarget || '0')
      const prefix = el.dataset.countPrefix || ''
      const suffix = el.dataset.countSuffix || ''
      const decimals = parseInt(el.dataset.countDecimals || '0', 10)
      const useComma = 'countComma' in el.dataset
      const start = performance.now()

      const tick = (now: number) => {
        const p = Math.min((now - start) / DURATION, 1)
        const v = easeOut(p) * target
        const fmt = decimals > 0 ? v.toFixed(decimals) : (useComma ? Math.round(v).toLocaleString('en-US') : String(Math.round(v)))
        el.textContent = prefix + fmt + suffix
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    const els = ref.current?.querySelectorAll<HTMLElement>('[data-count-target],[data-count-static]')
    if (!els) return

    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { animate(e.target as HTMLElement); observer.unobserve(e.target) } })
    }, { threshold: 0.3 })

    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="trust" ref={ref}>
      <div className="container">
        <div className="trust-grid">
          {[
            { static: '#1', label: 'Team in Nevada' },
            { prefix: '$', target: '3.5', suffix: 'B+', decimals: '1', label: 'Total Sales Volume', display: '$3.5B+' },
            { target: '5500', suffix: '+', comma: true, label: 'Properties Sold', display: '5,500+' },
            { target: '150', suffix: '+', label: 'Team Members', display: '150+' },
            { target: '2560', suffix: '+', comma: true, label: 'Google Reviews', display: '2,560+' },
            { target: '3210', suffix: '+', comma: true, label: 'Zillow Reviews', display: '3,210+' },
          ].map((item, i) => (
            <div className="trust-item" key={i}>
              <div
                className="trust-num"
                {...('static' in item ? { 'data-count-static': item.static } : {
                  'data-count-target': item.target,
                  ...(item.prefix ? { 'data-count-prefix': item.prefix } : {}),
                  ...(item.suffix ? { 'data-count-suffix': item.suffix } : {}),
                  ...(item.decimals ? { 'data-count-decimals': item.decimals } : {}),
                  ...(item.comma ? { 'data-count-comma': '' } : {}),
                })}
              >
                {'static' in item ? item.static : item.display}
              </div>
              <div className="trust-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
