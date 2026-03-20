'use client'
import { useEffect, useRef } from 'react'

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ''

// Center of Summerlin
const CENTER: [number, number] = [-115.305, 36.178]

// Approximate Summerlin boundary polygon (clockwise from NW corner)
// Traces: US-95 to north, Rampart/I-215 to east, Blue Diamond to south, Spring Mountains to west
const BOUNDARY: [number, number][] = [
  [-115.387, 36.262], // NW — Spring Mountains at US-95
  [-115.348, 36.271], // N — US-95 corridor north edge
  [-115.300, 36.270], // N — US-95 mid
  [-115.258, 36.267], // NE — US-95 / Buffalo Drive area
  [-115.224, 36.258], // NE — Rampart at US-95
  [-115.212, 36.228], // E — Rampart / Cheyenne
  [-115.208, 36.196], // E — Rampart / Charleston
  [-115.200, 36.163], // E — I-215 / Rampart
  [-115.205, 36.133], // SE — I-215 southeast
  [-115.214, 36.103], // SE — I-215 / Blue Diamond corridor
  [-115.235, 36.082], // S — South Summerlin boundary
  [-115.275, 36.076], // S — Blue Diamond area
  [-115.318, 36.080], // SW — Western South Summerlin
  [-115.355, 36.092], // SW — toward mountains
  [-115.383, 36.118], // W — Spring Mountains foothills
  [-115.390, 36.158], // W — Red Rock boundary
  [-115.387, 36.200], // W — Spring Mountains mid
  [-115.387, 36.262], // back to NW
]

export default function SummerlinMap() {
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
        style: 'mapbox://styles/mapbox/dark-v11',
        center: CENTER,
        zoom: 10.8,
        attributionControl: false,
        pitchWithRotate: false,
        dragRotate: false,
      })

      mapRef.current = map

      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')
      map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right')

      map.on('load', () => {
        // Boundary polygon
        map.addSource('summerlin-boundary', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: { type: 'Polygon', coordinates: [BOUNDARY] },
            properties: {},
          },
        })

        // Gold fill (semi-transparent)
        map.addLayer({
          id: 'summerlin-fill',
          type: 'fill',
          source: 'summerlin-boundary',
          paint: {
            'fill-color': '#C9A84C',
            'fill-opacity': 0.10,
          },
        })

        // Gold outline
        map.addLayer({
          id: 'summerlin-outline',
          type: 'line',
          source: 'summerlin-boundary',
          paint: {
            'line-color': '#C9A84C',
            'line-width': 2,
            'line-opacity': 0.85,
          },
        })

        // Center marker
        const el = document.createElement('div')
        el.style.cssText = `
          width: 14px; height: 14px;
          background: #C9A84C;
          border: 2px solid #fff;
          border-radius: 50%;
          box-shadow: 0 0 12px rgba(201,168,76,0.7);
        `

        new mapboxgl.Marker({ element: el })
          .setLngLat(CENTER)
          .setPopup(
            new mapboxgl.Popup({ offset: 16, className: 'summerlin-popup' })
              .setHTML('<div style="font-family:Inter,sans-serif;font-size:13px;font-weight:600;color:#0F0F0F;">Summerlin</div><div style="font-size:11px;color:#555;margin-top:2px;">Las Vegas, NV</div>')
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
        background: 'rgba(10,10,10,0.85)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(201,168,76,0.3)',
        borderRadius: '4px',
        padding: '8px 12px',
        pointerEvents: 'none',
      }}>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A84C', fontFamily: 'Inter,sans-serif' }}>
          Summerlin
        </div>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '2px', fontFamily: 'Inter,sans-serif' }}>
          Las Vegas, Nevada · 22,500 acres
        </div>
      </div>
    </div>
  )
}
