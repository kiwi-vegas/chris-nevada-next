'use client'
import dynamic from 'next/dynamic'

const HendersonAnthemHillsMap = dynamic(() => import('./HendersonAnthemHillsMap'), { ssr: false })

export default function HendersonAnthemHillsMapWrapper() {
  return <HendersonAnthemHillsMap />
}
