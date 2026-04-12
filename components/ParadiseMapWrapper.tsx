'use client'
import dynamic from 'next/dynamic'

const ParadiseMap = dynamic(() => import('./ParadiseMap'), { ssr: false })

export default function ParadiseMapWrapper() {
  return <ParadiseMap />
}
