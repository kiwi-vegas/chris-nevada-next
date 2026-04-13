'use client'
import dynamic from 'next/dynamic'

const TurnberryPlaceMap = dynamic(() => import('./TurnberryPlaceMap'), { ssr: false })

export default function TurnberryPlaceMapWrapper() {
  return <TurnberryPlaceMap />
}
