'use client'
import dynamic from 'next/dynamic'

const SkyeCanyonBoulderHillsMap = dynamic(() => import('./SkyeCanyonBoulderHillsMap'), { ssr: false })

export default function SkyeCanyonBoulderHillsMapWrapper() {
  return <SkyeCanyonBoulderHillsMap />
}
