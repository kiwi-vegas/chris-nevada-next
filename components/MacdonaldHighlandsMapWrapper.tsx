'use client'
import dynamic from 'next/dynamic'

const MacdonaldHighlandsMap = dynamic(() => import('./MacdonaldHighlandsMap'), { ssr: false })

export default function MacdonaldHighlandsMapWrapper() {
  return <MacdonaldHighlandsMap />
}
