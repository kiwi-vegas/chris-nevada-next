'use client'
import dynamic from 'next/dynamic'

const HendersonSolitudeMap = dynamic(() => import('./HendersonSolitudeMap'), { ssr: false })

export default function HendersonSolitudeMapWrapper() {
  return <HendersonSolitudeMap />
}
