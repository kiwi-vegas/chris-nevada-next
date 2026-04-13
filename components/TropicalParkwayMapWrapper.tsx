'use client'
import dynamic from 'next/dynamic'

const TropicalParkwayMap = dynamic(() => import('./TropicalParkwayMap'), { ssr: false })

export default function TropicalParkwayMapWrapper() {
  return <TropicalParkwayMap />
}
