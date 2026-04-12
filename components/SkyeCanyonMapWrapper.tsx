'use client'
import dynamic from 'next/dynamic'

const SkyeCanyonMap = dynamic(() => import('./SkyeCanyonMap'), { ssr: false })

export default function SkyeCanyonMapWrapper() {
  return <SkyeCanyonMap />
}
