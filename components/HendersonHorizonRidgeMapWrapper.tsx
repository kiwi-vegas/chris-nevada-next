'use client'
import dynamic from 'next/dynamic'

const HendersonHorizonRidgeMap = dynamic(() => import('./HendersonHorizonRidgeMap'), { ssr: false })

export default function HendersonHorizonRidgeMapWrapper() {
  return <HendersonHorizonRidgeMap />
}
