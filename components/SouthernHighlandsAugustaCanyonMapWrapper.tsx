'use client'
import dynamic from 'next/dynamic'

const SouthernHighlandsAugustaCanyonMap = dynamic(() => import('./SouthernHighlandsAugustaCanyonMap'), { ssr: false })

export default function SouthernHighlandsAugustaCanyonMapWrapper() {
  return <SouthernHighlandsAugustaCanyonMap />
}
