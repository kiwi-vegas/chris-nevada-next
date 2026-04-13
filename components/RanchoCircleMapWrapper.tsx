'use client'
import dynamic from 'next/dynamic'

const RanchoCircleMap = dynamic(() => import('./RanchoCircleMap'), { ssr: false })

export default function RanchoCircleMapWrapper() {
  return <RanchoCircleMap />
}
