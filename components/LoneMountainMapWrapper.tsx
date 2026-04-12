'use client'
import dynamic from 'next/dynamic'

const LoneMountainMap = dynamic(() => import('./LoneMountainMap'), { ssr: false })

export default function LoneMountainMapWrapper() {
  return <LoneMountainMap />
}
