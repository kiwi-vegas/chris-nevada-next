'use client'
import dynamic from 'next/dynamic'

const LasVegasFortApacheCorridorMap = dynamic(() => import('./LasVegasFortApacheCorridorMap'), { ssr: false })

export default function LasVegasFortApacheCorridorMapWrapper() {
  return <LasVegasFortApacheCorridorMap />
}
