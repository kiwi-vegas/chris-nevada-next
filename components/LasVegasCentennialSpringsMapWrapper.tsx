'use client'
import dynamic from 'next/dynamic'

const LasVegasCentennialSpringsMap = dynamic(() => import('./LasVegasCentennialSpringsMap'), { ssr: false })

export default function LasVegasCentennialSpringsMapWrapper() {
  return <LasVegasCentennialSpringsMap />
}
