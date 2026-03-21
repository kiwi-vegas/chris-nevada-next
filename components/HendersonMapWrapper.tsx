'use client'
import dynamic from 'next/dynamic'

const HendersonMap = dynamic(() => import('./HendersonMap'), { ssr: false })

export default function HendersonMapWrapper() {
  return <HendersonMap />
}
