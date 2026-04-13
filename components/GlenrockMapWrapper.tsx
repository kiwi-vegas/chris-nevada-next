'use client'
import dynamic from 'next/dynamic'

const GlenrockMap = dynamic(() => import('./GlenrockMap'), { ssr: false })

export default function GlenrockMapWrapper() {
  return <GlenrockMap />
}
