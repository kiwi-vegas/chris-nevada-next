'use client'
import { useEffect, useRef } from 'react'

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ''

// Center of Enterprise — southwest Las Vegas
const CENTER: [number, number] = [-115.220, 36.025]

// Approximate Enterprise boundary polygon
const BOUNDARY: [number, number][] = [
  [-115.310, 36.065], // NW — near I-215 / Blue Diamond
  [-115.270, 36.068], // N
  [-115.220, 36.070], // N — near Las Vegas Blvd
  [-115.175, 36.068], // NE — near I-15
  [-115.155, 36.055], // E
  [-115.148, 36.030], // E — near I-15 south
  [-115.150, 36.000], // SE — near Sloan
  [-115.165, 35.980], // S
  [-115.210, 35.975], // S — southern boundary
  [-115.260, 35.978], // SW
  [-115.300, 35.990], // W — near mountains
  [-115.315, 36.015], // W
  [-115.318, 36.040], // NW
  [-115.310, 36.065], // back to NW
]

export default function EnterpriseMap() {
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
        zoom: 11.5,
        attributionControl: false,
        pitchWithRotate: false,
        dragRotate: false,
      })

      mapRef.current = map

      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')
      map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right')

      map.on('load', () => {
        map.addSource('enterprise-boundary', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: { type: 'Polygon', coordinates: [BOUNDARY] },
            properties: {},
          },
        })

        map.addLayer({
          id: 'enterprise-fill',
          type: 'fill',
          source: 'enterprise-boundary',
          paint: {
            'fill-color': '#C9A96E',
            'fill-opacity': 0.10,
          },
        })

        map.addLayer({
          id: 'enterprise-outline',
          type: 'line',
          source: 'enterprise-boundary',
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
              .setHTML('<div style="font-family:Inter,sans-serif;font-size:13px;font-weight:600;color:#0F0F0F;">Enterprise</div><div style="font-size:11px;color:#555;margin-top:2px;">Las Vegas, NV</div>')
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
          Enterprise
        </div>
        <div style={{ fontSize: '11px', color: '#6B6B6B', marginTop: '2px', fontFamily: 'DM Sans,sans-serif' }}>
          Southwest Las Vegas, Nevada
        </div>
      </div>
    </div>
  )
}
