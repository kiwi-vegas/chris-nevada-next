'use client'
import dynamic from 'next/dynamic'

const CentennialHillsMap = dynamic(() => import('./CentennialHillsMap'), { ssr: false })

export default function CentennialHillsMapWrapper() {
  return <CentennialHillsMap />
}
