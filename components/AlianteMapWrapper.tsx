'use client'
import dynamic from 'next/dynamic'

const AlianteMap = dynamic(() => import('./AlianteMap'), { ssr: false })

export default function AlianteMapWrapper() {
  return <AlianteMap />
}
