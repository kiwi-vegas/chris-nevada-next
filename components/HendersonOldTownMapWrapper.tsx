'use client'
import dynamic from 'next/dynamic'

const HendersonOldTownMap = dynamic(() => import('./HendersonOldTownMap'), { ssr: false })

export default function HendersonOldTownMapWrapper() {
  return <HendersonOldTownMap />
}
