'use client'
import dynamic from 'next/dynamic'

const CanyonGateMap = dynamic(() => import('./CanyonGateMap'), { ssr: false })

export default function CanyonGateMapWrapper() {
  return <CanyonGateMap />
}
