'use client'
import dynamic from 'next/dynamic'

const InspiradaNevadaTrailsMap = dynamic(() => import('./InspiradaNevadaTrailsMap'), { ssr: false })

export default function InspiradaNevadaTrailsMapWrapper() {
  return <InspiradaNevadaTrailsMap />
}
