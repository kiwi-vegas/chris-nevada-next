'use client'
import dynamic from 'next/dynamic'

const TrumpInternationalMap = dynamic(() => import('./TrumpInternationalMap'), { ssr: false })

export default function TrumpInternationalMapWrapper() {
  return <TrumpInternationalMap />
}
