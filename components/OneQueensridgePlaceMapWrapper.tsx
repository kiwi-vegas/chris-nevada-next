'use client'
import dynamic from 'next/dynamic'

const OneQueensridgePlaceMap = dynamic(() => import('./OneQueensridgePlaceMap'), { ssr: false })

export default function OneQueensridgePlaceMapWrapper() {
  return <OneQueensridgePlaceMap />
}
