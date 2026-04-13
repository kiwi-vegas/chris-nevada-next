'use client'
import dynamic from 'next/dynamic'

const LasVegasElkhornMap = dynamic(() => import('./LasVegasElkhornMap'), { ssr: false })

export default function LasVegasElkhornMapWrapper() {
  return <LasVegasElkhornMap />
}
