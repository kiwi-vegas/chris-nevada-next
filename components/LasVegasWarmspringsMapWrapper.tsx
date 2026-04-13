'use client'
import dynamic from 'next/dynamic'

const LasVegasWarmspringsMap = dynamic(() => import('./LasVegasWarmspringsMap'), { ssr: false })

export default function LasVegasWarmspringsMapWrapper() {
  return <LasVegasWarmspringsMap />
}
