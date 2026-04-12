'use client'
import { useEffect, useRef } from 'react'

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ''

// Center of Anthem — southeast Henderson in the McCullough Range foothills
const CENTER: [number, number] = [-115.065, 35.985]

// Approximate Anthem boundary polygon
const BOUNDARY: [number, number][] = [
  [-115.095, 36.005], // NW — near Eastern Ave / Anthem Pkwy
  [-115.075, 36.010], // N
  [-115.050, 36.008], // NE
  [-115.035, 36.000], // E — McCullough foothills
  [-115.030, 35.985], // E
  [-115.032, 35.968], // SE
  [-115.042, 35.958], // S
  [-115.060, 35.955], // S
  [-115.080, 35.958], // SW
  [-115.095, 35.968], // W
  [-115.100, 35.982], // W
  [-115.095, 36.005], // back to NW
]

export default function AnthemMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    let map: any

    const init = async () => {
      const mapboxgl = (await import('mapbox-gl')).default
      await import('mapbox-gl/dist/mapbox-gl.css')

      mapboxgl.accessToken = TOKEN

      map = new mapboxgl.Map({
        container: containerRef.current!,
        style: 'mapbox://styles/mapbox/light-v11',
        center: CENTER,
        zoom: 13,
        attributionControl: false,
        pitchWithRotate: false,
        dragRotate: false,
      })

      mapRef.current = map

      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')
      map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right')

      map.on('load', () => {
        map.addSource('anthem-boundary', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: { type: 'Polygon', coordinates: [BOUNDARY] },
            properties: {},
          },
        })

        map.addLayer({
          id: 'anthem-fill',
          type: 'fill',
          source: 'anthem-boundary',
          paint: {
            'fill-color': '#C9A96E',
            'fill-opacity': 0.10,
          },
        })

        map.addLayer({
          id: 'anthem-outline',
          type: 'line',
          source: 'anthem-boundary',
          paint: {
            'line-color': '#C9A96E',
            'line-width': 2,
            'line-opacity': 0.85,
          },
        })

        const el = document.createElement('div')
        el.style.cssText = `
          width: 14px; height: 14px;
          background: #C9A96E;
          border: 2px solid #fff;
          border-radius: 50%;
          box-shadow: 0 0 12px rgba(27,42,74,0.4);
        `

        new mapboxgl.Marker({ element: el })
          .setLngLat(CENTER)
          .setPopup(
            new mapboxgl.Popup({ offset: 16, className: 'summerlin-popup' })
              .setHTML('<div style="font-family:Inter,sans-serif;font-size:13px;font-weight:600;color:#0F0F0F;">Anthem</div><div style="font-size:11px;color:#555;margin-top:2px;">Henderson, NV</div>')
          )
          .addTo(map)
      })
    }

    init()

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%', borderRadius: 'inherit' }} />
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '16px',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(8px)',
        border: '1px solid #EDE9E3',
        borderRadius: '4px',
        padding: '8px 12px',
        pointerEvents: 'none',
      }}>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1B2A4A', fontFamily: 'DM Sans,sans-serif' }}>
          Anthem
        </div>
        <div style={{ fontSize: '11px', color: '#6B6B6B', marginTop: '2px', fontFamily: 'DM Sans,sans-serif' }}>
          Henderson, Nevada · ~4,755 acres
        </div>
      </div>
    </div>
  )
}
