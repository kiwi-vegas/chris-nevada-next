'use client'
import dynamic from 'next/dynamic'

const PanoramaTowersMap = dynamic(() => import('./PanoramaTowersMap'), { ssr: false })

export default function PanoramaTowersMapWrapper() {
  return <PanoramaTowersMap />
}
