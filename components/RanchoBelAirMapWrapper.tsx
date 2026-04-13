'use client'
import dynamic from 'next/dynamic'

const RanchoBelAirMap = dynamic(() => import('./RanchoBelAirMap'), { ssr: false })

export default function RanchoBelAirMapWrapper() {
  return <RanchoBelAirMap />
}
