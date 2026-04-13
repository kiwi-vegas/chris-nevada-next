'use client'
import dynamic from 'next/dynamic'

const CentennialHillsNorthMap = dynamic(() => import('./CentennialHillsNorthMap'), { ssr: false })

export default function CentennialHillsNorthMapWrapper() {
  return <CentennialHillsNorthMap />
}
