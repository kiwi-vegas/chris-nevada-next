'use client'
import dynamic from 'next/dynamic'

const LasVegasSunriseManorMap = dynamic(() => import('./LasVegasSunriseManorMap'), { ssr: false })

export default function LasVegasSunriseManorMapWrapper() {
  return <LasVegasSunriseManorMap />
}
