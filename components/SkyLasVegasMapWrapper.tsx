'use client'
import dynamic from 'next/dynamic'

const SkyLasVegasMap = dynamic(() => import('./SkyLasVegasMap'), { ssr: false })

export default function SkyLasVegasMapWrapper() {
  return <SkyLasVegasMap />
}
