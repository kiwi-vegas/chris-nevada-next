'use client'
import dynamic from 'next/dynamic'

const SkyeCanyonRidgelineMap = dynamic(() => import('./SkyeCanyonRidgelineMap'), { ssr: false })

export default function SkyeCanyonRidgelineMapWrapper() {
  return <SkyeCanyonRidgelineMap />
}
