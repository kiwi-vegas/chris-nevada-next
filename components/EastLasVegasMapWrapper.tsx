'use client'
import dynamic from 'next/dynamic'

const EastLasVegasMap = dynamic(() => import('./EastLasVegasMap'), { ssr: false })

export default function EastLasVegasMapWrapper() {
  return <EastLasVegasMap />
}
