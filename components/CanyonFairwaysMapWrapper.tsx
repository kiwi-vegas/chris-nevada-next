'use client'
import dynamic from 'next/dynamic'

const CanyonFairwaysMap = dynamic(() => import('./CanyonFairwaysMap'), { ssr: false })

export default function CanyonFairwaysMapWrapper() {
  return <CanyonFairwaysMap />
}
