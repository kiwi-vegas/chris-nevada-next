'use client'
import dynamic from 'next/dynamic'

const HendersonHillsMap = dynamic(() => import('./HendersonHillsMap'), { ssr: false })

export default function HendersonHillsMapWrapper() {
  return <HendersonHillsMap />
}
