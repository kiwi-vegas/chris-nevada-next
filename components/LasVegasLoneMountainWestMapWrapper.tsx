'use client'
import dynamic from 'next/dynamic'

const LasVegasLoneMountainWestMap = dynamic(() => import('./LasVegasLoneMountainWestMap'), { ssr: false })

export default function LasVegasLoneMountainWestMapWrapper() {
  return <LasVegasLoneMountainWestMap />
}
