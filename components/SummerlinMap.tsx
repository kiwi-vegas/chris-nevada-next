'use client'
import { useEffect, useRef } from 'react'

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ''

// Center of Summerlin
const CENTER: [number, number] = [-115.305, 36.178]

// Summerlin ZIP codes
const ZIP_CODES = ['89134', '89135', '89138', '89144', '89145']

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
        style: 'mapbox://styles/mapbox/light-v11',
        center: CENTER,
        zoom: 10.8,
        attributionControl: false,
        pitchWithRotate: false,
        dragRotate: false,
      })

      mapRef.current = map

      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')
      map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right')

      map.on('load', async () => {
        // Navy wash over entire map to dim non-community areas
        map.addLayer({
          id: 'dim-overlay',
          type: 'background',
          paint: {
            'background-color': '#1B2A4A',
            'background-opacity': 0.30,
          },
        })

        // Fetch ZIP code boundary GeoJSON
        try {
          const res = await fetch('/data/summerlin-zips.json')
          const geojson = await res.json()

          // Add the ZIP boundaries as a source
          map.addSource('summerlin-zips', {
            type: 'geojson',
            data: geojson,
          })

          // Clear the navy wash inside community zones — reveal the bright map underneath
          map.addLayer({
            id: 'summerlin-zip-clear',
            type: 'fill',
            source: 'summerlin-zips',
            paint: {
              'fill-color': '#FFFFFF',
              'fill-opacity': 0.45,
            },
          })

          // Warm gold fill on top for the premium feel
          map.addLayer({
            id: 'summerlin-zip-fill',
            type: 'fill',
            source: 'summerlin-zips',
            paint: {
              'fill-color': '#C9A96E',
              'fill-opacity': 0.12,
            },
          })

          // Bold gold outline for each ZIP boundary
          map.addLayer({
            id: 'summerlin-zip-outline',
            type: 'line',
            source: 'summerlin-zips',
            paint: {
              'line-color': '#B8944D',
              'line-width': 3,
              'line-opacity': 0.9,
            },
          })

          // Add ZIP code labels at the center of each polygon (including MultiPolygon parts)
          const labelFeatures: any[] = []
          for (const f of geojson.features) {
            const polygons = f.geometry.type === 'MultiPolygon'
              ? f.geometry.coordinates
              : [f.geometry.coordinates]
            for (const poly of polygons) {
              const ring = poly[0]
              let sumLng = 0, sumLat = 0
              for (const [lng, lat] of ring) {
                sumLng += lng
                sumLat += lat
              }
              labelFeatures.push({
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [sumLng / ring.length, sumLat / ring.length],
                },
                properties: { zip: f.properties.zip },
              })
            }
          }

          map.addSource('summerlin-zip-labels', {
            type: 'geojson',
            data: { type: 'FeatureCollection', features: labelFeatures },
          })

          map.addLayer({
            id: 'summerlin-zip-label-text',
            type: 'symbol',
            source: 'summerlin-zip-labels',
            layout: {
              'text-field': ['get', 'zip'],
              'text-font': ['DIN Pro Bold', 'Arial Unicode MS Bold'],
              'text-size': 14,
              'text-allow-overlap': true,
            },
            paint: {
              'text-color': '#2C2C2C',
              'text-halo-color': 'rgba(255,255,255,0.95)',
              'text-halo-width': 2,
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
                .setHTML('<div style="font-family:Inter,sans-serif;font-size:13px;font-weight:600;color:#0F0F0F;">Summerlin</div><div style="font-size:11px;color:#555;margin-top:2px;">Las Vegas, NV</div>')
            )
            .addTo(map)
        } catch (err) {
          console.error('[SummerlinMap] Failed to load ZIP boundaries:', err)
        }
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
          Summerlin
        </div>
        <div style={{ fontSize: '11px', color: '#6B6B6B', marginTop: '2px', fontFamily: 'DM Sans,sans-serif' }}>
          ZIP Codes: {ZIP_CODES.join(' · ')}
        </div>
      </div>
    </div>
  )
}
