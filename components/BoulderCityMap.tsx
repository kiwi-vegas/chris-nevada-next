'use client'
import { useEffect, useRef } from 'react'

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ''

// Center of Boulder City — southeast of Henderson, gateway to Lake Mead
const CENTER: [number, number] = [-114.832, 35.979]

// Approximate Boulder City boundary polygon
const BOUNDARY: [number, number][] = [
  [-114.860, 36.000], // NW — near Railroad Pass
  [-114.842, 36.005], // N
  [-114.820, 36.003], // NE — toward Lake Mead Dr
  [-114.808, 35.995], // E — near Hemenway Valley
  [-114.805, 35.980], // E
  [-114.808, 35.965], // SE — toward US-93
  [-114.818, 35.955], // S
  [-114.835, 35.952], // S — southern boundary
  [-114.852, 35.955], // SW
  [-114.862, 35.965], // W
  [-114.865, 35.980], // W
  [-114.860, 36.000], // back to NW
]

export default function BoulderCityMap() {
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
        map.addSource('boulder-city-boundary', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: { type: 'Polygon', coordinates: [BOUNDARY] },
            properties: {},
          },
        })

        map.addLayer({
          id: 'boulder-city-fill',
          type: 'fill',
          source: 'boulder-city-boundary',
          paint: {
            'fill-color': '#C9A96E',
            'fill-opacity': 0.10,
          },
        })

        map.addLayer({
          id: 'boulder-city-outline',
          type: 'line',
          source: 'boulder-city-boundary',
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
              .setHTML('<div style="font-family:Inter,sans-serif;font-size:13px;font-weight:600;color:#0F0F0F;">Boulder City</div><div style="font-size:11px;color:#555;margin-top:2px;">Boulder City, NV</div>')
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
          Boulder City
        </div>
        <div style={{ fontSize: '11px', color: '#6B6B6B', marginTop: '2px', fontFamily: 'DM Sans,sans-serif' }}>
          Boulder City, Nevada · ~208 sq mi
        </div>
      </div>
    </div>
  )
}
