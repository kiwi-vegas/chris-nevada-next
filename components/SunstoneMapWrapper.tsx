'use client'
import dynamic from 'next/dynamic'

const SunstoneMap = dynamic(() => import('./SunstoneMap'), { ssr: false })

export default function SunstoneMapWrapper() {
  return <SunstoneMap />
}
