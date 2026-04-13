'use client'
import dynamic from 'next/dynamic'

const HendersonSoleraMap = dynamic(() => import('./HendersonSoleraMap'), { ssr: false })

export default function HendersonSoleraMapWrapper() {
  return <HendersonSoleraMap />
}
