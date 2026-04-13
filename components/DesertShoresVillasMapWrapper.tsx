'use client'
import dynamic from 'next/dynamic'

const DesertShoresVillasMap = dynamic(() => import('./DesertShoresVillasMap'), { ssr: false })

export default function DesertShoresVillasMapWrapper() {
  return <DesertShoresVillasMap />
}
