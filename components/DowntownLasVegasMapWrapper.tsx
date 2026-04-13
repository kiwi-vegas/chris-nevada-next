'use client'
import dynamic from 'next/dynamic'

const DowntownLasVegasMap = dynamic(() => import('./DowntownLasVegasMap'), { ssr: false })

export default function DowntownLasVegasMapWrapper() {
  return <DowntownLasVegasMap />
}
