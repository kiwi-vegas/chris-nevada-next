'use client'
import dynamic from 'next/dynamic'

const SpringMountainRanchMap = dynamic(() => import('./SpringMountainRanchMap'), { ssr: false })

export default function SpringMountainRanchMapWrapper() {
  return <SpringMountainRanchMap />
}
