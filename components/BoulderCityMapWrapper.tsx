'use client'
import dynamic from 'next/dynamic'

const BoulderCityMap = dynamic(() => import('./BoulderCityMap'), { ssr: false })

export default function BoulderCityMapWrapper() {
  return <BoulderCityMap />
}
