'use client'
import dynamic from 'next/dynamic'

const ThePaseosMap = dynamic(() => import('./ThePaseosMap'), { ssr: false })

export default function ThePaseosMapWrapper() {
  return <ThePaseosMap />
}
