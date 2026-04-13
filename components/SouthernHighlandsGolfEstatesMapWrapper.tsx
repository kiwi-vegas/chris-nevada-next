'use client'
import dynamic from 'next/dynamic'

const SouthernHighlandsGolfEstatesMap = dynamic(() => import('./SouthernHighlandsGolfEstatesMap'), { ssr: false })

export default function SouthernHighlandsGolfEstatesMapWrapper() {
  return <SouthernHighlandsGolfEstatesMap />
}
