'use client'
import dynamic from 'next/dynamic'

const TheOgdenMap = dynamic(() => import('./TheOgdenMap'), { ssr: false })

export default function TheOgdenMapWrapper() {
  return <TheOgdenMap />
}
