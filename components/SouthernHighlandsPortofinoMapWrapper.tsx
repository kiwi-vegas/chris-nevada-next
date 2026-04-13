'use client'
import dynamic from 'next/dynamic'

const SouthernHighlandsPortofinoMap = dynamic(() => import('./SouthernHighlandsPortofinoMap'), { ssr: false })

export default function SouthernHighlandsPortofinoMapWrapper() {
  return <SouthernHighlandsPortofinoMap />
}
