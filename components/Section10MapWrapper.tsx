'use client'
import dynamic from 'next/dynamic'

const Section10Map = dynamic(() => import('./Section10Map'), { ssr: false })

export default function Section10MapWrapper() {
  return <Section10Map />
}
