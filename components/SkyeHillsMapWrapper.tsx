'use client'
import dynamic from 'next/dynamic'

const SkyeHillsMap = dynamic(() => import('./SkyeHillsMap'), { ssr: false })

export default function SkyeHillsMapWrapper() {
  return <SkyeHillsMap />
}
