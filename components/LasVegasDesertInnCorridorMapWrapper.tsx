'use client'
import dynamic from 'next/dynamic'

const LasVegasDesertInnCorridorMap = dynamic(() => import('./LasVegasDesertInnCorridorMap'), { ssr: false })

export default function LasVegasDesertInnCorridorMapWrapper() {
  return <LasVegasDesertInnCorridorMap />
}
