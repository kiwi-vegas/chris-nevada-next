'use client'
import dynamic from 'next/dynamic'

const HendersonValleyVerdeMap = dynamic(() => import('./HendersonValleyVerdeMap'), { ssr: false })

export default function HendersonValleyVerdeMapWrapper() {
  return <HendersonValleyVerdeMap />
}
