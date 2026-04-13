'use client'
import dynamic from 'next/dynamic'

const TheLoughtonMap = dynamic(() => import('./TheLoughtonMap'), { ssr: false })

export default function TheLoughtonMapWrapper() {
  return <TheLoughtonMap />
}
