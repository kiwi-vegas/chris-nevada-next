'use client'
import dynamic from 'next/dynamic'

const HendersonSilverstoneMap = dynamic(() => import('./HendersonSilverstoneMap'), { ssr: false })

export default function HendersonSilverstoneMapWrapper() {
  return <HendersonSilverstoneMap />
}
