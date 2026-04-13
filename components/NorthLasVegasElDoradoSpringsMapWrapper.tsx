'use client'
import dynamic from 'next/dynamic'

const NorthLasVegasElDoradoSpringsMap = dynamic(() => import('./NorthLasVegasElDoradoSpringsMap'), { ssr: false })

export default function NorthLasVegasElDoradoSpringsMapWrapper() {
  return <NorthLasVegasElDoradoSpringsMap />
}
