'use client'
import dynamic from 'next/dynamic'

const LasVegasCharlestonHeightsMap = dynamic(() => import('./LasVegasCharlestonHeightsMap'), { ssr: false })

export default function LasVegasCharlestonHeightsMapWrapper() {
  return <LasVegasCharlestonHeightsMap />
}
