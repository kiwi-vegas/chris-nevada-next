'use client'
import dynamic from 'next/dynamic'

const HendersonPaseoVerdeMap = dynamic(() => import('./HendersonPaseoVerdeMap'), { ssr: false })

export default function HendersonPaseoVerdeMapWrapper() {
  return <HendersonPaseoVerdeMap />
}
