'use client'
import dynamic from 'next/dynamic'

const HendersonStephanieStreetMap = dynamic(() => import('./HendersonStephanieStreetMap'), { ssr: false })

export default function HendersonStephanieStreetMapWrapper() {
  return <HendersonStephanieStreetMap />
}
