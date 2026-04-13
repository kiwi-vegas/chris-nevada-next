'use client'
import dynamic from 'next/dynamic'

const NorthLasVegasCraigRoadMap = dynamic(() => import('./NorthLasVegasCraigRoadMap'), { ssr: false })

export default function NorthLasVegasCraigRoadMapWrapper() {
  return <NorthLasVegasCraigRoadMap />
}
