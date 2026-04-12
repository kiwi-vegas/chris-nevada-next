'use client'
import { useEffect, useRef } from 'react'

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ''

// Center of Inspirada
const CENTER: [number, number] = [-114.995, 35.998]

// Approximate Inspirada boundary polygon
// Bounded by Eastern Ave to west, Bicentennial Pkwy to east, Henderson city limits to south
const BOUNDARY: [number, number][] = [
  [-115.010, 36.012], // NW — near Eastern Ave / Volunteer Blvd
  [-114.998, 36.015], // N
  [-114.982, 36.013], // NE — near Bicentennial Pkwy
  [-114.975, 36.005], // E
  [-114.973, 35.993], // SE
  [-114.976, 35.982], // S — southern boundary
  [-114.988, 35.978], // S
  [-115.002, 35.980], // SW
  [-115.012, 35.988], // W — Eastern Ave corridor
  [-115.014, 36.000], // W
  [-115.010, 36.012], // back to NW
]

export default function InspiradaMap() {
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
        map.addSource('inspirada-boundary', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: { type: 'Polygon', coordinates: [BOUNDARY] },
            properties: {},
          },
        })

        map.addLayer({
          id: 'inspirada-fill',
          type: 'fill',
          source: 'inspirada-boundary',
          paint: {
            'fill-color': '#C9A96E',
            'fill-opacity': 0.10,
          },
        })

        map.addLayer({
          id: 'inspirada-outline',
          type: 'line',
          source: 'inspirada-boundary',
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
              .setHTML('<div style="font-family:Inter,sans-serif;font-size:13px;font-weight:600;color:#0F0F0F;">Inspirada</div><div style="font-size:11px;color:#555;margin-top:2px;">Henderson, NV</div>')
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
          Inspirada
        </div>
        <div style={{ fontSize: '11px', color: '#6B6B6B', marginTop: '2px', fontFamily: 'DM Sans,sans-serif' }}>
          Henderson, Nevada · ~2,500 acres
        </div>
      </div>
    </div>
  )
}
