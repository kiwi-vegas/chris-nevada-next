'use client'
import dynamic from 'next/dynamic'

const NorthLasVegasAlianteNorthMap = dynamic(() => import('./NorthLasVegasAlianteNorthMap'), { ssr: false })

export default function NorthLasVegasAlianteNorthMapWrapper() {
  return <NorthLasVegasAlianteNorthMap />
}
