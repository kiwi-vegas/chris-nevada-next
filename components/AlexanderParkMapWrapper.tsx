'use client'
import dynamic from 'next/dynamic'

const AlexanderParkMap = dynamic(() => import('./AlexanderParkMap'), { ssr: false })

export default function AlexanderParkMapWrapper() {
  return <AlexanderParkMap />
}
