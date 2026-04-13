'use client'
import dynamic from 'next/dynamic'

const PalmsPlaceMap = dynamic(() => import('./PalmsPlaceMap'), { ssr: false })

export default function PalmsPlaceMapWrapper() {
  return <PalmsPlaceMap />
}
