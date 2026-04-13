'use client'
import dynamic from 'next/dynamic'

const SouthernHighlandsMap = dynamic(() => import('./SouthernHighlandsMap'), { ssr: false })

export default function SouthernHighlandsMapWrapper() {
  return <SouthernHighlandsMap />
}
