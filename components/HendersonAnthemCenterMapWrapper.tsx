'use client'
import dynamic from 'next/dynamic'

const HendersonAnthemCenterMap = dynamic(() => import('./HendersonAnthemCenterMap'), { ssr: false })

export default function HendersonAnthemCenterMapWrapper() {
  return <HendersonAnthemCenterMap />
}
