'use client'
import dynamic from 'next/dynamic'

const NorthLasVegasMap = dynamic(() => import('./NorthLasVegasMap'), { ssr: false })

export default function NorthLasVegasMapWrapper() {
  return <NorthLasVegasMap />
}
