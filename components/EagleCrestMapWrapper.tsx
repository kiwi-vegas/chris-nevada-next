'use client'
import dynamic from 'next/dynamic'

const EagleCrestMap = dynamic(() => import('./EagleCrestMap'), { ssr: false })

export default function EagleCrestMapWrapper() {
  return <EagleCrestMap />
}
