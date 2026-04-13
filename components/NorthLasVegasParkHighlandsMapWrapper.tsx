'use client'
import dynamic from 'next/dynamic'

const NorthLasVegasParkHighlandsMap = dynamic(() => import('./NorthLasVegasParkHighlandsMap'), { ssr: false })

export default function NorthLasVegasParkHighlandsMapWrapper() {
  return <NorthLasVegasParkHighlandsMap />
}
