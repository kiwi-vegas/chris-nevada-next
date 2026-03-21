'use client'
import { useEffect, useRef } from 'react'

type StatItem = { value: string; label: string; isStatic?: boolean }

// Parse a value string like "$3.5B+", "5,500+", "#1", "150+" into animation params
function parseStat(value: string) {
  if (value.startsWith('#')) return { static: value }
  const prefix = value.match(/^([^0-9]*)/)?.[1] ?? ''
  const suffix = value.match(/([^0-9.]+)$/)?.[1] ?? ''
  const numStr = value.slice(prefix.length, suffix ? value.lastIndexOf(suffix) : undefined).replace(/,/g, '')
  const num = parseFloat(numStr)
  if (isNaN(num)) return { static: value }
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0
  const useComma = value.includes(',')
  return { prefix, suffix, target: num, decimals, useComma, display: value }
}

const FALLBACK_STATS: StatItem[] = [
  { value: '#1',     label: 'Team in Nevada',    isStatic: true },
  { value: '$3.5B+', label: 'Total Sales Volume' },
  { value: '5,500+', label: 'Properties Sold' },
  { value: '150+',   label: 'Team Members' },
  { value: '2,560+', label: 'Google Reviews' },
  { value: '3,210+', label: 'Zillow Reviews' },
]

export default function TrustBar({ stats }: { stats?: StatItem[] }) {
  const ref = useRef<HTMLElement>(null)
  const items = stats?.length ? stats : FALLBACK_STATS

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
        const fmt = decimals > 0
          ? v.toFixed(decimals)
          : useComma ? Math.round(v).toLocaleString('en-US') : String(Math.round(v))
        el.textContent = prefix + fmt + suffix
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    const els = ref.current?.querySelectorAll<HTMLElement>('[data-count-target],[data-count-static]')
    if (!els) return

    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { animate(e.target as HTMLElement); observer.unobserve(e.target) }
      })
    }, { threshold: 0.3 })

    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="trust" ref={ref}>
      <div className="container">
        <div className="trust-grid">
          {items.map((item, i) => {
            const parsed = item.isStatic ? { static: item.value } : parseStat(item.value)
            const isStatic = 'static' in parsed
            return (
              <div className="trust-item" key={i}>
                <div
                  className="trust-num"
                  {...(isStatic
                    ? { 'data-count-static': parsed.static }
                    : {
                        'data-count-target': String((parsed as any).target),
                        ...((parsed as any).prefix ? { 'data-count-prefix': (parsed as any).prefix } : {}),
                        ...((parsed as any).suffix ? { 'data-count-suffix': (parsed as any).suffix } : {}),
                        ...((parsed as any).decimals ? { 'data-count-decimals': String((parsed as any).decimals) } : {}),
                        ...((parsed as any).useComma ? { 'data-count-comma': '' } : {}),
                      }
                  )}
                >
                  {isStatic ? (parsed as any).static : (parsed as any).display}
                </div>
                <div className="trust-label">{item.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
