'use client'
import dynamic from 'next/dynamic'

const TheMartinMap = dynamic(() => import('./TheMartinMap'), { ssr: false })

export default function TheMartinMapWrapper() {
  return <TheMartinMap />
}
