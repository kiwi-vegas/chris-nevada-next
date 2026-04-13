'use client'
import dynamic from 'next/dynamic'

const HendersonLakeAtLasVegasMap = dynamic(() => import('./HendersonLakeAtLasVegasMap'), { ssr: false })

export default function HendersonLakeAtLasVegasMapWrapper() {
  return <HendersonLakeAtLasVegasMap />
}
