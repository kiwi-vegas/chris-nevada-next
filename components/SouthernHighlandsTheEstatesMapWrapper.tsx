'use client'
import dynamic from 'next/dynamic'

const SouthernHighlandsTheEstatesMap = dynamic(() => import('./SouthernHighlandsTheEstatesMap'), { ssr: false })

export default function SouthernHighlandsTheEstatesMapWrapper() {
  return <SouthernHighlandsTheEstatesMap />
}
