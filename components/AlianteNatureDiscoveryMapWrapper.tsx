'use client'
import dynamic from 'next/dynamic'

const AlianteNatureDiscoveryMap = dynamic(() => import('./AlianteNatureDiscoveryMap'), { ssr: false })

export default function AlianteNatureDiscoveryMapWrapper() {
  return <AlianteNatureDiscoveryMap />
}
