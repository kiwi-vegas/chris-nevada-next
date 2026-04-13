'use client'
import dynamic from 'next/dynamic'

const LasVegasNorthwestAlianteCorridorMap = dynamic(() => import('./LasVegasNorthwestAlianteCorridorMap'), { ssr: false })

export default function LasVegasNorthwestAlianteCorridorMapWrapper() {
  return <LasVegasNorthwestAlianteCorridorMap />
}
