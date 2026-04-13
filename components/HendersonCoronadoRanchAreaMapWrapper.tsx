'use client'
import dynamic from 'next/dynamic'

const HendersonCoronadoRanchAreaMap = dynamic(() => import('./HendersonCoronadoRanchAreaMap'), { ssr: false })

export default function HendersonCoronadoRanchAreaMapWrapper() {
  return <HendersonCoronadoRanchAreaMap />
}
