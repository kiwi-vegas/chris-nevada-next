'use client'
import dynamic from 'next/dynamic'

const SunColonyAtSienaMap = dynamic(() => import('./SunColonyAtSienaMap'), { ssr: false })

export default function SunColonyAtSienaMapWrapper() {
  return <SunColonyAtSienaMap />
}
