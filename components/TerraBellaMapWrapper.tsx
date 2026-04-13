'use client'
import dynamic from 'next/dynamic'

const TerraBellaMap = dynamic(() => import('./TerraBellaMap'), { ssr: false })

export default function TerraBellaMapWrapper() {
  return <TerraBellaMap />
}
