'use client'
import dynamic from 'next/dynamic'

const GibsonSpringsMap = dynamic(() => import('./GibsonSpringsMap'), { ssr: false })

export default function GibsonSpringsMapWrapper() {
  return <GibsonSpringsMap />
}
