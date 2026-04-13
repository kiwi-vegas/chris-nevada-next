'use client'
import dynamic from 'next/dynamic'

const SpanishTrailMap = dynamic(() => import('./SpanishTrailMap'), { ssr: false })

export default function SpanishTrailMapWrapper() {
  return <SpanishTrailMap />
}
