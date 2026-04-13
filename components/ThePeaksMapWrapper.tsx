'use client'
import dynamic from 'next/dynamic'

const ThePeaksMap = dynamic(() => import('./ThePeaksMap'), { ssr: false })

export default function ThePeaksMapWrapper() {
  return <ThePeaksMap />
}
