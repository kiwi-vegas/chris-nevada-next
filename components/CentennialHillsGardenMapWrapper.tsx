'use client'
import dynamic from 'next/dynamic'

const CentennialHillsGardenMap = dynamic(() => import('./CentennialHillsGardenMap'), { ssr: false })

export default function CentennialHillsGardenMapWrapper() {
  return <CentennialHillsGardenMap />
}
