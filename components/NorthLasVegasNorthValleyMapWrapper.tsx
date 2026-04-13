'use client'
import dynamic from 'next/dynamic'

const NorthLasVegasNorthValleyMap = dynamic(() => import('./NorthLasVegasNorthValleyMap'), { ssr: false })

export default function NorthLasVegasNorthValleyMapWrapper() {
  return <NorthLasVegasNorthValleyMap />
}
