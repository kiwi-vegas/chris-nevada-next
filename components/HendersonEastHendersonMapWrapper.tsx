'use client'
import dynamic from 'next/dynamic'

const HendersonEastHendersonMap = dynamic(() => import('./HendersonEastHendersonMap'), { ssr: false })

export default function HendersonEastHendersonMapWrapper() {
  return <HendersonEastHendersonMap />
}
