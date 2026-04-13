'use client'
import dynamic from 'next/dynamic'

const LasVegasDesertShoresNorthMap = dynamic(() => import('./LasVegasDesertShoresNorthMap'), { ssr: false })

export default function LasVegasDesertShoresNorthMapWrapper() {
  return <LasVegasDesertShoresNorthMap />
}
