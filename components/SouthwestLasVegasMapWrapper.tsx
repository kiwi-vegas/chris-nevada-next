'use client'
import dynamic from 'next/dynamic'

const SouthwestLasVegasMap = dynamic(() => import('./SouthwestLasVegasMap'), { ssr: false })

export default function SouthwestLasVegasMapWrapper() {
  return <SouthwestLasVegasMap />
}
