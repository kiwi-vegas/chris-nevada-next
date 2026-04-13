'use client'
import dynamic from 'next/dynamic'

const SpanishGateMap = dynamic(() => import('./SpanishGateMap'), { ssr: false })

export default function SpanishGateMapWrapper() {
  return <SpanishGateMap />
}
