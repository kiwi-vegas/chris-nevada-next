'use client'
import dynamic from 'next/dynamic'

const HendersonTuscanaMap = dynamic(() => import('./HendersonTuscanaMap'), { ssr: false })

export default function HendersonTuscanaMapWrapper() {
  return <HendersonTuscanaMap />
}
