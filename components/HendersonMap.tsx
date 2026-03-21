'use client'
import { useEffect, useRef } from 'react'

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ''

// Center of Henderson, NV
const CENTER: [number, number] = [-114.982, 36.030]

// Approximate Henderson city boundary polygon
// Henderson is SE of Las Vegas — bordered by LV to NW, Boulder City to S, Lake Mead to E
const BOUNDARY: [number, number][] = [
  [-115.118, 36.155], // NW — I-215 / Las Vegas border (Warm Springs area)
  [-114.990, 36.178], // N  — Lake Mead Blvd / Pebble corridor
  [-114.898, 36.155], // NE — northeast Henderson
  [-114.855, 36.105], // E  — Boulder Highway corridor
  [-114.850, 36.020], // E  — near Lake Mead shoreline
  [-114.865, 35.935], // SE — toward Boulder City
  [-114.920, 35.900], // S  — Black Mountain / southern boundary
  [-114.992, 35.920], // S  — south Henderson
  [-115.060, 35.950], // SW — near I-11 / Boulder City Hwy
  [-115.118, 36.010], // W  — I-15 / I-215 interchange area
  [-115.128, 36.090], // W  — continuing north along I-215
  [-115.118, 36.155], // back to NW
]

export default function HendersonMap() {
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
        zoom: 10.5,
        attributionControl: false,
        pitchWithRotate: false,
        dragRotate: false,
      })

      mapRef.current = map

      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')
      map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right')

      map.on('load', () => {
        // Boundary polygon
        map.addSource('henderson-boundary', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: { type: 'Polygon', coordinates: [BOUNDARY] },
            properties: {},
          },
        })

        // Gold fill (semi-transparent)
        map.addLayer({
          id: 'henderson-fill',
          type: 'fill',
          source: 'henderson-boundary',
          paint: {
            'fill-color': '#C9A84C',
            'fill-opacity': 0.10,
          },
        })

        // Gold outline
        map.addLayer({
          id: 'henderson-outline',
          type: 'line',
          source: 'henderson-boundary',
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
              .setHTML('<div style="font-family:Inter,sans-serif;font-size:13px;font-weight:600;color:#0F0F0F;">Henderson</div><div style="font-size:11px;color:#555;margin-top:2px;">Henderson, NV · Nevada\'s 2nd Largest City</div>')
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
          Henderson
        </div>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '2px', fontFamily: 'Inter,sans-serif' }}>
          Henderson, Nevada · 105 sq miles
        </div>
      </div>
    </div>
  )
}
