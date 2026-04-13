'use client'
import dynamic from 'next/dynamic'

const SpanishHillsMap = dynamic(() => import('./SpanishHillsMap'), { ssr: false })

export default function SpanishHillsMapWrapper() {
  return <SpanishHillsMap />
}
