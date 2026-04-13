'use client'
import dynamic from 'next/dynamic'

const NorthwestLasVegasMap = dynamic(() => import('./NorthwestLasVegasMap'), { ssr: false })

export default function NorthwestLasVegasMapWrapper() {
  return <NorthwestLasVegasMap />
}
