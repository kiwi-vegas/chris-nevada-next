'use client'
import dynamic from 'next/dynamic'

const BlackMountainRanchMap = dynamic(() => import('./BlackMountainRanchMap'), { ssr: false })

export default function BlackMountainRanchMapWrapper() {
  return <BlackMountainRanchMap />
}
