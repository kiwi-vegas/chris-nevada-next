'use client'
import { useEffect, useRef } from 'react'

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ''

// Center of Skye Canyon
const CENTER: [number, number] = [-115.310, 36.315]

// Approximate Skye Canyon boundary polygon
// Bounded by US-95 to east, Iron Mountain Rd area to north, Grand Teton Dr to west
const BOUNDARY: [number, number][] = [
  [-115.340, 36.330], // NW
  [-115.318, 36.335], // N
  [-115.295, 36.332], // NE
  [-115.280, 36.325], // E — near US-95
  [-115.275, 36.312], // E
  [-115.278, 36.298], // SE
  [-115.290, 36.292], // S
  [-115.310, 36.290], // S
  [-115.330, 36.293], // SW
  [-115.342, 36.305], // W — foothills
  [-115.343, 36.318], // W
  [-115.340, 36.330], // back to NW
]

export default function SkyeCanyonMap() {
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
        zoom: 12.5,
        attributionControl: false,
        pitchWithRotate: false,
        dragRotate: false,
      })

      mapRef.current = map

      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')
      map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right')

      map.on('load', () => {
        // Boundary polygon
        map.addSource('skye-canyon-boundary', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: { type: 'Polygon', coordinates: [BOUNDARY] },
            properties: {},
          },
        })

        // Gold fill (semi-transparent)
        map.addLayer({
          id: 'skye-canyon-fill',
          type: 'fill',
          source: 'skye-canyon-boundary',
          paint: {
            'fill-color': '#C9A96E',
            'fill-opacity': 0.10,
          },
        })

        // Gold outline
        map.addLayer({
          id: 'skye-canyon-outline',
          type: 'line',
          source: 'skye-canyon-boundary',
          paint: {
            'line-color': '#C9A96E',
            'line-width': 2,
            'line-opacity': 0.85,
          },
        })

        // Center marker
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
              .setHTML('<div style="font-family:Inter,sans-serif;font-size:13px;font-weight:600;color:#0F0F0F;">Skye Canyon</div><div style="font-size:11px;color:#555;margin-top:2px;">Las Vegas, NV</div>')
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
          Skye Canyon
        </div>
        <div style={{ fontSize: '11px', color: '#6B6B6B', marginTop: '2px', fontFamily: 'DM Sans,sans-serif' }}>
          Las Vegas, Nevada · ~1,700 acres
        </div>
      </div>
    </div>
  )
}
